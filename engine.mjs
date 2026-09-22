const TYPES = ["column", "color", "number", "bomb", "coin"];
const COLORS = ["Coral", "Teal", "Amber", "Violet"];
const DEFAULTS = {
  moves: 10,
  targets: [260, 420, 620],
  rates: [2, 2, 2, 2, 2],
  lowBonus: true,
};
const RULES = Object.freeze({
  rerollCost: 3,
  cascadeStep: 1,
  lowMult: 1,
  sizeMult: [1, 2, 3],
  maxWaves: 80,
});
function rulesFor(config) {
  return { ...RULES, ...config.rules };
}
const clone = (x) => structuredClone(x);
function random(s) {
  s.rng = (s.rng + 1831565813) >>> 0;
  let t = s.rng;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}
function die(s) {
  const n = 1 + Math.floor(random(s) * 6),
    color = Math.floor(random(s) * 4),
    roll = random(s) * 100;
  let total = 0,
    special = null;
  for (let k = 0; k < 5; k++) {
    total += s.config.rates[k];
    if (roll < total) {
      special = TYPES[k];
      break;
    }
  }
  return { id: s.nextId++, n, color, special };
}
function matches(b) {
  const runs = [];
  for (let axis = 0; axis < 2; axis++)
    for (let line = 0; line < 6; line++) {
      let run = [];
      for (let p = 0; p <= 6; p++) {
        let i = axis ? p * 6 + line : line * 6 + p;
        if (p < 6 && b[i] && (!run.length || b[i].n === b[run[0]].n))
          run.push(i);
        else {
          if (run.length >= 3) runs.push(run);
          run = p < 6 && b[i] ? [i] : [];
        }
      }
    }
  const groups = [];
  for (const run of runs) {
    let set = new Set(run);
    for (let i = groups.length - 1; i >= 0; i--)
      if (groups[i].some((x) => set.has(x))) {
        groups[i].forEach((x) => set.add(x));
        groups.splice(i, 1);
      }
    groups.push([...set].sort((a, b2) => a - b2));
  }
  return groups;
}
function adjacent(a, b) {
  return (
    Number.isInteger(a) &&
    Number.isInteger(b) &&
    a >= 0 &&
    b >= 0 &&
    a < 36 &&
    b < 36 &&
    Math.abs((a % 6) - (b % 6)) +
      Math.abs(Math.floor(a / 6) - Math.floor(b / 6)) ===
      1
  );
}
function swap(b, a, c) {
  [b[a], b[c]] = [b[c], b[a]];
}
function legalMoves(b) {
  const out = [];
  for (let a = 0; a < 36; a++)
    for (const c of [a % 6 < 5 ? a + 1 : -1, a < 30 ? a + 6 : -1]) {
      if (c < 0) continue;
      swap(b, a, c);
      const groups = matches(b);
      swap(b, a, c);
      if (groups.length) out.push({ a, b: c, groups });
    }
  return out;
}
function freshBoard(s) {
  for (let attempt = 0; attempt < 100; attempt++) {
    const b = [];
    for (let i = 0; i < 36; i++) {
      let d = die(s);
      while (
        (i % 6 > 1 && b[i - 1].n === d.n && b[i - 2].n === d.n) ||
        (i >= 12 && b[i - 6].n === d.n && b[i - 12].n === d.n)
      )
        d.n = 1 + Math.floor(random(s) * 6);
      b.push(d);
    }
    if (legalMoves(b).length) return b;
  }
  throw Error("Unable to construct playable board");
}
function newGame(seed = Date.now() >>> 0, config = DEFAULTS) {
  const s = {
    version: 1,
    seed: seed >>> 0,
    rng: seed >>> 0,
    nextId: 1,
    config: clone(config),
    round: 0,
    score: 0,
    total: 0,
    coins: 0,
    moves: config.moves,
    turn: 0,
    bestChain: 0,
    status: "playing",
    history: [],
  };
  s.board = freshBoard(s);
  return s;
}
function effect(b, i, type) {
  const d = b[i],
    r = Math.floor(i / 6),
    c = i % 6;
  return b.flatMap((x, j) => {
    let yes = false;
    if (type === "column") yes = j % 6 === c;
    if (type === "color") yes = x.color === d.color;
    if (type === "number") yes = x.n === d.n;
    if (type === "bomb")
      yes = Math.abs(Math.floor(j / 6) - r) <= 1 && Math.abs((j % 6) - c) <= 1;
    return yes ? [j] : [];
  });
}
function wave(b, groups, depth, config) {
  const natural = new Set(groups.flat()),
    cleared = new Set(natural),
    queue = [...natural],
    activations = [];
  let coins = 0;
  for (let q = 0; q < queue.length; q++) {
    const i = queue[q],
      d = b[i];
    if (!d.special) continue;
    activations.push({ index: i, type: d.special });
    if (d.special === "coin") coins++;
    for (const j of effect(b, i, d.special))
      if (!cleared.has(j)) {
        cleared.add(j);
        queue.push(j);
      }
  }
  const rules = rulesFor(config),
    cascade = depth * rules.cascadeStep;
  const entries = groups.map((g) => {
    const size = rules.sizeMult[g.length >= 5 ? 2 : g.length === 4 ? 1 : 0];
    const low = config.lowBonus && b[g[0]].n <= 2 ? rules.lowMult : 0;
    const pips = g.reduce((a, i) => a + b[i].n, 0),
      mult = size + cascade + low;
    return {
      indices: g,
      pips,
      mult,
      size,
      low,
      cascade,
      score: pips * mult,
      label: `${g.length} \xD7 ${b[g[0]].n}`,
      kind: "match",
    };
  });
  const blast = [...cleared].filter((i) => !natural.has(i));
  if (blast.length) {
    const pips = blast.reduce((a, i) => a + b[i].n, 0);
    entries.push({
      indices: blast,
      pips,
      mult: 1 + cascade,
      size: 1,
      low: 0,
      cascade,
      score: pips * (1 + cascade),
      label: "Special clears",
      kind: "blast",
    });
  }
  return {
    groups,
    cleared: [...cleared],
    activations,
    coins,
    entries,
    score: entries.reduce((a, e) => a + e.score, 0),
    depth,
  };
}
function collapse(s, cleared) {
  const removed = new Set(cleared);
  const b = Array(36);
  for (let c = 0; c < 6; c++) {
    const remain = [];
    for (let r = 5; r >= 0; r--)
      if (!removed.has(r * 6 + c)) remain.push(s.board[r * 6 + c]);
    for (let r = 5; r >= 0; r--) b[r * 6 + c] = remain[5 - r] || die(s);
  }
  s.board = b;
}
function reshuffle(s) {
  const b = s.board;
  for (let a = 0; a < 200; a++) {
    for (let i = 35; i > 0; i--) {
      const j = Math.floor(random(s) * (i + 1));
      swap(b, i, j);
    }
    if (!matches(b).length && legalMoves(b).length) return;
  }
  s.board = freshBoard(s);
}
function act(original, action) {
  if (original.status !== "playing") return null;
  const s = clone(original),
    frames = [],
    rules = rulesFor(original.config);
  if (action.type === "swap") {
    if (!adjacent(action.a, action.b)) return null;
    swap(s.board, action.a, action.b);
    if (!matches(s.board).length) return null;
    s.moves--;
  } else if (action.type === "reroll") {
    if (
      s.coins < rules.rerollCost ||
      !Number.isInteger(action.index) ||
      action.index < 0 ||
      action.index > 35
    )
      return null;
    s.coins -= rules.rerollCost;
    const r = Math.min(4, Math.floor(action.index / 6)),
      c = Math.min(4, action.index % 6);
    for (const i of [
      r * 6 + c,
      r * 6 + c + 1,
      (r + 1) * 6 + c,
      (r + 1) * 6 + c + 1,
    ])
      s.board[i] = { ...s.board[i], n: 1 + Math.floor(random(s) * 6) };
  } else return null;
  s.turn++;
  const initial = clone(s.board);
  let groups = matches(s.board),
    depth = 0,
    resolutionCapped = false;
  while (groups.length) {
    const f = wave(s.board, groups, depth, s.config);
    f.before = clone(s.board);
    s.score += f.score;
    s.total += f.score;
    s.coins += f.coins;
    collapse(s, f.cleared);
    f.after = clone(s.board);
    frames.push(f);
    depth++;
    if (depth >= rules.maxWaves && matches(s.board).length) {
      resolutionCapped = true;
      s.board = freshBoard(s);
      break;
    }
    groups = matches(s.board);
  }
  s.bestChain = Math.max(s.bestChain, depth);
  let shuffled = false;
  if (s.score >= s.config.targets[s.round])
    s.status = s.round === s.config.targets.length - 1 ? "won" : "roundwon";
  else if (s.moves <= 0) s.status = "lost";
  else if (!legalMoves(s.board).length) {
    reshuffle(s);
    shuffled = true;
  }
  const summary = {
    action: clone(action),
    resolutionCapped,
    shuffled,
    coinsEarned: frames.reduce((a, f) => a + f.coins, 0),
    coinsSpent: action.type === "reroll" ? rules.rerollCost : 0,
    turn: s.turn,
    round: s.round + 1,
    score: frames.reduce((a, f) => a + f.score, 0),
    waves: depth,
    specials: frames.flatMap((f) => f.activations).length,
    entries: frames.flatMap((f) =>
      f.entries.map((e) => ({
        label: e.label,
        pips: e.pips,
        mult: e.mult,
        size: e.size,
        low: e.low,
        cascade: e.cascade,
        score: e.score,
      })),
    ),
  };
  s.history.push(summary);
  return { state: s, initial, frames, shuffled, resolutionCapped, summary };
}
function nextRound(s) {
  if (s.status !== "roundwon") return s;
  const n = clone(s);
  n.round++;
  n.score = 0;
  n.moves = n.config.moves;
  n.status = "playing";
  n.board = freshBoard(n);
  return n;
}
function preview(b, a, c, config) {
  if (!adjacent(a, c)) return null;
  const next = clone(b);
  swap(next, a, c);
  const g = matches(next);
  return g.length ? wave(next, g, 0, config) : null;
}
export {
  RULES,
  rulesFor,
  COLORS,
  DEFAULTS,
  TYPES,
  act,
  adjacent,
  clone,
  collapse,
  die,
  effect,
  freshBoard,
  legalMoves,
  matches,
  newGame,
  nextRound,
  preview,
  random,
  reshuffle,
  swap,
  wave,
};
