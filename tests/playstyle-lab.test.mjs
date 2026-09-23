import test from 'node:test';
import assert from 'node:assert/strict';
import {DEFAULTS,newGame,act,finalBonuses,previewBoard,rerollLimit,legalActions,clone} from '../engine.mjs';
import {runOne,replayTrace} from '../modelling/runner.mjs';
import {observe,makePolicy} from '../modelling/policies.mjs';
const lab={echoX:.5,tierX:{5:2,6:3},spectrumX:3,chainX:2,wildX:2,extraRerolls:1,battery:true};
const config={...DEFAULTS,draft:false,targets:[1e9,1e9],rules:{singleRerollsPerRound:3,lab},trinkets:['sculptor','spare']};
test('lab final multipliers apply once per action, exact tiers, and exclude blast-only Wilds',()=>{
 const f={groups:[[0,1,2,3,4]],numbers:[1,2,3],activations:[{type:'row',trigger:'swap'},{type:'bomb',trigger:'chain'}],naturalWild:1};
 const g={...f,numbers:[4,5,6],groups:[[0,1,2,3,4,5]],naturalWild:0};
 const c={...config,trinkets:['cascade','mult-5','mult-6','rainbow','conductor','resonator']};
 const bonus=finalBonuses([f,g,g],c);
 assert.deepEqual(Object.fromEntries(bonus.map(b=>[b.source,b.value])),{cascade:2,'mult-5':2,'mult-6':3,rainbow:3,conductor:2,resonator:2});
 assert.equal(bonus.length,6);
 assert.ok(!finalBonuses([{...f,naturalWild:0,activations:[]}],c).some(b=>b.source==='resonator'||b.source==='conductor'||b.source==='mult-6'));
 assert.deepEqual(finalBonuses([],{...c,trinkets:['quad']}),[]);
});
test('Mimic Ring costs a charge, preserves finishes, validates neighbors and resets each encounter',()=>{
 let s=newGame(83,config);s.board[0].gold=true;s.board[0].shiny=true;s.board[1].n=s.board[0].n%6+1;
 assert.equal(rerollLimit(config),4);
 assert.equal(act(s,{type:'sculpt',index:0,from:35}),null);
 const out=act(s,{type:'sculpt',index:0,from:1});assert.ok(out);
 assert.equal(out.initial[0].n,s.board[1].n);assert.equal(out.initial[0].gold,true);assert.equal(out.initial[0].shiny,true);
 assert.equal(out.state.singleRerollsUsed,1);assert.equal(out.state.moves,10);assert.equal(out.summary.coinsSpent,0);
 assert.equal(act(out.state,{type:'sculpt',index:0,from:1}),null);
 s=out.state;s.status='shop';s.shop={};s=act(s,{type:'next_round'}).state;assert.equal(s.sculptUsed,undefined);assert.equal(s.singleRerollsUsed,0);
 s.config.rules.lab=null;assert.equal(act(s,{type:'sculpt',index:0,from:1}),null);
});
test('battery refunds at most one already-spent charge per action, including multiple collected Twenties',()=>{
 let s=newGame(92,config);s.singleRerollsUsed=2;
 s.board[0]={...s.board[0],special:'bomb',n:null};s.board[2]={...s.board[2],special:'twenty',n:null};s.board[8]={...s.board[8],special:'twenty',n:null};
 const out=act(s,{type:'swap',a:0,b:1});assert.equal(out.summary.batteryRefund,1);assert.equal(out.state.singleRerollsUsed,1);
 s.singleRerollsUsed=0;assert.equal(act(s,{type:'swap',a:0,b:1}).summary.batteryRefund,0);
});
test('preview recognizes natural Wild Resonance and full-action ledgers conserve score',()=>{
 const s=newGame(9,config);s.board[0].n=2;s.board[1].n=2;s.board[2]={...s.board[2],special:'wild',n:null};
 const c={...config,trinkets:['resonator']};const normal=previewBoard(s.board,{...c,trinkets:[]});const resonant=previewBoard(s.board,c);
 assert.equal(resonant.score,normal.score*2);
});
test('all laboratory policies are public-information only and replay complete economic runs',()=>{
 for(const build of ['flex','cascade','four','five','six','special','wild','spectrum']){
  const c={...config,draft:true,targets:[100,200,500],trinkets:['sculptor','cascade','conductor','resonator'],rates:[4,2,2,4,0,4,4,2]};
  const s=newGame(927,c),t=clone(s);t.rng=983;t.seed=1;
  assert.deepEqual(observe(s),observe(t));assert.deepEqual(makePolicy('lab-'+build).choose(observe(s)),makePolicy('lab-'+build).choose(observe(t)));
  const r=runOne({seed:927,config:c,policy:'lab-'+build});assert.equal(r.cappedResolutions,0);assert.notEqual(r.status,'censored');
  assert.equal(replayTrace({seed:927,config:c,trace:r.trace,finalHash:r.finalHash}).total,r.totalScore);
 }
});
test('Clingstone expands orthogonal same-face clusters and merges touching lines without double counts',()=>{
 const b=Array.from({length:36},(_,i)=>({id:i,n:(Math.floor(i/6)+i%6)%4+1,special:null}));
 // Two adjacent horizontal triples have no shared cell until expansion.
 for(const i of [0,1,2,6,7,8])b[i].n=5;
 const plain=previewBoard(b,{...config,trinkets:[]});const f=previewBoard(b,{...config,trinkets:['cluster']});
 assert.ok(plain.groups.length>=2);assert.ok(f.groups.some(g=>g.length>=6));
 assert.equal(new Set(f.groups.flat()).size,f.groups.flat().length);const extra=Array.from({length:36},(_,i)=>({id:i,n:(Math.floor(i/6)+i%6)%4+1,special:null}));for(const i of [0,1,2,6])extra[i].n=5;assert.ok(previewBoard(extra,{...config,trinkets:['cluster']}).clusterExtras>=1);
});
test('round Spectrum activates on completion, persists for the encounter and resets next round',()=>{
 const c={...config,trinkets:['rainbow'],rules:{...config.rules,lab:{spectrumRoundX:3}}};
 const f={groups:[[0,1,2]],numbers:[6],activations:[]};
 assert.equal(finalBonuses([f],c,[1,2,3,4,5])[0].value,3);
 assert.equal(finalBonuses([f],c,[1,2,3,4]).length,0);
 let s=newGame(123,c);s.roundNumbers=[1,2,3,4,5,6];s.status='shop';s.shop={};s=act(s,{type:'next_round'}).state;assert.equal(s.roundNumbers,undefined);
});
test('one-step Clingstone stops at the original match border',()=>{
 const b=Array.from({length:36},(_,i)=>({id:i,n:(Math.floor(i/6)+i%6)%4+1,special:null}));
 for(const i of [0,1,2,8,9])b[i].n=5;
 const c={...config,trinkets:['cluster'],rules:{...config.rules,lab:{clusterSteps:1}}};
 const f=previewBoard(b,c);assert.ok(f.groups.flat().includes(8));assert.ok(!f.groups.flat().includes(9));
 const full=previewBoard(b,{...c,rules:{...c.rules,lab:{clusterSteps:36}}});assert.ok(full.groups.flat().includes(9));
});
test('minimum-size Clingstone never duplicates a small group absorbed by a larger one',()=>{
 const b=Array.from({length:36},(_,i)=>({id:i,n:(Math.floor(i/6)+i%6)%4+1,special:null}));
 for(const i of [0,1,2,3,6,7,8])b[i].n=5;
 const f=previewBoard(b,{...config,trinkets:['cluster'],rules:{...config.rules,lab:{clusterSteps:1,clusterMinSize:4}}});
 assert.equal(new Set(f.groups.flat()).size,f.groups.flat().length);assert.equal(f.groups.length,1);
});
test('actual round Spectrum scoring is once per action and its accumulated faces are public',()=>{
 const c={...config,trinkets:['rainbow'],rules:{...config.rules,lab:{spectrumRoundX:4}}};
 let s=newGame(401,c);s.roundNumbers=[1,2,3,4,5,6];const a=legalActions(s.board)[0];
 const control=clone(s);control.config.trinkets=[];
 const x=act(s,a),y=act(control,a);assert.equal(x.summary.score,y.summary.score*4);
 assert.equal(x.summary.bonuses.filter(b=>b.source==='rainbow').length,1);assert.deepEqual(observe(x.state).roundNumbers,[1,2,3,4,5,6]);
});
