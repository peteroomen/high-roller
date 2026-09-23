import test from 'node:test';import assert from 'node:assert/strict';
import {newGame,act,restoreGame,DEFAULTS,TYPES,RULES,TRINKETS,trinketCost,wave,legalActions,canTakeToken} from '../engine.mjs';
import {runOne,replayTrace} from '../modelling/runner.mjs';
const start=seed=>act(newGame(seed),{type:'choose_token',index:0}).state;
const shop=()=>{let s=start(11);s.status='roundwon';s.moves=4;return act(s,{type:'visit_shop'}).state;};
test('all special rates start zero; one weighted starter adds exactly one percentage point',()=>{
 const s=newGame(31);assert.equal(s.status,'draft');assert.deepEqual(s.config.rates,Array(TYPES.length).fill(0));assert.equal(new Set(s.draft.offers).size,3);assert.deepEqual(s,newGame(31));assert.ok(!s.draft.offers.includes('coin'));
 assert.equal(act(s,legalActions(s.board)[0]),null);const chosen=s.draft.offers[1],out=act(s,{type:'choose_token',index:1});
 assert.equal(out.state.status,'playing');assert.equal(out.state.coins,0);assert.equal(out.state.config.rates[TYPES.indexOf(chosen)],1);assert.equal(out.state.tokens[chosen],1);
});
test('payout is base plus every remaining swap; both pack types reveal three and keep one',()=>{
 for(const pack of ['assorted','multi']) {
  let s=shop();assert.equal(s.coins,9);assert.equal(act(s,{type:'visit_shop'}),null);
  const cost=pack==='multi'?4:5;s=act(s,{type:'buy_pack',pack}).state;assert.equal(s.coins,9-cost);assert.equal(s.draft.offers.length,3);assert.equal(new Set(s.draft.offers).size,3);assert.equal(s.draft.limit,1);assert.equal(act(s,{type:'next_round'}),null);
  assert.deepEqual(restoreGame(JSON.parse(JSON.stringify(s))),s);
  const chosen=s.draft.offers[1];s=act(s,{type:'choose_token',index:1}).state;assert.equal(s.status,'shop');assert.equal(act(s,{type:'choose_token',index:1}),null);assert.equal(act(s,{type:'buy_pack',pack}),null);
  if(pack==='multi')assert.equal(s.config.matchLevels[chosen.slice(6)],1);else assert.equal(s.config.rates.reduce((a,b)=>a+b,0),2);
  const n=act(s,{type:'next_round'}).state;assert.equal(n.round,1);assert.deepEqual(n.config,s.config);assert.equal(n.moves,10);
 }
});
test('special tokens are uncapped and invalid or unaffordable purchases leave state unchanged',()=>{
 const s=shop();s.coins=3;const before=structuredClone(s);assert.equal(act(s,{type:'buy_pack',pack:'assorted'}),null);assert.deepEqual(s,before);
 s.config.rates=Array(TYPES.length).fill(80);assert.ok(TYPES.every(t=>canTakeToken(s,t)));assert.equal(canTakeToken(s,'coin'),false);assert.equal(act(s,{type:'buy_pack',pack:'invalid'}),null);
});
test('each trinket charges its own price once, enforces slots and sells for half once',()=>{
 let s=shop();s.coins=100;assert.equal(s.shop.offers.length,4);
 for(const t of TRINKETS) {
  const state=structuredClone(s);state.shop.offers=[t.id];state.shop.sold=[];state.config.trinkets=[];
  const out=act(state,{type:'buy_trinket',id:t.id});assert.equal(out.summary.coinsSpent,trinketCost(t,state.config));assert.equal(act(out.state,{type:'buy_trinket',id:t.id}),null);
  const sold=act(out.state,{type:'sell_trinket',id:t.id});assert.equal(sold.summary.coinsEarned,Math.floor(trinketCost(t,state.config)/2));assert.equal(act(sold.state,{type:'sell_trinket',id:t.id}),null);assert.equal(act(sold.state,{type:'buy_trinket',id:t.id}),null);
 }
 s.config.trinkets=['pips-3','mult-3','pips-4','mult-4'];assert.equal(act(s,{type:'buy_trinket',id:s.shop.offers[0]}),null);
});
test('nine-round campaigns replay every pick, shop and transition with coin conservation',()=>{
 const config={...DEFAULTS,targets:Array(9).fill(1)};const r=runOne({seed:24,policy:'builder',config,samples:1});assert.equal(r.status,'won');assert.equal(r.shopVisits,8);assert.equal(r.coinsEarned-r.coinsSpent,r.coinsEnding);assert.equal(replayTrace({seed:24,config,trace:r.trace,finalHash:r.finalHash}).status,'won');
});
test('two three-die groups add over all pips, cascades remain one move',()=>{
 const b=newGame(1,{...DEFAULTS,draft:false}).board;[0,1,2].forEach(i=>b[i]={...b[i],n:4,special:null});[12,13,14].forEach(i=>b[i]={...b[i],n:5,special:null});const f=wave(b,[[0,1,2],[12,13,14]],0,DEFAULTS);assert.equal(f.score,108);
 for(let seed=0;seed<30;seed++){const s=start(seed),o=act(s,legalActions(s.board)[0]);assert.equal(o.state.score-s.score,o.frames.reduce((n,f)=>n+f.score,0));assert.equal(o.summary.score,Math.floor(o.summary.pips*o.summary.mult));}
});
