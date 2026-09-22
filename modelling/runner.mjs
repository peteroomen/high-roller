import { createHash } from "node:crypto";
import {
  DEFAULTS,
  TYPES,
  act,
  newGame,
  nextRound,
  clone,
  rulesFor, TRINKETS, MATCH_TIERS, stageInfo,
} from "../engine.mjs";
import { pacing } from "../presentation.mjs";
import { observe, makePolicy } from "./policies.mjs";
const counts = () => Object.fromEntries(TYPES.map((k) => [k, 0]));
const hash = (x) =>
  createHash("sha256").update(JSON.stringify(x)).digest("hex");
export function fingerprint(s) {
  return hash({
    rng: s.rng,
    nextId: s.nextId,
    round: s.round,
    score: s.score,
    total: s.total,
    coins: s.coins,
    moves: s.moves,
    status: s.status,
    board: s.board,
    config:s.config,tokens:s.tokens,draft:s.draft,shop:s.shop,
  });
}
export function runOne({
  seed,
  config = DEFAULTS,
  policy = "greedy",
  samples = 6,
  coinValue = 4,
  maxActions = 400,
  record = true,
}) {
  let s = newGame(seed, config);
  const agent = makePolicy(policy, {
    seed: (0x92ab71 ^ Math.imul(seed, 0x9e3779b1)) >>> 0,
    samples,
    coinValue,
  });
  const m = {
    seed,
    policy,
    status: null,
    roundCount:config.targets.length,
    actions: 0,
    packPurchases:0, tokenPicks:counts(), roundRewards:0, packSpending:0, shopVisits:0,
    trinketPurchases:0,trinketSales:0,trinketSpending:0,saleIncome:0,
    multiPicks:Object.fromEntries(MATCH_TIERS.map(t=>[t,0])),
    trinketTriggers:Object.fromEntries(TRINKETS.map(t=>[t.id,0])),
    trinketBonuses:Object.fromEntries(TRINKETS.map(t=>[t.id,0])),
    trinketFlights:0,
    pipFlights: 0,
    multFlights: 0,
    scoreAnimationMs: 0,
    swaps: 0,
    rerolls: 0,
    coinsEarned: 0,
    coinsSpent: 0,
    coinsEnding: 0,
    coinsFirstAffordableTurn: null,
    rerollsWithNoMatch: 0,
    rerollPoints: 0,
    shuffles: 0,
    cappedResolutions: 0,
    totalScore: 0,
    points: { matchBase: 0, blastBase: 0, cascade: 0, low: 0, upgrades:0, trinketMult:0, trinketPips:0 },
    specialSwapActions: 0,
    specialScore: counts(),
    specialSpawns: counts(),
    specialTriggers: counts(),
    specialChainTriggers: counts(),
    naturalByPip: Array(6).fill(0),
    naturalScoreByPip: Array(6).fill(0),
    matchedGroupSizes: {},
    depthHistogram: {},
    waveCounts: [],
    scoresPerAction: [],
    rounds: [],
    completed: [],
    trace: [],
  };
  const seen = new Set();
  function register(b) {
    for (const d of b)
      if (!seen.has(d.id)) {
        seen.add(d.id);
        if (d.special) m.specialSpawns[d.special]++;
      }
  }
  register(s.board);
  let startActions = 0,
    startEarned = 0,
    startSpent = 0,
    startRerolls = 0;
  function recordRound(cleared, censored = false) {
    m.rounds.push({
      round: s.round + 1,
      stage:stageInfo(s.round,s.config).number,
      cleared,
      censored,
      score: s.score,
      target: s.config.targets[s.round],
      deficit: Math.max(0, s.config.targets[s.round] - s.score),
      overshoot: Math.max(0, s.score - s.config.targets[s.round]),
      movesUsed: s.config.moves - s.moves,
      movesLeft: s.moves,
      actions: m.actions - startActions,
      rerolls: m.rerolls - startRerolls,
      coinsEarned: m.coinsEarned - startEarned,
      coinsSpent: m.coinsSpent - startSpent,
      coinsLeft: s.coins,
    });
  }
  for (;;) {
    if (["won","lost"].includes(s.status)) break;
    if (m.actions >= maxActions) {
      m.status = "censored";
      if(!m.rounds.some(row=>row.round===s.round+1)) recordRound(false, true);
      break;
    }
    if (
      m.coinsFirstAffordableTurn === null &&
      s.status === "playing" && s.coins >= rulesFor(s.config).rerollCost
    )
      m.coinsFirstAffordableTurn = m.actions;
    const action = agent.choose(observe(s));
    const before = fingerprint(s),
      out = act(s, action);
    if (!out) throw Error("Invalid model action");
    m.actions++;
    if (out.summary.directSpecials) m.specialSwapActions++;
    if(action.type === "swap") m.swaps++;
    if(action.type === "reroll") m.rerolls++;
    if(action.type === "buy_pack") {m.packPurchases++;m.packSpending+=out.summary.coinsSpent;}
    if(action.type === "visit_shop") {m.shopVisits++;m.roundRewards+=out.summary.coinsEarned;}
    if(action.type==='buy_trinket') {m.trinketPurchases++;m.trinketSpending+=out.summary.coinsSpent;}
    if(action.type==='sell_trinket') {m.trinketSales++;m.saleIncome+=out.summary.coinsEarned;}
    if(out.summary.tokenType?.startsWith('multi-')) m.multiPicks[out.summary.tokenType.slice(6)]++;
    else if(out.summary.tokenType) m.tokenPicks[out.summary.tokenType]++;
    // Allocate pip bonuses first at final Mult, then all Mult sources over dice pips.
    // This fixed ordering conserves score without double-counting interactions.
    const bonusPips=out.summary.entries.reduce((n,e)=>n+(e.pipBonus??0),0);
    const dicePips=out.summary.pips-bonusPips;
    m.points.trinketPips+=bonusPips*out.summary.mult;
    m.coinsEarned += out.summary.coinsEarned;
    m.coinsSpent += out.summary.coinsSpent;
    if (action.type === "reroll") {
      m.rerollPoints += out.summary.score;
      if (!out.frames.length) m.rerollsWithNoMatch++;
    }
    if (out.shuffled) m.shuffles++;
    if (out.resolutionCapped) m.cappedResolutions++;
    if(s.status === "playing") {m.waveCounts.push(out.frames.length);m.scoresPerAction.push(out.summary.score);}
    for (const f of out.frames) {
      for(const [key,value] of Object.entries(pacing(f))) m[key]+=value;
      register(f.before);
      register(f.after);
      m.depthHistogram[f.depth + 1] = (m.depthHistogram[f.depth + 1] || 0) + 1;
      const natural = new Set(f.groups.flat());
      for (const a of f.activations) {
        m.specialTriggers[a.type]++;
        if (a.trigger === "chain") m.specialChainTriggers[a.type]++;
      }
      for (const g of f.groups) {
        m.matchedGroupSizes[g.length] =
          (m.matchedGroupSizes[g.length] || 0) + 1;
      }
      for (const e of f.entries) {
        m.points[e.kind === "match" ? "matchBase" : "blastBase"] +=
          dicePips * e.size;
        m.points.upgrades+=dicePips*(e.upgrade??0);
        m.points.trinketMult+=dicePips*(e.trinketMult??0);
        for(const t of e.trinkets??[]) {m.trinketTriggers[t.id]++;m.trinketBonuses[t.id]+=t.value;}
        if (e.specialType) m.specialScore[e.specialType] += e.score;
        m.points.cascade += dicePips * e.cascade;
        m.points.low += dicePips * e.low;
        if (e.kind === "match") {
          const n = f.before[e.affected[0]].n;
          m.naturalByPip[n - 1]++;
          m.naturalScoreByPip[n - 1] += e.score;
        }
      }
    }
    const previousStatus=s.status;
    s = out.state;
    if(previousStatus === "playing" && ["roundwon","won","lost"].includes(s.status)) {
      const cleared=s.status!=="lost";recordRound(cleared);
      if(cleared)m.completed.push(s.round+1);
    }
    if(action.type === "next_round") {
      startActions=m.actions;startEarned=m.coinsEarned;startSpent=m.coinsSpent;startRerolls=m.rerolls;
    }
    register(s.board);
    if (record)
      m.trace.push({
        turn: m.actions,
        round: s.round + 1,
        action: clone(action),
        before,
        after: fingerprint(s),
        score: out.summary.score,
        coins: s.coins,
        waves: out.frames.length,
      });
  }
  m.status ??= s.status;
  m.totalScore = s.total;
  m.coinsEnding = s.coins;
  m.finalHash = fingerprint(s);
  if (Object.values(m.points).reduce((a, b) => a + b, 0) !== m.totalScore)
    throw Error("Score attribution mismatch");
  if (m.coinsEarned - m.coinsSpent !== m.coinsEnding)
    throw Error("Coin accounting mismatch");
  for (const type of TYPES)
    if (m.specialTriggers[type] > m.specialSpawns[type])
      throw Error("Special activated more than once per die");
  return m;
}
export function replayTrace({ seed, config = DEFAULTS, trace, finalHash }) {
  let s = newGame(seed, config);
  for (const t of trace) {
    if (fingerprint(s) !== t.before)
      throw Error(`Replay diverged before action ${t.turn}`);
    const out = act(s, t.action);
    if (!out) throw Error(`Replay action ${t.turn} invalid`);
    s = out.state;
    if (fingerprint(s) !== t.after)
      throw Error(`Replay diverged after action ${t.turn}`);
  }
  if (finalHash && fingerprint(s) !== finalHash)
    throw Error("Replay final state mismatch");
  return s;
}
export function quantiles(values) {
  if (!values.length)
    return {
      n: 0,
      mean: null,
      p10: null,
      p50: null,
      p90: null,
      p99: null,
      max: null,
    };
  const a = [...values].sort((x, y) => x - y);
  const at = (p) => a[Math.min(a.length - 1, Math.floor(p * (a.length - 1)))];
  return {
    n: a.length,
    mean: values.reduce((a, b) => a + b, 0) / a.length,
    p10: at(0.1),
    p50: at(0.5),
    p90: at(0.9),
    p99: at(0.99),
    max: a.at(-1),
  };
}
export function wilson(success, n) {
  if (!n) return [null, null];
  const z = 1.95996398454,
    p = success / n,
    den = 1 + (z * z) / n,
    center = (p + (z * z) / (2 * n)) / den,
    half = (z * Math.sqrt((p * (1 - p)) / n + (z * z) / (4 * n * n))) / den;
  return [Math.max(0, center - half), Math.min(1, center + half)];
}
export function aggregate(runs, roundCount = runs[0]?.roundCount ?? DEFAULTS.targets.length) {
  const n = runs.length,
    finished = runs.filter((r) => r.status !== "censored"),
    wins = runs.filter((r) => r.status === "won").length;
  const sum = (key) => runs.reduce((a, r) => a + r[key], 0),
    merge = (key) => {
      const o = {};
      for (const r of runs)
        for (const [k, v] of Object.entries(r[key])) o[k] = (o[k] || 0) + v;
      return o;
    };
  return {
    runs: n,
    wins,
    censored: n - finished.length,
    winRate: wins / n,
    winRate95CI: wilson(wins, n),
    rounds: Array.from({ length: roundCount }, (_, i) => {
      const rows = runs.flatMap((r) =>
          r.rounds.filter((x) => x.round === i + 1),
        ),
        cleared = rows.filter((x) => x.cleared).length;
      return {
        round: i + 1,
        reached: rows.length,
        censored: rows.filter((r) => r.censored).length,
        cleared,
        conditionalClearRate: rows.length ? cleared / rows.length : null,
        clearRateAllRuns: cleared / n,
        score: quantiles(rows.map((r) => r.score)),
        deficit: quantiles(
          rows.filter((r) => !r.cleared && !r.censored).map((r) => r.deficit),
        ),
        movesUsed: quantiles(rows.map((r) => r.movesUsed)),
        movesLeftOnClear: quantiles(
          rows.filter((r) => r.cleared).map((r) => r.movesLeft),
        ),
        coinsEarned: quantiles(rows.map((r) => r.coinsEarned)),
        coinsSpent: quantiles(rows.map((r) => r.coinsSpent)),
      };
    }),
    score: quantiles(runs.map((r) => r.totalScore)),
    actions: quantiles(runs.map((r) => r.actions)),
    trinketPurchases:sum('trinketPurchases'),trinketSales:sum('trinketSales'),trinketSpending:sum('trinketSpending'),saleIncome:sum('saleIncome'),
    multiPicks:merge('multiPicks'),trinketTriggers:merge('trinketTriggers'),trinketBonuses:merge('trinketBonuses'),trinketFlights:sum('trinketFlights'),
    pipFlights: sum("pipFlights"),
    multFlights: sum("multFlights"),
    scoreAnimationSeconds: quantiles(runs.map(r=>r.scoreAnimationMs/1000)),
    wavesPerAction: quantiles(runs.flatMap((r) => r.waveCounts)),
    scorePerAction: quantiles(runs.flatMap((r) => r.scoresPerAction)),
    packPurchases:sum("packPurchases"), packSpending:sum("packSpending"),roundRewards:sum("roundRewards"),shopVisits:sum("shopVisits"),tokenPicks:merge("tokenPicks"),
    swaps: sum("swaps"),
    rerolls: sum("rerolls"),
    runsUsingReroll: runs.filter((r) => r.rerolls > 0).length,
    coinsEarned: sum("coinsEarned"),
    coinsSpent: sum("coinsSpent"),
    coinsEnding: quantiles(runs.map((r) => r.coinsEnding)),
    rerollsWithNoMatch: sum("rerollsWithNoMatch"),
    rerollPoints: sum("rerollPoints"),
    shuffles: sum("shuffles"),
    cappedResolutions: sum("cappedResolutions"),
    points: merge("points"),
    specialSwapActions: sum("specialSwapActions"),
    specialScore: merge("specialScore"),
    specialSpawns: merge("specialSpawns"),
    specialTriggers: merge("specialTriggers"),
    specialChainTriggers: merge("specialChainTriggers"),
    matchedGroupSizes: merge("matchedGroupSizes"),
    depthHistogram: merge("depthHistogram"),
    naturalGroupsByPip: Array.from({ length: 6 }, (_, i) =>
      runs.reduce((a, r) => a + r.naturalByPip[i], 0),
    ),
    naturalScoreByPip: Array.from({ length: 6 }, (_, i) =>
      runs.reduce((a, r) => a + r.naturalScoreByPip[i], 0),
    ),
    runsReachingAffordability: runs.filter(
      (r) => r.coinsFirstAffordableTurn !== null,
    ).length,
  };
}
export function pairedComparison(a, b) {
  const before = new Map(a.map((r) => [r.seed, r]));
  const pairs = b.map((r) => [before.get(r.seed), r]).filter(([x]) => x);
  const differences = pairs.map(
    ([x, y]) => Number(y.status === "won") - Number(x.status === "won"),
  );
  const n = differences.length,
    mean = differences.reduce((a, b) => a + b, 0) / n;
  const variance =
    n > 1 ? differences.reduce((a, b) => a + (b - mean) ** 2, 0) / (n - 1) : 0;
  const margin = 1.96 * Math.sqrt(variance / n);
  return {
    pairedRuns: n,
    winRateChange: mean,
    approx95CI: [Math.max(-1, mean - margin), Math.min(1, mean + margin)],
    winsGained: differences.filter((x) => x === 1).length,
    winsLost: differences.filter((x) => x === -1).length,
    note: "Matched starting seeds; trajectories diverge after different actions. Normal paired interval; use cautiously with small samples or few discordant outcomes.",
  };
}
