import test from 'node:test';
import assert from 'node:assert/strict';
import {DEFAULTS,RULES,MATCH_TIERS,TRINKETS,matchMult,trinketValue,stageInfo,wave,newGame,act,legalActions,restoreGame} from '../engine.mjs';
import {scoringPlan,pacing} from '../presentation.mjs';
import {runOne,replayTrace} from '../modelling/runner.mjs';
const board=()=>Array.from({length:36},(_,i)=>({id:i,n:5,color:4,special:null}));
test('every tier token and both trinkets score on first waves and cascades; large groups use 6+',()=>{
 for(const size of [3,4,5,6,7,11]) for(const depth of [0,2]) {
  const tier=Math.min(6,size),ids=[`pips-${tier}`,`mult-${tier}`];
  const config={...DEFAULTS,matchLevels:{[tier]:2},trinkets:ids};
  const f=wave(board(),[Array.from({length:size},(_,i)=>i)],depth,config);
  const pip=RULES.trinketPips[tier-3],mult=RULES.trinketMult[tier-3];
  assert.equal(f.pips,size*5+pip);assert.equal(f.mult,matchMult(tier,config)+depth+mult);
  assert.equal(f.score,f.pips*f.mult);assert.equal(f.entries[0].trinkets.length,2);
  const parts=scoringPlan({...f,before:board()}).filter(e=>e.kind==='group').flatMap(e=>e.contributions);
  assert.equal(parts.filter(p=>p.target!=='pips').reduce((n,p)=>n+p.value,0),f.mult);
  assert.equal(parts.filter(p=>p.source).length,2);
  assert.equal(pacing({...f,before:board()}).trinketFlights,2);
 }
});
test('unmatched tiers and special blast footprints never trigger match upgrades or trinkets',()=>{
 const config={...DEFAULTS,matchLevels:{3:9,4:9},trinkets:TRINKETS.map(t=>t.id)};
 const b=board();b[0]={id:0,n:null,special:'column',mult:2};
 const f=wave(b,[],0,config,[{index:0,targetN:5}]);
 assert.equal(f.pips,25);assert.equal(f.mult,2);assert.equal(f.entries[0].trinkets,undefined);
 const g=wave(board(),[[0,1,2]],0,{...DEFAULTS,matchLevels:{4:9},trinkets:['pips-4','mult-4']});
 assert.equal(g.pips,15);assert.equal(g.mult,2);
});
test('each separate group earns its own trinket bonuses; no pip ownership duplicated by overlapping effects',()=>{
 const b=board();b[6]={id:6,n:null,special:'column',mult:2};
 const f=wave(b,[[0,1,2],[12,13,14]],1,{...DEFAULTS,trinkets:['pips-3','mult-3']},[{index:6,targetN:5}]);
 assert.equal(f.entries.filter(e=>e.kind==='match').flatMap(e=>e.trinkets).length,4);
 assert.equal(f.pips,f.cleared.reduce((n,i)=>n+(b[i].n??0),0)+2*RULES.trinketPips[0]);
 assert.equal(new Set(f.entries.flatMap(e=>e.indices)).size,f.entries.flatMap(e=>e.indices).length);
});
test('whole moves conserve both counters and score with tier levels and trinkets',()=>{
 for(let seed=0;seed<20;seed++) {
  const s=newGame(seed,{...DEFAULTS,draft:false,targets:[999999],matchLevels:{3:2,4:1,5:1,6:1},trinkets:TRINKETS.map(t=>t.id)});
  const out=act(s,legalActions(s.board)[0]);
  let pips=0,mult=0;
  for(const f of out.frames) {
   const plan=scoringPlan(f);
   pips+=plan.filter(e=>e.kind==='pip').reduce((n,e)=>n+e.value,0);
   for(const e of plan.filter(e=>e.kind==='group'))for(const p of e.contributions)if(p.target==='pips')pips+=p.value;else mult+=p.value;
   assert.equal(pips,f.runningPips);assert.equal(mult,f.runningMult);
  }
  assert.equal(out.summary.score,pips*mult);assert.equal(out.summary.entries.reduce((n,e)=>n+e.score,0),out.summary.score);
 }
});
test('three stages of three rounds have explicit boundaries and old saves keep their goals',()=>{
 assert.equal(DEFAULTS.targets.length,9);
 assert.equal(stageInfo(2,DEFAULTS).leg,3);assert.equal(stageInfo(3,DEFAULTS).number,2);assert.equal(stageInfo(8,DEFAULTS).number,3);
 const s=newGame(3);s.version=5;s.config.targets=[260,420,620];delete s.config.matchLevels;delete s.config.trinkets;
 const r=restoreGame(s);assert.deepEqual(r.config.targets,[260,420,620]);assert.deepEqual(r.config.trinkets,[]);assert.deepEqual(r.config.matchLevels,{3:0,4:0,5:0,6:0});
});
test('builder and mixed policies exercise upgrades, purchases, triggers, economy and exact replay',()=>{
 for(const policy of ['builder','greedy']) {
  const config={...DEFAULTS,targets:[80,150,250,400,600,800,1000,1200,1500],rules:{roundReward:10}};
  const r=runOne({seed:5,config,policy,samples:1});
  assert.ok(r.trinketPurchases>0);assert.ok(Object.values(r.multiPicks).some(n=>n>0));assert.ok(r.trinketFlights>0);
  assert.equal(Object.values(r.points).reduce((a,b)=>a+b,0),r.totalScore);assert.equal(r.coinsEarned-r.coinsSpent,r.coinsEnding);
  assert.equal(replayTrace({seed:5,config,trace:r.trace,finalHash:r.finalHash}).total,r.totalScore);
 }
});

test('a legacy draft above the new special cap remains pickable after migration',()=>{
 const old=newGame(9);old.version=5;old.status='draft';old.config.rates=[20,20,20,10,0,0];old.config.rules={tokenBoost:5,specialRateCap:90};
 old.draft={kind:'pack',name:'Legacy pack',offers:['column','bomb','coin'],picks:[],limit:3};old.shop={bought:true,reward:5};
 let s=restoreGame(old);
 for(const index of [0,1,2])s=act(s,{type:'choose_token',index}).state;
 assert.equal(s.status,'shop');assert.equal(s.config.rates.reduce((a,b)=>a+b,0),85);
});
