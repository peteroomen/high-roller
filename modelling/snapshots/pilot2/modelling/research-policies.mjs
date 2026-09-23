// Build-aware research agents. Only public observations enter this module.
import {act,random,TRINKETS,TYPES,PACKS,canBuyPack,canTakeToken,trinketCost,rulesFor,legalActions,previewAction,previewBoard,clone} from '../engine.mjs';
const BUILD_POLICIES=['balanced','cascade','large','large6','large-supported','specials'];
export const RESEARCH_POLICIES=[...BUILD_POLICIES,...BUILD_POLICIES.map(p=>p+'-paid')];
export function researchChoose(name,v,privateRandom) {
  const usePaid=name.endsWith('-paid');name=name.replace(/-paid$/,'');
  const r=rulesFor(v.config), has=id=>v.config.trinkets.includes(id);
  const rate=id=>v.config.rates[TYPES.indexOf(id)];
  const large=name==='large'||name==='large6'||name==='large-supported';
  const tierRank=name==='large-supported'?{3:10,4:26,5:22,6:12}:name==='large6'?{3:2,4:4,5:18,6:24}:large?{3:3,4:10,5:24,6:16}:{3:24,4:12,5:5,6:3};
  const specialRank={column:8+(has('widecolumn')?18:0),row:8+(has('widerow')?18:0),bomb:9+(has('bigbomb')?18:0),number:10,twenty:2,wild:large?24:16,shiny:14,color:Math.max(1,v.config.rates.reduce((a,b)=>a+b,0)-8)};
  if(name==='specials')Object.assign(specialRank,{number:24,bomb:20+(has('bigbomb')?18:0),column:18+(has('widecolumn')?18:0),row:18+(has('widerow')?18:0),wild:5,shiny:6});
  const itemRank=t=>{
    if(t.tier)return (name==='specials'?{3:5,4:3,5:1,6:1}[t.tier]:tierRank[t.tier])+(t.stat==='pips'?1:0);
    if(name==='specials')return {quad:12,convert:0,ones:6,cascade:8,rainbow:8,bigbomb:rate('bomb')?15+rate('bomb')*3:0,widecolumn:rate('column')?14+rate('column')*3:0,widerow:rate('row')?14+rate('row')*3:0}[t.id];
    if(large)return {quad:14,convert:30,ones:3,cascade:3,rainbow:has('convert')?0:4,bigbomb:0,widecolumn:0,widerow:0}[t.id];
    return {quad:name==='balanced'?32:15,convert:30,ones:has('convert')?29:18,cascade:16,rainbow:has('convert')?0:8,bigbomb:rate('bomb')*3,widecolumn:rate('column')*3,widerow:rate('row')*3}[t.id];
  };
  if(v.status==='draft') {
    const rank=t=>t.startsWith('multi-')?tierRank[+t.slice(6)]:specialRank[t];
    const options=v.draft.offers.map((t,index)=>({t,index})).filter(x=>!v.draft.picks.includes(x.index)&&canTakeToken(v,x.t));
    options.sort((a,b)=>rank(b.t)-rank(a.t));return {type:'choose_token',index:options[0].index};
  }
  if(v.status==='roundwon')return {type:'visit_shop'};
  if(v.status==='shop') {
    if(name==='specials'&&v.config.rates.reduce((a,b)=>a+b,0)<3){const p=PACKS.find(p=>p.id==='assorted'&&canBuyPack(v,p));if(p)return {type:'buy_pack',pack:p.id};}
    const offers=v.shop.offers.filter(id=>!v.shop.sold.includes(id)&&!has(id)).map(id=>TRINKETS.find(t=>t.id===id)).filter(t=>itemRank(t)>0).sort((a,b)=>itemRank(b)-itemRank(a));
    const owned=v.config.trinkets.map(id=>TRINKETS.find(t=>t.id===id)).sort((a,b)=>itemRank(a)-itemRank(b));
    if(owned.length>=r.trinketSlots&&offers.length&&itemRank(offers[0])>itemRank(owned[0])&&v.coins+Math.floor(trinketCost(owned[0],v.config)/2)>=trinketCost(offers[0],v.config))return {type:'sell_trinket',id:owned[0].id};
    const affordable=offers.filter(t=>v.coins>=trinketCost(t,v.config));
    if(owned.length<r.trinketSlots&&affordable.length)return {type:'buy_trinket',id:affordable[0].id};
    const kind=name==='specials'?'assorted':'multi';
    const pack=PACKS.find(p=>p.id===kind&&canBuyPack(v,p));
    if(pack)return {type:'buy_pack',pack:pack.id};
    return {type:'next_round'};
  }
  const swaps=legalActions(v.board).map(action=>({action,f:previewAction(v.board,action,v.config)}));
  // Build rewards already enter production scores; don't force weak large matches.
  swaps.sort((a,b)=>b.f.score-a.f.score);
  const best=swaps[0];
  if((v.singleRerollsUsed??0)<r.singleRerollsPerRound) {
    let pick=null;
    for(let index=0;index<36;index++) {
      if(v.board[index].special)continue;
      let expected=0, big=0;
      const b=clone(v.board);
      for(let face=1;face<=6;face++) {
        b[index].n=face===6&&has('convert')?1:face;b[index].color=b[index].n-1;
        const f=previewBoard(b,v.config);
        expected+=f.score/6;big+=Number(f.groups.some(g=>g.length>=(name==='large6'?6:5)))/6;
      }
      const value=expected+(large?big*best.f.score:0);
      if(!pick||value>pick.value)pick={index,value,expected,big};
    }
    // Spend charges when they have a visible payoff; retain them on featureless boards.
    if(pick&&(pick.expected>best.f.score*.18 || large&&pick.big>0 || v.moves===1&&pick.expected>0))return {type:'reroll_single',index:pick.index};
  }
  if(usePaid&&v.coins>=r.rerollCost&&v.moves<=3&&v.config.targets[v.round]-v.score>best.f.score) {
    const seeds=Array.from({length:4},()=>Math.floor(random(privateRandom)*4294967296));
    let option=null;
    for(let row=0;row<5;row++)for(let col=0;col<5;col++) {
      const action={type:'reroll',index:row*6+col};let value=0;
      for(const seed of seeds){const out=act({...clone(v),version:7,seed:0,rng:seed,nextId:Math.max(...v.board.map(d=>d.id))+1,turn:0,total:0,bestChain:0,history:[]},action);value+=Math.min(v.config.targets[v.round]-v.score,out.summary.score)/seeds.length;}
      if(!option||value>option.value)option={action,value};
    }
    if(option.value>best.f.score*(v.coins>=20?.5:1))return option.action;
  }
  return best.action;
}
