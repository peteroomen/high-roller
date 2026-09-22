import test from 'node:test';
import assert from 'node:assert/strict';
import {scoringPlan,pacing,TIMING} from '../presentation.mjs';
import {newGame,act,legalActions} from '../engine.mjs';
test('all pips precede groups; ordered contributions conserve the authoritative score',()=>{
 for(let seed=0;seed<40;seed++) {
  const s=newGame(seed);
  const out=act(s,legalActions(s.board).at(-1));
  for(const frame of out.frames) {
   const plan=scoringPlan(frame),first=plan.findIndex(x=>x.kind==='group');
   assert.ok(plan.slice(0,first).every(x=>x.kind==='pip'));
   assert.ok(plan.slice(first).every(x=>x.kind==='group'));
   const pips=plan.filter(x=>x.kind==='pip');
   assert.equal(new Set(pips.map(x=>x.index)).size,pips.length);
   assert.equal(pips.reduce((n,p)=>n+p.value,0),frame.entries.reduce((n,e)=>n+e.pips,0));
   for(const g of plan.filter(x=>x.kind==='group')) assert.equal(g.contributions.reduce((n,p)=>n+p.value,0)*g.entry.pips,g.entry.score);
   assert.equal(pacing(frame).pipFlights,pips.length);
  }
 }
 assert.equal(TIMING.hold,500);
});
