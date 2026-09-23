import fs from 'node:fs';
import {gunzipSync} from 'node:zlib';
import {createHash} from 'node:crypto';
import {pairedComparison,quantiles,wilson} from './runner.mjs';
import {TYPES,TRINKETS,rulesFor,trinketCost,trinketValue} from '../engine.mjs';
const dir='modelling/results/eight-stage/';
const read=p=>JSON.parse(fs.readFileSync(dir+p+'.json','utf8'));
const rows=(id,p)=>{const path=`${dir}${id}-${p}.ndjson`;return (fs.existsSync(path)?fs.readFileSync(path,'utf8'):gunzipSync(fs.readFileSync(path+'.gz')).toString()).trim().split('\n').map(JSON.parse);};
const policies=['balanced','cascade','large-supported','large','large6','specials'];
const names={balanced:'Flexible small matches',cascade:'Cascade / ones','large-supported':'4-match foundation + jackpots',large:'5-match focus',large6:'6+ focus',specials:'Special dice / footprint upgrades'};
const config=JSON.parse(fs.readFileSync('modelling/configs/eight-stage-v1.json'));
const cells=Object.fromEntries(policies.map(p=>[p,read('heldout-v1-'+p)]));
const data=Object.fromEntries(policies.map(p=>[p,rows('heldout-v1',p)]));
const q=x=>Number(x).toLocaleString('en-US',{maximumFractionDigits:1});
const pct=x=>`${(100*x).toFixed(1)}%`;
const ci=x=>`${pct(x[0])}–${pct(x[1])}`;
const mean=xs=>xs.reduce((a,b)=>a+b,0)/xs.length;
const comparisons={rerolls:{},prices:{},paid:{}};
let md=`# High Roller — eight-stage balance candidate v1

**Status: modelled candidate on a separate balance branch. Live Playtest 07 defaults are unchanged.** This establishes a winnable 24-encounter score/economy baseline; it does not claim equal build strength or predict human win rates. The single-die reroll is implemented in the shared engine behind an opt-in rule, and still needs its playable UI.

The principal validation is **900 complete-run attempts: 150 seeds per policy, seeds 100001–100150**. Settings were frozen after pilots on seeds 20001 onward. A further **1,000 full-run control/hybrid attempts** test rerolls, prices, paid rescue spending and hybrid portfolios. Controlled ten-swap arenas and board geometry tests are separate evidence, not full-campaign wins. No boss-specific modifiers are modelled: “boss” means the third, highest target in each stage.

## What the evidence says

- Multiple distinct portfolios can finish all 24 encounters. Four-match foundations and special builds are the most reliable of the tested agents. Five- and six-focused builds are winnable but materially riskier; they use supporting trinkets and other match sizes, not exclusively their named size.
- Your large-match concern was correct. Unmodified stable boards rarely offer a direct 5+ swap, and almost never a 6+ swap. Rerolls help, but meaningful large-match rewards and setup support are also necessary.
- **Six to One is a large-match enabler as well as a cascade item.** Recognizing that in the policies changed the conclusions. Treating it as belonging only to the small-match agent unfairly understates large builds.
- The initial gentle 24-encounter pilot produced 150–210 spare coins for successful policies. Stage-priced packs substantially reduce that surplus. Money now competes between assembling items, buying a token and rescuing a round.
- Unconditional ×4 Loaded Die was a universal multiplier, not a specialized strategy. The candidate uses ×2. Twenty is weak enough to be a trap at high supply; its candidate offer weight is zero pending a redesign.

## Frozen score curve

Ten swaps per encounter; score resets between encounters. One free starter special token; later packs show three distinct choices and grant one token. Stage prices apply to shops **after** that stage's encounters; there is no shop after the final boss.

| Stage | Small | Big | Boss | Either pack costs |
|---|---:|---:|---:|---:|
`;
for(let i=0;i<8;i++)md+=`| ${i+1} | ${q(config.targets[i*3])} | ${q(config.targets[i*3+1])} | ${q(config.targets[i*3+2])} | ${8+i} |
`;
md+=`
## Held-out complete-run results

Wilson 95% intervals; denominator is every starting run, including early losses. These are fixed public-information bots, not human skill estimates.

| Portfolio | Wins / 150 | Win rate (95% CI) | Mean encounters cleared | Mean ending coins | Median ending coins |
|---|---:|---|---:|---:|---:|
`;
for(const p of policies){const a=cells[p].aggregate;md+=`| ${names[p]} | ${a.wins} | ${pct(a.winRate)} (${ci(a.winRate95CI)}) | ${q(mean(data[p].map(r=>r.completed.length)))} | ${q(a.coinsEnding.mean)} | ${a.coinsEnding.p50} |
`;}
md+=`
A 6+ build means a **connected merged group of six or more**, including crosses, not necessarily six in a straight line. Policies buy early support and may score 3/4/5 groups. A pure “only sixes pay” strategy is not established by these results.

### Reach and clear at every encounter

Each cell is **reached / cleared**, out of 150 starting attempts. For a conditional clear rate divide cleared by reached; full score, failure-deficit, remaining-swap and income distributions are in each held-out JSON cell.

| Stage · leg | Target | Flexible | Cascade | 4 foundation | 5 focus | 6+ focus | Specials |
|---|---:|---:|---:|---:|---:|---:|---:|
`;
for(let i=0;i<24;i++)md+=`| ${Math.floor(i/3)+1} · ${['small','big','boss'][i%3]} | ${q(config.targets[i])} | ${policies.map(p=>{const r=cells[p].aggregate.rounds[i];return `${r.reached} / ${r.cleared}`;}).join(' | ')} |
`;
md+=`
### Failure and run-length context

| Portfolio | Failed runs | Median terminal deficit | P90 terminal deficit | Winner mean nominal scoring animation |
|---|---:|---:|---:|---:|
`;
for(const p of policies){const failures=data[p].filter(r=>r.status==='lost').map(r=>r.rounds.at(-1).deficit);const a=quantiles(failures),t=mean(data[p].filter(r=>r.status==='won').map(r=>r.scoreAnimationMs/60000));md+=`| ${names[p]} | ${failures.length} | ${q(a.p50)} | ${q(a.p90)} | ${q(t)} min |
`;}
md+=`
The animation figures exclude thinking, swaps/falls, shop time and pauses. Cascade and special runs can spend around 13–16 minutes on scoring animation alone. A speed option is a sensible companion to a 24-encounter playtest; these figures are not measured wall-clock play times.

## Reroll recommendation

**Three free single-die rerolls per encounter**, replenished each encounter with no carryover. Select an ordinary numbered die (gold/shiny allowed), roll a new face, preserve finishes, and resolve any matches immediately. A repeated face still spends the charge. No swap or coin cost. Six to One applies to the roll, so 1 has probability 2/6 in that build. Existing paid 2×2 rerolls remain a separate rescue control at 3 coins.

The agents exhaustively evaluate the six visible possible face outcomes; they never read the next actual roll. They retain charges on boards with little visible benefit. First-wave telemetry separates deliberate immediate opportunities from lucky refill cascades; it does not infer human intention.

### Matched reroll ablation

Same frozen config and 100 starting seeds (100001–100100); only the free charge count changes from 0 to 3. Streams diverge after different decisions. Differences use approximate paired 95% intervals, not independent-binomial subtraction.

| Portfolio | 0 charges: wins / 100 | 3 charges: wins / 100 | Win-rate change (paired 95% CI) |
|---|---:|---:|---|
`;
for(const p of policies.filter(p=>p!=='balanced')){const a=rows('no-reroll',p),b=data[p].filter(r=>r.seed<100101),c=pairedComparison(a,b);comparisons.rerolls[p]=c;md+=`| ${names[p]} | ${a.filter(r=>r.status==='won').length} | ${b.filter(r=>r.status==='won').length} | ${pct(c.winRateChange)} (${ci(c.approx95CI)}) |
`;}
const geometry=read('geometry');
md+=`
### Why setup support matters

200 stable starting boards per condition, seeds 40001–40200. Legal moves and reroll outcomes use production matching. These are opportunities on fresh boards, not probabilities throughout a developed run.

| Board condition | Has a 5+ swap | Has a 6+ swap | Mean best one-reroll chance of immediate 5+ | Mean best one-reroll chance of immediate 6+ |
|---|---|---|---:|---:|
`;
for(const [key,label]of [['normal','Normal'],['converted','Six to One']]){const a=geometry[key];md+=`| ${label} | ${a.swaps5}/200 (${ci(a.swaps5CI)}) | ${a.swaps6}/200 (${ci(a.swaps6CI)}) | ${pct(a.meanBestReroll5)} | ${pct(a.meanBestReroll6)} |
`;}
md+=`
On a normal board, a targeted reroll is not “a 1-in-6 chance of a large match” unless the required geometry already exists. Averaged across these boards, even the best chosen die has only a 7.5% immediate 5+ chance. Six to One raises that to 21.5%. Rerolls alone did not rescue the original under-rewarded large-build pilot.

## Economy

- Fixed round payout **3 coins + 1 per unused swap**, including the final win.
- Gold finish chance **3%** on ordinary dice; still +1 coin only when naturally matched. Blast-only clears do not pay gold.
- Both packs cost **8 in stage 1, +1 per stage**, ending at 15. One pack purchase per shop, one pick of three. This spends late surplus without making the first shop prohibitively expensive.
- All size trinkets cost **10**. Four slots, no duplicate owned items, sale price floor(cost/2).
- Charm prices: Six to One 16, One More 12, Echo 8, Loaded 24, Spectrum 8, Big Bang 14, broad row/column 12.
- Special tokens remain **+1 percentage point**, uncapped. Rarity changes how often a type is offered, not the strength of its token once selected. At most 24 special tokens can be acquired in this campaign under the one-pack rule, including the starter.

### Flat-price comparison

60 matched seeds (100001–100060), identical candidate except the stage price increase. Ending balances include losses and the final victory payout, which cannot be spent. Small differences in wins should not be overinterpreted.

| Portfolio | Flat 8: wins / 60 | Stage price: wins / 60 | Flat ending coins | Stage-price ending coins | Win-rate change (paired 95% CI) |
|---|---:|---:|---:|---:|---|
`;
for(const p of ['cascade','large-supported','specials']){const a=rows('flat-prices',p),b=data[p].filter(r=>r.seed<100061),c=pairedComparison(a,b);comparisons.prices[p]=c;md+=`| ${names[p]} | ${a.filter(r=>r.status==='won').length} | ${b.filter(r=>r.status==='won').length} | ${q(mean(a.map(r=>r.coinsEnding)))} | ${q(mean(b.map(r=>r.coinsEnding)))} | ${pct(c.winRateChange)} (${ci(c.approx95CI)}) |
`;}
md+=`
Higher prices have a visible difficulty cost for the special buyer. This is a deliberate economy lever, not a free improvement. Full run accounting includes every purchase, sale, gold payout and round reward.

### Paid-reroll rescue check

30 matched seeds per portfolio (100001–100030), four independent production-engine samples per 2×2 area, considering spending at three or fewer swaps remaining. These rescue agents are not optimal planners.

| Portfolio | No paid rescue: wins / 30 | Paid rescue: wins / 30 | Paid rescue ending coins | Win-rate change (paired 95% CI) |
|---|---:|---:|---:|---|
`;
for(const p of ['balanced','cascade','large-supported','specials']){const a=data[p].filter(r=>r.seed<100031),b=rows('paid-control',p+'-paid'),c=pairedComparison(a,b);comparisons.paid[p]=c;md+=`| ${names[p]} | ${a.filter(r=>r.status==='won').length} | ${b.filter(r=>r.status==='won').length} | ${q(mean(b.map(r=>r.coinsEnding)))} | ${pct(c.winRateChange)} (${ci(c.approx95CI)}) |
`;}
md+=`
## Match tokens and trinkets

Base match Mult stays **2 / 3 / 4 / 5** for sizes 3 / 4 / 5 / 6+. Groups and cascade contributions remain additive within a move. Shiny still multiplies running Mult by 1.5 when naturally matched; its ordering is preserved.

| Match size | Token adds Mult per level | Pip trinket adds per matching group | Mult trinket adds per matching group |
|---|---:|---:|---:|
`;
for(let i=0;i<4;i++)md+=`| ${i===3?'6+':i+3} | ${config.rules.levelBoost[i]} | ${config.rules.trinketPips[i]} | ${config.rules.trinketMult[i]} |
`;
md+=`
Loaded becomes **×2** (cost 24, rare); Echo **+2 per cascade wave**; Spectrum **+20** for all six numbers in one action. One More stays +1 per cleared 1. Six to One keeps its identity: all generated/rerolled sixes become ones. Blast upgrades keep their existing geometry.

**Implementation detail:** the current engine's bomb is 3×3 and Big Bang expands it to **5×5**, clipped at edges. That is what this study tests. A different intended bomb footprint needs a new model run. Row/column upgrades are three wide.

### Individual trinket strength

Controlled ten-swap arenas: original rules use 200 paired seeds, candidate rules use 100 different paired seeds. Each lift is relative to its own same-seed, same-rule plain control; original versus candidate columns are not themselves a paired comparison. No token levels, no shop and no special supply unless stated. Gifts estimate conditional power, not acquisition value.

| Item | Original mean score lift | Candidate mean score lift | Candidate price | Interpretation |
|---|---:|---:|---:|---|
`;
const original=read('power').study,candidate=read('synergy').study;
const notes={convert:'Enabler for both cascades and large groups',ones:'Stronger with conversion; +1 solo is modest',cascade:'Frequent small return; now +2 per later wave',quad:'Universal ×2, priced and weighted accordingly',rainbow:'Weak solo; needs broad clears; conflicts with conversion',bigbomb:'Requires bomb supply; zero benefit without it',widecolumn:'Requires column supply',widerow:'Requires row supply'};
for(const t of TRINKETS){md+=`| ${t.name} | ${pct(original[t.id].score.mean/original.plain.score.mean-1)} | ${pct(candidate[t.id].score.mean/candidate.plain.score.mean-1)} | ${trinketCost(t,config)} | ${notes[t.id]??(t.tier===6?'High variance: median often receives no benefit':t.stat==='pips'?'Strong early additive base; complements Mult':'Complements pip bonuses; diluted by accumulated levels')} |
`;}
md+=`
This does **not** establish equal item efficiency. Pip trinkets remain stronger solo than their Mult counterparts; the two multiply each other's contribution when combined. Spectrum still needs a better non-conversion identity. Six to One remains a high-priority enabler for all number-focused agents. These are the next design issues, rather than reasons to secretly optimize the held-out settings.

## Special-die power and rarity

For a clean comparison, each type gets 5% supply, zero token levels and no trinkets, over 200 paired ten-swap arenas on seeds 30001–30200. Intrinsic special pips stay **10**; Twenty remains 20 in its diagnostic scenarios. Lift includes actual cascades and board obstruction. Approximate paired mean-score intervals quantify seed noise; these exploratory comparisons are not multiple-testing corrected.

| Type | Mean score lift at 5% | Paired change in score (95% interval) | Candidate offer weight | Role |
|---|---:|---|---:|---|
`;
const specialNotes={number:'Highest standalone output; rare',bomb:'Strong standalone; much stronger with Big Bang',wild:'Setup/cascade synergy; context-sensitive ceiling',column:'Common foundation; upgrade unlocks power',row:'Common foundation; upgrade unlocks power',shiny:'Rare multiplicative payoff; retain 1.5×',color:'Rare, late special-chain enabler; weak on plain boards',twenty:'No candidate offers pending redesign'};
const labels={number:'Number Sweep',bomb:'Bomb',wild:'Wild',column:'Column',row:'Row',shiny:'Shiny',color:'Special Sweep',twenty:'Twenty'};
for(const t of ['number','bomb','wild','column','row','shiny','color','twenty']){
 const a=original[t+'-5'],ds=a.scores.map((v,i)=>v-original.plain.scores[i]),m=mean(ds),se=Math.sqrt(ds.reduce((n,x)=>n+(x-m)**2,0)/(ds.length-1)/ds.length);
 md+=`| ${labels[t]} | ${pct(a.score.mean/original.plain.score.mean-1)} | ${q(m)} (${q(m-1.96*se)}–${q(m+1.96*se)}) | ${config.rules.specialWeights[t]} | ${specialNotes[t]} |
`;}
md+=`
These are **relative offer weights**, not percentages of dice spawned or literal probabilities of appearing in a three-option pack. Three distinct weighted draws alter inclusion probabilities; each selected token still gives exactly 1%. Middle rankings overlap and change with the build. Upgraded footprint dice belong in a higher power band than their plain versions.

At 5% supply, Big Bang increased the bomb arena from ${q(original['bomb-5'].score.mean)} to ${q(original['bomb-upgrade'].score.mean)} mean points per ten swaps; broad columns from ${q(original['column-5'].score.mean)} to ${q(original['column-upgrade'].score.mean)}, and broad rows from ${q(original['row-5'].score.mean)} to ${q(original['row-upgrade'].score.mean)}. They should remain purchases that require committing to the matching supply type.

Twenty's 10% supply control reduced mean scoring by ${pct(1-original['twenty-10'].score.mean/original.plain.score.mean)}. Giving it +2 Mult on collection at 5% supply only brought it close to the plain candidate control (${q(candidate.twentyMult2.score.mean)} versus ${q(candidate.plain.score.mean)}). Making a weak token rare would conceal the trap, not fix it. Candidate weight 0 is a temporary hold; no Twenty behavior has been removed from the engine or live game.

### Hybrid and high-power checks

Actual Wild/Shiny hybrid buyers use normal shop offers and alternate numbered/special packs, prioritizing that finish. 100 complete-run seeds per hybrid (100001–100100), with the same public-information base policy:

| Hybrid | Wins / 100 | Win rate (95% CI) | Mean ending coins |
|---|---:|---|---:|
`;
for(const t of ['wild','shiny']){const a=read('hybrid-'+t);md+=`| ${t==='wild'?'Wild + small-match/ones':'Shiny + small-match/ones'} | ${a.wins} | ${pct(a.winRate)} (${ci(a.winRate95CI)}) | ${q(a.coins.mean)} |
`;}
md+=`
Gifted late-build arenas are stress tests, not fair-budget acquisition comparisons:

| Gifted portfolio | Mean ten-swap score | Median | P99 |
|---|---:|---:|---:|
`;
for(const key of ['common','common-wild','common-shiny','big','jackpot','specialMix']){const a=candidate[key].score;md+=`| ${key} | ${q(a.mean)} | ${q(a.p50)} | ${q(a.p99)} |
`;}
md+=`
Exact gifts are stored in synergy.json. Large-build high tails are intentional jackpots; they do not prove reliable assembly. No tested hybrid dominated all strategies, and no tested scenario hit the resolution guard. This is evidence against obvious failures in this range, not a proof that every possible uncapped stacking combination is safe.

## Playstyles supported now and next

| Style | Present foundation | Limitation / next support worth prototyping |
|---|---|---|
| Cascades / ones | Six to One, One More, Echo, size-3 levels/pips | Lowest held-out reliability of the broad styles; needs human playtest and possibly cheaper assembly or a stronger dedicated payoff |
| Deliberate larger matches | Size-4 foundation, size-5/6 jackpots, conversion and targeted rerolls | 5/6-only reliance remains risky; advertise supporting pieces, not a self-sufficient six-only starter path |
| Special-dice portfolio | Concentrated token picks and matching footprint upgrades | Economy affects assembly strongly; retain rare Number Sweep and test whether broad clears feel too automatic |
| Wild / Shiny hybrid | Alternate token packs, existing number-based scoring items | Real but not dominant in the tested agents; shader/finish presentation should explain their distinct roles |
| Precision rerolls — future | Targeted charges already modelled | Token giving another charge; cup item offering a choice of two rolled faces. Model each before selecting prices |
| Extra swaps — future | Reward a deliberate large match with one extra swap, once per encounter | Decide whether bonus swaps can also pay unused-swap coins; avoid a score-and-money feedback loop |
| Six-number collection — future | Spectrum is the natural non-conversion hook | Consider collecting all six across an encounter instead of one action, paying once. This needs a new stateful rule and fresh simulation |

Do not introduce harsh number bans or boss modifiers yet: they would invalidate the score-only baseline and can disproportionately break conversion-dependent builds. Boss mechanics should be tested as explicit scenarios after this version has human play data.

## Verification, provenance and limits

- 58 automated tests pass; smoke runs retain 7/10 wins for both original greedy and spender on seeds 1–10; production Vite build passes. Live-default behavior is preserved.
- Every full-run transition uses engine.mjs. Score and coin conservation are asserted, and example accepted-action traces replay to their final fingerprints. All tested complete-run cells and arenas report zero censoring/resolution caps. No accounting assertion failed.
- Every held-out cell stores full config and source SHA-256 identity captured before its experiment. Canonical config: [eight-stage-v1.json](../modelling/configs/eight-stage-v1.json). Reproduce with npm run simulate:balance.
- Detailed summaries, per-run NDJSON (including loadouts and per-round economy), replay examples, controlled score samples and comparisons are in [the evidence directory](../modelling/results/eight-stage/). NDJSON files may be gzip-compressed after generation; the report generator accepts either form.
- Pilot policies evolved while auditing build preferences. Only frozen held-out/ablation cells support the final comparisons. Early exploratory output is retained for transparency, with incomplete per-cell identity in the earliest pilots; do not treat it as a controlled final-policy comparison.
- Intervals measure sampling uncertainty for these fixed agents. They do not cover policy bias, multiple-comparison selection, human skill, GPU readability, mobile input feel or future boss mechanics. Full-run win rates cannot establish that every individual item is balanced.

The next concrete playtest is the frozen candidate plus its single-die selection UI. The results support shipping it as a **test baseline**, with 6+ reliability, Spectrum, Twenty and cascade assembly kept on the watch list.
`;
fs.mkdirSync('docs',{recursive:true});fs.writeFileSync('docs/eight-stage-balance.md',md);
fs.writeFileSync(dir+'comparisons.json',JSON.stringify(comparisons,null,2));
const sources=['engine.mjs','presentation.mjs','modelling/runner.mjs','modelling/policies.mjs','modelling/research-policies.mjs','modelling/eight-stage.mjs','modelling/power-study.mjs','modelling/synergy-study.mjs','modelling/hybrid-study.mjs','modelling/report-eight-stage.mjs','modelling/configs/eight-stage-v1.json'];
fs.writeFileSync(dir+'final-manifest.json',JSON.stringify({createdAt:new Date().toISOString(),hashes:Object.fromEntries(sources.map(p=>[p,createHash('sha256').update(fs.readFileSync(p)).digest('hex')])),heldOutSeeds:[100001,100150],calibrationSeeds:[20001,20100],geometrySeeds:[40001,40200],powerSeeds:[30001,30200],synergySeeds:[50001,50100],tests:58,smoke:{runs:20,greedyWins:7,spenderWins:7},liveDefaultsChanged:false},null,2));
console.log('Wrote docs/eight-stage-balance.md and final evidence manifest');
