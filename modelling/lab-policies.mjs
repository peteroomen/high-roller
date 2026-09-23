// Fixed public-information portfolio policies for the playstyle lab.
import {TRINKETS,TYPES,PACKS,canBuyPack,canTakeToken,trinketCost,rulesFor,rerollLimit,legalActions,previewAction,previewBoard,clone,adjacent} from '../engine.mjs';
const CORE_POLICIES=['lab-flex','lab-cascade','lab-four','lab-five','lab-six','lab-special','lab-wild','lab-spectrum'];
export const LAB_POLICIES=[...CORE_POLICIES,...CORE_POLICIES.map(p=>p+'-patient'),...CORE_POLICIES.map(p=>p+'-cluster'),'lab-battery'];
export function labChoose(name,v) {
 const forceCluster=name.endsWith('-cluster');name=name.replace(/-cluster$/,'');
 const patient=name.endsWith('-patient'),battery=name==='lab-battery';name=name.replace(/-patient$/,'');if(battery)name='lab-special';
 const build=name.slice(4),r=rulesFor(v.config),has=id=>v.config.trinkets.includes(id),rate=id=>v.config.rates[TYPES.indexOf(id)];
 const large=['four','five','six'].includes(build);
 const tierRanks={four:{3:10,4:26,5:22,6:12},five:{3:3,4:10,5:24,6:16},six:{3:2,4:4,5:18,6:24}}[build]??{3:24,4:12,5:5,6:3};
 const specials={column:8+(has('widecolumn')?18:0),row:8+(has('widerow')?18:0),bomb:9+(has('bigbomb')?18:0),number:10,twenty:1,wild:large?24:16,shiny:14,color:Math.max(1,v.config.rates.reduce((a,b)=>a+b,0)-8)};
 if(build==='special')Object.assign(specials,{number:24,bomb:20+(has('bigbomb')?18:0),column:18+(has('widecolumn')?18:0),row:18+(has('widerow')?18:0),wild:5,shiny:6});
 if(build==='wild')Object.assign(specials,{wild:40,shiny:20});
 if(build==='spectrum')Object.assign(specials,{column:23,row:23,bomb:25,number:5,shiny:30,wild:26});
 if(battery)specials.twenty=34;
 const ranks=t=>{
  if(forceCluster&&t.id==='cluster')return 40;
  if(t.id==='cluster')return {flex:8,cascade:18,four:12,five:27,six:32,special:0,wild:10,spectrum:0}[build];
  if(t.tier)return (build==='special'?{3:5,4:3,5:1,6:1}[t.tier]:tierRanks[t.tier])+(t.stat==='pips'?1:0);
  if(build==='special')return {quad:15,convert:0,ones:5,cascade:8,rainbow:12,bigbomb:rate('bomb')?18+rate('bomb')*3:0,widecolumn:rate('column')?17+rate('column')*3:0,widerow:rate('row')?17+rate('row')*3:0,conductor:20,sculptor:3,spare:8,resonator:0}[t.id]??0;
  if(large)return {quad:14,convert:30,ones:3,cascade:3,rainbow:has('convert')?0:4,bigbomb:0,widecolumn:0,widerow:0,sculptor:build==='six'?17:29,spare:17,resonator:rate('wild')?8:0,conductor:0}[t.id]??0;
  if(build==='wild')return {quad:25,convert:29,ones:has('convert')?22:5,cascade:15,rainbow:0,resonator:32,sculptor:8,spare:10}[t.id]??0;
  if(build==='spectrum')return {quad:30,convert:0,ones:0,cascade:12,rainbow:34,resonator:rate('wild')?23:0,sculptor:10,spare:15,bigbomb:rate('bomb')*4,widecolumn:rate('column')*4,widerow:rate('row')*4,conductor:8}[t.id]??0;
  return {quad:build==='flex'?32:15,convert:30,ones:has('convert')?29:18,cascade:build==='cascade'?32:16,rainbow:has('convert')?0:8,bigbomb:rate('bomb')*3,widecolumn:rate('column')*3,widerow:rate('row')*3,sculptor:12,spare:18,resonator:rate('wild')?15:0,conductor:2}[t.id]??0;
 };
 if(v.status==='draft'){
  const rank=t=>t.startsWith('multi-')?tierRanks[+t.slice(6)]:specials[t];
  const offers=v.draft.offers.map((t,index)=>({t,index})).filter(x=>!v.draft.picks.includes(x.index)&&canTakeToken(v,x.t));offers.sort((a,b)=>rank(b.t)-rank(a.t));return {type:'choose_token',index:offers[0].index};
 }
 if(v.status==='roundwon')return {type:'visit_shop'};
 if(v.status==='shop'){
  if(build==='special'&&v.config.rates.reduce((a,b)=>a+b,0)<3){const p=PACKS.find(p=>p.id==='assorted'&&canBuyPack(v,p));if(p)return {type:'buy_pack',pack:p.id};}
  const offers=v.shop.offers.filter(id=>!v.shop.sold.includes(id)&&!has(id)).map(id=>TRINKETS.find(t=>t.id===id)).filter(t=>ranks(t)>0).sort((a,b)=>ranks(b)-ranks(a));
  const owned=v.config.trinkets.map(id=>TRINKETS.find(t=>t.id===id)).sort((a,b)=>ranks(a)-ranks(b));
  if(owned.length>=r.trinketSlots&&offers.length&&ranks(offers[0])>ranks(owned[0])&&v.coins+Math.floor(trinketCost(owned[0],v.config)/2)>=trinketCost(offers[0],v.config))return {type:'sell_trinket',id:owned[0].id};
  const affordable=offers.filter(t=>v.coins>=trinketCost(t,v.config));
  if(owned.length<r.trinketSlots&&affordable.length)return {type:'buy_trinket',id:affordable[0].id};
  const kind=build==='special'||['wild','spectrum'].includes(build)&&v.round%2===0?'assorted':'multi';
  const pack=PACKS.find(p=>p.id===kind&&canBuyPack(v,p));if(pack)return {type:'buy_pack',pack:pack.id};return {type:'next_round'};
 }
 const pc=r.lab?{...v.config,rules:{...v.config.rules,lab:{...r.lab,previewNumbers:v.roundNumbers}}}:v.config;
 const swaps=legalActions(v.board).map(action=>({action,f:previewAction(v.board,action,pc)})).sort((a,b)=>b.f.score-a.f.score);
 const best=swaps[0];
 if((v.singleRerollsUsed??0)<rerollLimit(v.config)){
  if(r.lab&&has('sculptor')&&!v.sculptUsed){
   let pick=null;
   for(let index=0;index<36;index++)if(!v.board[index].special)for(let from=0;from<36;from++){
    if(!adjacent(index,from)||v.board[from].special||v.board[from].n===v.board[index].n)continue;
    const b=clone(v.board);b[index].n=b[from].n;b[index].color=b[from].color;
    const f=previewBoard(b,pc),big=f.groups.some(g=>g.length>=(build==='six'?6:5));
    const value=f.score*(large&&big?1.5:1);
    if(!pick||value>pick.value)pick={index,from,value,score:f.score,big};
   }
   if(pick&&(pick.score>=best.f.score*.6||large&&pick.big))return {type:'sculpt',index:pick.index,from:pick.from};
  }
  let pick=null;
  for(let index=0;index<36;index++){
   if(v.board[index].special)continue;let expected=0,big=0;const b=clone(v.board);
   for(let face=1;face<=6;face++){b[index].n=face===6&&has('convert')?1:face;b[index].color=b[index].n-1;const f=previewBoard(b,pc);expected+=f.score/6;big+=Number(f.groups.some(g=>g.length>=(build==='six'?6:5)))/6;}
   const value=expected+(large?big*best.f.score:0);if(!pick||value>pick.value)pick={index,value,expected,big};
  }
  if(pick&&(pick.expected>best.f.score*(patient?.35:.18)||large&&pick.big>0||v.moves===1&&pick.expected>0))return {type:'reroll_single',index:pick.index};
 }
 return best.action;
}
