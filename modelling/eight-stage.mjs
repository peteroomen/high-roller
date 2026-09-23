import {writeFileSync,mkdirSync,readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {execSync} from 'node:child_process';
import {DEFAULTS,TRINKETS,TYPES,clone} from '../engine.mjs';
import {runOne,aggregate,replayTrace,pairedComparison} from './runner.mjs';
export function identity(){return {hashes:Object.fromEntries(['engine.mjs','presentation.mjs','modelling/runner.mjs','modelling/policies.mjs','modelling/research-policies.mjs','modelling/eight-stage.mjs','modelling/power-study.mjs'].map(p=>[p,createHash('sha256').update(readFileSync(p)).digest('hex')])),commit:execSync('git rev-parse HEAD').toString().trim(),node:process.version};}
export const targets=(base=180,growth=1.20)=>Array.from({length:24},(_,i)=>Math.round(base*growth**i/10)*10);
export const baseline={...clone(DEFAULTS),targets:targets()};
export const candidates={
 current:{...clone(DEFAULTS)},
 extended:baseline,
 gentle:{...baseline,targets:targets(140,1.16)},
 'reroll-2':{...baseline,rules:{singleRerollsPerRound:2}},
 'reroll-4':{...baseline,rules:{singleRerollsPerRound:4}},
};
export function experiment({id,config,policies=['balanced','cascade','large','large6','specials'],runs=100,seedStart=20001,out='modelling/results/eight-stage'}) {
 mkdirSync(out,{recursive:true});
 const cells=[],buildIdentity=identity();
 for(const policy of policies) {
  const results=[];let replay=null;
  for(let i=0;i<runs;i++) {
   const r=runOne({seed:seedStart+i,config,policy,record:i===0});
   if(i===0){replayTrace({seed:r.seed,config,trace:r.trace,finalHash:r.finalHash});replay=r;}
   results.push(r);
  }
  const a=aggregate(results);const cell={id,policy,config,seedStart,runs,identity:buildIdentity,aggregate:a};cells.push(cell);
  writeFileSync(`${out}/${id}-${policy}.json`,JSON.stringify(cell,null,2));
  writeFileSync(`${out}/${id}-${policy}.ndjson`,results.map(r=>JSON.stringify({...r,trace:undefined})).join('\n')+'\n');
  writeFileSync(`${out}/${id}-${policy}-replay.json`,JSON.stringify({seed:replay.seed,config,trace:replay.trace,finalHash:replay.finalHash}));
  console.log(JSON.stringify({id,policy,wins:a.wins,n:runs,reach:a.rounds.filter(r=>r.reached).at(-1)?.round,meanClears:results.reduce((n,r)=>n+r.completed.length,0)/runs,coins:a.coinsEnding.mean,first:a.firstWaveGroupSizes,rerolls:a.singleRerolls,censored:a.censored,capped:a.cappedResolutions}));
 }
 return cells;
}
if(process.argv[1]?.endsWith('/eight-stage.mjs')) {
 const [id='extended',n='100',seed='20001',policyList='balanced,cascade,large,large6,specials',configPath]=process.argv.slice(2);
 const config=configPath?JSON.parse(readFileSync(configPath,'utf8')):candidates[id];if(!config)throw Error('Unknown config');
 experiment({id,config,runs:+n,seedStart:+seed,policies:policyList.split(',')});
}
