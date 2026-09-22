import test from "node:test";
import assert from "node:assert/strict";
import {
  newGame,
  legalActions, previewAction, mostCommonNumber,
  preview,
  restoreGame,
  matches,
  wave,
  act,
  legalMoves,
  DEFAULTS,
  effect,
  collapse,
  clone,
  nextRound,
} from "../engine.mjs";
const fixture = () =>
  Array.from({ length: 36 }, (_, i) => ({
    id: i,
    n: ((Math.floor(i / 6) + (i % 6)) % 6) + 1,
    color: (Math.floor(i / 6) + (i % 6)) % 6,
    special: null,
  }));
test("intersecting lines combine without double counting", () => {
  const b = fixture();
  for (const i of [8, 13, 14, 15, 20]) b[i].n = 6;
  const groups = matches(b);
  assert.ok(
    groups.some((g) => g.length === 5 && g.includes(8) && g.includes(20)),
  );
  const w = wave(b, [[8, 13, 14, 15, 20]], 0, DEFAULTS);
  assert.equal(w.score, 90);
  assert.equal(w.cleared.length, 5);
});
test("four fives on cascade three score eighty", () => {
  const b = fixture();
  [0, 1, 2, 3].forEach((i) => (b[i].n = 5));
  const w = wave(b, [[0, 1, 2, 3]], 2, DEFAULTS);
  assert.equal(w.score, 80);
});
test("low matches earn mult; blast-only low dice do not", () => {
  const b = fixture();
  [0, 1, 2].forEach((i) => (b[i].n = 1));
  b[6] = { ...b[6], special: "column", n: null, mult: 2 };
  const w = wave(b, [[0, 1, 2]], 1, DEFAULTS, [
    { index: 6, partner: 7, targetN: b[7].n },
  ]);
  assert.equal(w.entries[0].mult, 3);
  assert.equal(w.entries[1].mult, 3);
  assert.equal(w.entries[1].low, 0);
});
test("all special shapes and clipped bombs", () => {
  const b = fixture();
  assert.equal(effect(b, 0, "bomb").length, 4);
  assert.equal(effect(b, 14, "bomb").length, 9);
  assert.deepEqual(effect(b, 7, "column"), [1, 7, 13, 19, 25, 31]);
  b[2].special = "color";
  b[13].special = "coin";
  b[30].special = "bomb";
  assert.deepEqual(effect(b, 2, "color"), [2, 13, 30]);
  assert.ok(effect(b, 2, "number").every((i) => b[i].n === b[2].n));
});
test("special chains trigger once and coin scores once", () => {
  const b = fixture();
  [0, 1, 2].forEach((i) => (b[i].n = 3));
  b[0].special = "column";
  b[6].special = "bomb";
  b[7].special = "column";
  b[13].special = "coin";
  for (const d of b)
    if (d.special) {
      d.n = null;
      d.mult = 2;
    }
  const w = wave(b, [], 0, DEFAULTS, [
    { index: 0, partner: 1, targetN: b[1].n },
  ]);
  assert.equal(w.coins, 1);
  assert.equal(w.activations.filter((a) => a.index === 6).length, 1);
  assert.equal(new Set(w.cleared).size, w.cleared.length);
  assert.equal(
    w.entries.flatMap((e) => e.indices).length,
    w.cleared.filter((i) => !b[i].special).length,
  );
});
test("falling preserves face, color, special, and identity", () => {
  const s = newGame(71),
    before = clone(s.board);
  collapse(s, [30]);
  assert.deepEqual(s.board[30], before[24]);
  assert.deepEqual(s.board[24], before[18]);
  assert.deepEqual(s.board[1], before[1]);
});
test("seeded games and serialized saves replay identically", () => {
  let s = newGame(42);
  assert.deepEqual(s, newGame(42));
  const action = legalActions(s.board)[0];
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
  assert.equal(
    out.state.coins,
    out.frames.reduce((a, f) => a + f.coins, 0),
  );
});
test("last-move target completion wins before loss", () => {
  const s = newGame(42, { ...DEFAULTS, moves: 1, targets: [1, 1, 1] });
  const r = act(s, legalActions(s.board)[0]);
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
      const moves = legalActions(s.board);
      assert.ok(moves.length);
      const out = act(s, moves[t % moves.length]);
      assert.equal(
        out.state.score - s.score,
        out.frames.reduce((a, f) => a + f.score, 0),
      );
      assert.equal(new Set(out.state.board.map((d) => d.id)).size, 36);
      assert.ok(
        out.state.board.every((d) =>
          d.special
            ? d.n === null && d.mult >= 1
            : d.n >= 1 && d.n <= 6 && d.color === d.n - 1,
        ),
      );
      s = out.state;
    }
  }
});

test("special sweep activates every special once without targeting hidden colours", () => {
  const b = fixture();
  [0, 1, 2].forEach((i) => (b[i].n = 3));
  b[0].special = "color";
  b[17].special = "coin";
  b[35].special = "color";
  for (const d of b)
    if (d.special) {
      d.n = null;
      d.mult = 2;
    }
  const w = wave(b, [], 0, DEFAULTS, [
    { index: 0, partner: 1, targetN: b[1].n },
  ]);
  assert.deepEqual(new Set(w.cleared), new Set([0, 17, 35, 11, 16, 23]));
  assert.equal(w.coins, 1);
  assert.equal(w.activations.length, 3);
  assert.equal(w.entries.find((e) => e.kind === "blast").size, 2);
});

const special = (b, i, type, mult = 2) =>
  (b[i] = { ...b[i], n: null, color: null, special: type, mult });
const controlled = () => {
  const s = newGame(19, { ...DEFAULTS, rates: [0, 0, 0, 0, 0] });
  s.board = fixture();
  s.nextId = 36;
  return s;
};
test("symbol dice cannot form a number match, including three null faces", () => {
  const b = fixture();
  [0, 1, 2].forEach((i) => special(b, i, "bomb"));
  assert.equal(matches(b).length, 0);
});
test("tap clears its current column or row, with carried Mult and matching preview", () => {
 for(const type of ["column","row"]) {
  const s=controlled(); special(s.board,7,type,3);
  const action={type:"activate",index:7};
  const p=previewAction(s.board,action,s.config), out=act(s,action), f=out.frames[0];
  assert.deepEqual(new Set(f.cleared),new Set(type==="column"?[1,7,13,19,25,31]:[6,7,8,9,10,11]));
  assert.equal(f.score,f.cleared.reduce((v,i)=>v+(f.before[i].n||0),0)*3);
  assert.equal(p.score,f.score); assert.equal(out.state.moves,9);
  assert.equal(out.summary.directSpecials,1); assert.equal(f.entries[0].sourceIndex,7);
  assert.deepEqual(f.entries[0].affected,f.cleared);
  assert.ok(legalActions(s.board).some(a=>a.type==="activate"&&a.index===7));
  assert.equal(act(s,{type:"swap",a:7,b:8}),null);
  assert.equal(act(s,{type:"activate",index:8}),null);
 }
});
test("number sweep chooses most common number, breaking ties toward higher pips",()=>{
 const s=controlled(); special(s.board,7,"number");
 const n=mostCommonNumber(s.board); assert.equal(n,6);
 const f=act(s,{type:"activate",index:7}).frames[0];
 assert.ok(f.cleared.filter(i=>i!==7).every(i=>f.before[i].n===n));
 assert.equal(f.score,(f.cleared.length-1)*n*2);
 s.board[0].n=2; assert.equal(mostCommonNumber(s.board),2);
});
test("coin clears orthogonal neighbours, clips at edges and awards one coin",()=>{
 for(const [index,targets] of [[7,[1,6,7,8,13]],[0,[0,1,6]]]) {
  const s=controlled(); special(s.board,index,"coin",4);
  const f=act(s,{type:"activate",index}).frames[0];
  assert.deepEqual(new Set(f.cleared),new Set(targets)); assert.equal(f.coins,1);
  assert.equal(f.score,targets.reduce((sum,i)=>sum+(s.board[i].n||0),0)*4);
 }
});
test("overlapping special effects apply the largest Mult once, without match bonuses", () => {
  const b = fixture();
  special(b, 7, "column", 2);
  special(b, 8, "bomb", 4);
  const f = wave(b, [], 1, DEFAULTS, [
    { index: 7, partner: 8, targetN: null },
    { index: 8, partner: 7, targetN: null },
  ]);
  const entries = f.entries.filter((e) => e.indices.includes(1));
  assert.equal(entries.length, 1);
  assert.equal(entries[0].mult, 5);
  assert.equal(entries[0].low, 0);
  assert.equal(
    new Set(f.entries.flatMap((e) => e.indices)).size,
    f.entries.flatMap((e) => e.indices).length,
  );
});
test("tapped horizontal clear chains a vertical clear exactly once",()=>{
 const s=controlled(); special(s.board,7,"row"); special(s.board,8,"column");
 const f=act(s,{type:"activate",index:7}).frames[0];
 assert.equal(f.activations.length,2); assert.equal(f.cleared.length,11);
 assert.equal(f.activations[1].trigger,"chain");
 assert.equal(f.score,f.cleared.reduce((sum,i)=>sum+(s.board[i].n||0),0)*2);
});
test("chained number sweep inherits original target and activates only once", () => {
  const s = controlled();
  special(s.board, 7, "color");
  special(s.board, 23, "number", 3);
  const target = mostCommonNumber(s.board);
  const f = act(s, { type: "activate", index: 7 }).frames[0];
  assert.equal(f.activations.find((a) => a.index === 23).targetN, target);
  assert.equal(f.activations.find((a) => a.index === 23).trigger, "chain");
  assert.ok(
    f.entries
      .find((e) => e.specialType === "number")
      .indices.every((i) => f.before[i].n === target),
  );
});
test("rerolls preserve symbol-only specials and update numbered colours", () => {
  const s = controlled();
  special(s.board, 0, "bomb", 3);
  s.coins = 3;
  const out = act(s, { type: "reroll", index: 0 });
  assert.deepEqual(out.initial[0], s.board[0]);
  for (const d of out.state.board)
    assert.ok(d.special ? d.n === null : d.color === d.n - 1);
});
test("old saves migrate without special pips and new saves resume exactly", () => {
  const s = controlled();
  s.version = 1;
  s.board[7].special = "bomb";
  const migrated = restoreGame(s);
  assert.equal(migrated.version, 3);
  assert.equal(migrated.board[7].n, null);
  assert.equal(migrated.board[7].mult, 2);
  assert.deepEqual(restoreGame(JSON.parse(JSON.stringify(migrated))), migrated);
});

test("horizontal spawn rate is independent and omitted rates stay disabled",()=>{
 const s=newGame(17,{...DEFAULTS,rates:[0,0,0,0,0,100]});
 assert.ok(s.board.every(d=>d.special==="row"));
 assert.equal(legalActions(s.board).length,36);
 assert.ok(act(s,{type:"activate",index:0}));
 assert.ok(newGame(17,{...DEFAULTS,rates:[0,0,0,0,0]}).board.every(d=>!d.special));
});
