// Controlled gifts isolate effects; these are NOT shop-acquired campaign win rates.
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {gzipSync} from 'node:zlib';
import {runOne,quantiles} from './runner.mjs';
import {TYPES} from '../engine.mjs';
const [path='modelling/configs/lab-final.json',count='120',start='600001']=process.argv.slice(2),runs=+count,seedStart=+start;
const base=JSON.parse(readFileSync(path)),out='modelling/results/playstyle-lab/arenas';mkdirSync(out,{recursive:true});
const rates=x=>TYPES.map(k=>x[k]??0),scenarios={};
const add=(id,policy,items=[],supply={},levels={},lab={})=>scenarios[id]={policy,config:{...structuredClone(base),draft:false,targets:[1e12],trinkets:items,rates:rates(supply),matchLevels:levels,rules:{...structuredClone(base.rules),lab:{...structuredClone(base.rules.lab),...lab}}}};
add('plain','lab-flex');
for(const id of ['pips-3','mult-3','convert','ones','quad','cascade','cluster','sculptor','spare','conductor','resonator','rainbow'])add('solo-'+id,'lab-flex',[id]);
add('cascade-base','lab-cascade',['convert','pips-3','ones'],{},{3:5});add('cascade-echo','lab-cascade',['convert','pips-3','ones','cascade'],{},{3:5});
add('five-base','lab-five',['convert','pips-5','mult-5'],{},{5:3,4:2});add('five-ring','lab-five',['convert','pips-5','mult-5','sculptor'],{},{5:3,4:2});add('five-cling','lab-five',['convert','pips-5','mult-5','cluster'],{},{5:3,4:2});
add('six-base','lab-six',['convert','pips-6','mult-6'],{},{6:3,5:2});add('six-cling','lab-six',['convert','pips-6','mult-6','cluster'],{},{6:3,5:2});
add('special-base','lab-special',['bigbomb','widerow','widecolumn'],{bomb:4,row:4,column:4});add('special-chain','lab-special',['bigbomb','widerow','widecolumn','conductor'],{bomb:4,row:4,column:4});
add('wild-base','lab-wild',['convert','pips-3','quad'],{wild:5},{3:4});add('wild-resonance','lab-wild',['convert','pips-3','quad','resonator'],{wild:5},{3:4});
add('spectrum-base','lab-spectrum',['pips-3','mult-3','quad'],{row:3,column:3,wild:3,shiny:3},{3:4});add('spectrum-full','lab-spectrum',['pips-3','mult-3','quad','rainbow'],{row:3,column:3,wild:3,shiny:3},{3:4});
add('shiny-2','lab-flex',[],{shiny:5});scenarios['shiny-1.5']=structuredClone(scenarios['shiny-2']);scenarios['shiny-1.5'].config.rules.shinyFactor=1.5;
for(const rate of [5,10]){add('twenty-old-'+rate,'lab-battery',[],{twenty:rate});add('twenty-battery-'+rate,'lab-battery',[],{twenty:rate},{},{battery:true});}
const identity={node:process.version,hashes:Object.fromEntries(['engine.mjs','modelling/lab-policies.mjs','modelling/runner.mjs','modelling/lab-arenas.mjs'].map(p=>[p,createHash('sha256').update(readFileSync(p)).digest('hex')]))},results={};
for(const [id,{config,policy}] of Object.entries(scenarios)){
 const rows=[];for(let i=0;i<runs;i++){const r=runOne({seed:seedStart+i,config,policy,record:false});rows.push({seed:r.seed,score:r.totalScore,coins:r.coinsEnding,censored:r.status==='censored',capped:r.cappedResolutions,triggers:r.trinketTriggers,sculpts:r.sculpts,singleRerolls:r.singleRerolls,batteryRefunds:r.batteryRefunds,clusterExtras:r.clusterExtras});}
 const result={config,policy,score:quantiles(rows.map(r=>r.score)),censored:rows.filter(r=>r.censored).length,capped:rows.reduce((n,r)=>n+r.capped,0),refunds:rows.reduce((n,r)=>n+r.batteryRefunds,0),rows};results[id]=result;
 console.log(id,Math.round(result.score.mean),Math.round(result.score.p50),Math.round(result.score.p99));
}
writeFileSync(`${out}/results.json.gz`,gzipSync(JSON.stringify({identity,runs,seedStart,note:'Controlled ten-swap gifts; one unreachable-goal encounter per attempt; no shopping.',scenarios:results})));
writeFileSync(`${out}/summary.json`,JSON.stringify({identity,runs,seedStart,scenarios:Object.fromEntries(Object.entries(results).map(([id,{rows,...r}])=>[id,r]))},null,2));
