import test from 'node:test';
import assert from 'node:assert/strict';
import {newGame,act,restoreGame,DEFAULTS,TYPES,RULES,wave,legalActions,canTakeToken} from '../engine.mjs';
import {runOne,replayTrace} from '../modelling/runner.mjs';
const start=seed=>{const s=newGame(seed);return act(s,{type:'choose_token',index:0}).state;};
test('zero base rates; deterministic free choice of one from three starter tokens',()=>{
 const s=newGame(31);assert.equal(s.status,'draft');assert.deepEqual(s.config.rates,[0,0,0,0,0,0]);
 assert.equal(new Set(s.draft.offers).size,3);assert.deepEqual(s,newGame(31));
 assert.equal(act(s,legalActions(s.board)[0]),null);
 const chosen=s.draft.offers[1],out=act(s,{type:'choose_token',index:1});
 assert.equal(out.state.status,'playing');assert.equal(out.state.coins,0);assert.equal(out.state.moves,10);
 assert.equal(out.state.config.rates[TYPES.indexOf(chosen)],2);assert.equal(out.state.config.rates.reduce((a,b)=>a+b,0),2);
 assert.equal(out.state.tokens[chosen],1);assert.deepEqual(out.state.initialConfig.rates,[0,0,0,0,0,0]);assert.equal(act(out.state,{type:'choose_token',index:0}),null);
});
test('shop pays once, charges once, keeps exactly three of five and resumes next round',()=>{
 let s=start(11);s.status='roundwon';s.moves=4;
 let o=act(s,{type:'visit_shop'});s=o.state;
 assert.equal(o.summary.coinsEarned,6);assert.equal(s.coins,6);assert.equal(act(s,{type:'visit_shop'}),null);
 s=act(s,{type:'buy_pack',pack:'assorted'}).state;
 assert.equal(s.coins,1);assert.equal(s.draft.offers.length,5);assert.equal(s.draft.limit,3);
 assert.equal(act(s,{type:'next_round'}),null);
 s=act(s,{type:'choose_token',index:0}).state;
 assert.equal(act(s,{type:'choose_token',index:0}),null);
 const saved=restoreGame(JSON.parse(JSON.stringify(s)));assert.deepEqual(saved,s);
 for(const index of [1,2])s=act(s,{type:'choose_token',index}).state;
 assert.equal(s.status,'shop');assert.equal(s.config.rates.reduce((a,b)=>a+b,0),8);
 assert.equal(act(s,{type:'buy_pack',pack:'lines'}),null);
 const n=act(s,{type:'next_round'}).state;
 assert.equal(n.round,1);assert.equal(n.moves,10);assert.equal(n.coins,1);assert.deepEqual(n.tokens,s.tokens);
});
test('unaffordable packs and excessive token rates are rejected without mutation',()=>{
 const s=start(9);s.status='shop';s.shop={bought:false,reward:0};s.coins=4;
 const before=structuredClone(s);assert.equal(act(s,{type:'buy_pack',pack:'lines'}),null);assert.deepEqual(s,before);
 s.config.rates=[30,0,0,0,0,0];assert.equal(canTakeToken(s,'column'),false);
 s.config.rates=[15,15,15,15,15,15];assert.ok(TYPES.every(t=>!canTakeToken(s,t)));
 assert.equal(act(s,{type:'buy_pack',pack:'invalid'}),null);
});
test('two three-die groups add their multipliers over all pips',()=>{
 const b=newGame(1,{...DEFAULTS,draft:false}).board;
 [0,1,2].forEach(i=>b[i]={...b[i],n:4,special:null});[12,13,14].forEach(i=>b[i]={...b[i],n:5,special:null});
 const f=wave(b,[[0,1,2],[12,13,14]],0,DEFAULTS);
 assert.equal(f.pips,27);assert.equal(f.mult,4);assert.equal(f.score,108);
});
test('all cascade pips and Mult accumulate for a single move and reset on the next move',()=>{
 let found=false;
 for(let seed=0;seed<100&&!found;seed++) {
  const s=start(seed);
  for(const action of legalActions(s.board)) {
   const o=act(s,action);if(o.frames.length<2)continue;found=true;
   const pips=o.frames.reduce((n,f)=>n+f.pips,0),mult=o.frames.reduce((n,f)=>n+f.mult,0);
   assert.equal(o.summary.score,pips*mult);assert.equal(o.state.score-s.score,pips*mult);
   assert.equal(o.frames.reduce((n,f)=>n+f.score,0),pips*mult);
   assert.equal(o.summary.entries.reduce((n,e)=>n+e.score,0),pips*mult);
   if(o.state.status==='playing') {const next=act(o.state,legalActions(o.state.board)[0]);assert.equal(next.summary.score,next.summary.pips*next.summary.mult);}
   break;
  }
 }
 assert.ok(found);
});
test('complete campaigns replay every draft, purchase and round transition',()=>{
 const config={...DEFAULTS,targets:Array(9).fill(1)};
 const r=runOne({seed:24,policy:'specialist',config});
 assert.equal(r.status,'won');assert.ok(r.packPurchases>=6);assert.equal(r.shopVisits,8);
 assert.ok(Object.values(r.tokenPicks).reduce((a,b)=>a+b,0)<=15);
 assert.equal(r.coinsEarned-r.coinsSpent,r.coinsEnding);
 assert.equal(replayTrace({seed:24,config,trace:r.trace,finalHash:r.finalHash}).status,'won');
});

test('numbered packs level exactly the selected tiers and survive partial saves',()=>{
 let s=start(51);s.status='roundwon';s=act(s,{type:'visit_shop'}).state;
 const coins=s.coins;s=act(s,{type:'buy_pack',pack:'multi'}).state;
 assert.equal(coins-s.coins,4);assert.equal(s.draft.offers.length,5);
 assert.deepEqual(s.draft.offers.slice(0,4),['multi-3','multi-4','multi-5','multi-6']);
 for(const index of [0,1,3]) {
  s=act(s,{type:'choose_token',index}).state;
  assert.deepEqual(restoreGame(JSON.parse(JSON.stringify(s))),s);
 }
 assert.deepEqual(s.config.matchLevels,{3:1,4:1,5:0,6:1});assert.equal(s.status,'shop');
 assert.equal(s.config.rates.reduce((a,b)=>a+b,0),2);
 const n=act(s,{type:'next_round'}).state;assert.deepEqual(n.config.matchLevels,s.config.matchLevels);
});
test('trinkets charge once, enforce slots, sell once and keep shop inventory deterministic',()=>{
 let s=start(12);s.status='roundwon';s=act(s,{type:'visit_shop'}).state;s.coins=50;
 assert.equal(s.shop.offers.length,3);const id=s.shop.offers[0];
 const out=act(s,{type:'buy_trinket',id});s=out.state;
 assert.equal(out.summary.coinsSpent,5);assert.ok(s.config.trinkets.includes(id));assert.equal(act(s,{type:'buy_trinket',id}),null);
 const sold=act(s,{type:'sell_trinket',id});assert.equal(sold.summary.coinsEarned,2);assert.equal(act(sold.state,{type:'sell_trinket',id}),null);
 assert.equal(act(sold.state,{type:'buy_trinket',id}),null);
 s.config.trinkets=['pips-3','mult-3','pips-4','mult-4'];assert.equal(act(s,{type:'buy_trinket',id:s.shop.offers[1]}),null);
 assert.equal(act({...s,status:'playing'},{type:'sell_trinket',id:'pips-3'}),null);
});
