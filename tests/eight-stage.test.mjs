import test from 'node:test';
import assert from 'node:assert/strict';
import {DEFAULTS,newGame,act,previewBoard,wave,matches} from '../engine.mjs';
import {observe,makePolicy} from '../modelling/policies.mjs';
import {runOne,replayTrace} from '../modelling/runner.mjs';
test('single die research rerolls are opt-in, limited, preserve finishes and reset per round',()=>{
 const c={...DEFAULTS,draft:false,targets:[1e9,1e9],rules:{singleRerollsPerRound:2}};
 let s=newGame(44,c);s.board[0].gold=true;s.board[0].shiny=true;
 assert.equal(act(newGame(44,{...c,rules:{}}),{type:'reroll_single',index:0}),null);
 assert.equal(act(s,{type:'reroll_single',index:36}),null);
 s.board[1].special='bomb';assert.equal(act(s,{type:'reroll_single',index:1}),null);
 for(let i=0;i<2;i++) {const out=act(s,{type:'reroll_single',index:0});assert.ok(out);assert.equal(out.state.moves,10);assert.equal(out.summary.coinsSpent,0);assert.equal(out.initial[0].gold,true);assert.equal(out.initial[0].shiny,true);s=out.state;}
 assert.equal(act(s,{type:'reroll_single',index:0}),null);
 s.status='shop';s.shop={};s=act(s,{type:'next_round'}).state;assert.equal(s.singleRerollsUsed,0);assert.ok(act(s,{type:'reroll_single',index:0}));
});
test('research policies see no hidden state and replay reroll runs with complete accounting',()=>{
 const config={...DEFAULTS,targets:[100,300,800],rules:{singleRerollsPerRound:2}};
 for(const policy of ['balanced','cascade','large','large6','specials']) {
  const s=newGame(202,config),t=structuredClone(s);t.rng=9813;t.seed=123;
  assert.deepEqual(observe(s),observe(t));assert.deepEqual(makePolicy(policy).choose(observe(s)),makePolicy(policy).choose(observe(t)));
  const r=runOne({seed:202,config,policy});assert.ok(r.singleRerolls>0);assert.equal(r.coinsEarned-r.coinsSpent,r.coinsEnding);
  assert.equal(replayTrace({seed:202,config,trace:r.trace,finalHash:r.finalHash}).total,r.totalScore);
  const all=Object.values(r.matchedGroupSizes).reduce((a,b)=>a+b,0);
  assert.equal(all,Object.values(r.firstWaveGroupSizes).reduce((a,b)=>a+b,0)+Object.values(r.cascadeGroupSizes).reduce((a,b)=>a+b,0));
 }
});

test('optional stage pack prices match affordability and charged coins',async()=>{
 const {PACKS,packCost,canBuyPack}=await import('../engine.mjs');
 const config={...DEFAULTS,targets:Array(24).fill(100),rules:{packCost:8,multiPackCost:8,packStageIncrease:1}};
 let s=newGame(90,config);s.status='shop';s.round=9;s.shop={bought:false,offers:[],sold:[]};s.coins=10;
 assert.equal(packCost(PACKS[0],config,s.round),11);assert.equal(canBuyPack(s,PACKS[0]),false);
 s.coins=11;assert.equal(canBuyPack(s,PACKS[0]),true);
 const out=act(s,{type:'buy_pack',pack:PACKS[0].id});assert.equal(out.summary.coinsSpent,11);assert.equal(out.state.coins,0);
 assert.equal(packCost(PACKS[0],DEFAULTS,21),4);
});
