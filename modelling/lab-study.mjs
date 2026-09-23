import {readFileSync,writeFileSync,mkdirSync,readdirSync,existsSync} from 'node:fs';
import {gzipSync} from 'node:zlib';
import {createHash} from 'node:crypto';
import {execFileSync,spawn} from 'node:child_process';
import {runOne,aggregate,replayTrace} from './runner.mjs';
import {LAB_POLICIES} from './lab-policies.mjs';
const root='modelling/results/playstyle-lab';
function identity(){return {commit:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),node:process.version,hashes:Object.fromEntries(['engine.mjs','modelling/runner.mjs','modelling/policies.mjs','modelling/lab-policies.mjs','modelling/lab-study.mjs'].map(p=>[p,createHash('sha256').update(readFileSync(p)).digest('hex')]))};}
if(process.argv[2]==='worker'){
 const [id,policy,n,seed,folder]=process.argv.slice(3),config=JSON.parse(readFileSync(`${folder}/${id}.config.json`)),rows=[],source=identity(),start=Date.now();let replay;
 for(let i=0;i<+n;i++){
  const r=runOne({seed:+seed+i,config,policy,record:i===0});
  if(i===0){replay={seed:r.seed,config,trace:r.trace,finalHash:r.finalHash};replayTrace(replay);}
  rows.push({...r,trace:undefined});
 }
 const a=aggregate(rows),cell={id,policy,config,runs:+n,seedStart:+seed,identity:source,seconds:(Date.now()-start)/1000,aggregate:a};
 writeFileSync(`${folder}/${id}--${policy}.json`,JSON.stringify(cell,null,2));
 writeFileSync(`${folder}/${id}--${policy}.ndjson.gz`,gzipSync(rows.map(r=>JSON.stringify(r)).join('\n')));
 writeFileSync(`${folder}/${id}--${policy}.replay.json`,JSON.stringify(replay));
 console.log(JSON.stringify({id,policy,wins:a.wins,n:+n,coins:+a.coinsEnding.mean.toFixed(1),sculpts:a.sculpts,censored:a.censored,capped:a.cappedResolutions,seconds:cell.seconds}));
}else{
 const [phase='pilot1',ids='baseline,shiny,candidate-a,candidate-b',n='20',seed='220001',list='all',workers='6']=process.argv.slice(2),folder=`${root}/${phase}`;mkdirSync(folder,{recursive:true});
 const policies=list==='all'?LAB_POLICIES.filter(p=>!p.endsWith('-patient')&&!p.endsWith('-cluster')&&p!=='lab-battery'):list.split(',');const jobs=[];
 for(const id of ids.split(',')){
  const config=JSON.parse(readFileSync(`modelling/configs/lab-${id}.json`));writeFileSync(`${folder}/${id}.config.json`,JSON.stringify(config,null,2));
  for(const policy of policies)jobs.push({id,policy});
 }
 for(const file of [...Object.keys(identity().hashes),'presentation.mjs','modelling/research-policies.mjs']){const dest=`${folder}/source/${file}`;mkdirSync(dest.slice(0,dest.lastIndexOf('/')),{recursive:true});writeFileSync(dest,readFileSync(file));}
 writeFileSync(`${folder}/manifest.json`,JSON.stringify({phase,n:+n,seedStart:+seed,policies,ids:ids.split(','),identity:identity()},null,2));
 let failure=null;
 async function lane(){for(;;){const job=jobs.shift();if(!job||failure)return;const dest=`${folder}/${job.id}--${job.policy}.json`;if(existsSync(dest)){const old=JSON.parse(readFileSync(dest));if(old.runs===+n&&old.seedStart===+seed){console.log('exists '+job.id+' '+job.policy);continue;}throw Error('Refusing overwrite of experiment');}
  await new Promise((resolve,reject)=>{const p=spawn(process.execPath,['modelling/lab-study.mjs','worker',job.id,job.policy,n,seed,folder],{stdio:'inherit'});p.on('error',reject);p.on('exit',code=>code?reject(Error('Cell failed '+JSON.stringify(job))):resolve());}).catch(e=>{failure=e;});}}
 await Promise.all(Array.from({length:+workers},()=>lane()));if(failure)throw failure;
 const cells=readdirSync(folder).filter(x=>x.includes('--')&&x.endsWith('.json')&&!x.endsWith('.replay.json')).map(p=>JSON.parse(readFileSync(`${folder}/${p}`)));
 writeFileSync(`${folder}/summary.json`,JSON.stringify(cells.map(c=>({id:c.id,policy:c.policy,runs:c.runs,seedStart:c.seedStart,wins:c.aggregate.wins,ci:c.aggregate.winRate95CI,coins:c.aggregate.coinsEnding.mean,clears:c.aggregate.rounds.reduce((s,r)=>s+r.cleared,0)/c.runs,censored:c.aggregate.censored,capped:c.aggregate.cappedResolutions})),null,2));
}
