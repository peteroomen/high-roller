# High Roller — eight-stage balance candidate v1

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
| 1 | 180 | 240 | 320 | 8 |
| 2 | 450 | 600 | 800 | 9 |
| 3 | 950 | 1,200 | 1,500 | 10 |
| 4 | 1,800 | 2,200 | 2,650 | 11 |
| 5 | 3,150 | 3,750 | 4,400 | 12 |
| 6 | 5,150 | 6,000 | 6,900 | 13 |
| 7 | 7,900 | 9,000 | 10,200 | 14 |
| 8 | 11,500 | 12,900 | 14,400 | 15 |

## Held-out complete-run results

Wilson 95% intervals; denominator is every starting run, including early losses. These are fixed public-information bots, not human skill estimates.

| Portfolio | Wins / 150 | Win rate (95% CI) | Mean encounters cleared | Mean ending coins | Median ending coins |
|---|---:|---|---:|---:|---:|
| Flexible small matches | 64 | 42.7% (35.0%–50.7%) | 20.4 | 11.9 | 12 |
| Cascade / ones | 28 | 18.7% (13.2%–25.7%) | 19.2 | 10.1 | 11 |
| 4-match foundation + jackpots | 108 | 72.0% (64.3%–78.6%) | 21 | 16.7 | 18 |
| 5-match focus | 41 | 27.3% (20.8%–35.0%) | 14.1 | 13.2 | 12 |
| 6+ focus | 33 | 22.0% (16.1%–29.3%) | 13.9 | 11.5 | 11 |
| Special dice / footprint upgrades | 102 | 68.0% (60.2%–74.9%) | 19.1 | 13.9 | 13 |

A 6+ build means a **connected merged group of six or more**, including crosses, not necessarily six in a straight line. Policies buy early support and may score 3/4/5 groups. A pure “only sixes pay” strategy is not established by these results.

### Reach and clear at every encounter

Each cell is **reached / cleared**, out of 150 starting attempts. For a conditional clear rate divide cleared by reached; full score, failure-deficit, remaining-swap and income distributions are in each held-out JSON cell.

| Stage · leg | Target | Flexible | Cascade | 4 foundation | 5 focus | 6+ focus | Specials |
|---|---:|---:|---:|---:|---:|---:|---:|
| 1 · small | 180 | 150 / 150 | 150 / 150 | 150 / 150 | 150 / 150 | 150 / 150 | 150 / 150 |
| 1 · big | 240 | 150 / 150 | 150 / 150 | 150 / 150 | 150 / 150 | 150 / 150 | 150 / 150 |
| 1 · boss | 320 | 150 / 150 | 150 / 150 | 150 / 149 | 150 / 149 | 150 / 149 | 150 / 148 |
| 2 · small | 450 | 150 / 149 | 150 / 149 | 149 / 145 | 149 / 147 | 149 / 147 | 148 / 147 |
| 2 · big | 600 | 149 / 149 | 149 / 149 | 145 / 141 | 147 / 142 | 147 / 140 | 147 / 145 |
| 2 · boss | 800 | 149 / 147 | 149 / 147 | 141 / 138 | 142 / 129 | 140 / 134 | 145 / 142 |
| 3 · small | 950 | 147 / 147 | 147 / 147 | 138 / 137 | 129 / 119 | 134 / 123 | 142 / 136 |
| 3 · big | 1,200 | 147 / 146 | 147 / 146 | 137 / 137 | 119 / 106 | 123 / 112 | 136 / 132 |
| 3 · boss | 1,500 | 146 / 146 | 146 / 146 | 137 / 133 | 106 / 100 | 112 / 100 | 132 / 124 |
| 4 · small | 1,800 | 146 / 144 | 146 / 143 | 133 / 132 | 100 / 95 | 100 / 93 | 124 / 118 |
| 4 · big | 2,200 | 144 / 144 | 143 / 143 | 132 / 130 | 95 / 92 | 93 / 82 | 118 / 113 |
| 4 · boss | 2,650 | 144 / 142 | 143 / 141 | 130 / 130 | 92 / 85 | 82 / 78 | 113 / 108 |
| 5 · small | 3,150 | 142 / 140 | 141 / 137 | 130 / 130 | 85 / 80 | 78 / 73 | 108 / 108 |
| 5 · big | 3,750 | 140 / 137 | 137 / 134 | 130 / 129 | 80 / 73 | 73 / 68 | 108 / 105 |
| 5 · boss | 4,400 | 137 / 132 | 134 / 130 | 129 / 129 | 73 / 64 | 68 / 61 | 105 / 105 |
| 6 · small | 5,150 | 132 / 127 | 130 / 125 | 129 / 129 | 64 / 57 | 61 / 60 | 105 / 105 |
| 6 · big | 6,000 | 127 / 123 | 125 / 117 | 129 / 128 | 57 / 56 | 60 / 57 | 105 / 105 |
| 6 · boss | 6,900 | 123 / 116 | 117 / 108 | 128 / 127 | 56 / 54 | 57 / 52 | 105 / 105 |
| 7 · small | 7,900 | 116 / 107 | 108 / 97 | 127 / 124 | 54 / 51 | 52 / 49 | 105 / 103 |
| 7 · big | 9,000 | 107 / 100 | 97 / 87 | 124 / 121 | 51 / 49 | 49 / 45 | 103 / 102 |
| 7 · boss | 10,200 | 100 / 90 | 87 / 65 | 121 / 119 | 49 / 45 | 45 / 45 | 102 / 102 |
| 8 · small | 11,500 | 90 / 80 | 65 / 53 | 119 / 116 | 45 / 42 | 45 / 43 | 102 / 102 |
| 8 · big | 12,900 | 80 / 73 | 53 / 42 | 116 / 112 | 42 / 41 | 43 / 38 | 102 / 102 |
| 8 · boss | 14,400 | 73 / 64 | 42 / 28 | 112 / 108 | 41 / 41 | 38 / 33 | 102 / 102 |

### Failure and run-length context

| Portfolio | Failed runs | Median terminal deficit | P90 terminal deficit | Winner mean nominal scoring animation |
|---|---:|---:|---:|---:|
| Flexible small matches | 86 | 1,114 | 4,024 | 13.1 min |
| Cascade / ones | 122 | 1,444 | 4,596 | 15.9 min |
| 4-match foundation + jackpots | 42 | 520 | 5,565 | 6.2 min |
| 5-match focus | 109 | 755 | 6,184 | 6.3 min |
| 6+ focus | 117 | 723 | 5,312 | 6.5 min |
| Special dice / footprint upgrades | 48 | 279 | 1,176 | 13 min |

The animation figures exclude thinking, swaps/falls, shop time and pauses. Cascade and special runs can spend around 13–16 minutes on scoring animation alone. A speed option is a sensible companion to a 24-encounter playtest; these figures are not measured wall-clock play times.

## Reroll recommendation

**Three free single-die rerolls per encounter**, replenished each encounter with no carryover. Select an ordinary numbered die (gold/shiny allowed), roll a new face, preserve finishes, and resolve any matches immediately. A repeated face still spends the charge. No swap or coin cost. Six to One applies to the roll, so 1 has probability 2/6 in that build. Existing paid 2×2 rerolls remain a separate rescue control at 3 coins.

The agents exhaustively evaluate the six visible possible face outcomes; they never read the next actual roll. They retain charges on boards with little visible benefit. First-wave telemetry separates deliberate immediate opportunities from lucky refill cascades; it does not infer human intention.

### Matched reroll ablation

Same frozen config and 100 starting seeds (100001–100100); only the free charge count changes from 0 to 3. Streams diverge after different decisions. Differences use approximate paired 95% intervals, not independent-binomial subtraction.

| Portfolio | 0 charges: wins / 100 | 3 charges: wins / 100 | Win-rate change (paired 95% CI) |
|---|---:|---:|---|
| Cascade / ones | 3 | 22 | 19.0% (10.3%–27.7%) |
| 4-match foundation + jackpots | 42 | 70 | 28.0% (14.0%–42.0%) |
| 5-match focus | 9 | 28 | 19.0% (7.6%–30.4%) |
| 6+ focus | 4 | 16 | 12.0% (4.0%–20.0%) |
| Special dice / footprint upgrades | 59 | 68 | 9.0% (-4.7%–22.7%) |

### Why setup support matters

200 stable starting boards per condition, seeds 40001–40200. Legal moves and reroll outcomes use production matching. These are opportunities on fresh boards, not probabilities throughout a developed run.

| Board condition | Has a 5+ swap | Has a 6+ swap | Mean best one-reroll chance of immediate 5+ | Mean best one-reroll chance of immediate 6+ |
|---|---|---|---:|---:|
| Normal | 19/200 (6.2%–14.4%) | 0/200 (0.0%–1.9%) | 7.5% | 1.4% |
| Six to One | 66/200 (26.9%–39.8%) | 3/200 (0.5%–4.3%) | 21.5% | 8.3% |

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
| Cascade / ones | 12 | 14 | 34.7 | 10.8 | 3.3% (-9.8%–16.5%) |
| 4-match foundation + jackpots | 39 | 37 | 63.7 | 15.3 | -3.3% (-13.7%–7.0%) |
| Special dice / footprint upgrades | 48 | 40 | 34.7 | 13.8 | -13.3% (-26.1%–-0.6%) |

Higher prices have a visible difficulty cost for the special buyer. This is a deliberate economy lever, not a free improvement. Full run accounting includes every purchase, sale, gold payout and round reward.

### Paid-reroll rescue check

30 matched seeds per portfolio (100001–100030), four independent production-engine samples per 2×2 area, considering spending at three or fewer swaps remaining. These rescue agents are not optimal planners.

| Portfolio | No paid rescue: wins / 30 | Paid rescue: wins / 30 | Paid rescue ending coins | Win-rate change (paired 95% CI) |
|---|---:|---:|---:|---|
| Flexible small matches | 13 | 18 | 9.5 | 16.7% (-4.5%–37.9%) |
| Cascade / ones | 9 | 9 | 4.9 | 0.0% (-23.0%–23.0%) |
| 4-match foundation + jackpots | 18 | 26 | 16.5 | 26.7% (8.0%–45.3%) |
| Special dice / footprint upgrades | 19 | 23 | 12.6 | 13.3% (-4.8%–31.5%) |

## Match tokens and trinkets

Base match Mult stays **2 / 3 / 4 / 5** for sizes 3 / 4 / 5 / 6+. Groups and cascade contributions remain additive within a move. Shiny still multiplies running Mult by 1.5 when naturally matched; its ordering is preserved.

| Match size | Token adds Mult per level | Pip trinket adds per matching group | Mult trinket adds per matching group |
|---|---:|---:|---:|
| 3 | 1 | 8 | 1 |
| 4 | 6 | 48 | 6 |
| 5 | 16 | 120 | 18 |
| 6+ | 32 | 240 | 36 |

Loaded becomes **×2** (cost 24, rare); Echo **+2 per cascade wave**; Spectrum **+20** for all six numbers in one action. One More stays +1 per cleared 1. Six to One keeps its identity: all generated/rerolled sixes become ones. Blast upgrades keep their existing geometry.

**Implementation detail:** the current engine's bomb is 3×3 and Big Bang expands it to **5×5**, clipped at edges. That is what this study tests. A different intended bomb footprint needs a new model run. Row/column upgrades are three wide.

### Individual trinket strength

Controlled ten-swap arenas: original rules use 200 paired seeds, candidate rules use 100 different paired seeds. Each lift is relative to its own same-seed, same-rule plain control; original versus candidate columns are not themselves a paired comparison. No token levels, no shop and no special supply unless stated. Gifts estimate conditional power, not acquisition value.

| Item | Original mean score lift | Candidate mean score lift | Candidate price | Interpretation |
|---|---:|---:|---:|---|
| 3 Pip Die | 137.4% | 65.4% | 10 | Strong early additive base; complements Mult |
| 3 Mult Die | 49.2% | 25.9% | 10 | Complements pip bonuses; diluted by accumulated levels |
| 4 Pip Die | 33.9% | 49.5% | 10 | Strong early additive base; complements Mult |
| 4 Mult Die | 17.7% | 18.0% | 10 | Complements pip bonuses; diluted by accumulated levels |
| 5 Pip Die | 42.8% | 51.9% | 10 | Strong early additive base; complements Mult |
| 5 Mult Die | 20.4% | 21.9% | 10 | Complements pip bonuses; diluted by accumulated levels |
| 6+ Pip Die | 5.9% | 18.2% | 10 | High variance: median often receives no benefit |
| 6+ Mult Die | 2.7% | 8.2% | 10 | High variance: median often receives no benefit |
| Six to One | 94.0% | 80.9% | 16 | Enabler for both cascades and large groups |
| Echo Die | 11.3% | 22.3% | 8 | Frequent small return; now +2 per later wave |
| One More | 14.3% | 11.5% | 12 | Stronger with conversion; +1 solo is modest |
| Loaded Die | 300.0% | 100.0% | 24 | Universal ×2, priced and weighted accordingly |
| Full Spectrum | 0.8% | 1.9% | 8 | Weak solo; needs broad clears; conflicts with conversion |
| Big Bang | 0.0% | 0.0% | 14 | Requires bomb supply; zero benefit without it |
| Broad Columns | 0.0% | 0.0% | 12 | Requires column supply |
| Broad Rows | 0.0% | 0.0% | 12 | Requires row supply |

This does **not** establish equal item efficiency. Pip trinkets remain stronger solo than their Mult counterparts; the two multiply each other's contribution when combined. Spectrum still needs a better non-conversion identity. Six to One remains a high-priority enabler for all number-focused agents. These are the next design issues, rather than reasons to secretly optimize the held-out settings.

## Special-die power and rarity

For a clean comparison, each type gets 5% supply, zero token levels and no trinkets, over 200 paired ten-swap arenas on seeds 30001–30200. Intrinsic special pips stay **10**; Twenty remains 20 in its diagnostic scenarios. Lift includes actual cascades and board obstruction. Approximate paired mean-score intervals quantify seed noise; these exploratory comparisons are not multiple-testing corrected.

| Type | Mean score lift at 5% | Paired change in score (95% interval) | Candidate offer weight | Role |
|---|---:|---|---:|---|
| Number Sweep | 238.8% | 2,447.8 (2,142–2,753.7) | 1 | Highest standalone output; rare |
| Bomb | 105.7% | 1,083.5 (882.4–1,284.6) | 2 | Strong standalone; much stronger with Big Bang |
| Wild | 50.9% | 521.3 (337.6–704.9) | 2 | Setup/cascade synergy; context-sensitive ceiling |
| Column | 38.5% | 394.5 (250.6–538.4) | 4 | Common foundation; upgrade unlocks power |
| Row | 28.6% | 292.8 (161.7–423.8) | 4 | Common foundation; upgrade unlocks power |
| Shiny | 22.9% | 234.3 (127.8–340.8) | 1 | Rare multiplicative payoff; retain 1.5× |
| Special Sweep | 12.6% | 129 (-1.4–259.5) | 1 | Rare, late special-chain enabler; weak on plain boards |
| Twenty | -8.0% | -81.9 (-208.9–45.1) | 0 | No candidate offers pending redesign |

These are **relative offer weights**, not percentages of dice spawned or literal probabilities of appearing in a three-option pack. Three distinct weighted draws alter inclusion probabilities; each selected token still gives exactly 1%. Middle rankings overlap and change with the build. Upgraded footprint dice belong in a higher power band than their plain versions.

At 5% supply, Big Bang increased the bomb arena from 2,108.5 to 5,689.7 mean points per ten swaps; broad columns from 1,419.5 to 4,439.1, and broad rows from 1,317.7 to 4,329.3. They should remain purchases that require committing to the matching supply type.

Twenty's 10% supply control reduced mean scoring by 16.7%. Giving it +2 Mult on collection at 5% supply only brought it close to the plain candidate control (1,073.3 versus 1,057). Making a weak token rare would conceal the trap, not fix it. Candidate weight 0 is a temporary hold; no Twenty behavior has been removed from the engine or live game.

### Hybrid and high-power checks

Actual Wild/Shiny hybrid buyers use normal shop offers and alternate numbered/special packs, prioritizing that finish. 100 complete-run seeds per hybrid (100001–100100), with the same public-information base policy:

| Hybrid | Wins / 100 | Win rate (95% CI) | Mean ending coins |
|---|---:|---|---:|
| Wild + small-match/ones | 34 | 34.0% (25.5%–43.7%) | 10.8 |
| Shiny + small-match/ones | 28 | 28.0% (20.1%–37.5%) | 10.6 |

Gifted late-build arenas are stress tests, not fair-budget acquisition comparisons:

| Gifted portfolio | Mean ten-swap score | Median | P99 |
|---|---:|---:|---:|
| common | 8,475.2 | 7,206 | 23,795 |
| common-wild | 13,551.5 | 10,932 | 37,712 |
| common-shiny | 10,476.5 | 7,979 | 30,665 |
| big | 31,118.8 | 26,916 | 102,026 |
| jackpot | 42,109.7 | 31,436 | 189,258 |
| specialMix | 30,799.9 | 30,893 | 41,763 |

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
