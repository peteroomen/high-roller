import test from "node:test";
import assert from "node:assert/strict";
import { newGame, matches, wave, act, legalMoves, DEFAULTS, effect, collapse, clone, nextRound } from "../engine.mjs";
const fixture = () => Array.from({ length: 36 }, (_, i) => ({ id: i, n: (Math.floor(i / 6) + i % 6) % 6 + 1, color: i % 4, special: null }));
test("intersecting lines combine without double counting", () => {
  const b = fixture();
  for (const i of [8, 13, 14, 15, 20]) b[i].n = 6;
  const groups = matches(b);
  assert.ok(groups.some((g) => g.length === 5 && g.includes(8) && g.includes(20)));
  const w = wave(b, [[8, 13, 14, 15, 20]], 0, DEFAULTS);
  assert.equal(w.score, 90);
  assert.equal(w.cleared.length, 5);
});
test("four fives on cascade three score eighty", () => {
  const b = fixture();
  [0, 1, 2, 3].forEach((i) => b[i].n = 5);
  const w = wave(b, [[0, 1, 2, 3]], 2, DEFAULTS);
  assert.equal(w.score, 80);
});
test("low matches earn mult; blast-only low dice do not", () => {
  const b = fixture();
  [0, 1, 2].forEach((i) => b[i].n = 1);
  b[0].special = "column";
  const w = wave(b, [[0, 1, 2]], 1, DEFAULTS);
  assert.equal(w.entries[0].mult, 3);
  assert.equal(w.entries[1].mult, 2);
  assert.equal(w.entries[1].low, 0);
});
test("all special shapes and clipped bombs", () => {
  const b = fixture();
  assert.equal(effect(b, 0, "bomb").length, 4);
  assert.equal(effect(b, 14, "bomb").length, 9);
  assert.deepEqual(effect(b, 7, "column"), [1, 7, 13, 19, 25, 31]);
  assert.ok(effect(b, 2, "color").every((i) => b[i].color === b[2].color));
  assert.ok(effect(b, 2, "number").every((i) => b[i].n === b[2].n));
});
test("special chains trigger once and coin scores once", () => {
  const b = fixture();
  [0, 1, 2].forEach((i) => b[i].n = 3);
  b[0].special = "column";
  b[6].special = "bomb";
  b[7].special = "column";
  b[13].special = "coin";
  const w = wave(b, [[0, 1, 2]], 0, DEFAULTS);
  assert.equal(w.coins, 1);
  assert.equal(w.activations.filter((a) => a.index === 6).length, 1);
  assert.equal(new Set(w.cleared).size, w.cleared.length);
  assert.equal(w.entries.flatMap((e) => e.indices).length, w.cleared.length);
});
test("falling preserves face, color, special, and identity", () => {
  const s = newGame(71), before = clone(s.board);
  collapse(s, [30]);
  assert.deepEqual(s.board[30], before[24]);
  assert.deepEqual(s.board[24], before[18]);
  assert.deepEqual(s.board[1], before[1]);
});
test("seeded games and serialized saves replay identically", () => {
  let s = newGame(42);
  assert.deepEqual(s, newGame(42));
  const action = { type: "swap", ...legalMoves(s.board)[0] };
  assert.deepEqual(act(s, action), act(JSON.parse(JSON.stringify(s)), action));
  assert.equal(s.moves, 10);
});
test("invalid swaps cost nothing and coin reroll uses three coins", () => {
  const s = newGame(40);
  assert.equal(act(s, { type: "swap", a: 0, b: 35 }), null);
  assert.equal(act(s, { type: "reroll", index: 0 }), null);
  s.coins = 3;
  const out = act(s, { type: "reroll", index: 35 });
  assert.equal(out.state.moves, 10);
  assert.equal(out.state.coins, out.frames.reduce((a, f) => a + f.coins, 0));
});
test("last-move target completion wins before loss", () => {
  const s = newGame(42, { ...DEFAULTS, moves: 1, targets: [1, 1, 1] });
  const r = act(s, { type: "swap", ...legalMoves(s.board)[0] });
  assert.equal(r.state.status, "roundwon");
  const n = nextRound(r.state);
  assert.equal(n.round, 1);
  assert.equal(n.score, 0);
  assert.equal(n.moves, 1);
});
test("250 seeded boards resolve with valid scores and no deadlock", () => {
  for (let seed = 0; seed < 250; seed++) {
    let s = newGame(seed);
    for (let t = 0; t < 10 && s.status === "playing"; t++) {
      assert.equal(matches(s.board).length, 0);
      const moves = legalMoves(s.board);
      assert.ok(moves.length);
      const out = act(s, { type: "swap", ...moves[t % moves.length] });
      assert.equal(out.state.score - s.score, out.frames.reduce((a, f) => a + f.score, 0));
      assert.equal(new Set(out.state.board.map((d) => d.id)).size, 36);
      assert.ok(out.state.board.every((d) => d.n >= 1 && d.n <= 6));
      s = out.state;
    }
  }
});
