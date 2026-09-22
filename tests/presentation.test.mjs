import test from 'node:test';
import assert from 'node:assert/strict';
import {scoringPlan,pacing,TIMING,outlinePaths} from '../presentation.mjs';
import {newGame,act,legalActions,DEFAULTS,wave} from '../engine.mjs';
test('outlines precede accelerating pips; groups add Mult before the clear',()=>{
 for(let seed=0;seed<40;seed++) {
  const s=newGame(seed,{...DEFAULTS,draft:false,rates:[2,2,2,2,2,2]});
  const out=act(s,legalActions(s.board).at(-1));
  for(const frame of out.frames) {
   const plan=scoringPlan(frame),first=plan.findIndex(x=>x.kind==='group');
   assert.equal(plan[0].kind,'outline');assert.equal(plan.at(-1).kind,'clear');
   assert.ok(plan.slice(1,first).every(x=>x.kind==='pip'));
   assert.ok(plan.slice(first,-1).every(x=>x.kind==='group'));
   const pips=plan.filter(x=>x.kind==='pip');
   assert.equal(new Set(pips.map(x=>x.index)).size,pips.length);
   assert.equal(pips.reduce((n,p)=>n+p.value,0),frame.pips);
   assert.ok(pips.every((p,i)=>!i||p.tempo<=pips[i-1].tempo));
   for(const g of plan.filter(x=>x.kind==='group')) assert.equal(g.contributions.reduce((n,p)=>n+p.value,0),g.entry.mult);
   assert.equal(pacing(frame).pipFlights,pips.length);
  }
 }
 assert.equal(TIMING.hold,180);assert.equal(TIMING.multHold,300);
});
test('rounded group perimeters keep a line together and outline special footprints individually',()=>{
 const line=outlinePaths([0,1,2]);assert.equal(line.length,1);assert.ok(line[0].includes('Q'));assert.ok(!line[0].includes('NaN'));
 const cross=outlinePaths([8,13,14,15,20]);assert.equal(cross.length,1);assert.ok(!cross[0].includes('NaN'));
 const boxes=outlinePaths([0,5,35],true);assert.equal(boxes.length,3);assert.ok(boxes.every(p=>p.includes('q')));
});

test('plain three-die match flies one +2 Mult number, including bonuses in one group beat',()=>{
 const b=Array.from({length:36},(_,i)=>({id:i,n:5,color:4,special:null}));
 for(const depth of [0,2]) {
  const f=wave(b,[[0,1,2]],depth,DEFAULTS);f.before=b;
  const g=scoringPlan(f).find(e=>e.kind==='group');
  assert.deepEqual(g.contributions,[{value:2+depth,label:'match Mult'}]);
  assert.equal(pacing(f).multFlights,1);
 }
});
