import {
  act,
  PACKS, canTakeToken, canBuyPack, TRINKETS, trinketValue, trinketCost, TYPES,
  clone,
  legalActions,
  previewAction,
  rulesFor,
  random,
} from "../engine.mjs";
export const POLICY_NAMES = ["random", "greedy", "spender", "rollout", "builder", "specialist"];
// The policy receives only information visible to a player. Never pass the
// game's RNG, run seed, future boards or outcome traces to a decision function.
export function observe(state) {
  return {
    board: clone(state.board),
    status:state.status, draft:clone(state.draft),shop:clone(state.shop),tokens:clone(state.tokens),
    config: clone(state.config),
    round: state.round,
    score: state.score,
    coins: state.coins,
    moves: state.moves,
  };
}
function visibleSwaps(view, cache) {
  const key=JSON.stringify(view.board.map(d=>[d.n,d.special,d.mult,d.gold,d.shiny]));
  if(cache?.has(key)) return cache.get(key);
  const moves=legalActions(view.board).map((action) => ({
    action,
    immediate: previewAction(view.board, action, view.config),
  }));
  cache?.set(key,moves);
  return moves;
}
export function makePolicy(
  name,
  { seed = 0x91f31, samples = 6, coinValue = 4 } = {},
) {
  if (!POLICY_NAMES.includes(name)) throw Error(`Unknown policy: ${name}`);
  const privateRandom = { rng: seed >>> 0 };
  let decisions = 0;
  return {
    name,
    choose(view) {
      decisions++;
      if(view.status === "draft") {
        const candidates=view.draft.offers.flatMap((t,index)=>!view.draft.picks.includes(index)&&canTakeToken(view,t)?[{type:"choose_token",index,token:t}]:[]);
        const priorities={"multi-3":12,"multi-4":8,"multi-5":5,"multi-6":3,number:6,bomb:5,row:4,column:4,twenty:3,wild:7,shiny:8,color:2+view.config.rates.reduce((a,b)=>a+b,0)/20};
        const pick=name==="random" ? candidates[Math.floor(random(privateRandom)*candidates.length)] : candidates.sort((a,b)=>priorities[b.token]-priorities[a.token])[0];
        if(!pick) throw Error("No eligible token choice");
        return {type:"choose_token",index:pick.index};
      }
      if(view.status === "roundwon") return {type:"visit_shop"};
      if(view.status === "shop") {
        const r=rulesFor(view.config);
        const itemRank=t=>t.tier?16/(t.tier-2):({quad:30,convert:view.config.trinkets.includes('ones')?26:18,ones:view.config.trinkets.includes('convert')?25:14,cascade:12,rainbow:view.config.trinkets.includes('convert')?0:8,bigbomb:2+view.config.rates[TYPES.indexOf('bomb')]*4,widecolumn:2+view.config.rates[TYPES.indexOf('column')]*4,widerow:2+view.config.rates[TYPES.indexOf('row')]*4}[t.id]??0);
        const items=(view.shop.offers??[]).filter(id=>!view.shop.sold.includes(id)&&!view.config.trinkets.includes(id));
        const preferred=items.map(id=>TRINKETS.find(t=>t.id===id)).sort((a,b)=>itemRank(b)-itemRank(a));
        const owned=view.config.trinkets.map(id=>TRINKETS.find(t=>t.id===id)).sort((a,b)=>itemRank(a)-itemRank(b));
        if(name!=='specialist'&&owned.length>=r.trinketSlots&&preferred.length&&itemRank(preferred[0])>itemRank(owned[0])&&view.coins+Math.floor(trinketCost(owned[0],view.config)/2)>=trinketCost(preferred[0],view.config))
          return {type:'sell_trinket',id:owned[0].id};
        const affordable=preferred.filter(t=>view.coins>=trinketCost(t,view.config));
        const wantItem=name!=='specialist'&&view.config.trinkets.length<r.trinketSlots&&affordable.length;
        if(wantItem&&(name==='builder'||view.shop.bought||view.round%2===1||name==='random'&&random(privateRandom)<.5)) {
          const item=name==='random'?affordable[Math.floor(random(privateRandom)*affordable.length)]:affordable[0];return {type:'buy_trinket',id:item.id};
        }
        const packs=PACKS.filter(p=>canBuyPack(view,p));
        if(packs.length) {
          const rate=view.config.rates.reduce((a,b)=>a+b,0);
          const id=name==='builder'?'multi':name==='specialist'?'assorted':view.round%2===1?'multi':'assorted';
          const pack=name==='random'?packs[Math.floor(random(privateRandom)*packs.length)]:packs.find(p=>p.id===id)??packs[0];
          return {type:'buy_pack',pack:pack.id};
        }
        if(wantItem) return {type:'buy_trinket',id:affordable[0].id};
        return {type:"next_round"};
      }
      // Rules are fixed within this choice. Many special-heavy reroll samples
      // leave the same visible board; reuse their exact production previews.
      const previewCache=new Map();
      const swaps = visibleSwaps(view,previewCache);
      if (!swaps.length) throw Error("Policy received a dead board");
      if (name === "random")
        return swaps[Math.floor(random(privateRandom) * swaps.length)].action;
      const greedy = swaps.reduce((a, b) =>
        a.immediate.score >= b.immediate.score ? a : b,
      );
      if (["greedy","builder","specialist"].includes(name)) return greedy.action;
      const cost = rulesFor(view.config).rerollCost;
      if (name === "spender" && view.coins < cost) return greedy.action;
      // Common random samples reduce noise between alternatives. They are drawn
      // exclusively from the policy RNG, independently of the actual run seed.
      const seeds = Array.from({ length: samples }, () =>
        Math.floor(random(privateRandom) * 4294967296),
      );
      const estimate = (action) => {
        let gain = 0,
          setup = 0,
          coins = 0,
          completion = 0;
        for (const seed of seeds) {
          const simulated = {
            version: 7,
            seed: 0,
            rng: seed,
            nextId: Math.max(...view.board.map((d) => d.id)) + 1,
            ...clone(view),
            turn: 0,
            total: 0,
            bestChain: 0,
            status: "playing",
            history: [],
          };
          const out = act(simulated, action);
          if (!out) throw Error("Policy proposed an invalid sampled action");
          const need = view.config.targets[view.round] - view.score;
          gain += Math.min(need, out.summary.score);
          coins += out.summary.coinsEarned;
          if (out.state.status === "won" || out.state.status === "roundwon")
            completion++;
          else if (out.state.status === "playing") {
            const next = visibleSwaps(observe(out.state),previewCache);
            setup += next.length
              ? Math.min(
                  Math.max(0, need - out.summary.score),
                  Math.max(...next.map((x) => x.immediate.score)),
                )
              : 0;
          }
        }
        return {
          gain: gain / samples,
          setup: setup / samples,
          coins: coins / samples,
          completion: completion / samples,
        };
      };
      if (view.coins >= cost) {
        const areas = Array.from({ length: 25 }, (_, i) => ({
          type: "reroll",
          index: Math.floor(i / 5) * 6 + (i % 5),
        }));
        let best = null;
        for (const action of areas) {
          const e = estimate(action);
          const value =
            e.gain + e.setup + e.coins * coinValue + e.completion * 25;
          if (!best || value > best.value) best = { action, value, e };
        }
        // Spender is deliberately aggressive: a control for the value and risks
        // of spending as soon as possible. Rollout spends only when sampled gains
        // plus the next board's best visible match exceed keeping the current
        // match and a fixed shadow price for the coins.
        if (
          name === "spender" ||
          best.value > greedy.immediate.score + cost * coinValue
        )
          return best.action;
      }
      if (name === "spender") return greedy.action;
      let best = null;
      for (const x of swaps) {
        const e = estimate(x.action);
        const value =
          e.gain + 0.35 * e.setup + coinValue * e.coins + 25 * e.completion;
        if (!best || value > best.value) best = { action: x.action, value };
      }
      return best.action;
    },
    get decisions() {
      return decisions;
    },
  };
}
