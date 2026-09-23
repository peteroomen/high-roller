// Controlled ten-swap arenas: gifts estimate conditional power, NOT acquisition value.
import {writeFileSync} from 'node:fs';
import {DEFAULTS,TRINKETS,TYPES,newGame,legalMoves,matches,clone} from '../engine.mjs';
import {runOne,quantiles,wilson} from './runner.mjs';
import {identity} from './eight-stage.mjs';
export function arena(config,runs=200,seedStart=30001) {
 const rows=Array.from({length:runs},(_,i)=>runOne({seed:seedStart+i,config:{...DEFAULTS,...config,targets:[1e12],draft:false},policy:'greedy',record:false}));
 return {runs,seedStart,score:quantiles(rows.map(r=>r.totalScore)),coins:quantiles(rows.map(r=>r.coinsEarned)),first:merge(rows,'firstWaveGroupSizes'),cascade:merge(rows,'cascadeGroupSizes'),caps:rows.reduce((n,r)=>n+r.cappedResolutions,0),censored:rows.filter(r=>r.status==='censored').length,scores:rows.map(r=>r.totalScore)};
}
function merge(rows,key){const x={};for(const r of rows)for(const [k,v] of Object.entries(r[key]))x[k]=(x[k]??0)+v;return x;}
if(process.argv[1]?.endsWith('/power-study.mjs')) {
const runs=+(process.argv[2]??200), study={},buildIdentity=identity();
const scenarios={plain:{},...Object.fromEntries(TRINKETS.map(t=>[t.id,{trinkets:[t.id]}])),ones_convert:{trinkets:['convert','ones']},small:{trinkets:['pips-3','mult-3'],matchLevels:{3:5}},large:{trinkets:['pips-5','mult-5','pips-6','mult-6'],matchLevels:{5:3,6:2}},...Object.fromEntries(TYPES.flatMap((t,i)=>[1,5,10].map(p=>[`${t}-${p}`,{rates:TYPES.map((_,j)=>i===j?p:0)}]))),...['bomb','column','row'].map(t=>[t,{rates:TYPES.map(k=>k===t?5:0),trinkets:[{bomb:'bigbomb',column:'widecolumn',row:'widerow'}[t]]}]).reduce((o,[k,v])=>({...o,[`${k}-upgrade`]:v}),{})};
for(const [id,c] of Object.entries(scenarios)){study[id]=arena(c,runs);console.log(id,Math.round(study[id].score.mean),Math.round(study[id].score.p50),Math.round(study[id].score.p99));}
writeFileSync('modelling/results/eight-stage/power.json',JSON.stringify({identity:buildIdentity,config:DEFAULTS,scenarios,note:'Paired starting seeds, ten swaps, no shopping, fixed gifts. Means include tails; not human performance.',study},null,2));
// Initial stable board opportunities; reroll checks all six outcomes without peeking at RNG.
const geometry={};
for(const conversion of [false,true]) {
 let swaps5=0,swaps6=0,reroll5=0,reroll6=0,prob5=0,prob6=0;
 for(let i=0;i<runs;i++) {
  const s=newGame(40001+i,{...DEFAULTS,draft:false,trinkets:conversion?['convert']:[]});
  const moves=legalMoves(s.board);swaps5+=Number(moves.some(m=>m.groups.some(g=>g.length>=5)));swaps6+=Number(moves.some(m=>m.groups.some(g=>g.length>=6)));
  let best5=0,best6=0;
  for(let index=0;index<36;index++) {
   const b=clone(s.board);let hits5=0,hits6=0;
   for(let face=1;face<=6;face++){b[index].n=conversion&&face===6?1:face;const g=matches(b);hits5+=Number(g.some(x=>x.length>=5));hits6+=Number(g.some(x=>x.length>=6));}
   best5=Math.max(best5,hits5/6);best6=Math.max(best6,hits6/6);
  }
  reroll5+=Number(best5>0);reroll6+=Number(best6>0);prob5+=best5;prob6+=best6;
 }
 geometry[conversion?'converted':'normal']={runs,swaps5,swaps6,swaps5CI:wilson(swaps5,runs),swaps6CI:wilson(swaps6,runs),reroll5,reroll6,meanBestReroll5:prob5/runs,meanBestReroll6:prob6/runs};
}
writeFileSync('modelling/results/eight-stage/geometry.json',JSON.stringify({identity:buildIdentity,seedStart:40001,...geometry},null,2));console.log(geometry);

}
