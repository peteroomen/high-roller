const TYPES = ["column", "color", "number", "bomb", "twenty", "row", "wild", "shiny"];
const COLORS = ["Coral", "Amber", "Green", "Blue", "Violet", "Rose"];
const DEFAULTS = {
  moves: 10,
  targets: [220, 500, 1000, 1700, 2700, 4000, 5500, 7200, 9500],
  stageLength: 3,
  rates: [0, 0, 0, 0, 0, 0, 0, 0],
  lowBonus: true,
  draft: true,
};
const RULES = Object.freeze({
  rerollCost: 3,
  // Research opt-in; zero preserves the live game.
  singleRerollsPerRound: 0,
  tokenBoost: 1,
  specialPips: 10,
  goldRate: 5,
  shinyFactor: 1.5,
  specialWeights: {column:4,row:4,twenty:5,bomb:2,number:2,wild:1,shiny:1,color:1},
  charmValues: {ones:1,cascade:1,quad:4,rainbow:10},
  charmPrices: {convert:6,ones:7,cascade:6,quad:20,rainbow:7,bigbomb:8,widecolumn:8,widerow:8},
  charmWeights: {convert:3,ones:3,cascade:3,quad:.7,rainbow:2,bigbomb:2,widecolumn:2,widerow:2},
  packCost: 5,
  packStageIncrease: 0,
  roundReward: 5,
  multiPackCost: 4,
  levelBoost: [2, 4, 6, 8],
  trinketPips: [16, 32, 56, 88],
  trinketMult: [2, 4, 8, 12],
  trinketCost: 5,
  trinketSlots: 4,
  cascadeStep: 1,
  lowMult: 1,
  sizeMult: [2, 3, 4, 5],
  maxWaves: 80,
  specialMult: { column: 2, color: 2, number: 2, bomb: 2, twenty:0, row:2, wild:0, shiny:0 },
});
function rulesFor(config) {
  return {
    ...RULES,
    ...config.rules,
    ...Object.fromEntries(["specialWeights","charmValues","charmPrices","charmWeights"].map(k=>[k,{...RULES[k],...config.rules?.[k]}])),
    specialMult: { ...RULES.specialMult, ...config.rules?.specialMult },
  };
}
const MATCH_TIERS = [3, 4, 5, 6];
const tierFor = size => Math.min(6, size);
const tierLabel = tier => tier === 6 ? "6+" : String(tier);
const TRINKETS = [...MATCH_TIERS.flatMap(tier => ["pips", "mult"].map(stat => ({
  id: `${stat}-${tier}`, tier, stat, name: `${tierLabel(tier)} ${stat === "pips" ? "Pip" : "Mult"} Die`,
}))),
  {id:'convert',name:'Six to One',icon:'convert',description:'New 6s become 1s',weight:3},
  {id:'cascade',name:'Echo Die',icon:'cascade',description:'+1 Mult per cascade wave',weight:3},
  {id:'ones',name:'One More',icon:'ones',description:'+1 Mult per cleared 1',weight:3},
  {id:'quad',name:'Loaded Die',icon:'quad',description:'×4 final Mult',weight:.7},
  {id:'rainbow',name:'Full Spectrum',icon:'rainbow',description:'+10 Mult for clearing all six numbers in one move',weight:2},
  {id:'bigbomb',name:'Big Bang',icon:'bigbomb',description:'Bombs clear 5×5',weight:2},
  {id:'widecolumn',name:'Broad Columns',icon:'widecolumn',description:'Column clears are 3 wide',weight:2},
  {id:'widerow',name:'Broad Rows',icon:'widerow',description:'Row clears are 3 wide',weight:2},
];
const has=(config,id)=>Boolean(config.trinkets?.includes(id));
const activeSpecial=d=>['column','row','bomb','number','color'].includes(d?.special);
const pipValue=(d,config)=>numbered(d)?d.n:d?.special==='twenty'?20:d?.special?rulesFor(config).specialPips:0;
const trinketCost=(item,config)=>item.tier?rulesFor(config).trinketCost:rulesFor(config).charmPrices[item.id];
const trinketDescription=(t,c)=>t.tier?`+${trinketValue(t,c)} ${t.stat} per ${tierLabel(t.tier)}-match`:t.id==='quad'?`×${rulesFor(c).charmValues.quad} final Mult`:t.id==='ones'?`+${rulesFor(c).charmValues.ones} Mult per cleared 1`:t.id==='cascade'?`+${rulesFor(c).charmValues.cascade} Mult per cascade wave`:t.id==='rainbow'?`+${rulesFor(c).charmValues.rainbow} Mult for all six numbers${has(c,'convert')?' · blocked by Six to One':' in a move'}`:t.description;
function trinketValue(item, config) { if(!item.tier)return rulesFor(config).charmValues[item.id]??0; return rulesFor(config)[item.stat === "pips" ? "trinketPips" : "trinketMult"][item.tier - 3]; }
function matchMult(tier, config) {
  const r=rulesFor(config);
  return (r.sizeMult[tier - 3] ?? r.sizeMult[2]) + (config.matchLevels?.[tier] ?? 0) * r.levelBoost[tier - 3];
}
function stageInfo(round, config) {
  const length=config.stageLength ?? 3;
  const number=Math.floor(round/length)+1;
  return {number, total:Math.ceil(config.targets.length/length), leg:round%length+1, length:Math.min(length,config.targets.length-(number-1)*length), name:["Opening Table","High Stakes","Final Table"][number-1] ?? `Table ${number}`};
}
const clone = (x) => structuredClone(x);
function random(s) {
  s.rng = (s.rng + 1831565813) >>> 0;
  let t = s.rng;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}
function rollFace(s) {const n=1+Math.floor(random(s)*6);const converted=n===6&&has(s.config,'convert');if(converted)s.faceConversions=(s.faceConversions??0)+1;return {n:converted?1:n,converted};}
function die(s) {
  const {n,converted}=rollFace(s),roll=random(s)*Math.max(100,s.config.rates.reduce((a,b)=>a+b,0));
  let total=0,special=null;
  for(let k=0;k<TYPES.length;k++){total+=s.config.rates[k]??0;if(roll<total){special=TYPES[k];break;}}
  const shiny=special==='shiny';if(shiny)special=null;
  const gold=!special&&random(s)*100<rulesFor(s.config).goldRate;
  return {id:s.nextId++,n:special?null:n,color:special?null:n-1,special,shiny,gold,converted:!special&&converted,
    ...(special?{mult:rulesFor(s.config).specialMult[special]}:{})};
}
function numbered(d) {
  return Boolean(
    d && !d.special && Number.isInteger(d.n) && d.n >= 1 && d.n <= 6,
  );
}
function specialMultiplier(d, config = DEFAULTS) {
  return Number.isFinite(d.mult) && d.mult >= 0
    ? d.mult
    : rulesFor(config).specialMult[d.special];
}
function ordinaryMatches(b) {
  const runs = [];
  for (let axis = 0; axis < 2; axis++)
    for (let line = 0; line < 6; line++) {
      let run = [];
      for (let p = 0; p <= 6; p++) {
        let i = axis ? p * 6 + line : line * 6 + p;
        if (p < 6 && numbered(b[i]) && (!run.length || b[i].n === b[run[0]].n))
          run.push(i);
        else {
          if (run.length >= 3) runs.push(run);
          run = p < 6 && numbered(b[i]) ? [i] : [];
        }
      }
    }
  const groups = [];
  for (const run of runs) {
    let set = new Set(run);
    for (let i = groups.length - 1; i >= 0; i--)
      if (groups[i].some((x) => set.has(x))) {
        groups[i].forEach((x) => set.add(x));
        groups.splice(i, 1);
      }
    groups.push([...set].sort((a, b2) => a - b2));
  }
  return groups;
}
// A wild has one identity per wave: longest available run, then higher number,
// then horizontal/board order. It cannot glue two different numbers into one group.
function matches(b) {
  if(!b.some(d=>d.special==='wild'))return ordinaryMatches(b);
  const candidates=[];
  for(let n=1;n<=6;n++) for(let axis=0;axis<2;axis++)for(let line=0;line<6;line++) {
    let run=[];
    for(let p=0;p<=6;p++) {
      const i=axis?p*6+line:line*6+p;
      if(p<6&&(b[i].special==='wild'||numbered(b[i])&&b[i].n===n))run.push(i);
      else {if(run.length>=3)candidates.push({n,axis,run});run=[];}
    }
  }
  candidates.sort((a,c)=>c.run.length-a.run.length||c.n-a.n||a.axis-c.axis||a.run[0]-c.run[0]);
  const assigned=new Map(),groups=[];
  for(const {n,run} of candidates) {
    let segment=[];
    const accept=()=>{
      if(segment.length<3){segment=[];return;}
      const set=new Set(segment);for(const i of segment)if(b[i].special==='wild')assigned.set(i,n);
      for(let j=groups.length-1;j>=0;j--)if(groups[j].some(i=>set.has(i))){groups[j].forEach(i=>set.add(i));groups.splice(j,1);}
      groups.push([...set].sort((a,c)=>a-c));segment=[];
    };
    for(const i of run){if(assigned.has(i)&&assigned.get(i)!==n)accept();else segment.push(i);}accept();
  }
  return groups;
}
function adjacent(a, b) {
  return (
    Number.isInteger(a) &&
    Number.isInteger(b) &&
    a >= 0 &&
    b >= 0 &&
    a < 36 &&
    b < 36 &&
    Math.abs((a % 6) - (b % 6)) +
      Math.abs(Math.floor(a / 6) - Math.floor(b / 6)) ===
      1
  );
}
function swap(b, a, c) {
  [b[a], b[c]] = [b[c], b[a]];
}
function legalMoves(b) {
  const out = [];
  for (let a = 0; a < 36; a++)
    for (const c of [a % 6 < 5 ? a + 1 : -1, a < 30 ? a + 6 : -1]) {
      if (c < 0) continue;
      swap(b, a, c);
      const groups = matches(b);
      swap(b, a, c);
      if (groups.length || activeSpecial(b[a]) || activeSpecial(b[c]))
        out.push({ a, b: c, groups });
    }
  return out;
}
function freshBoard(s) {
  for(let attempt=0;attempt<100;attempt++) {
    const b=[];
    for(let i=0;i<36;i++) {
      let d=die(s);
      // Starting boards never contain automatic matches, including wild runs.
      for(let tries=0;tries<50;tries++) {
        const conflict=[i%6>1?[i-2,i-1]:[],i>=12?[i-12,i-6]:[]].some(pair=>pair.length&&[1,2,3,4,5,6].some(n=>[...pair.map(j=>b[j]),d].every(x=>x.special==='wild'||numbered(x)&&x.n===n)));
        if(!conflict)break;
        d={...d,...rollFace(s),special:null,shiny:false,color:0};
      }
      d.color=d.special?null:d.n-1;b.push(d);
    }
    if(!matches(b).length&&legalActions(b).length)return b;
  }
  throw Error('Unable to construct playable board');
}
function newGame(seed = Date.now() >>> 0, config = DEFAULTS) {
  const s = {
    version: 7,
    seed: seed >>> 0,
    rng: seed >>> 0,
    nextId: 1,
    faceConversions:0,
    config: { matchLevels:{3:0,4:0,5:0,6:0},trinkets:[], ...clone(config), rates: TYPES.map((_, i) => config.rates[i] ?? 0) },
    initialConfig: clone(config),
    round: 0,
    score: 0,
    total: 0,
    coins: 0,
    moves: config.moves,
    turn: 0,
    bestChain: 0,
    status: "playing",
    history: [],
    tokens: Object.fromEntries(TYPES.map(t=>[t,0])),
    draft: null,
    shop: null,
  };
  s.board = freshBoard(s);
  if(config.draft !== false) {
    const offers=tokenOffers(s,3,TYPES.filter(t=>t!=="color"));
    if(offers.length) {s.status="draft";s.draft={kind:"starter",offers,picks:[],limit:1};}
  }
  return s;
}
function effect(b, i, type, targetN = b[i].n, config = DEFAULTS) {
  const r = Math.floor(i / 6),
    c = i % 6;
  return b.flatMap((x, j) => {
    let yes = false;
    if (type === "column") yes = Math.abs(j % 6 - c) <= (has(config,'widecolumn')?1:0);
    if (type === "row") yes = Math.abs(Math.floor(j / 6) - r) <= (has(config,'widerow')?1:0);
    // Legacy type key retained for existing saves; colour now denotes special dice.
    if (type === "color") yes = Boolean(x.special);
    if (type === "number") yes = numbered(x) && x.n === targetN;
    if (type === "bomb")
      yes = Math.abs(Math.floor(j / 6) - r) <= (has(config,'bigbomb')?2:1) && Math.abs((j % 6) - c) <= (has(config,'bigbomb')?2:1);
    return yes ? [j] : [];
  });
}
function legalActions(b) {
  return legalMoves(b).map(({a,b}) => ({type:"swap",a,b}));
}
function mostCommonNumber(b) {
  const counts = Array(7).fill(0);
  for (const d of b) if (numbered(d)) counts[d.n]++;
  return [6,5,4,3,2,1].reduce((best,n) => counts[n] > counts[best] ? n : best,6);
}
// Positions are after swapping. Only the effect footprint is claimed; the
// partner never receives an extra inclusion simply for having been swapped.
function swapRoots(b,a,c) {
  const g=matches(b);
  return [a,c].filter(index=>activeSpecial(b[index]) || b[index].special==='twenty'&&g.some(group=>group.includes(index===a?c:a))).map(index=>({
    index, targetN: b[index===a?c:a].n ?? mostCommonNumber(b), trigger:"swap"
  }));
}
function previewAction(b,action,config) {
  if(action.type === "swap") return preview(b,action.a,action.b,config);
  return null;
}
function wave(b, groups, depth, config, roots = []) {
  const rules = rulesFor(config),
    cascade = depth * rules.cascadeStep;
  const cleared = new Set(),
    claims = new Map(),
    candidates = [],
    activations = [],
    visited = new Set();
  const queue = roots.map((r) => ({ ...r }));
  const direct = new Set(roots.map((r) => r.index));
  const claim = (i, entry) => {
    cleared.add(i);
    if (!pipValue(b[i],config)) return;
    if (!claims.has(i)) claims.set(i, entry);
  };
  for (const g of groups) {
    const size = (rules.sizeMult[Math.min(g.length - 3,3)] ?? rules.sizeMult[2]);
    const tier=tierFor(g.length);
    const upgrade=(config.matchLevels?.[tier] ?? 0)*rules.levelBoost[tier-3];
    const trinkets=TRINKETS.filter(t=>t.tier===tier && config.trinkets?.includes(t.id)).map(t=>({...t,value:trinketValue(t,config)}));
    const pipBonus=trinkets.filter(t=>t.stat==='pips').reduce((n,t)=>n+t.value,0);
    const trinketMult=trinkets.filter(t=>t.stat==='mult').reduce((n,t)=>n+t.value,0);
    const face=g.map(i=>b[i]).find(numbered)?.n??6;
    const low = config.lowBonus && face <= 2 ? rules.lowMult : 0;
    const entry = {
      kind: "match",
      matchSize: g.length,
      affected: [...g],
      size,
      low,
      cascade,
      upgrade, trinkets, pipBonus, trinketMult,
      mult: size + upgrade + low + cascade + trinketMult,
      face, label: `${g.length} × ${face}`,
    };
    candidates.push(entry);
    for (const i of g) claim(i, entry);
  }
  let coins = 0;
  for (let q = 0; q < queue.length; q++) {
    const r = queue[q],
      d = b[r.index];
    if (!d?.special || visited.has(r.index)) continue;
    visited.add(r.index);
    cleared.add(r.index);
    const size = specialMultiplier(d, config);
    activations.push({
      index: r.index,
      type: d.special,
      mult: size,
      trigger: direct.has(r.index) ? "swap" : "chain",
      targetN: r.targetN,
    });

    const label = {
      column: "Column",
      row: "Row",
      color: "Special sweep",
      number: "Number sweep",
      bomb: "Bomb",
      twenty:"Twenty", wild:"Wild",
    }[d.special];
    const entry = {
      kind: "blast",
      specialType: d.special,
      sourceIndex: r.index,
      size,
      low: 0,
      cascade:d.special==='twenty'||d.special==='wild'?0:cascade,
      mult: size + (d.special==='twenty'||d.special==='wild'?0:cascade),
      label,
    };
    candidates.push(entry);
    const targets = new Set([
      r.index,
      ...effect(b, r.index, d.special, r.targetN, config),
    ]);
    entry.affected = [...targets];
    for (const i of targets) {
      claim(i, entry);
      if (b[i].special && !visited.has(i))
        queue.push({
          index: i,
          targetN: r.targetN,
          trigger: "chain",
        });
    }
  }
  const entries = candidates
    .map((e) => {
      const indices = [...claims]
        .filter(([, owner]) => owner === e)
        .map(([i]) => i);
      const dicePips = indices.reduce((sum, i) => sum + pipValue(b[i],config), 0);
      const pips=dicePips+(e.pipBonus??0);
      return {
        ...e,
        indices,
        dicePips, pips, pipValues:indices.map(i=>pipValue(b[i],config)),
        label:
          e.kind === "match" && indices.length < e.matchSize
            ? `${e.matchSize}-match · ${indices.length} dice`
            : e.label,
        score: pips * e.mult,
      };
    })
    ;
  const natural=new Set(groups.flat());
  const bonuses=[];
  for(const i of natural)if(b[i].gold)coins++;
  const ones=[...cleared].filter(i=>numbered(b[i])&&b[i].n===1).length;
  if(ones&&has(config,'ones'))bonuses.push({source:'ones',value:ones*rules.charmValues.ones,op:'add',label:'One More'});
  if(depth>0&&has(config,'cascade'))bonuses.push({source:'cascade',value:rules.charmValues.cascade,op:'add',label:'Echo Die'});
  for(const i of natural) if(b[i].shiny)bonuses.push({indices:[i],value:rules.shinyFactor,op:'multiply',label:'Shiny'});
  const upgrades=activations.flatMap(a=>{const id={bomb:'bigbomb',column:'widecolumn',row:'widerow'}[a.type];return id&&has(config,id)?[id]:[];});
  const pips=entries.reduce((n,e)=>n+e.pips,0), mult=entries.reduce((n,e)=>n+e.mult,0);
  for(const entry of entries) entry.score=pips*entry.mult;
  return {
    groups, bonuses, upgrades,
    numbers:[...new Set([...cleared].filter(i=>numbered(b[i])).map(i=>b[i].n))],
    goldMatches:[...natural].filter(i=>b[i].gold).length, shinyMatches:[...natural].filter(i=>b[i].shiny).length,
    wildClears:[...cleared].filter(i=>b[i].special==='wild').length,
    cleared: [...cleared],
    activations,
    coins,
    entries,
    pips, mult,
    score: pips * mult,
    depth,
  };
}
// Upgrade saved boards without inventing pips for special dice.
function restoreGame(saved) {
  if(!saved||![1,2,3,4,5,6,7].includes(saved.version)||saved.board?.length!==36||!saved.board.every(d=>numbered(d)||TYPES.includes(d.special)||d.special==='coin'))return null;
  const s=clone(saved);
  s.initialConfig??=clone(s.config);s.config.matchLevels??={3:0,4:0,5:0,6:0};s.config.trinkets??=[];
  if(saved.version<7) {
    for(const c of [s.config,s.initialConfig]) {
      c.rates=TYPES.map((_,i)=>i===4||i>=6?0:c.rates?.[i]??0);
      // Old goals persist, but obsolete cap/token/payout rules are removed.
      if(c.rules){delete c.rules.tokenTypeCap;delete c.rules.specialRateCap;delete c.rules.tokenBoost;}
    }
    s.board=s.board.map(d=>d.special==='coin'?{...d,special:null,n:d.id%6+1,gold:true,shiny:false}:d);
    if(s.draft){s.draft.offers=s.draft.offers.map(t=>t==='coin'?'twenty':t);s.draft.limit=Math.min(s.draft.offers.length,s.draft.picks.length+1);}
  }
  s.tokens=Object.fromEntries(TYPES.map(t=>[t,s.tokens?.[t]??0]));
  s.draft??=null;s.shop??=null;if(s.shop){s.shop.offers??=[];s.shop.sold??=[];}
  s.config.rates=TYPES.map((_,i)=>s.config.rates[i]??0);
  s.board=s.board.map(d=>d.special?{...d,n:null,color:null,mult:specialMultiplier(d,s.config)}:{...d,color:d.n-1});
  s.faceConversions??=0;s.version=7;return s;
}
function collapse(s, cleared) {
  const removed = new Set(cleared);
  const b = Array(36);
  for (let c = 0; c < 6; c++) {
    const remain = [];
    for (let r = 5; r >= 0; r--)
      if (!removed.has(r * 6 + c)) remain.push(s.board[r * 6 + c]);
    for (let r = 5; r >= 0; r--) b[r * 6 + c] = remain[5 - r] || die(s);
  }
  s.board = b;
}
function reshuffle(s) {
  const b = s.board;
  for (let a = 0; a < 200; a++) {
    for (let i = 35; i > 0; i--) {
      const j = Math.floor(random(s) * (i + 1));
      swap(b, i, j);
    }
    if (!matches(b).length && legalActions(b).length) return;
  }
  s.board = freshBoard(s);
}
function act(original, action) {
  if (original.status !== "playing") return progressAction(original, action);
  const s = clone(original),
    frames = [],
    rules = rulesFor(original.config);
  let roots = [];
  if (action.type === "swap") {
    if (!adjacent(action.a, action.b)) return null;
    swap(s.board, action.a, action.b);
    roots = swapRoots(s.board, action.a, action.b);
    if (!matches(s.board).length && !roots.length) return null;
    s.moves--;

  } else if (action.type === "reroll_single") {
    if (!Number.isInteger(action.index) || action.index < 0 || action.index > 35 ||
        s.board[action.index].special || (s.singleRerollsUsed ?? 0) >= rules.singleRerollsPerRound) return null;
    s.singleRerollsUsed = (s.singleRerollsUsed ?? 0) + 1;
    const face = rollFace(s);
    s.board[action.index] = {...s.board[action.index], ...face, color: face.n - 1};
  } else if (action.type === "reroll") {
    if (
      s.coins < rules.rerollCost ||
      !Number.isInteger(action.index) ||
      action.index < 0 ||
      action.index > 35
    )
      return null;
    s.coins -= rules.rerollCost;
    const r = Math.min(4, Math.floor(action.index / 6)),
      c = Math.min(4, action.index % 6);
    for (const i of [
      r * 6 + c,
      r * 6 + c + 1,
      (r + 1) * 6 + c,
      (r + 1) * 6 + c + 1,
    ])
      if (!s.board[i].special) {
        const face = rollFace(s);
        s.board[i] = { ...s.board[i], ...face, color: face.n - 1 };
      }
  } else return null;
  s.turn++;
  const initial = clone(s.board);
  let groups = matches(s.board),
    depth = 0,
    resolutionCapped = false,
    movePips = 0, moveMult = 0, moveScore = 0;
  const numbers=new Set();let rainbowPaid=false;
  while (groups.length || roots.length) {
    const f = wave(s.board, groups, depth, s.config, roots);
    roots = [];
    f.before = clone(s.board);
    f.numbers.forEach(n=>numbers.add(n));
    if(numbers.size===6&&!rainbowPaid&&has(s.config,'rainbow')) {f.bonuses.unshift({source:'rainbow',value:rules.charmValues.rainbow,op:'add',label:'Full Spectrum'});rainbowPaid=true;}
    movePips+=f.pips; moveMult+=f.mult;
    for(const bonus of f.bonuses)moveMult=applyBonus(moveMult,bonus);
    f.score=Math.floor(movePips*moveMult)-moveScore;
    moveScore=Math.floor(movePips*moveMult);
    f.runningPips=movePips; f.runningMult=moveMult;
    s.score += f.score;
    s.total += f.score;
    s.coins += f.coins;
    collapse(s, f.cleared);
    f.after = clone(s.board);
    frames.push(f);
    depth++;
    if (depth >= rules.maxWaves && matches(s.board).length) {
      resolutionCapped = true;
      s.board = freshBoard(s);
      break;
    }
    groups = matches(s.board);
  }
  if(frames.length&&has(s.config,'quad')) {
    const f=frames.at(-1),bonus={source:'quad',value:rules.charmValues.quad,op:'multiply',label:'Loaded Die'};
    f.bonuses.push(bonus);moveMult=applyBonus(moveMult,bonus);
    const extra=Math.floor(movePips*moveMult)-moveScore;f.score+=extra;s.score+=extra;s.total+=extra;moveScore+=extra;f.runningMult=moveMult;
  }
  s.bestChain = Math.max(s.bestChain, depth);
  let shuffled = false;
  if (s.score >= s.config.targets[s.round])
    s.status = s.round === s.config.targets.length - 1 ? "won" : "roundwon";
  else if (s.moves <= 0) s.status = "lost";
  else if (!legalActions(s.board).length) {
    reshuffle(s);
    shuffled = true;
  }
  const roundPayout=s.status==='won'?rules.roundReward+Math.max(0,s.moves):0;s.coins+=roundPayout;
  for(const f of frames) for(const entry of f.entries) entry.score=movePips*entry.mult;
  const summary = {
    action: clone(action),
    ruleVersion: 7,
    pips: movePips, mult: moveMult,
    rawMult:frames.reduce((n,f)=>n+f.mult+f.bonuses.filter(b=>b.op==='add').reduce((a,b)=>a+b.value,0),0),
    bonuses:frames.flatMap(f=>f.bonuses), numbers:[...numbers],
    directSpecials: frames
      .flatMap((f) => f.activations)
      .filter((a) => a.trigger === "swap").length,
    resolutionCapped,
    shuffled,
    roundPayout, coinsEarned: roundPayout+frames.reduce((a, f) => a + f.coins, 0),
    coinsSpent: action.type === "reroll" ? rules.rerollCost : 0,
    turn: s.turn,
    round: s.round + 1,
    score: frames.reduce((a, f) => a + f.score, 0),
    waves: depth,
    specials: frames.flatMap((f) => f.activations).length,
    entries: frames.flatMap((f) =>
      f.entries.map((e) => ({
        label: e.label,
        kind: e.kind,
        specialType: e.specialType,
        matchSize:e.matchSize, face:e.face, upgrade:e.upgrade??0, trinkets:e.trinkets??[], pipBonus:e.pipBonus??0, trinketMult:e.trinketMult??0, dicePips:e.dicePips,
        pips: e.pips,
        mult: e.mult,
        size: e.size,
        low: e.low,
        cascade: e.cascade,
        score: e.score,
      })),
    ),
  };
  s.history.push(summary);
  return { state: s, initial, frames, shuffled, resolutionCapped, summary };
}
const PACKS = [
  {id:'multi',name:'Count Me In',note:'Match level token',kind:'multi'},
  {id:'assorted',name:'Lucky Dip',note:'Special die token',pool:TYPES},
];
function canTakeToken(s,type) {
  if(/^multi-[3-6]$/.test(type))return !s.config.disableUpgrades;
  return rulesFor(s.config).tokenBoost>0&&TYPES.includes(type)&&!s.config.disabledTypes?.includes(type);
}
function weightedPick(s,items,weight) {
  const total=items.reduce((n,t)=>n+Math.max(0,weight(t)),0);if(!total)return null;
  let roll=random(s)*total;for(const t of items){roll-=Math.max(0,weight(t));if(roll<0)return t;}return items.at(-1);
}
function tokenOffers(s,count,pool=TYPES) {
  const offers=[],weights=rulesFor(s.config).specialWeights;
  while(offers.length<count){const eligible=pool.filter(t=>canTakeToken(s,t)&&!offers.includes(t));const pick=weightedPick(s,eligible,t=>weights[t]??1);if(!pick)break;offers.push(pick);}return offers;
}
const applyBonus=(mult,b)=>b.op==='multiply'?Math.round(mult*b.value*100)/100:mult+b.value;

function packCost(pack,config,round=0) {const r=rulesFor(config);return (pack.kind==='multi'?r.multiPackCost:r.packCost)+Math.floor(round/(config.stageLength??3))*r.packStageIncrease;}
function canBuyPack(s,pack) {
  return !s.shop?.bought && s.coins>=packCost(pack,s.config,s.round) && (pack.kind==='multi'?!s.config.disableUpgrades:TYPES.some(t=>canTakeToken(s,t)));
}
function trinketOffers(s) {
  if(s.config.disableTrinkets)return [];
  const offers=[],r=rulesFor(s.config);
  while(offers.length<4){const eligible=TRINKETS.filter(t=>!s.config.trinkets.includes(t.id)&&!offers.includes(t.id)&&!s.config.disabledTrinkets?.includes(t.id));const pick=weightedPick(s,eligible,t=>t.tier?3:r.charmWeights[t.id]);if(!pick)break;offers.push(pick.id);}return offers;
}
function progressAction(original,action) {
  const s=clone(original), r=rulesFor(s.config);
  let coinsEarned=0,coinsSpent=0,tokenType=null,trinketId=null;
  if(action.type==="choose_token" && s.status==="draft") {
    const d=s.draft;
    if(!Number.isInteger(action.index) || action.index<0 || action.index>=d.offers.length || d.picks.includes(action.index)) return null;
    tokenType=d.offers[action.index];
    if(!canTakeToken(s,tokenType)) return null;
    if(tokenType.startsWith('multi-')) {
      const tier=Number(tokenType.slice(6));s.config.matchLevels[tier]=(s.config.matchLevels[tier]??0)+1;
    } else {
      s.config.rates[TYPES.indexOf(tokenType)]+=r.tokenBoost;
      s.tokens[tokenType]++;
    }
    d.picks.push(action.index);
    if(d.picks.length>=d.limit || !d.offers.some((t,i)=>!d.picks.includes(i)&&canTakeToken(s,t))) {
      s.status=d.kind==="starter"?"playing":"shop";
      if(d.kind==="starter") s.board=freshBoard(s);
      s.draft=null;
    }
  } else if(action.type==="visit_shop" && s.status==="roundwon") {
    coinsEarned=r.roundReward+Math.max(0,s.moves);
    s.coins+=coinsEarned;
    s.status="shop"; s.shop={bought:false,reward:coinsEarned,offers:trinketOffers(s),sold:[]};
  } else if(action.type==="buy_pack" && s.status==="shop") {
    const pack=PACKS.find(p=>p.id===action.pack);
    if(!pack || !canBuyPack(s,pack)) return null;
    // Numbered packs reveal all four tiers and one extra weighted toward common matches.
    const tiers=[...MATCH_TIERS];const offers=pack.kind==='multi' ? Array.from({length:3},()=>`multi-${tiers.splice(Math.floor(random(s)*tiers.length),1)[0]}`) : tokenOffers(s,3,pack.pool);
    if(!offers.length) return null;
    coinsSpent=packCost(pack,s.config,s.round); s.coins-=coinsSpent; s.shop.bought=true;
    s.status="draft";
    s.draft={kind:"pack",name:pack.name,offers,picks:[],limit:1};
  } else if(action.type==='buy_trinket' && s.status==='shop') {
    trinketId=action.id;
    if(s.config.disableTrinkets || !s.shop.offers?.includes(trinketId) || s.shop.sold?.includes(trinketId) || s.config.trinkets.includes(trinketId) || s.config.trinkets.length>=r.trinketSlots || s.coins<trinketCost(TRINKETS.find(t=>t.id===trinketId),s.config)) return null;
    s.config.trinkets.push(trinketId);s.shop.sold.push(trinketId);
    coinsSpent=trinketCost(TRINKETS.find(t=>t.id===trinketId),s.config);s.coins-=coinsSpent;
  } else if(action.type==='sell_trinket' && s.status==='shop') {
    trinketId=action.id;
    if(!s.config.trinkets.includes(trinketId)) return null;
    s.config.trinkets=s.config.trinkets.filter(id=>id!==trinketId);
    coinsEarned=Math.floor(trinketCost(TRINKETS.find(t=>t.id===trinketId),s.config)/2);s.coins+=coinsEarned;
  } else if(action.type==="next_round" && s.status==="shop") {
    s.round++; s.score=0; s.moves=s.config.moves; s.singleRerollsUsed=0; s.status="playing";
    s.shop=null; s.board=freshBoard(s);
  } else return null;
  const summary={action:clone(action),ruleVersion:7,turn:s.turn,round:s.round+1,
    score:0,pips:0,mult:0,waves:0,specials:0,directSpecials:0,entries:[],coinsEarned,coinsSpent,tokenType,trinketId};
  s.history.push(summary);
  return {state:s,initial:clone(s.board),frames:[],summary};
}
function nextRound(s) {
  return act(s,{type:s.status==="roundwon"?"visit_shop":"next_round"})?.state ?? s;
}
function preview(b, a, c, config) {
  if (!adjacent(a, c)) return null;
  const next = clone(b);
  swap(next, a, c);
  const g = matches(next);
  const roots=swapRoots(next,a,c);
  if(!g.length&&!roots.length)return null;
  return previewBoard(next,config,roots);
}
function previewBoard(next,config,roots=[]) {
  const f=wave(next,matches(next),0,config,roots);let mult=f.mult;
  if(f.numbers.length===6&&has(config,'rainbow'))mult+=rulesFor(config).charmValues.rainbow;
  for(const b of f.bonuses)mult=applyBonus(mult,b);
  if(has(config,'quad'))mult=applyBonus(mult,{op:'multiply',value:rulesFor(config).charmValues.quad});
  f.score=Math.floor(f.pips*mult);return f;
}
export {
  previewBoard, pipValue, activeSpecial, trinketCost, trinketDescription, weightedPick, applyBonus,
  PACKS, canTakeToken, canBuyPack, packCost,
  MATCH_TIERS, TRINKETS, tierFor, tierLabel, trinketValue, matchMult, stageInfo,
  legalActions, previewAction, mostCommonNumber,
  numbered,
  specialMultiplier,
  restoreGame,
  RULES,
  rulesFor,
  COLORS,
  DEFAULTS,
  TYPES,
  act,
  adjacent,
  clone,
  collapse,
  die,
  effect,
  freshBoard,
  legalMoves,
  matches,
  newGame,
  nextRound,
  preview,
  random,
  reshuffle,
  swap,
  wave,
};
