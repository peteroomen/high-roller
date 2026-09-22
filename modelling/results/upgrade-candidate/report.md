# High Roller — full-run model

30 runs per scenario/policy; seeds 1–30; 1 independent samples per rollout candidate.

Engine SHA-256: `181e5aae4fdd3b23c90739079374953a3e309e909a577ace86312eb61edc55e8`. Model SHA-256: `dd52f173557b8d6f1e1b2a87379fb3dde5be7c4d5cc57b8fca07c35f95705f0c`.

| Scenario | Policy | Run wins (95% CI) | R1 clear | R2 clear | R3 clear | R4 clear | R5 clear | R6 clear | R7 clear | R8 clear | R9 clear | Runs using reroll | Censored |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| candidate | greedy | 96.7% (83.3%–99.4%) | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 96.7% | 0.0% | 0 |
| candidate | builder | 56.7% (39.2%–72.6%) | 100.0% | 100.0% | 100.0% | 90.0% | 90.0% | 76.7% | 66.7% | 60.0% | 56.7% | 0.0% | 0 |
| candidate | specialist | 100.0% (88.6%–100.0%) | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 0.0% | 0 |

Round clear rates above use all starting runs as the denominator. Conditional rates and score deficits are in summary.json.

## candidate

### greedy

- Mean 78.13 actions/run; 1.36 waves/board action; p99 3, maximum 4.
- 0 rerolls, 0 without an immediate match; 1679 coins earned, 1460 spent.
- Score shares: match levels 15.4%, trinket pips 16.7%, trinket Mult 3.0%, match base 3.1%, special base 58.7%, cascade bonus 2.3%, low-pip bonus 0.8%.
- 200 packs purchased for 860 coins; 1679 coins in round payouts; token picks: column 42, color 0, number 70, bomb 52, coin 0, row 46.
- 120 trinkets purchased for 600 coins; 647 trinket triggers. Numbered tokens: {"3":195,"4":164,"5":61,"6":0}.
- 860 special swaps. 13320 pip flights and 8202 Mult flights; mean 782.17 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 1 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 1826 | 1272 | 1009 |
| color | 0 | 0 | 0 |
| number | 3206 | 2044 | 1854 |
| bomb | 2201 | 1584 | 1229 |
| coin | 0 | 0 | 0 |
| row | 1998 | 1391 | 1089 |
### builder

- Mean 71.30 actions/run; 1.43 waves/board action; p99 4, maximum 6.
- 0 rerolls, 0 without an immediate match; 1356 coins earned, 1079 spent.
- Score shares: match levels 25.4%, trinket pips 53.7%, trinket Mult 6.5%, match base 6.0%, special base 3.0%, cascade bonus 4.0%, low-pip bonus 1.5%.
- 121 packs purchased for 484 coins; 1356 coins in round payouts; token picks: column 1, color 0, number 19, bomb 9, coin 0, row 1.
- 119 trinkets purchased for 595 coins; 2359 trinket triggers. Numbered tokens: {"3":177,"4":137,"5":49,"6":0}.
- 295 special swaps. 8307 pip flights and 5216 Mult flights; mean 556.18 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 5 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 24 | 13 | 2 |
| color | 0 | 0 | 0 |
| number | 526 | 196 | 0 |
| bomb | 230 | 118 | 35 |
| coin | 0 | 0 | 0 |
| row | 28 | 22 | 5 |
### specialist

- Mean 72.60 actions/run; 1.25 waves/board action; p99 3, maximum 4.
- 0 rerolls, 0 without an immediate match; 1737 coins earned, 1050 spent.
- Score shares: match levels 7.7%, trinket pips 0.0%, trinket Mult 0.0%, match base 1.7%, special base 88.8%, cascade bonus 1.3%, low-pip bonus 0.5%.
- 240 packs purchased for 1050 coins; 1737 coins in round payouts; token picks: column 47, color 22, number 96, bomb 81, coin 0, row 54.
- 0 trinkets purchased for 0 coins; 0 trinket triggers. Numbered tokens: {"3":215,"4":172,"5":63,"6":0}.
- 688 special swaps. 10952 pip flights and 10235 Mult flights; mean 781.38 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 1 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 2114 | 1513 | 1328 |
| color | 904 | 641 | 554 |
| number | 4245 | 2963 | 2824 |
| bomb | 3664 | 2632 | 2308 |
| coin | 0 | 0 | 0 |
| row | 2395 | 1722 | 1505 |

## Limits

- Agent policies are not human skill estimates.
- Only visible information reaches policies; rollout samples use independent RNG.
- Matched seeds start equally, but streams diverge after different actions.
- Confidence intervals describe seed sampling under these fixed policies.
- Starter drafts, pack purchases, token choices, payouts and match upgrades, trinkets and nine-round progression are simulated using the production engine.
- Nominal scoring animation uses the same event plan and timings as the UI; decision time, falls, pauses and frame time are excluded.
- Pip-trinket score is allocated first at final Mult; Mult sources then use dice pips. Attribution is accounting, not causal lift.

Censored runs are retained in the denominator and are not counted as wins. Any nonzero censorship or resolution ceiling needs investigation before drawing balance conclusions. Sensitivity results are screening evidence, not automatic tuning instructions; confirm changes on held-out seeds.
