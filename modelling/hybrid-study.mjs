// Adversarial portfolio check: same public-information agent, alternate numbered
// and special packs, prioritize Wild/Shiny. All transitions use production act().
import {readFileSync,writeFileSync} from 'node:fs';
import {newGame,act,canBuyPack,PACKS,canTakeToken,clone} from '../engine.mjs';
import {makePolicy,observe} from './policies.mjs';
import {fingerprint,replayTrace,wilson,quantiles} from './runner.mjs';
import {identity} from './eight-stage.mjs';
const config=JSON.parse(readFileSync('modelling/configs/eight-stage-v1.json'));
const n=+(process.argv[2]??100),seedStart=100001,buildIdentity=identity();
for(const finish of ['wild','shiny']) {
 const rows=[];
 for(let i=0;i<n;i++) {
  const seed=seedStart+i,agent=makePolicy('balanced',{seed:seed^0x98216});let s=newGame(seed,config),actions=0,earned=0,spent=0,total=0,caps=0;
  const rounds=[],trace=[];
  while(!['won','lost'].includes(s.status)&&actions<1920) {
   const v=observe(s);let a=agent.choose(v);
   if(v.status==='draft'&&!v.draft.kind.includes('multi')) {
    const index=v.draft.offers.findIndex((t,j)=>t===finish&&!v.draft.picks.includes(j)&&canTakeToken(v,t));
    if(index>=0)a={type:'choose_token',index};
   }
   if(a.type==='buy_pack'&&v.round%2===0) {const p=PACKS.find(p=>p.id==='assorted');if(canBuyPack(v,p))a={type:'buy_pack',pack:p.id};}
   const before=fingerprint(s),out=act(s,a);if(!out)throw Error('Invalid hybrid action');
   earned+=out.summary.coinsEarned;spent+=out.summary.coinsSpent;total+=out.summary.score;caps+=Number(out.resolutionCapped??false);actions++;
   if(s.status==='playing'&&['won','lost','roundwon'].includes(out.state.status))rounds.push({round:s.round+1,cleared:out.state.status!=='lost',score:out.state.score,target:s.config.targets[s.round],deficit:Math.max(0,s.config.targets[s.round]-out.state.score),coins:out.state.coins,movesLeft:out.state.moves});
   s=out.state;if(i===0)trace.push({turn:actions,action:a,before,after:fingerprint(s)});
  }
  if(earned-spent!==s.coins||total!==s.total)throw Error('Hybrid accounting failed');
  const status=['won','lost'].includes(s.status)?s.status:'censored';
  if(i===0){replayTrace({seed,config,trace,finalHash:fingerprint(s)});writeFileSync(`modelling/results/eight-stage/hybrid-${finish}-replay.json`,JSON.stringify({seed,config,trace,finalHash:fingerprint(s)}));}
  rows.push({seed,status,actions,rounds,caps,earned,spent,coins:s.coins,score:s.total,finalBuild:clone(s.config)});
 }
 const wins=rows.filter(r=>r.status==='won').length;
 const summary={identity:buildIdentity,config,n,seedStart,wins,winRate:wins/n,winRate95CI:wilson(wins,n),censored:rows.filter(r=>r.status==='censored').length,caps:rows.reduce((n,r)=>n+r.caps,0),coins:quantiles(rows.map(r=>r.coins)),score:quantiles(rows.map(r=>r.score)),rounds:Array.from({length:24},(_,i)=>{const reached=rows.flatMap(r=>r.rounds.filter(x=>x.round===i+1));return {round:i+1,reached:reached.length,cleared:reached.filter(r=>r.cleared).length,deficit:quantiles(reached.filter(r=>!r.cleared).map(r=>r.deficit)),coins:quantiles(reached.map(r=>r.coins))};})};
 writeFileSync(`modelling/results/eight-stage/hybrid-${finish}.json`,JSON.stringify(summary,null,2));writeFileSync(`modelling/results/eight-stage/hybrid-${finish}.ndjson`,rows.map(r=>JSON.stringify(r)).join('\n')+'\n');console.log(finish,wins,n,summary.coins.mean);
}
