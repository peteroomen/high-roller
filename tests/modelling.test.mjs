import test from "node:test";
import assert from "node:assert/strict";
import { DEFAULTS as CURRENT_DEFAULTS, newGame as createGame, act, legalMoves, wave } from "../engine.mjs";
import { observe, makePolicy } from "../modelling/policies.mjs";
import {
  runOne,
  replayTrace,
  aggregate,
  pairedComparison,
  wilson,
} from "../modelling/runner.mjs";
const DEFAULTS={...CURRENT_DEFAULTS,rules:{...CURRENT_DEFAULTS.rules,sizeMult:[1,2,3,3]}};
const newGame=(seed,config=DEFAULTS)=>createGame(seed,{...config,draft:false});
test("policies cannot observe actual RNG state or seed", () => {
  const s = newGame(42),
    v = observe(s);
  assert.equal(v.rng, undefined);
  assert.equal(v.seed, undefined);
  assert.equal(v.nextId, undefined);
  const s2 = structuredClone(s);
  s2.rng = 777;
  s2.seed = 13;
  assert.deepEqual(observe(s2), v);
  const p = makePolicy("rollout", { seed: 12, samples: 2 }),
    q = makePolicy("rollout", { seed: 12, samples: 2 });
  assert.deepEqual(p.choose(v), q.choose(observe(s2)));
  assert.deepEqual(observe(s), v);
});
test("full runs account for every score component and every coin", () => {
  for (const policy of ["random", "greedy", "spender", "rollout"]) {
    const r = runOne({
      seed: 13,
      policy,
      samples: 2,
      config: { ...DEFAULTS, rates: [2, 2, 2, 2, 20] },
    });
    assert.equal(
      Object.values(r.points).reduce((a, b) => a + b, 0),
      r.totalScore,
    );
    assert.equal(r.coinsEarned - r.coinsSpent, r.coinsEnding);
    assert.ok(["won", "lost"].includes(r.status));
    assert.equal(
      replayTrace({
        seed: 13,
        config: { ...DEFAULTS, rates: [2, 2, 2, 2, 20] },
        trace: r.trace,
        finalHash: r.finalHash,
      }).total,
      r.totalScore,
    );
  }
});
test("same seed and model settings reproduce the complete run", () =>
  assert.deepEqual(
    runOne({ seed: 19, policy: "rollout", samples: 2 }),
    runOne({ seed: 19, policy: "rollout", samples: 2 }),
  ));
test("spender uses all 25 legal reroll areas without duplicate edge areas", () => {
  const s = newGame(13);
  s.coins = 3;
  const a = makePolicy("spender", { samples: 2 }).choose(observe(s));
  assert.equal(a.type, "reroll");
  assert.ok(Math.floor(a.index / 6) < 5 && a.index % 6 < 5);
  assert.ok(act(s, a));
});
test("reroll price sensitivity uses the real engine", () => {
  const s = newGame(13, { ...DEFAULTS, rules: { rerollCost: 2 } });
  s.coins = 2;
  const out = act(s, { type: "reroll", index: 0 });
  assert.ok(out);
  assert.equal(out.summary.coinsSpent, 2);
  assert.equal(out.state.moves, 10);
  assert.equal(act(s, { type: "reroll", index: NaN }), null);
});
test("cascade and size sensitivities use the real engine", () => {
  const s = newGame(9);
  [0, 1, 2].forEach((i) => {
    s.board[i].n = 5;
    s.board[i].special = null;
  });
  assert.equal(
    wave(s.board, [[0, 1, 2]], 2, { ...DEFAULTS, rules: { ...DEFAULTS.rules, cascadeStep: 0 } })
      .score,
    15,
  );
  assert.equal(wave(s.board, [[0, 1, 2]], 2, DEFAULTS).score, 45);
});
test("action caps are reported as censored, not silently lost", () => {
  const r = runOne({ seed: 9, maxActions: 0 });
  assert.equal(r.status, "censored");
  const summary = aggregate([r]);
  assert.equal(summary.censored, 1);
  assert.equal(summary.wins, 0);
  assert.equal(summary.winRate, 0);
  assert.equal(summary.rounds[0].reached, 1);
  assert.equal(summary.rounds[0].censored, 1);
  assert.equal(summary.rounds[0].deficit.n, 0);
  assert.equal(
    replayTrace({ seed: 9, trace: r.trace, finalHash: r.finalHash }).status,
    "draft",
  );
});
test("confidence intervals and matched comparisons have explicit denominators", () => {
  const [lo, hi] = wilson(0, 100);
  assert.ok(Math.abs(lo) < 1e-10);
  assert.ok(hi > 0.03 && hi < 0.04);
  const c = pairedComparison(
    [
      { seed: 1, status: "lost" },
      { seed: 2, status: "won" },
    ],
    [
      { seed: 1, status: "won" },
      { seed: 2, status: "won" },
    ],
  );
  assert.equal(c.winRateChange, 0.5);
  assert.equal(c.winsGained, 1);
  assert.equal(c.winsLost, 0);
});
