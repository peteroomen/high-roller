# High Roller — full-run model

12 runs per scenario/policy; seeds 1–12; 1 independent samples per rollout candidate.

Engine SHA-256: `5ddbad8174bee3a5fe561ba9629b0911b0ebd46f628ee8b475363ce848dcdeab`. Model SHA-256: `d0d481898acef06fe3b6758cebe48335969d50396250119a862e978912071a74`.

| Scenario | Policy | Run wins (95% CI) | R1 clear | R2 clear | R3 clear | R4 clear | R5 clear | R6 clear | R7 clear | R8 clear | R9 clear | Runs using reroll | Censored |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| baseline | greedy | 66.7% (39.1%–86.2%) | 100.0% | 100.0% | 100.0% | 100.0% | 91.7% | 83.3% | 75.0% | 66.7% | 66.7% | 0.0% | 0 |
| baseline | builder | 75.0% (46.8%–91.1%) | 100.0% | 83.3% | 83.3% | 83.3% | 83.3% | 83.3% | 75.0% | 75.0% | 75.0% | 0.0% | 0 |
| start-convert | greedy | 66.7% (39.1%–86.2%) | 100.0% | 100.0% | 100.0% | 91.7% | 91.7% | 91.7% | 83.3% | 75.0% | 66.7% | 0.0% | 0 |
| start-convert | builder | 75.0% (46.8%–91.1%) | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 91.7% | 91.7% | 91.7% | 75.0% | 0.0% | 0 |
| start-ones | greedy | 75.0% (46.8%–91.1%) | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 91.7% | 83.3% | 75.0% | 0.0% | 0 |
| start-ones | builder | 83.3% (55.2%–95.3%) | 100.0% | 100.0% | 91.7% | 91.7% | 91.7% | 91.7% | 91.7% | 83.3% | 83.3% | 0.0% | 0 |
| start-cascade | greedy | 41.7% (19.3%–68.0%) | 100.0% | 91.7% | 83.3% | 75.0% | 66.7% | 58.3% | 58.3% | 50.0% | 41.7% | 0.0% | 0 |
| start-cascade | builder | 75.0% (46.8%–91.1%) | 100.0% | 91.7% | 83.3% | 83.3% | 83.3% | 83.3% | 75.0% | 75.0% | 75.0% | 0.0% | 0 |
| start-quad | greedy | 100.0% (75.8%–100.0%) | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 0.0% | 0 |
| start-quad | builder | 100.0% (75.8%–100.0%) | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 0.0% | 0 |
| start-rainbow | greedy | 58.3% (32.0%–80.7%) | 100.0% | 100.0% | 83.3% | 83.3% | 83.3% | 66.7% | 66.7% | 58.3% | 58.3% | 0.0% | 0 |
| start-rainbow | builder | 50.0% (25.4%–74.6%) | 100.0% | 91.7% | 75.0% | 75.0% | 75.0% | 66.7% | 66.7% | 58.3% | 50.0% | 0.0% | 0 |
| start-bigbomb | greedy | 58.3% (32.0%–80.7%) | 100.0% | 100.0% | 83.3% | 75.0% | 75.0% | 66.7% | 66.7% | 66.7% | 58.3% | 0.0% | 0 |
| start-bigbomb | builder | 66.7% (39.1%–86.2%) | 100.0% | 91.7% | 75.0% | 75.0% | 75.0% | 75.0% | 75.0% | 75.0% | 66.7% | 0.0% | 0 |
| start-widecolumn | greedy | 58.3% (32.0%–80.7%) | 100.0% | 100.0% | 91.7% | 83.3% | 83.3% | 75.0% | 75.0% | 66.7% | 58.3% | 0.0% | 0 |
| start-widecolumn | builder | 66.7% (39.1%–86.2%) | 100.0% | 91.7% | 75.0% | 75.0% | 75.0% | 75.0% | 75.0% | 75.0% | 66.7% | 0.0% | 0 |
| start-widerow | greedy | 66.7% (39.1%–86.2%) | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 91.7% | 91.7% | 75.0% | 66.7% | 0.0% | 0 |
| start-widerow | builder | 75.0% (46.8%–91.1%) | 100.0% | 100.0% | 83.3% | 83.3% | 83.3% | 83.3% | 83.3% | 83.3% | 75.0% | 0.0% | 0 |
| special-pips-0 | greedy | 25.0% (8.9%–53.2%) | 100.0% | 100.0% | 100.0% | 100.0% | 91.7% | 75.0% | 66.7% | 58.3% | 25.0% | 0.0% | 0 |
| special-pips-0 | builder | 83.3% (55.2%–95.3%) | 100.0% | 91.7% | 91.7% | 91.7% | 91.7% | 91.7% | 91.7% | 91.7% | 83.3% | 0.0% | 0 |
| special-pips-5 | greedy | 33.3% (13.8%–60.9%) | 100.0% | 100.0% | 91.7% | 91.7% | 83.3% | 58.3% | 50.0% | 41.7% | 33.3% | 0.0% | 0 |
| special-pips-5 | builder | 75.0% (46.8%–91.1%) | 100.0% | 83.3% | 83.3% | 83.3% | 83.3% | 75.0% | 75.0% | 75.0% | 75.0% | 0.0% | 0 |
| equal-rarity | greedy | 41.7% (19.3%–68.0%) | 100.0% | 100.0% | 100.0% | 100.0% | 83.3% | 83.3% | 50.0% | 50.0% | 41.7% | 0.0% | 0 |
| equal-rarity | builder | 75.0% (46.8%–91.1%) | 100.0% | 91.7% | 91.7% | 91.7% | 83.3% | 83.3% | 83.3% | 83.3% | 75.0% | 0.0% | 0 |
| gold-0 | greedy | 33.3% (13.8%–60.9%) | 100.0% | 100.0% | 100.0% | 83.3% | 83.3% | 83.3% | 66.7% | 50.0% | 33.3% | 0.0% | 0 |
| gold-0 | builder | 75.0% (46.8%–91.1%) | 100.0% | 83.3% | 83.3% | 83.3% | 83.3% | 83.3% | 75.0% | 75.0% | 75.0% | 0.0% | 0 |
| gold-10 | greedy | 58.3% (32.0%–80.7%) | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 83.3% | 66.7% | 58.3% | 0.0% | 0 |
| gold-10 | builder | 75.0% (46.8%–91.1%) | 100.0% | 83.3% | 83.3% | 83.3% | 75.0% | 75.0% | 75.0% | 75.0% | 75.0% | 0.0% | 0 |
| quad-x2 | greedy | 58.3% (32.0%–80.7%) | 100.0% | 100.0% | 100.0% | 100.0% | 91.7% | 83.3% | 75.0% | 66.7% | 58.3% | 0.0% | 0 |
| quad-x2 | builder | 75.0% (46.8%–91.1%) | 100.0% | 83.3% | 83.3% | 83.3% | 83.3% | 83.3% | 75.0% | 75.0% | 75.0% | 0.0% | 0 |
| quad-cost-14 | greedy | 66.7% (39.1%–86.2%) | 100.0% | 100.0% | 100.0% | 100.0% | 91.7% | 83.3% | 75.0% | 66.7% | 66.7% | 0.0% | 0 |
| quad-cost-14 | builder | 75.0% (46.8%–91.1%) | 100.0% | 83.3% | 83.3% | 83.3% | 83.3% | 83.3% | 75.0% | 75.0% | 75.0% | 0.0% | 0 |
| no-new-trinkets | greedy | 33.3% (13.8%–60.9%) | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 83.3% | 66.7% | 50.0% | 33.3% | 0.0% | 0 |
| no-new-trinkets | builder | 58.3% (32.0%–80.7%) | 100.0% | 91.7% | 91.7% | 91.7% | 91.7% | 83.3% | 75.0% | 75.0% | 58.3% | 0.0% | 0 |
| ones-build | greedy | 91.7% (64.6%–98.5%) | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 91.7% | 0.0% | 0 |
| ones-build | builder | 100.0% (75.8%–100.0%) | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 0.0% | 0 |
| blast-build | greedy | 100.0% (75.8%–100.0%) | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 0.0% | 0 |
| blast-build | builder | 83.3% (55.2%–95.3%) | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 91.7% | 91.7% | 83.3% | 0.0% | 0 |
| shiny-quad | greedy | 91.7% (64.6%–98.5%) | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 91.7% | 91.7% | 91.7% | 91.7% | 0.0% | 0 |
| shiny-quad | builder | 100.0% (75.8%–100.0%) | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 0.0% | 0 |

Round clear rates above use all starting runs as the denominator. Conditional rates and score deficits are in summary.json.

## baseline

### greedy

- Mean 74.67 actions/run; 1.61 waves/board action; p99 5, maximum 7.
- 0 rerolls, 0 without an immediate match; 1189 coins earned, 801 spent.
- Score shares: multipliers 12.2%, global additive trinkets 6.8%, match levels 10.1%, trinket pips 39.7%, trinket Mult 8.1%, match base 13.2%, special base 1.8%, cascade bonus 5.7%, low-pip bonus 2.5%.
- 76 packs purchased for 348 coins; 992 coins in round payouts; token picks: column 7, color 0, number 13, bomb 10, twenty 0, row 4, wild 8, shiny 14.
- 75 trinkets purchased for 453 coins; 1336 trinket triggers. Numbered tokens: {"3":26,"4":6,"5":0,"6":0}.
- 135 gold matches from 363 observed gold spawns; 40 shiny matches; 23 wild clears.
- 63 special swaps. 3719 pip flights and 1896 Mult flights; mean 299.30 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 1 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Blast activations | Triggered by another special |
|---|---:|---:|---:|
| column | 24 | 17 | 5 |
| color | 0 | 0 | 0 |
| number | 55 | 26 | 4 |
| bomb | 42 | 26 | 4 |
| twenty | 0 | 0 | 0 |
| row | 18 | 9 | 0 |
| wild | 26 | 2 | 2 |
| shiny | 56 | 0 | 0 |
### builder

- Mean 63.25 actions/run; 1.62 waves/board action; p99 4, maximum 6.
- 0 rerolls, 0 without an immediate match; 1173 coins earned, 665 spent.
- Score shares: multipliers 7.6%, global additive trinkets 4.3%, match levels 18.5%, trinket pips 48.5%, trinket Mult 5.7%, match base 9.5%, special base 0.6%, cascade bonus 3.5%, low-pip bonus 1.8%.
- 63 packs purchased for 252 coins; 1002 coins in round payouts; token picks: column 0, color 0, number 4, bomb 3, twenty 0, row 1, wild 1, shiny 3.
- 71 trinkets purchased for 413 coins; 1125 trinket triggers. Numbered tokens: {"3":52,"4":11,"5":0,"6":0}.
- 109 gold matches from 308 observed gold spawns; 7 shiny matches; 1 wild clears.
- 23 special swaps. 2836 pip flights and 1445 Mult flights; mean 233.40 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 0 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Blast activations | Triggered by another special |
|---|---:|---:|---:|
| column | 0 | 0 | 0 |
| color | 0 | 0 | 0 |
| number | 27 | 13 | 0 |
| bomb | 18 | 9 | 1 |
| twenty | 0 | 0 | 0 |
| row | 4 | 2 | 0 |
| wild | 1 | 0 | 0 |
| shiny | 14 | 0 | 0 |

## start-convert

### greedy

- Mean 62.25 actions/run; 1.92 waves/board action; p99 6, maximum 7.
- 0 rerolls, 0 without an immediate match; 1374 coins earned, 845 spent.
- Score shares: multipliers 27.7%, global additive trinkets 4.0%, match levels 10.3%, trinket pips 34.5%, trinket Mult 4.9%, match base 9.8%, special base 1.3%, cascade bonus 5.4%, low-pip bonus 2.1%.
- 84 packs purchased for 381 coins; 1191 coins in round payouts; token picks: column 8, color 0, number 12, bomb 12, twenty 0, row 8, wild 8, shiny 9.
- 69 trinkets purchased for 464 coins; 1023 trinket triggers. Numbered tokens: {"3":34,"4":5,"5":0,"6":0}.
- 101 gold matches from 328 observed gold spawns; 9 shiny matches; 21 wild clears.
- 61 special swaps. 3194 pip flights and 1372 Mult flights; mean 235.82 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 0 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Blast activations | Triggered by another special |
|---|---:|---:|---:|
| column | 29 | 8 | 0 |
| color | 0 | 0 | 0 |
| number | 52 | 26 | 2 |
| bomb | 54 | 29 | 5 |
| twenty | 0 | 0 | 0 |
| row | 22 | 7 | 1 |
| wild | 22 | 1 | 1 |
| shiny | 29 | 0 | 0 |
### builder

- Mean 67.33 actions/run; 1.77 waves/board action; p99 5, maximum 6.
- 0 rerolls, 0 without an immediate match; 1400 coins earned, 734 spent.
- Score shares: multipliers 11.5%, global additive trinkets 2.9%, match levels 17.3%, trinket pips 51.2%, trinket Mult 3.9%, match base 7.7%, special base 0.2%, cascade bonus 3.5%, low-pip bonus 1.7%.
- 85 packs purchased for 340 coins; 1210 coins in round payouts; token picks: column 1, color 0, number 2, bomb 3, twenty 0, row 0, wild 5, shiny 1.
- 63 trinkets purchased for 394 coins; 1321 trinket triggers. Numbered tokens: {"3":64,"4":21,"5":0,"6":0}.
- 127 gold matches from 342 observed gold spawns; 0 shiny matches; 20 wild clears.
- 13 special swaps. 3120 pip flights and 1575 Mult flights; mean 256.27 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 0 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Blast activations | Triggered by another special |
|---|---:|---:|---:|
| column | 8 | 3 | 1 |
| color | 0 | 0 | 0 |
| number | 12 | 5 | 0 |
| bomb | 15 | 6 | 0 |
| twenty | 0 | 0 | 0 |
| row | 0 | 0 | 0 |
| wild | 21 | 0 | 0 |
| shiny | 2 | 0 | 0 |

## start-ones

### greedy

- Mean 71.25 actions/run; 1.71 waves/board action; p99 5, maximum 6.
- 0 rerolls, 0 without an immediate match; 1396 coins earned, 857 spent.
- Score shares: multipliers 43.4%, global additive trinkets 5.6%, match levels 7.6%, trinket pips 25.4%, trinket Mult 3.6%, match base 7.8%, special base 1.3%, cascade bonus 3.8%, low-pip bonus 1.5%.
- 84 packs purchased for 383 coins; 1175 coins in round payouts; token picks: column 7, color 0, number 16, bomb 9, twenty 0, row 8, wild 9, shiny 10.
- 70 trinkets purchased for 474 coins; 1245 trinket triggers. Numbered tokens: {"3":31,"4":6,"5":0,"6":0}.
- 137 gold matches from 391 observed gold spawns; 15 shiny matches; 24 wild clears.
- 81 special swaps. 3521 pip flights and 1729 Mult flights; mean 275.58 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 2 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Blast activations | Triggered by another special |
|---|---:|---:|---:|
| column | 21 | 13 | 3 |
| color | 0 | 0 | 0 |
| number | 67 | 36 | 5 |
| bomb | 36 | 23 | 3 |
| twenty | 0 | 0 | 0 |
| row | 45 | 24 | 3 |
| wild | 24 | 1 | 1 |
| shiny | 39 | 0 | 0 |
### builder

- Mean 64.08 actions/run; 1.63 waves/board action; p99 5, maximum 7.
- 0 rerolls, 0 without an immediate match; 1344 coins earned, 712 spent.
- Score shares: multipliers 36.9%, global additive trinkets 3.5%, match levels 11.0%, trinket pips 35.7%, trinket Mult 2.8%, match base 5.8%, special base 0.3%, cascade bonus 3.0%, low-pip bonus 1.1%.
- 75 packs purchased for 300 coins; 1166 coins in round payouts; token picks: column 0, color 0, number 4, bomb 3, twenty 0, row 1, wild 1, shiny 3.
- 63 trinkets purchased for 412 coins; 1082 trinket triggers. Numbered tokens: {"3":64,"4":11,"5":0,"6":0}.
- 115 gold matches from 323 observed gold spawns; 7 shiny matches; 2 wild clears.
- 21 special swaps. 2721 pip flights and 1364 Mult flights; mean 222.09 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 0 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Blast activations | Triggered by another special |
|---|---:|---:|---:|
| column | 0 | 0 | 0 |
| color | 0 | 0 | 0 |
| number | 23 | 13 | 0 |
| bomb | 16 | 6 | 0 |
| twenty | 0 | 0 | 0 |
| row | 6 | 2 | 0 |
| wild | 2 | 0 | 0 |
| shiny | 13 | 0 | 0 |

## start-cascade

### greedy

- Mean 60.08 actions/run; 1.53 waves/board action; p99 4, maximum 5.
- 0 rerolls, 0 without an immediate match; 1001 coins earned, 645 spent.
- Score shares: multipliers 15.1%, global additive trinkets 5.9%, match levels 11.0%, trinket pips 42.3%, trinket Mult 5.5%, match base 12.1%, special base 1.7%, cascade bonus 4.2%, low-pip bonus 2.2%.
- 63 packs purchased for 289 coins; 834 coins in round payouts; token picks: column 5, color 0, number 13, bomb 6, twenty 0, row 5, wild 7, shiny 13.
- 58 trinkets purchased for 356 coins; 1017 trinket triggers. Numbered tokens: {"3":21,"4":5,"5":0,"6":0}.
- 108 gold matches from 309 observed gold spawns; 23 shiny matches; 9 wild clears.
- 58 special swaps. 2866 pip flights and 1425 Mult flights; mean 227.39 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 1 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Blast activations | Triggered by another special |
|---|---:|---:|---:|
| column | 23 | 13 | 2 |
| color | 0 | 0 | 0 |
| number | 55 | 32 | 4 |
| bomb | 25 | 15 | 1 |
| twenty | 0 | 0 | 0 |
| row | 15 | 7 | 0 |
| wild | 10 | 0 | 0 |
| shiny | 35 | 0 | 0 |
### builder

- Mean 63.17 actions/run; 1.53 waves/board action; p99 4, maximum 6.
- 0 rerolls, 0 without an immediate match; 1187 coins earned, 694 spent.
- Score shares: multipliers 37.0%, global additive trinkets 2.8%, match levels 12.4%, trinket pips 33.4%, trinket Mult 3.9%, match base 6.6%, special base 0.4%, cascade bonus 2.2%, low-pip bonus 1.2%.
- 68 packs purchased for 272 coins; 1023 coins in round payouts; token picks: column 0, color 0, number 4, bomb 3, twenty 0, row 1, wild 1, shiny 3.
- 63 trinkets purchased for 422 coins; 1049 trinket triggers. Numbered tokens: {"3":49,"4":19,"5":0,"6":0}.
- 97 gold matches from 291 observed gold spawns; 7 shiny matches; 4 wild clears.
- 24 special swaps. 2561 pip flights and 1366 Mult flights; mean 215.34 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 0 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Blast activations | Triggered by another special |
|---|---:|---:|---:|
| column | 0 | 0 | 0 |
| color | 0 | 0 | 0 |
| number | 20 | 14 | 0 |
| bomb | 14 | 8 | 0 |
| twenty | 0 | 0 | 0 |
| row | 4 | 2 | 0 |
| wild | 5 | 0 | 0 |
| shiny | 12 | 0 | 0 |

## start-quad

### greedy

- Mean 59.67 actions/run; 1.75 waves/board action; p99 6, maximum 7.
- 0 rerolls, 0 without an immediate match; 1540 coins earned, 796 spent.
- Score shares: multipliers 75.6%, global additive trinkets 1.6%, match levels 4.6%, trinket pips 9.6%, trinket Mult 1.6%, match base 3.5%, special base 0.8%, cascade bonus 1.9%, low-pip bonus 0.8%.
- 92 packs purchased for 416 coins; 1388 coins in round payouts; token picks: column 6, color 0, number 13, bomb 10, twenty 0, row 14, wild 7, shiny 10.
- 66 trinkets purchased for 380 coins; 834 trinket triggers. Numbered tokens: {"3":33,"4":11,"5":0,"6":0}.
- 80 gold matches from 326 observed gold spawns; 13 shiny matches; 18 wild clears.
- 45 special swaps. 2185 pip flights and 1168 Mult flights; mean 176.17 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 0 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Blast activations | Triggered by another special |
|---|---:|---:|---:|
| column | 18 | 4 | 1 |
| color | 0 | 0 | 0 |
| number | 36 | 16 | 3 |
| bomb | 39 | 23 | 8 |
| twenty | 0 | 0 | 0 |
| row | 56 | 22 | 6 |
| wild | 20 | 0 | 0 |
| shiny | 31 | 0 | 0 |
### builder

- Mean 59.25 actions/run; 1.77 waves/board action; p99 5, maximum 7.
- 0 rerolls, 0 without an immediate match; 1540 coins earned, 723 spent.
- Score shares: multipliers 75.3%, global additive trinkets 1.7%, match levels 7.5%, trinket pips 8.1%, trinket Mult 1.5%, match base 3.3%, special base 0.2%, cascade bonus 1.7%, low-pip bonus 0.7%.
- 86 packs purchased for 344 coins; 1379 coins in round payouts; token picks: column 0, color 0, number 4, bomb 3, twenty 0, row 1, wild 1, shiny 3.
- 65 trinkets purchased for 379 coins; 830 trinket triggers. Numbered tokens: {"3":65,"4":21,"5":0,"6":0}.
- 90 gold matches from 301 observed gold spawns; 5 shiny matches; 4 wild clears.
- 15 special swaps. 1944 pip flights and 1208 Mult flights; mean 171.14 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 0 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Blast activations | Triggered by another special |
|---|---:|---:|---:|
| column | 0 | 0 | 0 |
| color | 0 | 0 | 0 |
| number | 21 | 7 | 0 |
| bomb | 15 | 8 | 1 |
| twenty | 0 | 0 | 0 |
| row | 4 | 1 | 0 |
| wild | 4 | 0 | 0 |
| shiny | 14 | 0 | 0 |

## start-rainbow

### greedy

- Mean 62.75 actions/run; 1.66 waves/board action; p99 5, maximum 6.
- 0 rerolls, 0 without an immediate match; 1147 coins earned, 775 spent.
- Score shares: multipliers 37.1%, global additive trinkets 5.8%, match levels 8.6%, trinket pips 24.8%, trinket Mult 5.6%, match base 10.4%, special base 1.7%, cascade bonus 4.2%, low-pip bonus 1.9%.
- 68 packs purchased for 312 coins; 962 coins in round payouts; token picks: column 4, color 0, number 11, bomb 12, twenty 0, row 7, wild 3, shiny 15.
- 69 trinkets purchased for 463 coins; 946 trinket triggers. Numbered tokens: {"3":21,"4":7,"5":0,"6":0}.
- 102 gold matches from 309 observed gold spawns; 22 shiny matches; 1 wild clears.
- 70 special swaps. 2937 pip flights and 1419 Mult flights; mean 229.10 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 3 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Blast activations | Triggered by another special |
|---|---:|---:|---:|
| column | 12 | 7 | 1 |
| color | 0 | 0 | 0 |
| number | 54 | 37 | 5 |
| bomb | 46 | 26 | 2 |
| twenty | 0 | 0 | 0 |
| row | 14 | 11 | 2 |
| wild | 2 | 0 | 0 |
| shiny | 51 | 0 | 0 |
### builder

- Mean 62.67 actions/run; 1.50 waves/board action; p99 4, maximum 5.
- 0 rerolls, 0 without an immediate match; 1043 coins earned, 653 spent.
- Score shares: multipliers 26.7%, global additive trinkets 2.8%, match levels 14.9%, trinket pips 38.8%, trinket Mult 4.3%, match base 8.0%, special base 0.4%, cascade bonus 2.6%, low-pip bonus 1.4%.
- 58 packs purchased for 232 coins; 866 coins in round payouts; token picks: column 0, color 0, number 4, bomb 3, twenty 0, row 1, wild 1, shiny 3.
- 67 trinkets purchased for 421 coins; 906 trinket triggers. Numbered tokens: {"3":42,"4":16,"5":0,"6":0}.
- 96 gold matches from 263 observed gold spawns; 6 shiny matches; 7 wild clears.
- 21 special swaps. 2522 pip flights and 1221 Mult flights; mean 206.56 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 0 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Blast activations | Triggered by another special |
|---|---:|---:|---:|
| column | 0 | 0 | 0 |
| color | 0 | 0 | 0 |
| number | 25 | 15 | 0 |
| bomb | 12 | 4 | 0 |
| twenty | 0 | 0 | 0 |
| row | 4 | 2 | 0 |
| wild | 8 | 0 | 0 |
| shiny | 14 | 0 | 0 |

## start-bigbomb

### greedy

- Mean 64.50 actions/run; 1.58 waves/board action; p99 5, maximum 5.
- 0 rerolls, 0 without an immediate match; 1135 coins earned, 769 spent.
- Score shares: multipliers 28.7%, global additive trinkets 6.0%, match levels 8.8%, trinket pips 33.2%, trinket Mult 5.4%, match base 10.3%, special base 1.6%, cascade bonus 4.2%, low-pip bonus 1.8%.
- 66 packs purchased for 303 coins; 928 coins in round payouts; token picks: column 2, color 0, number 11, bomb 8, twenty 0, row 8, wild 8, shiny 14.
- 73 trinkets purchased for 466 coins; 1020 trinket triggers. Numbered tokens: {"3":20,"4":7,"5":0,"6":0}.
- 103 gold matches from 307 observed gold spawns; 23 shiny matches; 11 wild clears.
- 59 special swaps. 2967 pip flights and 1406 Mult flights; mean 231.67 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 3 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Blast activations | Triggered by another special |
|---|---:|---:|---:|
| column | 3 | 3 | 1 |
| color | 0 | 0 | 0 |
| number | 48 | 25 | 3 |
| bomb | 38 | 23 | 2 |
| twenty | 0 | 0 | 0 |
| row | 27 | 15 | 1 |
| wild | 14 | 1 | 1 |
| shiny | 43 | 0 | 0 |
### builder

- Mean 64.33 actions/run; 1.53 waves/board action; p99 4, maximum 5.
- 0 rerolls, 0 without an immediate match; 1131 coins earned, 686 spent.
- Score shares: multipliers 24.8%, global additive trinkets 2.9%, match levels 15.5%, trinket pips 39.6%, trinket Mult 4.7%, match base 7.9%, special base 0.5%, cascade bonus 2.8%, low-pip bonus 1.4%.
- 62 packs purchased for 248 coins; 938 coins in round payouts; token picks: column 0, color 0, number 4, bomb 3, twenty 0, row 1, wild 1, shiny 3.
- 70 trinkets purchased for 438 coins; 998 trinket triggers. Numbered tokens: {"3":44,"4":18,"5":0,"6":0}.
- 96 gold matches from 278 observed gold spawns; 6 shiny matches; 7 wild clears.
- 25 special swaps. 2645 pip flights and 1335 Mult flights; mean 218.37 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 0 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Blast activations | Triggered by another special |
|---|---:|---:|---:|
| column | 0 | 0 | 0 |
| color | 0 | 0 | 0 |
| number | 25 | 17 | 0 |
| bomb | 13 | 6 | 0 |
| twenty | 0 | 0 | 0 |
| row | 4 | 2 | 0 |
| wild | 8 | 0 | 0 |
| shiny | 14 | 0 | 0 |

## start-widecolumn

### greedy

- Mean 68.00 actions/run; 1.60 waves/board action; p99 5, maximum 5.
- 0 rerolls, 0 without an immediate match; 1199 coins earned, 809 spent.
- Score shares: multipliers 29.3%, global additive trinkets 5.5%, match levels 9.3%, trinket pips 31.1%, trinket Mult 6.5%, match base 10.7%, special base 1.7%, cascade bonus 4.0%, low-pip bonus 1.8%.
- 70 packs purchased for 322 coins; 985 coins in round payouts; token picks: column 2, color 0, number 13, bomb 7, twenty 0, row 7, wild 8, shiny 17.
- 76 trinkets purchased for 487 coins; 1110 trinket triggers. Numbered tokens: {"3":24,"4":4,"5":0,"6":0}.
- 103 gold matches from 316 observed gold spawns; 33 shiny matches; 7 wild clears.
- 71 special swaps. 3188 pip flights and 1565 Mult flights; mean 251.25 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 2 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Blast activations | Triggered by another special |
|---|---:|---:|---:|
| column | 10 | 6 | 2 |
| color | 0 | 0 | 0 |
| number | 62 | 37 | 3 |
| bomb | 37 | 22 | 1 |
| twenty | 0 | 0 | 0 |
| row | 26 | 14 | 1 |
| wild | 8 | 0 | 0 |
| shiny | 59 | 0 | 0 |
### builder

- Mean 66.08 actions/run; 1.52 waves/board action; p99 4, maximum 5.
- 0 rerolls, 0 without an immediate match; 1128 coins earned, 706 spent.
- Score shares: multipliers 23.5%, global additive trinkets 2.7%, match levels 15.7%, trinket pips 41.2%, trinket Mult 4.7%, match base 7.8%, special base 0.4%, cascade bonus 2.7%, low-pip bonus 1.4%.
- 62 packs purchased for 248 coins; 923 coins in round payouts; token picks: column 0, color 0, number 4, bomb 3, twenty 0, row 1, wild 1, shiny 3.
- 73 trinkets purchased for 458 coins; 1019 trinket triggers. Numbered tokens: {"3":46,"4":16,"5":0,"6":0}.
- 98 gold matches from 277 observed gold spawns; 6 shiny matches; 7 wild clears.
- 23 special swaps. 2672 pip flights and 1342 Mult flights; mean 221.79 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 0 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Blast activations | Triggered by another special |
|---|---:|---:|---:|
| column | 0 | 0 | 0 |
| color | 0 | 0 | 0 |
| number | 25 | 17 | 0 |
| bomb | 12 | 4 | 0 |
| twenty | 0 | 0 | 0 |
| row | 4 | 2 | 0 |
| wild | 8 | 0 | 0 |
| shiny | 14 | 0 | 0 |

## start-widerow

### greedy

- Mean 74.25 actions/run; 1.65 waves/board action; p99 5, maximum 5.
- 0 rerolls, 0 without an immediate match; 1372 coins earned, 899 spent.
- Score shares: multipliers 26.8%, global additive trinkets 5.2%, match levels 10.0%, trinket pips 33.3%, trinket Mult 6.4%, match base 10.5%, special base 1.8%, cascade bonus 4.0%, low-pip bonus 1.9%.
- 81 packs purchased for 371 coins; 1120 coins in round payouts; token picks: column 3, color 0, number 16, bomb 8, twenty 0, row 8, wild 6, shiny 18.
- 83 trinkets purchased for 528 coins; 1291 trinket triggers. Numbered tokens: {"3":28,"4":6,"5":0,"6":0}.
- 122 gold matches from 362 observed gold spawns; 41 shiny matches; 11 wild clears.
- 84 special swaps. 3608 pip flights and 1746 Mult flights; mean 281.88 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 1 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Blast activations | Triggered by another special |
|---|---:|---:|---:|
| column | 12 | 10 | 2 |
| color | 0 | 0 | 0 |
| number | 74 | 41 | 4 |
| bomb | 43 | 26 | 2 |
| twenty | 0 | 0 | 0 |
| row | 42 | 19 | 3 |
| wild | 15 | 0 | 0 |
| shiny | 70 | 0 | 0 |
### builder

- Mean 70.33 actions/run; 1.55 waves/board action; p99 4, maximum 5.
- 0 rerolls, 0 without an immediate match; 1237 coins earned, 749 spent.
- Score shares: multipliers 20.8%, global additive trinkets 2.8%, match levels 16.1%, trinket pips 43.7%, trinket Mult 4.6%, match base 7.6%, special base 0.4%, cascade bonus 2.8%, low-pip bonus 1.4%.
- 70 packs purchased for 280 coins; 1015 coins in round payouts; token picks: column 0, color 0, number 4, bomb 3, twenty 0, row 1, wild 1, shiny 3.
- 75 trinkets purchased for 469 coins; 1144 trinket triggers. Numbered tokens: {"3":51,"4":19,"5":0,"6":0}.
- 111 gold matches from 311 observed gold spawns; 6 shiny matches; 7 wild clears.
- 24 special swaps. 2913 pip flights and 1467 Mult flights; mean 241.43 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 0 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Blast activations | Triggered by another special |
|---|---:|---:|---:|
| column | 0 | 0 | 0 |
| color | 0 | 0 | 0 |
| number | 25 | 17 | 0 |
| bomb | 12 | 4 | 0 |
| twenty | 0 | 0 | 0 |
| row | 8 | 3 | 0 |
| wild | 8 | 0 | 0 |
| shiny | 14 | 0 | 0 |

## special-pips-0

### greedy

- Mean 74.17 actions/run; 1.54 waves/board action; p99 4, maximum 6.
- 0 rerolls, 0 without an immediate match; 1112 coins earned, 751 spent.
- Score shares: multipliers 15.6%, global additive trinkets 5.7%, match levels 10.1%, trinket pips 39.8%, trinket Mult 7.9%, match base 13.0%, special base 1.2%, cascade bonus 4.3%, low-pip bonus 2.4%.
- 73 packs purchased for 335 coins; 904 coins in round payouts; token picks: column 6, color 0, number 19, bomb 7, twenty 0, row 2, wild 6, shiny 15.
- 69 trinkets purchased for 416 coins; 1318 trinket triggers. Numbered tokens: {"3":26,"4":4,"5":0,"6":0}.
- 164 gold matches from 351 observed gold spawns; 40 shiny matches; 10 wild clears.
- 52 special swaps. 3582 pip flights and 1886 Mult flights; mean 294.04 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 1 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Blast activations | Triggered by another special |
|---|---:|---:|---:|
| column | 26 | 18 | 4 |
| color | 0 | 0 | 0 |
| number | 73 | 32 | 7 |
| bomb | 23 | 11 | 2 |
| twenty | 0 | 0 | 0 |
| row | 15 | 6 | 1 |
| wild | 11 | 0 | 0 |
| shiny | 61 | 0 | 0 |
### builder

- Mean 67.33 actions/run; 1.69 waves/board action; p99 5, maximum 6.
- 0 rerolls, 0 without an immediate match; 1328 coins earned, 798 spent.
- Score shares: multipliers 32.1%, global additive trinkets 3.1%, match levels 13.7%, trinket pips 35.4%, trinket Mult 4.3%, match base 6.9%, special base 0.4%, cascade bonus 2.9%, low-pip bonus 1.4%.
- 72 packs purchased for 288 coins; 1141 coins in round payouts; token picks: column 0, color 0, number 4, bomb 3, twenty 0, row 1, wild 1, shiny 3.
- 78 trinkets purchased for 510 coins; 1205 trinket triggers. Numbered tokens: {"3":60,"4":12,"5":0,"6":0}.
- 114 gold matches from 335 observed gold spawns; 7 shiny matches; 2 wild clears.
- 26 special swaps. 2923 pip flights and 1563 Mult flights; mean 245.40 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 0 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Blast activations | Triggered by another special |
|---|---:|---:|---:|
| column | 0 | 0 | 0 |
| color | 0 | 0 | 0 |
| number | 29 | 15 | 0 |
| bomb | 16 | 9 | 1 |
| twenty | 0 | 0 | 0 |
| row | 8 | 4 | 1 |
| wild | 3 | 0 | 0 |
| shiny | 14 | 0 | 0 |

## special-pips-5

### greedy

- Mean 69.17 actions/run; 1.55 waves/board action; p99 4, maximum 6.
- 0 rerolls, 0 without an immediate match; 970 coins earned, 711 spent.
- Score shares: multipliers 11.0%, global additive trinkets 5.7%, match levels 12.3%, trinket pips 38.4%, trinket Mult 8.6%, match base 14.2%, special base 1.6%, cascade bonus 5.5%, low-pip bonus 2.7%.
- 64 packs purchased for 295 coins; 800 coins in round payouts; token picks: column 8, color 0, number 16, bomb 6, twenty 0, row 2, wild 9, shiny 10.
- 69 trinkets purchased for 416 coins; 1160 trinket triggers. Numbered tokens: {"3":23,"4":2,"5":0,"6":0}.
- 122 gold matches from 305 observed gold spawns; 30 shiny matches; 9 wild clears.
- 51 special swaps. 3318 pip flights and 1744 Mult flights; mean 271.76 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 2 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Blast activations | Triggered by another special |
|---|---:|---:|---:|
| column | 29 | 21 | 3 |
| color | 0 | 0 | 0 |
| number | 63 | 28 | 6 |
| bomb | 21 | 8 | 0 |
| twenty | 0 | 0 | 0 |
| row | 8 | 4 | 0 |
| wild | 12 | 0 | 0 |
| shiny | 38 | 0 | 0 |
### builder

- Mean 62.75 actions/run; 1.62 waves/board action; p99 5, maximum 6.
- 0 rerolls, 0 without an immediate match; 1172 coins earned, 690 spent.
- Score shares: multipliers 10.8%, global additive trinkets 3.7%, match levels 18.2%, trinket pips 47.2%, trinket Mult 5.5%, match base 8.8%, special base 0.5%, cascade bonus 3.7%, low-pip bonus 1.7%.
- 64 packs purchased for 256 coins; 995 coins in round payouts; token picks: column 0, color 0, number 4, bomb 3, twenty 0, row 1, wild 1, shiny 3.
- 72 trinkets purchased for 434 coins; 1108 trinket triggers. Numbered tokens: {"3":55,"4":9,"5":0,"6":0}.
- 112 gold matches from 301 observed gold spawns; 7 shiny matches; 1 wild clears.
- 22 special swaps. 2769 pip flights and 1432 Mult flights; mean 228.95 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 0 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Blast activations | Triggered by another special |
|---|---:|---:|---:|
| column | 0 | 0 | 0 |
| color | 0 | 0 | 0 |
| number | 24 | 11 | 0 |
| bomb | 16 | 11 | 2 |
| twenty | 0 | 0 | 0 |
| row | 4 | 2 | 0 |
| wild | 1 | 0 | 0 |
| shiny | 14 | 0 | 0 |

## equal-rarity

### greedy

- Mean 71.33 actions/run; 1.62 waves/board action; p99 6, maximum 6.
- 0 rerolls, 0 without an immediate match; 1124 coins earned, 800 spent.
- Score shares: multipliers 14.5%, global additive trinkets 6.3%, match levels 10.8%, trinket pips 36.5%, trinket Mult 7.6%, match base 14.1%, special base 1.3%, cascade bonus 6.4%, low-pip bonus 2.7%.
- 72 packs purchased for 328 coins; 913 coins in round payouts; token picks: column 3, color 0, number 8, bomb 8, twenty 0, row 4, wild 16, shiny 13.
- 78 trinkets purchased for 472 coins; 1163 trinket triggers. Numbered tokens: {"3":26,"4":6,"5":0,"6":0}.
- 140 gold matches from 343 observed gold spawns; 36 shiny matches; 51 wild clears.
- 43 special swaps. 3401 pip flights and 1678 Mult flights; mean 272.43 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 1 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Blast activations | Triggered by another special |
|---|---:|---:|---:|
| column | 15 | 10 | 0 |
| color | 0 | 0 | 0 |
| number | 49 | 27 | 2 |
| bomb | 25 | 8 | 2 |
| twenty | 0 | 0 | 0 |
| row | 7 | 3 | 0 |
| wild | 55 | 2 | 2 |
| shiny | 57 | 0 | 0 |
### builder

- Mean 67.50 actions/run; 1.64 waves/board action; p99 4, maximum 6.
- 0 rerolls, 0 without an immediate match; 1252 coins earned, 763 spent.
- Score shares: multipliers 13.6%, global additive trinkets 3.9%, match levels 16.8%, trinket pips 45.7%, trinket Mult 5.5%, match base 9.2%, special base 0.3%, cascade bonus 3.4%, low-pip bonus 1.7%.
- 70 packs purchased for 280 coins; 1064 coins in round payouts; token picks: column 0, color 0, number 3, bomb 0, twenty 0, row 1, wild 4, shiny 4.
- 79 trinkets purchased for 483 coins; 1196 trinket triggers. Numbered tokens: {"3":54,"4":16,"5":0,"6":0}.
- 116 gold matches from 308 observed gold spawns; 10 shiny matches; 16 wild clears.
- 11 special swaps. 2893 pip flights and 1536 Mult flights; mean 243.67 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 0 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Blast activations | Triggered by another special |
|---|---:|---:|---:|
| column | 0 | 0 | 0 |
| color | 0 | 0 | 0 |
| number | 21 | 10 | 0 |
| bomb | 0 | 0 | 0 |
| twenty | 0 | 0 | 0 |
| row | 5 | 2 | 1 |
| wild | 19 | 0 | 0 |
| shiny | 17 | 0 | 0 |

## gold-0

### greedy

- Mean 68.33 actions/run; 1.66 waves/board action; p99 5, maximum 7.
- 0 rerolls, 0 without an immediate match; 974 coins earned, 742 spent.
- Score shares: multipliers 10.6%, global additive trinkets 5.8%, match levels 9.8%, trinket pips 41.6%, trinket Mult 7.7%, match base 13.6%, special base 1.8%, cascade bonus 6.5%, low-pip bonus 2.7%.
- 71 packs purchased for 326 coins; 925 coins in round payouts; token picks: column 5, color 0, number 11, bomb 11, twenty 0, row 5, wild 10, shiny 12.
- 69 trinkets purchased for 416 coins; 1183 trinket triggers. Numbered tokens: {"3":20,"4":9,"5":0,"6":0}.
- 0 gold matches from 0 observed gold spawns; 32 shiny matches; 23 wild clears.
- 59 special swaps. 3512 pip flights and 1663 Mult flights; mean 275.01 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 0 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Blast activations | Triggered by another special |
|---|---:|---:|---:|
| column | 24 | 14 | 4 |
| color | 0 | 0 | 0 |
| number | 45 | 22 | 4 |
| bomb | 51 | 29 | 6 |
| twenty | 0 | 0 | 0 |
| row | 16 | 9 | 0 |
| wild | 25 | 2 | 2 |
| shiny | 50 | 0 | 0 |
### builder

- Mean 60.17 actions/run; 1.66 waves/board action; p99 4, maximum 6.
- 0 rerolls, 0 without an immediate match; 1101 coins earned, 710 spent.
- Score shares: multipliers 27.3%, global additive trinkets 2.8%, match levels 14.6%, trinket pips 39.5%, trinket Mult 4.2%, match base 7.1%, special base 0.5%, cascade bonus 2.7%, low-pip bonus 1.3%.
- 63 packs purchased for 252 coins; 1039 coins in round payouts; token picks: column 0, color 0, number 4, bomb 3, twenty 0, row 1, wild 1, shiny 3.
- 71 trinkets purchased for 458 coins; 1036 trinket triggers. Numbered tokens: {"3":52,"4":11,"5":0,"6":0}.
- 0 gold matches from 0 observed gold spawns; 5 shiny matches; 1 wild clears.
- 22 special swaps. 2614 pip flights and 1347 Mult flights; mean 215.57 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 0 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Blast activations | Triggered by another special |
|---|---:|---:|---:|
| column | 0 | 0 | 0 |
| color | 0 | 0 | 0 |
| number | 23 | 12 | 0 |
| bomb | 18 | 9 | 1 |
| twenty | 0 | 0 | 0 |
| row | 4 | 2 | 0 |
| wild | 1 | 0 | 0 |
| shiny | 11 | 0 | 0 |

## gold-10

### greedy

- Mean 74.33 actions/run; 1.67 waves/board action; p99 5, maximum 7.
- 0 rerolls, 0 without an immediate match; 1437 coins earned, 834 spent.
- Score shares: multipliers 5.7%, global additive trinkets 7.2%, match levels 10.1%, trinket pips 46.6%, trinket Mult 7.8%, match base 12.7%, special base 1.7%, cascade bonus 5.7%, low-pip bonus 2.4%.
- 80 packs purchased for 366 coins; 1075 coins in round payouts; token picks: column 8, color 0, number 13, bomb 8, twenty 0, row 5, wild 7, shiny 17.
- 79 trinkets purchased for 468 coins; 1368 trinket triggers. Numbered tokens: {"3":26,"4":8,"5":0,"6":0}.
- 286 gold matches from 739 observed gold spawns; 39 shiny matches; 19 wild clears.
- 66 special swaps. 3760 pip flights and 1854 Mult flights; mean 297.91 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 0 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Blast activations | Triggered by another special |
|---|---:|---:|---:|
| column | 27 | 13 | 2 |
| color | 0 | 0 | 0 |
| number | 58 | 31 | 4 |
| bomb | 35 | 24 | 4 |
| twenty | 0 | 0 | 0 |
| row | 17 | 10 | 0 |
| wild | 22 | 1 | 1 |
| shiny | 62 | 0 | 0 |
### builder

- Mean 62.33 actions/run; 1.63 waves/board action; p99 5, maximum 6.
- 0 rerolls, 0 without an immediate match; 1256 coins earned, 655 spent.
- Score shares: multipliers 7.3%, global additive trinkets 4.6%, match levels 17.3%, trinket pips 49.3%, trinket Mult 5.4%, match base 9.5%, special base 0.5%, cascade bonus 4.1%, low-pip bonus 1.8%.
- 60 packs purchased for 240 coins; 973 coins in round payouts; token picks: column 0, color 0, number 4, bomb 3, twenty 0, row 1, wild 1, shiny 3.
- 71 trinkets purchased for 415 coins; 1142 trinket triggers. Numbered tokens: {"3":48,"4":12,"5":0,"6":0}.
- 220 gold matches from 631 observed gold spawns; 7 shiny matches; 1 wild clears.
- 25 special swaps. 2900 pip flights and 1449 Mult flights; mean 236.27 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 0 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Blast activations | Triggered by another special |
|---|---:|---:|---:|
| column | 0 | 0 | 0 |
| color | 0 | 0 | 0 |
| number | 25 | 15 | 0 |
| bomb | 14 | 9 | 1 |
| twenty | 0 | 0 | 0 |
| row | 4 | 2 | 0 |
| wild | 1 | 0 | 0 |
| shiny | 14 | 0 | 0 |

## quad-x2

### greedy

- Mean 75.75 actions/run; 1.61 waves/board action; p99 5, maximum 7.
- 0 rerolls, 0 without an immediate match; 1173 coins earned, 801 spent.
- Score shares: multipliers 7.1%, global additive trinkets 7.3%, match levels 10.7%, trinket pips 41.5%, trinket Mult 8.6%, match base 14.0%, special base 1.9%, cascade bonus 6.0%, low-pip bonus 2.7%.
- 76 packs purchased for 348 coins; 974 coins in round payouts; token picks: column 7, color 0, number 13, bomb 10, twenty 0, row 4, wild 9, shiny 13.
- 75 trinkets purchased for 453 coins; 1373 trinket triggers. Numbered tokens: {"3":25,"4":7,"5":0,"6":0}.
- 137 gold matches from 365 observed gold spawns; 40 shiny matches; 27 wild clears.
- 68 special swaps. 3815 pip flights and 1957 Mult flights; mean 307.42 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 1 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Blast activations | Triggered by another special |
|---|---:|---:|---:|
| column | 27 | 20 | 6 |
| color | 0 | 0 | 0 |
| number | 58 | 28 | 3 |
| bomb | 42 | 26 | 4 |
| twenty | 0 | 0 | 0 |
| row | 18 | 9 | 0 |
| wild | 30 | 3 | 3 |
| shiny | 55 | 0 | 0 |
### builder

- Mean 64.08 actions/run; 1.61 waves/board action; p99 4, maximum 6.
- 0 rerolls, 0 without an immediate match; 1167 coins earned, 665 spent.
- Score shares: multipliers 4.2%, global additive trinkets 4.4%, match levels 19.8%, trinket pips 49.7%, trinket Mult 6.0%, match base 9.8%, special base 0.6%, cascade bonus 3.6%, low-pip bonus 1.8%.
- 63 packs purchased for 252 coins; 992 coins in round payouts; token picks: column 0, color 0, number 4, bomb 3, twenty 0, row 1, wild 1, shiny 3.
- 71 trinkets purchased for 413 coins; 1158 trinket triggers. Numbered tokens: {"3":52,"4":11,"5":0,"6":0}.
- 113 gold matches from 312 observed gold spawns; 7 shiny matches; 1 wild clears.
- 24 special swaps. 2892 pip flights and 1495 Mult flights; mean 239.25 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 0 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Blast activations | Triggered by another special |
|---|---:|---:|---:|
| column | 0 | 0 | 0 |
| color | 0 | 0 | 0 |
| number | 27 | 13 | 0 |
| bomb | 19 | 10 | 1 |
| twenty | 0 | 0 | 0 |
| row | 4 | 2 | 0 |
| wild | 1 | 0 | 0 |
| shiny | 14 | 0 | 0 |

## quad-cost-14

### greedy

- Mean 73.75 actions/run; 1.60 waves/board action; p99 5, maximum 7.
- 0 rerolls, 0 without an immediate match; 1193 coins earned, 793 spent.
- Score shares: multipliers 18.5%, global additive trinkets 6.7%, match levels 9.0%, trinket pips 35.3%, trinket Mult 7.9%, match base 13.0%, special base 1.8%, cascade bonus 5.4%, low-pip bonus 2.4%.
- 75 packs purchased for 344 coins; 1001 coins in round payouts; token picks: column 8, color 0, number 13, bomb 9, twenty 0, row 4, wild 8, shiny 14.
- 75 trinkets purchased for 449 coins; 1292 trinket triggers. Numbered tokens: {"3":24,"4":7,"5":0,"6":0}.
- 130 gold matches from 358 observed gold spawns; 42 shiny matches; 21 wild clears.
- 61 special swaps. 3586 pip flights and 1847 Mult flights; mean 289.91 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 0 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Blast activations | Triggered by another special |
|---|---:|---:|---:|
| column | 24 | 17 | 5 |
| color | 0 | 0 | 0 |
| number | 52 | 25 | 4 |
| bomb | 39 | 25 | 4 |
| twenty | 0 | 0 | 0 |
| row | 18 | 9 | 0 |
| wild | 24 | 2 | 2 |
| shiny | 57 | 0 | 0 |
### builder

- Mean 61.92 actions/run; 1.64 waves/board action; p99 4, maximum 6.
- 0 rerolls, 0 without an immediate match; 1192 coins earned, 670 spent.
- Score shares: multipliers 20.6%, global additive trinkets 3.6%, match levels 16.1%, trinket pips 41.3%, trinket Mult 5.0%, match base 8.3%, special base 0.4%, cascade bonus 3.1%, low-pip bonus 1.5%.
- 63 packs purchased for 252 coins; 1020 coins in round payouts; token picks: column 0, color 0, number 4, bomb 3, twenty 0, row 1, wild 1, shiny 3.
- 72 trinkets purchased for 418 coins; 1065 trinket triggers. Numbered tokens: {"3":51,"4":12,"5":0,"6":0}.
- 110 gold matches from 303 observed gold spawns; 7 shiny matches; 1 wild clears.
- 21 special swaps. 2709 pip flights and 1384 Mult flights; mean 223.25 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 0 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Blast activations | Triggered by another special |
|---|---:|---:|---:|
| column | 0 | 0 | 0 |
| color | 0 | 0 | 0 |
| number | 27 | 13 | 0 |
| bomb | 17 | 6 | 0 |
| twenty | 0 | 0 | 0 |
| row | 4 | 2 | 0 |
| wild | 1 | 0 | 0 |
| shiny | 14 | 0 | 0 |

## no-new-trinkets

### greedy

- Mean 71.50 actions/run; 1.42 waves/board action; p99 4, maximum 5.
- 0 rerolls, 0 without an immediate match; 1048 coins earned, 606 spent.
- Score shares: multipliers 2.5%, global additive trinkets 0.0%, match levels 10.3%, trinket pips 54.5%, trinket Mult 11.5%, match base 13.1%, special base 2.2%, cascade bonus 4.5%, low-pip bonus 1.5%.
- 73 packs purchased for 336 coins; 928 coins in round payouts; token picks: column 4, color 0, number 15, bomb 14, twenty 0, row 9, wild 6, shiny 8.
- 54 trinkets purchased for 270 coins; 1304 trinket triggers. Numbered tokens: {"3":22,"4":7,"5":0,"6":0}.
- 108 gold matches from 328 observed gold spawns; 20 shiny matches; 16 wild clears.
- 65 special swaps. 3498 pip flights and 1515 Mult flights; mean 271.37 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 2 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Blast activations | Triggered by another special |
|---|---:|---:|---:|
| column | 11 | 6 | 0 |
| color | 0 | 0 | 0 |
| number | 63 | 31 | 4 |
| bomb | 40 | 25 | 2 |
| twenty | 0 | 0 | 0 |
| row | 29 | 17 | 5 |
| wild | 17 | 1 | 1 |
| shiny | 35 | 0 | 0 |
### builder

- Mean 70.92 actions/run; 1.36 waves/board action; p99 3, maximum 5.
- 0 rerolls, 0 without an immediate match; 1070 coins earned, 555 spent.
- Score shares: multipliers 0.7%, global additive trinkets 0.0%, match levels 19.9%, trinket pips 59.1%, trinket Mult 7.8%, match base 8.8%, special base 0.4%, cascade bonus 2.1%, low-pip bonus 1.2%.
- 70 packs purchased for 280 coins; 947 coins in round payouts; token picks: column 0, color 0, number 4, bomb 3, twenty 0, row 1, wild 1, shiny 3.
- 55 trinkets purchased for 275 coins; 1231 trinket triggers. Numbered tokens: {"3":50,"4":20,"5":0,"6":0}.
- 107 gold matches from 304 observed gold spawns; 4 shiny matches; 2 wild clears.
- 19 special swaps. 3002 pip flights and 1366 Mult flights; mean 243.62 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 8 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Blast activations | Triggered by another special |
|---|---:|---:|---:|
| column | 0 | 0 | 0 |
| color | 0 | 0 | 0 |
| number | 21 | 9 | 0 |
| bomb | 17 | 7 | 0 |
| twenty | 0 | 0 | 0 |
| row | 7 | 3 | 0 |
| wild | 2 | 0 | 0 |
| shiny | 10 | 0 | 0 |

## ones-build

### greedy

- Mean 62.58 actions/run; 1.76 waves/board action; p99 5, maximum 6.
- 0 rerolls, 0 without an immediate match; 1469 coins earned, 766 spent.
- Score shares: multipliers 48.0%, global additive trinkets 4.8%, match levels 6.9%, trinket pips 25.5%, trinket Mult 2.9%, match base 6.3%, special base 0.8%, cascade bonus 3.1%, low-pip bonus 1.5%.
- 96 packs purchased for 432 coins; 1320 coins in round payouts; token picks: column 6, color 0, number 14, bomb 11, twenty 0, row 6, wild 14, shiny 9.
- 42 trinkets purchased for 334 coins; 1172 trinket triggers. Numbered tokens: {"3":35,"4":13,"5":0,"6":0}.
- 109 gold matches from 333 observed gold spawns; 12 shiny matches; 30 wild clears.
- 49 special swaps. 2919 pip flights and 1469 Mult flights; mean 232.01 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 0 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Blast activations | Triggered by another special |
|---|---:|---:|---:|
| column | 27 | 11 | 2 |
| color | 0 | 0 | 0 |
| number | 42 | 16 | 1 |
| bomb | 55 | 24 | 6 |
| twenty | 0 | 0 | 0 |
| row | 24 | 8 | 1 |
| wild | 36 | 1 | 1 |
| shiny | 26 | 0 | 0 |
### builder

- Mean 67.00 actions/run; 1.73 waves/board action; p99 5, maximum 6.
- 0 rerolls, 0 without an immediate match; 1442 coins earned, 675 spent.
- Score shares: multipliers 23.1%, global additive trinkets 4.3%, match levels 16.3%, trinket pips 42.0%, trinket Mult 3.4%, match base 6.4%, special base 0.2%, cascade bonus 2.8%, low-pip bonus 1.5%.
- 94 packs purchased for 376 coins; 1272 coins in round payouts; token picks: column 1, color 0, number 2, bomb 3, twenty 0, row 0, wild 5, shiny 1.
- 44 trinkets purchased for 299 coins; 1333 trinket triggers. Numbered tokens: {"3":72,"4":22,"5":0,"6":0}.
- 126 gold matches from 340 observed gold spawns; 0 shiny matches; 14 wild clears.
- 15 special swaps. 3010 pip flights and 1647 Mult flights; mean 253.67 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 0 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Blast activations | Triggered by another special |
|---|---:|---:|---:|
| column | 5 | 2 | 0 |
| color | 0 | 0 | 0 |
| number | 9 | 4 | 0 |
| bomb | 18 | 9 | 0 |
| twenty | 0 | 0 | 0 |
| row | 0 | 0 | 0 |
| wild | 17 | 0 | 0 |
| shiny | 2 | 0 | 0 |

## blast-build

### greedy

- Mean 63.58 actions/run; 1.74 waves/board action; p99 5, maximum 6.
- 0 rerolls, 0 without an immediate match; 1593 coins earned, 846 spent.
- Score shares: multipliers 38.4%, global additive trinkets 8.5%, match levels 10.7%, trinket pips 17.2%, trinket Mult 3.7%, match base 7.5%, special base 8.8%, cascade bonus 3.7%, low-pip bonus 1.6%.
- 96 packs purchased for 432 coins; 1357 coins in round payouts; token picks: column 5, color 0, number 17, bomb 17, twenty 0, row 4, wild 8, shiny 9.
- 58 trinkets purchased for 414 coins; 873 trinket triggers. Numbered tokens: {"3":38,"4":10,"5":0,"6":0}.
- 72 gold matches from 392 observed gold spawns; 12 shiny matches; 24 wild clears.
- 162 special swaps. 4532 pip flights and 1451 Mult flights; mean 263.74 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 0 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Blast activations | Triggered by another special |
|---|---:|---:|---:|
| column | 187 | 94 | 61 |
| color | 0 | 0 | 0 |
| number | 81 | 49 | 33 |
| bomb | 292 | 158 | 70 |
| twenty | 0 | 0 | 0 |
| row | 170 | 94 | 53 |
| wild | 29 | 1 | 1 |
| shiny | 47 | 0 | 0 |
### builder

- Mean 65.08 actions/run; 1.58 waves/board action; p99 4, maximum 6.
- 0 rerolls, 0 without an immediate match; 1523 coins earned, 759 spent.
- Score shares: multipliers 28.5%, global additive trinkets 5.5%, match levels 15.5%, trinket pips 29.8%, trinket Mult 4.0%, match base 6.7%, special base 6.1%, cascade bonus 2.6%, low-pip bonus 1.4%.
- 93 packs purchased for 372 coins; 1287 coins in round payouts; token picks: column 0, color 0, number 3, bomb 3, twenty 0, row 0, wild 1, shiny 5.
- 57 trinkets purchased for 387 coins; 1021 trinket triggers. Numbered tokens: {"3":66,"4":27,"5":0,"6":0}.
- 68 gold matches from 345 observed gold spawns; 10 shiny matches; 4 wild clears.
- 125 special swaps. 3576 pip flights and 1381 Mult flights; mean 237.24 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 0 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Blast activations | Triggered by another special |
|---|---:|---:|---:|
| column | 158 | 76 | 38 |
| color | 0 | 0 | 0 |
| number | 20 | 11 | 6 |
| bomb | 176 | 83 | 39 |
| twenty | 0 | 0 | 0 |
| row | 145 | 72 | 28 |
| wild | 6 | 0 | 0 |
| shiny | 35 | 0 | 0 |

## shiny-quad

### greedy

- Mean 59.42 actions/run; 1.64 waves/board action; p99 5, maximum 6.
- 0 rerolls, 0 without an immediate match; 1486 coins earned, 794 spent.
- Score shares: multipliers 81.1%, global additive trinkets 1.3%, match levels 3.1%, trinket pips 7.6%, trinket Mult 1.3%, match base 2.8%, special base 0.6%, cascade bonus 1.4%, low-pip bonus 0.6%.
- 88 packs purchased for 399 coins; 1331 coins in round payouts; token picks: column 6, color 0, number 14, bomb 9, twenty 0, row 14, wild 4, shiny 12.
- 68 trinkets purchased for 395 coins; 815 trinket triggers. Numbered tokens: {"3":31,"4":10,"5":0,"6":0}.
- 77 gold matches from 303 observed gold spawns; 109 shiny matches; 16 wild clears.
- 49 special swaps. 2044 pip flights and 1245 Mult flights; mean 174.83 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 0 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Blast activations | Triggered by another special |
|---|---:|---:|---:|
| column | 17 | 5 | 0 |
| color | 0 | 0 | 0 |
| number | 38 | 16 | 2 |
| bomb | 28 | 20 | 5 |
| twenty | 0 | 0 | 0 |
| row | 52 | 23 | 6 |
| wild | 17 | 0 | 0 |
| shiny | 351 | 0 | 0 |
### builder

- Mean 54.83 actions/run; 1.76 waves/board action; p99 5, maximum 5.
- 0 rerolls, 0 without an immediate match; 1569 coins earned, 711 spent.
- Score shares: multipliers 80.1%, global additive trinkets 1.2%, match levels 5.7%, trinket pips 7.9%, trinket Mult 1.1%, match base 2.4%, special base 0.1%, cascade bonus 1.0%, low-pip bonus 0.5%.
- 86 packs purchased for 344 coins; 1428 coins in round payouts; token picks: column 0, color 0, number 4, bomb 3, twenty 0, row 1, wild 1, shiny 3.
- 63 trinkets purchased for 367 coins; 682 trinket triggers. Numbered tokens: {"3":63,"4":23,"5":0,"6":0}.
- 74 gold matches from 283 observed gold spawns; 89 shiny matches; 1 wild clears.
- 14 special swaps. 1592 pip flights and 1020 Mult flights; mean 142.50 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 0 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Blast activations | Triggered by another special |
|---|---:|---:|---:|
| column | 0 | 0 | 0 |
| color | 0 | 0 | 0 |
| number | 17 | 7 | 0 |
| bomb | 13 | 6 | 1 |
| twenty | 0 | 0 | 0 |
| row | 4 | 2 | 0 |
| wild | 1 | 0 | 0 |
| shiny | 287 | 0 | 0 |

## Paired comparisons

| Scenario | Policy | Comparator | Win-rate change | Approx. 95% interval |
|---|---|---|---|---|
| start-convert | greedy | baseline, same policy | 0.0 pp | -41.8 to 41.8 pp |
| start-convert | builder | baseline, same policy | 0.0 pp | -34.1 to 34.1 pp |
| start-ones | greedy | baseline, same policy | 8.3 pp | -20.8 to 37.5 pp |
| start-ones | builder | baseline, same policy | 8.3 pp | -20.8 to 37.5 pp |
| start-cascade | greedy | baseline, same policy | -25.0 pp | -60.2 to 10.2 pp |
| start-cascade | builder | baseline, same policy | 0.0 pp | -24.1 to 24.1 pp |
| start-quad | greedy | baseline, same policy | 33.3 pp | 5.5 to 61.2 pp |
| start-quad | builder | baseline, same policy | 25.0 pp | -0.6 to 50.6 pp |
| start-rainbow | greedy | baseline, same policy | -8.3 pp | -46.2 to 29.5 pp |
| start-rainbow | builder | baseline, same policy | -25.0 pp | -50.6 to 0.6 pp |
| start-bigbomb | greedy | baseline, same policy | -8.3 pp | -53.2 to 36.5 pp |
| start-bigbomb | builder | baseline, same policy | -8.3 pp | -24.7 to 8.0 pp |
| start-widecolumn | greedy | baseline, same policy | -8.3 pp | -59.3 to 42.6 pp |
| start-widecolumn | builder | baseline, same policy | -8.3 pp | -24.7 to 8.0 pp |
| start-widerow | greedy | baseline, same policy | 0.0 pp | -41.8 to 41.8 pp |
| start-widerow | builder | baseline, same policy | 0.0 pp | -24.1 to 24.1 pp |
| special-pips-0 | greedy | baseline, same policy | -41.7 pp | -70.8 to -12.5 pp |
| special-pips-0 | builder | baseline, same policy | 8.3 pp | -20.8 to 37.5 pp |
| special-pips-5 | greedy | baseline, same policy | -33.3 pp | -61.2 to -5.5 pp |
| special-pips-5 | builder | baseline, same policy | 0.0 pp | -24.1 to 24.1 pp |
| equal-rarity | greedy | baseline, same policy | -25.0 pp | -60.2 to 10.2 pp |
| equal-rarity | builder | baseline, same policy | 0.0 pp | -24.1 to 24.1 pp |
| gold-0 | greedy | baseline, same policy | -33.3 pp | -61.2 to -5.5 pp |
| gold-0 | builder | baseline, same policy | 0.0 pp | 0.0 to 0.0 pp |
| gold-10 | greedy | baseline, same policy | -8.3 pp | -37.5 to 20.8 pp |
| gold-10 | builder | baseline, same policy | 0.0 pp | -24.1 to 24.1 pp |
| quad-x2 | greedy | baseline, same policy | -8.3 pp | -24.7 to 8.0 pp |
| quad-x2 | builder | baseline, same policy | 0.0 pp | 0.0 to 0.0 pp |
| quad-cost-14 | greedy | baseline, same policy | 0.0 pp | 0.0 to 0.0 pp |
| quad-cost-14 | builder | baseline, same policy | 0.0 pp | 0.0 to 0.0 pp |
| no-new-trinkets | greedy | baseline, same policy | -33.3 pp | -77.4 to 10.7 pp |
| no-new-trinkets | builder | baseline, same policy | -16.7 pp | -49.3 to 16.0 pp |
| ones-build | greedy | baseline, same policy | 25.0 pp | -10.2 to 60.2 pp |
| ones-build | builder | baseline, same policy | 25.0 pp | -0.6 to 50.6 pp |
| blast-build | greedy | baseline, same policy | 33.3 pp | 5.5 to 61.2 pp |
| blast-build | builder | baseline, same policy | 8.3 pp | -20.8 to 37.5 pp |
| shiny-quad | greedy | baseline, same policy | 25.0 pp | -10.2 to 60.2 pp |
| shiny-quad | builder | baseline, same policy | 25.0 pp | -0.6 to 50.6 pp |
| baseline | builder | greedy | 8.3 pp | -36.5 to 53.2 pp |

## Limits

- Agent policies are not human skill estimates.
- Only visible information reaches policies; rollout samples use independent RNG.
- Matched seeds start equally, but streams diverge after different actions.
- Confidence intervals describe seed sampling under these fixed policies.
- Starter drafts, pack purchases, token choices, payouts and match upgrades, trinkets and nine-round progression are simulated using the production engine.
- Nominal scoring animation uses the same event plan and timings as the UI; decision time, falls, pauses and frame time are excluded.
- Pip-trinket score is allocated at raw additive Mult; other additive sources use dice pips. The residual score is multiplicative lift after rounding. Attribution is accounting, not causal lift.

Censored runs are retained in the denominator and are not counted as wins. Any nonzero censorship or resolution ceiling needs investigation before drawing balance conclusions. Sensitivity results are screening evidence, not automatic tuning instructions; confirm changes on held-out seeds.
