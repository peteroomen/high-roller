const TYPES = ["column", "color", "number", "bomb", "coin", "row"];
const COLORS = ["Coral", "Amber", "Green", "Blue", "Violet", "Rose"];
const DEFAULTS = {
  moves: 10,
  targets: [220, 900, 2400, 6000, 10000, 14000],
  rates: [0, 0, 0, 0, 0, 0],
  lowBonus: true,
  draft: true,
};
const RULES = Object.freeze({
  rerollCost: 3,
  tokenBoost: 5,
  tokenTypeCap: 30,
  specialRateCap: 90,
  packCost: 5,
  roundReward: 5,
  cascadeStep: 1,
  lowMult: 1,
  sizeMult: [1, 2, 3],
  maxWaves: 80,
  specialMult: { column: 2, color: 2, number: 2, bomb: 2, coin: 2, row: 2 },
});
function rulesFor(config) {
  return {
    ...RULES,
    ...config.rules,
    specialMult: { ...RULES.specialMult, ...config.rules?.specialMult },
  };
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
  for (let k = 0; k < TYPES.length; k++) {
    total += s.config.rates[k] ?? 0;
    if (roll < total) {
      special = TYPES[k];
      break;
    }
  }
  return {
    id: s.nextId++,
    n: special ? null : n,
    color: special ? null : n - 1,
    special,
    ...(special ? { mult: rulesFor(s.config).specialMult[special] } : {}),
  };
}
function numbered(d) {
  return Boolean(
    d && !d.special && Number.isInteger(d.n) && d.n >= 1 && d.n <= 6,
  );
}
function specialMultiplier(d, config = DEFAULTS) {
  return Number.isFinite(d.mult) && d.mult >= 1
    ? d.mult
    : rulesFor(config).specialMult[d.special];
}
function matches(b) {
  const runs = [];
  for (let axis = 0; axis < 2; axis++)
    for (let line = 0; line < 6; line++) {
      let run = [];
      for (let p = 0; p <= 6; p++) {
        let i = axis ? p * 6 + line : line * 6 + p;
        if (p < 6 && numbered(b[i]) && (!run.length || b[i].n === b[run[0]].n))
          run.push(i);
        else {
          if (run.length >= 3) runs.push(run);
          run = p < 6 && numbered(b[i]) ? [i] : [];
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
      if (groups.length || b[a].special || b[c].special)
        out.push({ a, b: c, groups });
    }
  return out;
}
function freshBoard(s) {
  for (let attempt = 0; attempt < 100; attempt++) {
    const b = [];
    for (let i = 0; i < 36; i++) {
      let d = die(s);
      while (
        !d.special &&
        ((i % 6 > 1 && b[i - 1].n === d.n && b[i - 2].n === d.n) ||
          (i >= 12 && b[i - 6].n === d.n && b[i - 12].n === d.n))
      )
        d.n = 1 + Math.floor(random(s) * 6);
      d.color = d.special ? null : d.n - 1;
      b.push(d);
    }
    if (legalActions(b).length) return b;
  }
  throw Error("Unable to construct playable board");
}
function newGame(seed = Date.now() >>> 0, config = DEFAULTS) {
  const s = {
    version: 5,
    seed: seed >>> 0,
    rng: seed >>> 0,
    nextId: 1,
    config: { ...clone(config), rates: TYPES.map((_, i) => config.rates[i] ?? 0) },
    initialConfig: clone(config),
    round: 0,
    score: 0,
    total: 0,
    coins: 0,
    moves: config.moves,
    turn: 0,
    bestChain: 0,
    status: "playing",
    history: [],
    tokens: Object.fromEntries(TYPES.map(t=>[t,0])),
    draft: null,
    shop: null,
  };
  s.board = freshBoard(s);
  if(config.draft !== false) {
    const offers=tokenOffers(s,3,TYPES.filter(t=>t!=="color"));
    if(offers.length) {s.status="draft";s.draft={kind:"starter",offers,picks:[],limit:1};}
  }
  return s;
}
function effect(b, i, type, targetN = b[i].n) {
  const r = Math.floor(i / 6),
    c = i % 6;
  return b.flatMap((x, j) => {
    let yes = false;
    if (type === "column") yes = j % 6 === c;
    if (type === "row") yes = Math.floor(j / 6) === r;
    if (type === "coin") yes = Math.abs(Math.floor(j / 6) - r) + Math.abs(j % 6 - c) === 1;
    // Legacy type key retained for existing saves; colour now denotes special dice.
    if (type === "color") yes = Boolean(x.special);
    if (type === "number") yes = numbered(x) && x.n === targetN;
    if (type === "bomb")
      yes = Math.abs(Math.floor(j / 6) - r) <= 1 && Math.abs((j % 6) - c) <= 1;
    return yes ? [j] : [];
  });
}
function legalActions(b) {
  return legalMoves(b).map(({a,b}) => ({type:"swap",a,b}));
}
function mostCommonNumber(b) {
  const counts = Array(7).fill(0);
  for (const d of b) if (numbered(d)) counts[d.n]++;
  return [6,5,4,3,2,1].reduce((best,n) => counts[n] > counts[best] ? n : best,6);
}
// Positions are after swapping. Only the effect footprint is claimed; the
// partner never receives an extra inclusion simply for having been swapped.
function swapRoots(b,a,c) {
  return [a,c].filter(index=>b[index].special).map(index=>({
    index, targetN: b[index===a?c:a].n ?? mostCommonNumber(b), trigger:"swap"
  }));
}
function previewAction(b,action,config) {
  if(action.type === "swap") return preview(b,action.a,action.b,config);
  return null;
}
function wave(b, groups, depth, config, roots = []) {
  const rules = rulesFor(config),
    cascade = depth * rules.cascadeStep;
  const cleared = new Set(),
    claims = new Map(),
    candidates = [],
    activations = [],
    visited = new Set();
  const queue = roots.map((r) => ({ ...r }));
  const direct = new Set(roots.map((r) => r.index));
  const claim = (i, entry) => {
    cleared.add(i);
    if (!numbered(b[i])) return;
    if (!claims.has(i)) claims.set(i, entry);
  };
  for (const g of groups) {
    const size = rules.sizeMult[g.length >= 5 ? 2 : g.length === 4 ? 1 : 0];
    const low = config.lowBonus && b[g[0]].n <= 2 ? rules.lowMult : 0;
    const entry = {
      kind: "match",
      matchSize: g.length,
      affected: [...g],
      size,
      low,
      cascade,
      mult: size + low + cascade,
      label: `${g.length} × ${b[g[0]].n}`,
    };
    candidates.push(entry);
    for (const i of g) claim(i, entry);
  }
  let coins = 0;
  for (let q = 0; q < queue.length; q++) {
    const r = queue[q],
      d = b[r.index];
    if (!d?.special || visited.has(r.index)) continue;
    visited.add(r.index);
    cleared.add(r.index);
    const size = specialMultiplier(d, config);
    activations.push({
      index: r.index,
      type: d.special,
      mult: size,
      trigger: direct.has(r.index) ? "swap" : "chain",
      targetN: r.targetN,
    });
    if (d.special === "coin") coins++;
    const label = {
      column: "Column",
      row: "Row",
      color: "Special sweep",
      number: "Number sweep",
      bomb: "Bomb",
      coin: "Coin",
    }[d.special];
    const entry = {
      kind: "blast",
      specialType: d.special,
      sourceIndex: r.index,
      size,
      low: 0,
      cascade,
      mult: size + cascade,
      label,
    };
    candidates.push(entry);
    const targets = new Set([
      r.index,
      ...effect(b, r.index, d.special, r.targetN),
    ]);
    entry.affected = [...targets];
    for (const i of targets) {
      claim(i, entry);
      if (b[i].special && !visited.has(i))
        queue.push({
          index: i,
          targetN: r.targetN,
          trigger: "chain",
        });
    }
  }
  const entries = candidates
    .map((e) => {
      const indices = [...claims]
        .filter(([, owner]) => owner === e)
        .map(([i]) => i);
      const pips = indices.reduce((sum, i) => sum + b[i].n, 0);
      return {
        ...e,
        indices,
        pips,
        label:
          e.kind === "match" && indices.length < e.matchSize
            ? `${e.matchSize}-match · ${indices.length} dice`
            : e.label,
        score: pips * e.mult,
      };
    })
    ;
  const pips=entries.reduce((n,e)=>n+e.pips,0), mult=entries.reduce((n,e)=>n+e.mult,0);
  for(const entry of entries) entry.score=pips*entry.mult;
  return {
    groups,
    cleared: [...cleared],
    activations,
    coins,
    entries,
    pips, mult,
    score: pips * mult,
    depth,
  };
}
// Upgrade saved boards without inventing pips for special dice.
function restoreGame(saved) {
  if (
    !saved ||
    ![1, 2, 3, 4, 5].includes(saved.version) ||
    saved.board?.length !== 36 ||
    !saved.board.every((d) => TYPES.includes(d.special) || numbered(d))
  )
    return null;
  const s = clone(saved);
  if(saved.version < 5) {
    // Keep the in-progress board and goals; new runs use the zero-rate draft.
    s.tokens=Object.fromEntries(TYPES.map(t=>[t,0]));
    s.draft=null; s.shop=null;
  }
  s.initialConfig ??= {...clone(s.config),rates:TYPES.map((t,i)=>Math.max(0,(s.config.rates[i]??0)-(s.tokens?.[t]??0)*rulesFor(s.config).tokenBoost))};
  s.version = 5;
  s.config.rates = TYPES.map((_,i) => s.config.rates[i] ?? (saved.version < 3 ? DEFAULTS.rates[i] : 0));
  s.board = s.board.map((d) =>
    d.special
      ? { ...d, n: null, color: null, mult: specialMultiplier(d, s.config) }
      : { ...d, color: d.n - 1 },
  );
  return s;
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
    if (!matches(b).length && legalActions(b).length) return;
  }
  s.board = freshBoard(s);
}
function act(original, action) {
  if (original.status !== "playing") return progressAction(original, action);
  const s = clone(original),
    frames = [],
    rules = rulesFor(original.config);
  let roots = [];
  if (action.type === "swap") {
    if (!adjacent(action.a, action.b)) return null;
    swap(s.board, action.a, action.b);
    roots = swapRoots(s.board, action.a, action.b);
    if (!matches(s.board).length && !roots.length) return null;
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
      if (!s.board[i].special) {
        const n = 1 + Math.floor(random(s) * 6);
        s.board[i] = { ...s.board[i], n, color: n - 1 };
      }
  } else return null;
  s.turn++;
  const initial = clone(s.board);
  let groups = matches(s.board),
    depth = 0,
    resolutionCapped = false,
    movePips = 0, moveMult = 0, moveScore = 0;
  while (groups.length || roots.length) {
    const f = wave(s.board, groups, depth, s.config, roots);
    roots = [];
    f.before = clone(s.board);
    movePips+=f.pips; moveMult+=f.mult;
    f.score=movePips*moveMult-moveScore;
    moveScore=movePips*moveMult;
    f.runningPips=movePips; f.runningMult=moveMult;
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
  else if (!legalActions(s.board).length) {
    reshuffle(s);
    shuffled = true;
  }
  for(const f of frames) for(const entry of f.entries) entry.score=movePips*entry.mult;
  const summary = {
    action: clone(action),
    ruleVersion: 5,
    pips: movePips, mult: moveMult,
    directSpecials: frames
      .flatMap((f) => f.activations)
      .filter((a) => a.trigger === "swap").length,
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
        kind: e.kind,
        specialType: e.specialType,
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
const PACKS = [
  {id:"assorted",name:"Lucky Dip",note:"A little of everything",pool:TYPES},
  {id:"lines",name:"Straight Flush",note:"More rows & columns",pool:["row","column","row","column","bomb","number"]},
  {id:"tricks",name:"Wild Things",note:"More sweeps & coins",pool:["color","number","coin","color","number","bomb"]},
];
function canTakeToken(s,type) {
  const r=rulesFor(s.config),i=TYPES.indexOf(type);
  return r.tokenBoost>0 && !s.config.disabledTypes?.includes(type) && i>=0 && (s.config.rates[i]??0)+r.tokenBoost<=r.tokenTypeCap &&
    s.config.rates.reduce((a,b)=>a+b,0)+r.tokenBoost<=r.specialRateCap;
}
function tokenOffers(s,count,pool=TYPES) {
  // Distinct offers: each pack is five types, each pick can stack with owned tokens.
  const offers=[];
  for(let i=0;i<count;i++) {
    let eligible=pool.filter(t=>canTakeToken(s,t)&&!offers.includes(t));
    if(!eligible.length) eligible=TYPES.filter(t=>canTakeToken(s,t)&&!offers.includes(t));
    if(!eligible.length) break;
    offers.push(eligible[Math.floor(random(s)*eligible.length)]);
  }
  return offers;
}
function progressAction(original,action) {
  const s=clone(original), r=rulesFor(s.config);
  let coinsEarned=0,coinsSpent=0,tokenType=null;
  if(action.type==="choose_token" && s.status==="draft") {
    const d=s.draft;
    if(!Number.isInteger(action.index) || action.index<0 || action.index>=d.offers.length || d.picks.includes(action.index)) return null;
    tokenType=d.offers[action.index];
    if(!canTakeToken(s,tokenType)) return null;
    s.config.rates[TYPES.indexOf(tokenType)]+=r.tokenBoost;
    s.tokens[tokenType]++;
    d.picks.push(action.index);
    if(d.picks.length>=d.limit || !d.offers.some((t,i)=>!d.picks.includes(i)&&canTakeToken(s,t))) {
      s.status=d.kind==="starter"?"playing":"shop";
      if(d.kind==="starter") s.board=freshBoard(s);
      s.draft=null;
    }
  } else if(action.type==="visit_shop" && s.status==="roundwon") {
    coinsEarned=r.roundReward+Math.floor(Math.max(0,s.moves)/3);
    s.coins+=coinsEarned;
    s.status="shop"; s.shop={bought:false,reward:coinsEarned};
  } else if(action.type==="buy_pack" && s.status==="shop") {
    const pack=PACKS.find(p=>p.id===action.pack);
    if(!pack || s.shop.bought || s.coins<r.packCost) return null;
    const offers=tokenOffers(s,5,pack.pool);
    if(!offers.length) return null;
    coinsSpent=r.packCost; s.coins-=coinsSpent; s.shop.bought=true;
    s.status="draft";
    s.draft={kind:"pack",name:pack.name,offers,picks:[],limit:Math.min(3,offers.length,Math.floor((r.specialRateCap-s.config.rates.reduce((a,b)=>a+b,0))/r.tokenBoost))};
  } else if(action.type==="next_round" && s.status==="shop") {
    s.round++; s.score=0; s.moves=s.config.moves; s.status="playing";
    s.shop=null; s.board=freshBoard(s);
  } else return null;
  const summary={action:clone(action),ruleVersion:5,turn:s.turn,round:s.round+1,
    score:0,pips:0,mult:0,waves:0,specials:0,directSpecials:0,entries:[],coinsEarned,coinsSpent,tokenType};
  s.history.push(summary);
  return {state:s,initial:clone(s.board),frames:[],summary};
}
function nextRound(s) {
  return act(s,{type:s.status==="roundwon"?"visit_shop":"next_round"})?.state ?? s;
}
function preview(b, a, c, config) {
  if (!adjacent(a, c)) return null;
  const next = clone(b);
  swap(next, a, c);
  const g = matches(next);
  const roots=swapRoots(next,a,c);
  return g.length || roots.length ? wave(next,g,0,config,roots) : null;
}
export {
  PACKS, canTakeToken,
  legalActions, previewAction, mostCommonNumber,
  numbered,
  specialMultiplier,
  restoreGame,
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
