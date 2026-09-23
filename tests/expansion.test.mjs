import test from 'node:test';import assert from 'node:assert/strict';
import {DEFAULTS,RULES,TYPES,TRINKETS,newGame,act,wave,matches,effect,die,legalActions,previewAction,weightedPick,applyBonus,restoreGame} from '../engine.mjs';
import {scoringPlan} from '../presentation.mjs';
import {runOne,replayTrace} from '../modelling/runner.mjs';
const fixture=()=>Array.from({length:36},(_,i)=>({id:i,n:(Math.floor(i/6)+i%6)%6+1,color:(Math.floor(i/6)+i%6)%6,special:null,gold:false,shiny:false}));
const special=(b,i,type)=>b[i]={...b[i],n:null,color:null,special:type,mult:type==='wild'||type==='twenty'?0:2};
const state=(config={})=>{const s=newGame(17,{...DEFAULTS,draft:false,...config});s.board=fixture();s.nextId=100;return s;};
test('Six to One changes generated and rerolled sixes, retaining numerical colour and finite playable boards',()=>{
 const s=newGame(42,{...DEFAULTS,draft:false,trinkets:['convert']});
 for(let i=0;i<1000;i++){const d=die(s);assert.notEqual(d.n,6);assert.equal(d.color,d.n-1);if(d.converted)assert.equal(d.n,1);}
 assert.ok(s.faceConversions>100);assert.ok(s.board.some(d=>d.converted));assert.ok(s.board.some(d=>d.n===1&&!d.converted));assert.equal(matches(s.board).length,0);assert.ok(legalActions(s.board).length);
 s.coins=30;for(let i=0;i<5&&s.status==='playing';i++){const o=act(s,{type:'reroll',index:7});assert.ok(o.initial.every(d=>d.n!==6));Object.assign(s,o.state);}
});
test('Echo adds one per falling wave; One More counts unique actual ones including blasts',()=>{
 const b=fixture();[0,1,2].forEach(i=>b[i].n=1);special(b,6,'column');
 for(const depth of [0,1,3]) {
  const f=wave(b,[[0,1,2]],depth,{...DEFAULTS,trinkets:['cascade','ones']},[{index:6,targetN:1}]);
  assert.equal(f.bonuses.find(x=>x.source==='ones').value,f.cleared.filter(i=>b[i].n===1).length);
  assert.equal(f.bonuses.filter(x=>x.source==='cascade').length,Number(depth>0));
  if(depth)assert.equal(f.bonuses.find(x=>x.source==='cascade').value,1);
 }
});
test('bomb expands to clipped 5x5 and row/column to clipped three-wide bands',()=>{
 const b=fixture(),c={...DEFAULTS,trinkets:['bigbomb','widerow','widecolumn']};
 assert.equal(effect(b,14,'bomb',1,DEFAULTS).length,9);assert.equal(effect(b,14,'bomb',1,c).length,25);assert.equal(effect(b,0,'bomb',1,c).length,9);
 assert.equal(effect(b,14,'row',1,c).length,18);assert.equal(effect(b,0,'row',1,c).length,12);assert.equal(effect(b,14,'column',1,c).length,18);assert.equal(effect(b,0,'column',1,c).length,12);
});
test('special dice contribute chosen intrinsic pips once even with overlapping blasts',()=>{
 const b=fixture();special(b,7,'row');special(b,8,'bomb');
 for(const pips of [0,5,10]) {
  const f=wave(b,[],0,{...DEFAULTS,rules:{specialPips:pips}},[{index:7,targetN:3},{index:8,targetN:3}]);
  assert.equal(f.pips,f.cleared.reduce((n,i)=>n+(b[i].special?pips:b[i].n),0));assert.equal(new Set(f.entries.flatMap(e=>e.indices)).size,f.entries.flatMap(e=>e.indices).length);
 }
});
test('Twenty never matches or freely activates, but collects on a matching partner swap or blast',()=>{
 const s=state();special(s.board,7,'twenty');assert.equal(act(s,{type:'swap',a:7,b:8}),null);
 [6,8].forEach(i=>s.board[i].n=5);s.board[13].n=5;
 const out=act(s,{type:'swap',a:7,b:13});assert.ok(out);assert.ok(out.frames[0].cleared.includes(13));assert.ok(out.frames[0].entries.some(e=>e.specialType==='twenty'&&e.pips===20&&e.mult===0));
 const b=fixture();special(b,7,'twenty');special(b,6,'row');const f=wave(b,[],0,DEFAULTS,[{index:6,targetN:5}]);assert.equal(f.pips,30+[8,9,10,11].reduce((n,i)=>n+b[i].n,0));
});
test('wildcard identities cannot join unlike numbers and resolve ties deterministically',()=>{
 const b=fixture();[0,1].forEach(i=>b[i].n=1);special(b,2,'wild');[3,4].forEach(i=>b[i].n=2);
 const groups=matches(b);assert.ok(groups.some(g=>JSON.stringify(g)==='[2,3,4]'));
 for(const g of groups)assert.ok(new Set(g.filter(i=>!b[i].special).map(i=>b[i].n)).size<=1);
 const f=wave(b,groups,0,DEFAULTS);assert.equal(f.wildClears,1);assert.ok(f.pips>=10);assert.deepEqual(matches(b),groups);
 const s=state();special(s.board,0,'wild');assert.equal(act(s,{type:'swap',a:0,b:1}),null);
 const all=fixture();[0,1,2].forEach(i=>special(all,i,'wild'));assert.ok(matches(all).some(g=>g.includes(0)&&g.includes(1)&&g.includes(2)));
});
test('gold only pays for unique naturally matched dice; shiny only multiplies when matched',()=>{
 const b=fixture();[0,1,2].forEach(i=>b[i].n=4);b[1].gold=true;b[1].shiny=true;b[6].gold=true;b[6].shiny=true;special(b,12,'column');
 const f=wave(b,[[0,1,2]],0,DEFAULTS,[{index:12,targetN:4}]);assert.equal(f.coins,1);assert.equal(f.goldMatches,1);assert.equal(f.shinyMatches,1);assert.equal(f.bonuses.filter(b=>b.op==='multiply').length,1);assert.equal(f.bonuses[0].value,1.5);
});
test('all-number bonus and x4 apply once per move; UI events exactly reproduce fractional Mult and score',()=>{
 let spectrum=false,chain=false;
 for(let seed=1;seed<=100;seed++) {
  const s=newGame(seed,{...DEFAULTS,draft:false,targets:[999999],trinkets:['ones','cascade','quad','rainbow'],rates:[3,2,3,3,2,3,3,10]});
  const action=legalActions(s.board)[0],o=act(s,action);let pips=0,mult=0;
  for(const f of o.frames)for(const event of scoringPlan(f)) {
   if(event.kind==='pip')pips+=event.value;
   if(event.kind==='group')for(const p of event.contributions)if(p.target==='pips')pips+=p.value;else mult+=p.value;
   if(event.kind==='bonus')mult=applyBonus(mult,event);
  }
  assert.equal(pips,o.summary.pips);assert.equal(mult,o.summary.mult);assert.equal(o.summary.score,Math.floor(pips*mult));assert.equal(o.frames.reduce((n,f)=>n+f.score,0),o.summary.score);
  assert.equal(o.summary.bonuses.filter(b=>b.source==='quad').length,1);assert.ok(o.summary.bonuses.filter(b=>b.source==='rainbow').length<=1);
  if(o.summary.numbers.length===6){spectrum=true;assert.equal(o.summary.bonuses.find(b=>b.source==='rainbow').value,10);}
  if(o.frames.length>1)chain=true;
 }
 assert.ok(spectrum);assert.ok(chain);
});
test('uncapped spawn weights remain valid probabilities beyond 100 and rare offers are weighted',()=>{
 const s=newGame(42,{...DEFAULTS,draft:false,rates:[80,0,0,0,80,0,0,0]});let lines=0,twenties=0;
 for(let i=0;i<4000;i++){const d=die(s);if(d.special==='column')lines++;else if(d.special==='twenty')twenties++;else assert.fail('unexpected normal die');}
 assert.ok(lines>1800&&lines<2200);assert.equal(lines+twenties,4000);
 const r={rng:31},counts={common:0,rare:0};for(let i=0;i<10000;i++)counts[weightedPick(r,['common','rare'],x=>x==='common'?4:1)]++;
 assert.ok(counts.common>7500&&counts.common<8500);
});
test('full new-system runs conserve and replay, with conversion, finish and item telemetry',()=>{
 for(const trinkets of [['convert','ones','quad','rainbow'],['bigbomb','widecolumn','widerow','cascade']]) {
  const config={...DEFAULTS,targets:[100,500,1000],rates:[3,1,3,3,3,3,3,5],trinkets};
  const r=runOne({seed:34,config,policy:'greedy',samples:1});assert.equal(r.coinsEarned-r.coinsSpent,r.coinsEnding);assert.equal(Object.values(r.points).reduce((a,b)=>a+b,0),r.totalScore);assert.equal(replayTrace({seed:34,config,trace:r.trace,finalHash:r.finalHash}).total,r.totalScore);
 }
});

test('the final round also pays its fixed reward and every remaining swap exactly once',()=>{
 const s=newGame(1,{...DEFAULTS,draft:false,targets:[1],rules:{goldRate:0}}),o=act(s,legalActions(s.board)[0]);assert.equal(o.state.status,'won');assert.equal(o.summary.roundPayout,RULES.roundReward+o.state.moves);assert.equal(o.state.coins,o.summary.coinsEarned);assert.equal(act(o.state,{type:'visit_shop'}),null);
});
