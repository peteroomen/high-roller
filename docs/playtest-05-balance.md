# Playtest 05 — starting balance

These are starting values for playtesting, not a claim of finished balance. The production engine runs every board, shop, draft, upgrade, trinket, reroll and round. No parallel score approximation is used.

## Chosen values

| Match tier | Base Mult | Per token level | Pip trinket | Mult trinket |
|---|---:|---:|---:|---:|
| 3 | 2 | +2 | +16 | +2 |
| 4 | 3 | +4 | +32 | +4 |
| 5 | 4 | +6 | +56 | +8 |
| 6+ | 5 | +8 | +88 | +12 |

Levels start at 1. A level changes only Mult; pip trinkets add to the existing pip counter. A trinket triggers per matching group, not per affected die or explosion. Larger-tier rewards compensate for much rarer matches; 6+ exposure is too sparse for a confident estimate.

Special tokens now add 2 percentage points instead of 5 (60% less per token), capped at 30% total special chance. A three-pick special pack adds up to 6 percentage points, previously 15. Ordinary dice remain the main refill supply. All types begin at zero; the free starter gives 2%.

Numbered packs cost 4 coins; special packs cost 5. Trinkets cost 5, sell for 2, and occupy one of four slots. Three unowned trinkets are offered per shop. The early payout of 5–8 coins creates a real choice between a pack and a trinket. Shop purchases, sales and rerolls compete for the same currency.

Three stages of three rounds, ten moves each:

- Opening Table: 220, 500, 1,000.
- High Stakes: 1,700, 2,700, 4,000.
- Final Table: 5,500, 7,200, 9,500.

## Tuning evidence

Design pilots used seeds 1–30 and three policies. At the first proposed rewards, the match-focused builder cleared 0/30 runs; doubling token/trinket rewards improved late reach. The old 90% spawn cap produced boards starved of ordinary pips: the specials-first policy cleared 0/30 at that cap and 26/30 with a 50% cap under the original pilot rules. Those comparisons motivated both a reduced cap and stronger match investment, rather than simply escalating targets to follow special inflation.

The user then requested substantially weaker tokens and a plain three-match worth +2. A second pilot compared 2-point and 1-point tokens with a 30% cap, +2 base three-match, stronger rewards and the staged targets. At 1 point the mixed policy won 4/30 while the builder won 18/30; at 2 points mixed won 25/30, builder 10/30 and specials-first 23/30. These are noisy, policy-dependent results. We chose 2 points rather than making special investment largely ineffective for that mixed policy.

Final policies switch mixed builds toward numbered packs at 24% special chance and can sell a rarer-tier trinket to buy an offered common-tier replacement. These visible-rule heuristics are disclosed; they are not optimal play. The specials-first control buys special packs up to the cap, then numbered packs; it never buys trinkets. It is not a strictly specials-only run.

## Held-out validation

Seeds **5001–5060**, 60 runs each for random, greedy mixed, builder and specials-first. Independent planning policies use **5001–5012**, 12 runs each, two separately seeded rollout samples per candidate. They do not see actual RNG, the run seed, future refills or sealed pack contents.

| Policy | Complete runs won | 95% Wilson interval | Stage 1 cleared | Stage 2 cleared | Stage 3 cleared |
|---|---:|---|---:|---:|---:|
| Random | 0/60 | 0–6.0% | 34/60 | 4/60 | 0/60 |
| Greedy mixed | 38/60 | 50.7–74.4% | 58/60 | 52/60 | 38/60 |
| Match builder | 28/60 | 34.6–59.1% | 56/60 | 43/60 | 28/60 |
| Specials first | 49/60 | 70.1–89.4% | 59/60 | 58/60 | 49/60 |
| Spender | 5/12 | 19.3–68.0% | 11/12 | 9/12 | 5/12 |
| Rollout | 11/12 | 64.6–98.5% | 12/12 | 12/12 | 11/12 |

All stage rates use starting runs as denominator. Conditional round clears, deficits, spare moves, overshoots, coins and component contributions are in the JSON reports. **264 held-out complete runs; zero censored runs, resolution caps or score/coin conservation errors.** These bot win rates do not estimate human difficulty.

A separate final sensitivity screen runs 17 configurations × two policies × 12 matched seeds = **408 runs**. It covers each starting trinket, disabled upgrades, disabled trinkets, reward strengths, pack/trinket prices and token efficacy. All runs conserve score and coins, with no caps/censorship. Example traces replay against the final engine. At this small sample size, the screen supports feature usefulness, not a precise optimum: disabling trinkets reduced builder wins from 8/12 to 1/12; halving rewards reduced them to 0/12; doubling them raised them to 11/12.

## Pacing and limitations

A plain three-die match now has one Mult flight, not separate size/level/cascade/low flights. Group bonuses combine; trinkets remain individually animated. Fixed pip landing holds shrink from 500 to 180 ms; group/trinket holds are 300 ms. Faster movement and shake timings reduce a plain three-die scoring sequence from about 5.47 to **2.74 seconds**, excluding swaps/refills. The shared UI event plan generates model pacing.

Held-out mean nominal scoring-animation time is 215 seconds for builders and 342 seconds for mixed greedy runs; these include losses and exclude decisions, falls, pauses and frame time. They are not human run-duration estimates.

Specials-first still beats the simple builder under these heuristics. That advantage is visible, not hidden by a chosen aggregate win rate. Common-tier trinkets are well exercised; 6+ rewards have only a handful of triggers, even across the sensitivity tests. Group rarity, prices and inventory usefulness need real-player feedback. Rollout results have especially wide intervals and noisy, two-sample decisions.

Reports retain original engine/model hashes, configurations and seeds. A final legacy-save migration safeguard was added after simulation; every saved final-model example was replayed against the resulting engine, and its hash is recorded separately as `verifiedEngineHash`. No scoring, RNG, shop or timing rule changed after those simulations.

- [Held-out runs](../modelling/results/stages-held-out/report.md)
- [Planning policies](../modelling/results/stages-planners/report.md)
- [Final sensitivity screen](../modelling/results/stages-sensitivity/report.md)
- [Initial pilot](../modelling/results/upgrade-pilot/report.md)
- [Special-token pilot](../modelling/results/special-nerf-pilot/report.md)
