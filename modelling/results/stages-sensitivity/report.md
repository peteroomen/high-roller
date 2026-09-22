# High Roller — full-run model

12 runs per scenario/policy; seeds 1–12; 1 independent samples per rollout candidate.

Engine SHA-256: `823a570e1d9e1bf4b47b6b9cff347440131335ea61cd7406ff64e9ab273d67d1`. Model SHA-256: `c20709ee0db3b1a038f44c119571b64bba64d27c90618f4e7233196804525c4b`.

| Scenario | Policy | Run wins (95% CI) | R1 clear | R2 clear | R3 clear | R4 clear | R5 clear | R6 clear | R7 clear | R8 clear | R9 clear | Runs using reroll | Censored |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| baseline | greedy | 83.3% (55.2%–95.3%) | 100.0% | 100.0% | 100.0% | 91.7% | 91.7% | 91.7% | 91.7% | 91.7% | 83.3% | 0.0% | 0 |
| baseline | builder | 66.7% (39.1%–86.2%) | 100.0% | 100.0% | 83.3% | 75.0% | 75.0% | 75.0% | 75.0% | 75.0% | 66.7% | 0.0% | 0 |
| no-upgrades | greedy | 33.3% (13.8%–60.9%) | 100.0% | 100.0% | 100.0% | 83.3% | 75.0% | 75.0% | 75.0% | 50.0% | 33.3% | 0.0% | 0 |
| no-upgrades | builder | 16.7% (4.7%–44.8%) | 100.0% | 100.0% | 66.7% | 50.0% | 41.7% | 33.3% | 33.3% | 16.7% | 16.7% | 0.0% | 0 |
| no-trinkets | greedy | 58.3% (32.0%–80.7%) | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 91.7% | 75.0% | 58.3% | 0.0% | 0 |
| no-trinkets | builder | 8.3% (1.5%–35.4%) | 100.0% | 100.0% | 100.0% | 83.3% | 75.0% | 75.0% | 58.3% | 33.3% | 8.3% | 0.0% | 0 |
| boosts-half | greedy | 16.7% (4.7%–44.8%) | 100.0% | 100.0% | 100.0% | 75.0% | 66.7% | 66.7% | 58.3% | 58.3% | 16.7% | 0.0% | 0 |
| boosts-half | builder | 0.0% (0.0%–24.2%) | 100.0% | 91.7% | 83.3% | 75.0% | 50.0% | 16.7% | 8.3% | 0.0% | 0.0% | 0.0% | 0 |
| boosts-double | greedy | 83.3% (55.2%–95.3%) | 100.0% | 100.0% | 100.0% | 91.7% | 91.7% | 91.7% | 91.7% | 83.3% | 83.3% | 0.0% | 0 |
| boosts-double | builder | 91.7% (64.6%–98.5%) | 100.0% | 100.0% | 91.7% | 91.7% | 91.7% | 91.7% | 91.7% | 91.7% | 91.7% | 0.0% | 0 |
| tokens-1-percent | greedy | 8.3% (1.5%–35.4%) | 100.0% | 100.0% | 91.7% | 66.7% | 58.3% | 50.0% | 41.7% | 16.7% | 8.3% | 0.0% | 0 |
| tokens-1-percent | builder | 58.3% (32.0%–80.7%) | 100.0% | 100.0% | 83.3% | 75.0% | 75.0% | 75.0% | 75.0% | 66.7% | 58.3% | 0.0% | 0 |
| tokens-5-percent | greedy | 83.3% (55.2%–95.3%) | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 91.7% | 91.7% | 83.3% | 0.0% | 0 |
| tokens-5-percent | builder | 66.7% (39.1%–86.2%) | 100.0% | 100.0% | 100.0% | 100.0% | 91.7% | 91.7% | 83.3% | 75.0% | 66.7% | 0.0% | 0 |
| trinket-cost-3 | greedy | 83.3% (55.2%–95.3%) | 100.0% | 100.0% | 100.0% | 91.7% | 91.7% | 91.7% | 91.7% | 91.7% | 83.3% | 0.0% | 0 |
| trinket-cost-3 | builder | 75.0% (46.8%–91.1%) | 100.0% | 100.0% | 83.3% | 83.3% | 83.3% | 83.3% | 83.3% | 75.0% | 75.0% | 0.0% | 0 |
| multi-pack-cost-6 | greedy | 50.0% (25.4%–74.6%) | 100.0% | 100.0% | 100.0% | 83.3% | 75.0% | 75.0% | 75.0% | 58.3% | 50.0% | 0.0% | 0 |
| multi-pack-cost-6 | builder | 25.0% (8.9%–53.2%) | 100.0% | 100.0% | 66.7% | 50.0% | 41.7% | 41.7% | 33.3% | 25.0% | 25.0% | 0.0% | 0 |
| start-pips-3 | greedy | 66.7% (39.1%–86.2%) | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 91.7% | 66.7% | 0.0% | 0 |
| start-pips-3 | builder | 66.7% (39.1%–86.2%) | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 91.7% | 83.3% | 75.0% | 66.7% | 0.0% | 0 |
| start-mult-3 | greedy | 66.7% (39.1%–86.2%) | 100.0% | 100.0% | 100.0% | 100.0% | 91.7% | 91.7% | 91.7% | 91.7% | 66.7% | 0.0% | 0 |
| start-mult-3 | builder | 66.7% (39.1%–86.2%) | 100.0% | 100.0% | 91.7% | 91.7% | 91.7% | 91.7% | 91.7% | 83.3% | 66.7% | 0.0% | 0 |
| start-pips-4 | greedy | 75.0% (46.8%–91.1%) | 100.0% | 100.0% | 100.0% | 100.0% | 91.7% | 91.7% | 91.7% | 75.0% | 75.0% | 0.0% | 0 |
| start-pips-4 | builder | 75.0% (46.8%–91.1%) | 100.0% | 100.0% | 91.7% | 91.7% | 91.7% | 83.3% | 83.3% | 83.3% | 75.0% | 0.0% | 0 |
| start-mult-4 | greedy | 75.0% (46.8%–91.1%) | 100.0% | 100.0% | 100.0% | 100.0% | 91.7% | 91.7% | 91.7% | 83.3% | 75.0% | 0.0% | 0 |
| start-mult-4 | builder | 75.0% (46.8%–91.1%) | 100.0% | 100.0% | 83.3% | 75.0% | 75.0% | 75.0% | 75.0% | 75.0% | 75.0% | 0.0% | 0 |
| start-pips-5 | greedy | 75.0% (46.8%–91.1%) | 100.0% | 100.0% | 100.0% | 100.0% | 91.7% | 91.7% | 91.7% | 83.3% | 75.0% | 0.0% | 0 |
| start-pips-5 | builder | 91.7% (64.6%–98.5%) | 100.0% | 100.0% | 91.7% | 91.7% | 91.7% | 91.7% | 91.7% | 91.7% | 91.7% | 0.0% | 0 |
| start-mult-5 | greedy | 75.0% (46.8%–91.1%) | 100.0% | 100.0% | 100.0% | 100.0% | 91.7% | 91.7% | 91.7% | 83.3% | 75.0% | 0.0% | 0 |
| start-mult-5 | builder | 83.3% (55.2%–95.3%) | 100.0% | 100.0% | 91.7% | 91.7% | 91.7% | 91.7% | 91.7% | 83.3% | 83.3% | 0.0% | 0 |
| start-pips-6 | greedy | 75.0% (46.8%–91.1%) | 100.0% | 100.0% | 100.0% | 100.0% | 91.7% | 91.7% | 91.7% | 91.7% | 75.0% | 0.0% | 0 |
| start-pips-6 | builder | 91.7% (64.6%–98.5%) | 100.0% | 100.0% | 91.7% | 91.7% | 91.7% | 91.7% | 91.7% | 91.7% | 91.7% | 0.0% | 0 |
| start-mult-6 | greedy | 75.0% (46.8%–91.1%) | 100.0% | 100.0% | 100.0% | 100.0% | 91.7% | 91.7% | 91.7% | 91.7% | 75.0% | 0.0% | 0 |
| start-mult-6 | builder | 91.7% (64.6%–98.5%) | 100.0% | 100.0% | 91.7% | 91.7% | 91.7% | 91.7% | 91.7% | 91.7% | 91.7% | 0.0% | 0 |

Round clear rates above use all starting runs as the denominator. Conditional rates and score deficits are in summary.json.

## baseline

### greedy

- Mean 85.67 actions/run; 1.46 waves/board action; p99 4, maximum 6.
- 0 rerolls, 0 without an immediate match; 604 coins earned, 577 spent.
- Score shares: match levels 13.7%, trinket pips 28.8%, trinket Mult 4.9%, match base 11.2%, special base 34.6%, cascade bonus 4.8%, low-pip bonus 1.9%.
- 69 packs purchased for 322 coins; 594 coins in round payouts; token picks: column 26, color 0, number 53, bomb 42, coin 0, row 29.
- 51 trinkets purchased for 255 coins; 574 trinket triggers. Numbered tokens: {"3":28,"4":29,"5":12,"6":0}.
- 383 special swaps. 6144 pip flights and 2206 Mult flights; mean 378.39 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 1 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 349 | 265 | 148 |
| color | 0 | 0 | 0 |
| number | 738 | 489 | 388 |
| bomb | 496 | 363 | 232 |
| coin | 0 | 0 | 0 |
| row | 416 | 312 | 195 |
### builder

- Mean 66.83 actions/run; 1.42 waves/board action; p99 4, maximum 5.
- 0 rerolls, 0 without an immediate match; 540 coins earned, 435 spent.
- Score shares: match levels 22.4%, trinket pips 57.9%, trinket Mult 6.6%, match base 8.6%, special base 0.7%, cascade bonus 2.9%, low-pip bonus 1.0%.
- 45 packs purchased for 180 coins; 528 coins in round payouts; token picks: column 1, color 0, number 8, bomb 2, coin 0, row 1.
- 51 trinkets purchased for 255 coins; 938 trinket triggers. Numbered tokens: {"3":63,"4":54,"5":18,"6":0}.
- 36 special swaps. 2644 pip flights and 1136 Mult flights; mean 208.07 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 2 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 7 | 2 | 0 |
| color | 0 | 0 | 0 |
| number | 79 | 27 | 0 |
| bomb | 16 | 5 | 0 |
| coin | 0 | 0 | 0 |
| row | 5 | 5 | 1 |

## no-upgrades

### greedy

- Mean 75.25 actions/run; 1.42 waves/board action; p99 3, maximum 6.
- 0 rerolls, 0 without an immediate match; 518 coins earned, 475 spent.
- Score shares: match levels 0.0%, trinket pips 22.5%, trinket Mult 7.2%, match base 13.7%, special base 49.1%, cascade bonus 5.5%, low-pip bonus 2.1%.
- 49 packs purchased for 245 coins; 508 coins in round payouts; token picks: column 28, color 0, number 50, bomb 44, coin 0, row 30.
- 46 trinkets purchased for 230 coins; 517 trinket triggers. Numbered tokens: {"3":0,"4":0,"5":0,"6":0}.
- 392 special swaps. 6047 pip flights and 2238 Mult flights; mean 372.73 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 2 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 347 | 277 | 182 |
| color | 0 | 0 | 0 |
| number | 708 | 511 | 423 |
| bomb | 478 | 391 | 241 |
| coin | 0 | 0 | 0 |
| row | 458 | 350 | 211 |
### builder

- Mean 48.92 actions/run; 1.40 waves/board action; p99 4, maximum 5.
- 0 rerolls, 0 without an immediate match; 357 coins earned, 315 spent.
- Score shares: match levels 0.0%, trinket pips 38.6%, trinket Mult 12.6%, match base 16.9%, special base 23.2%, cascade bonus 6.3%, low-pip bonus 2.4%.
- 17 packs purchased for 85 coins; 347 coins in round payouts; token picks: column 11, color 0, number 20, bomb 17, coin 0, row 14.
- 46 trinkets purchased for 230 coins; 633 trinket triggers. Numbered tokens: {"3":0,"4":0,"5":0,"6":0}.
- 111 special swaps. 2906 pip flights and 1158 Mult flights; mean 204.29 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 2 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 85 | 66 | 47 |
| color | 0 | 0 | 0 |
| number | 169 | 106 | 81 |
| bomb | 131 | 104 | 57 |
| coin | 0 | 0 | 0 |
| row | 110 | 88 | 51 |

## no-trinkets

### greedy

- Mean 88.67 actions/run; 1.44 waves/board action; p99 3, maximum 4.
- 0 rerolls, 0 without an immediate match; 605 coins earned, 416 spent.
- Score shares: match levels 21.8%, trinket pips 0.0%, trinket Mult 0.0%, match base 10.4%, special base 61.7%, cascade bonus 4.3%, low-pip bonus 1.7%.
- 92 packs purchased for 416 coins; 605 coins in round payouts; token picks: column 33, color 0, number 46, bomb 42, coin 0, row 35.
- 0 trinkets purchased for 0 coins; 0 trinket triggers. Numbered tokens: {"3":60,"4":54,"5":18,"6":0}.
- 453 special swaps. 6934 pip flights and 2571 Mult flights; mean 407.01 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 0 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 608 | 493 | 344 |
| color | 0 | 0 | 0 |
| number | 887 | 615 | 532 |
| bomb | 721 | 573 | 391 |
| coin | 0 | 0 | 0 |
| row | 661 | 502 | 350 |
### builder

- Mean 77.17 actions/run; 1.42 waves/board action; p99 4, maximum 5.
- 0 rerolls, 0 without an immediate match; 485 coins earned, 300 spent.
- Score shares: match levels 77.9%, trinket pips 0.0%, trinket Mult 0.0%, match base 14.2%, special base 1.8%, cascade bonus 4.4%, low-pip bonus 1.7%.
- 75 packs purchased for 300 coins; 485 coins in round payouts; token picks: column 1, color 0, number 8, bomb 2, coin 0, row 1.
- 0 trinkets purchased for 0 coins; 0 trinket triggers. Numbered tokens: {"3":102,"4":91,"5":32,"6":0}.
- 57 special swaps. 2622 pip flights and 789 Mult flights; mean 178.61 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 3 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 8 | 6 | 2 |
| color | 0 | 0 | 0 |
| number | 98 | 38 | 0 |
| bomb | 25 | 17 | 5 |
| coin | 0 | 0 | 0 |
| row | 12 | 7 | 2 |

## boosts-half

### greedy

- Mean 73.67 actions/run; 1.47 waves/board action; p99 3, maximum 6.
- 0 rerolls, 0 without an immediate match; 496 coins earned, 469 spent.
- Score shares: match levels 8.4%, trinket pips 13.4%, trinket Mult 4.2%, match base 16.1%, special base 47.8%, cascade bonus 7.6%, low-pip bonus 2.5%.
- 55 packs purchased for 259 coins; 488 coins in round payouts; token picks: column 27, color 0, number 44, bomb 37, coin 0, row 21.
- 42 trinkets purchased for 210 coins; 457 trinket triggers. Numbered tokens: {"3":23,"4":18,"5":7,"6":0}.
- 365 special swaps. 5726 pip flights and 1995 Mult flights; mean 346.25 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 1 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 368 | 301 | 189 |
| color | 0 | 0 | 0 |
| number | 585 | 423 | 344 |
| bomb | 466 | 373 | 231 |
| coin | 0 | 0 | 0 |
| row | 303 | 234 | 138 |
### builder

- Mean 48.58 actions/run; 1.44 waves/board action; p99 4, maximum 6.
- 0 rerolls, 0 without an immediate match; 349 coins earned, 319 spent.
- Score shares: match levels 13.3%, trinket pips 35.8%, trinket Mult 8.3%, match base 26.5%, special base 3.1%, cascade bonus 9.5%, low-pip bonus 3.5%.
- 16 packs purchased for 64 coins; 335 coins in round payouts; token picks: column 1, color 0, number 8, bomb 2, coin 0, row 1.
- 51 trinkets purchased for 255 coins; 759 trinket triggers. Numbered tokens: {"3":24,"4":18,"5":6,"6":0}.
- 40 special swaps. 2341 pip flights and 958 Mult flights; mean 180.87 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 0 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 9 | 5 | 0 |
| color | 0 | 0 | 0 |
| number | 51 | 26 | 0 |
| bomb | 14 | 5 | 0 |
| coin | 0 | 0 | 0 |
| row | 11 | 11 | 3 |

## boosts-double

### greedy

- Mean 76.17 actions/run; 1.37 waves/board action; p99 3, maximum 4.
- 0 rerolls, 0 without an immediate match; 636 coins earned, 608 spent.
- Score shares: match levels 16.4%, trinket pips 50.9%, trinket Mult 5.9%, match base 6.9%, special base 16.6%, cascade bonus 2.3%, low-pip bonus 0.9%.
- 73 packs purchased for 338 coins; 620 coins in round payouts; token picks: column 31, color 0, number 51, bomb 35, coin 0, row 33.
- 54 trinkets purchased for 270 coins; 466 trinket triggers. Numbered tokens: {"3":38,"4":30,"5":13,"6":0}.
- 224 special swaps. 3667 pip flights and 1363 Mult flights; mean 237.32 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 1 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 262 | 156 | 95 |
| color | 0 | 0 | 0 |
| number | 483 | 247 | 179 |
| bomb | 275 | 166 | 101 |
| coin | 0 | 0 | 0 |
| row | 281 | 163 | 103 |
### builder

- Mean 64.25 actions/run; 1.46 waves/board action; p99 4, maximum 4.
- 0 rerolls, 0 without an immediate match; 667 coins earned, 514 spent.
- Score shares: match levels 16.0%, trinket pips 73.6%, trinket Mult 4.8%, match base 3.7%, special base 0.4%, cascade bonus 1.2%, low-pip bonus 0.4%.
- 56 packs purchased for 224 coins; 643 coins in round payouts; token picks: column 1, color 0, number 8, bomb 2, coin 0, row 1.
- 58 trinkets purchased for 290 coins; 603 trinket triggers. Numbered tokens: {"3":77,"4":66,"5":25,"6":0}.
- 32 special swaps. 1887 pip flights and 791 Mult flights; mean 147.59 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 0 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 13 | 4 | 1 |
| color | 0 | 0 | 0 |
| number | 68 | 20 | 0 |
| bomb | 16 | 5 | 0 |
| coin | 0 | 0 | 0 |
| row | 5 | 5 | 1 |

## tokens-1-percent

### greedy

- Mean 62.50 actions/run; 1.50 waves/board action; p99 4, maximum 7.
- 0 rerolls, 0 without an immediate match; 426 coins earned, 400 spent.
- Score shares: match levels 9.5%, trinket pips 31.1%, trinket Mult 10.2%, match base 20.3%, special base 16.2%, cascade bonus 9.6%, low-pip bonus 3.0%.
- 43 packs purchased for 210 coins; 416 coins in round payouts; token picks: column 30, color 0, number 40, bomb 32, coin 0, row 24.
- 38 trinkets purchased for 190 coins; 498 trinket triggers. Numbered tokens: {"3":7,"4":6,"5":2,"6":0}.
- 172 special swaps. 3569 pip flights and 1178 Mult flights; mean 231.63 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 1 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 104 | 76 | 34 |
| color | 0 | 0 | 0 |
| number | 161 | 107 | 57 |
| bomb | 141 | 110 | 41 |
| coin | 0 | 0 | 0 |
| row | 83 | 60 | 31 |
### builder

- Mean 69.08 actions/run; 1.41 waves/board action; p99 4, maximum 5.
- 0 rerolls, 0 without an immediate match; 528 coins earned, 443 spent.
- Score shares: match levels 23.0%, trinket pips 57.4%, trinket Mult 6.6%, match base 8.8%, special base 0.4%, cascade bonus 2.7%, low-pip bonus 1.1%.
- 47 packs purchased for 188 coins; 514 coins in round payouts; token picks: column 1, color 0, number 8, bomb 2, coin 0, row 1.
- 51 trinkets purchased for 255 coins; 950 trinket triggers. Numbered tokens: {"3":63,"4":56,"5":22,"6":0}.
- 22 special swaps. 2636 pip flights and 1146 Mult flights; mean 210.47 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 2 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 4 | 2 | 0 |
| color | 0 | 0 | 0 |
| number | 34 | 14 | 0 |
| bomb | 18 | 5 | 0 |
| coin | 0 | 0 | 0 |
| row | 2 | 1 | 0 |

## tokens-5-percent

### greedy

- Mean 81.67 actions/run; 1.36 waves/board action; p99 3, maximum 4.
- 0 rerolls, 0 without an immediate match; 660 coins earned, 615 spent.
- Score shares: match levels 15.8%, trinket pips 23.4%, trinket Mult 3.8%, match base 7.2%, special base 46.1%, cascade bonus 2.8%, low-pip bonus 1.0%.
- 74 packs purchased for 320 coins; 638 coins in round payouts; token picks: column 12, color 0, number 31, bomb 20, coin 0, row 9.
- 59 trinkets purchased for 295 coins; 422 trinket triggers. Numbered tokens: {"3":61,"4":57,"5":32,"6":0}.
- 372 special swaps. 5531 pip flights and 2561 Mult flights; mean 364.37 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 0 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 570 | 391 | 267 |
| color | 0 | 0 | 0 |
| number | 1313 | 783 | 686 |
| bomb | 830 | 610 | 443 |
| coin | 0 | 0 | 0 |
| row | 363 | 248 | 173 |
### builder

- Mean 77.50 actions/run; 1.42 waves/board action; p99 4, maximum 5.
- 0 rerolls, 0 without an immediate match; 611 coins earned, 510 spent.
- Score shares: match levels 22.7%, trinket pips 54.9%, trinket Mult 6.9%, match base 9.2%, special base 2.4%, cascade bonus 2.8%, low-pip bonus 1.2%.
- 55 packs purchased for 220 coins; 591 coins in round payouts; token picks: column 1, color 0, number 8, bomb 2, coin 0, row 1.
- 58 trinkets purchased for 290 coins; 1074 trinket triggers. Numbered tokens: {"3":75,"4":66,"5":24,"6":0}.
- 110 special swaps. 3287 pip flights and 1367 Mult flights; mean 249.70 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 0 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 18 | 10 | 3 |
| color | 0 | 0 | 0 |
| number | 206 | 72 | 0 |
| bomb | 65 | 29 | 12 |
| coin | 0 | 0 | 0 |
| row | 46 | 25 | 7 |

## trinket-cost-3

### greedy

- Mean 84.42 actions/run; 1.46 waves/board action; p99 3, maximum 6.
- 0 rerolls, 0 without an immediate match; 622 coins earned, 530 spent.
- Score shares: match levels 11.0%, trinket pips 28.0%, trinket Mult 7.3%, match base 10.1%, special base 37.9%, cascade bonus 4.1%, low-pip bonus 1.6%.
- 76 packs purchased for 350 coins; 609 coins in round payouts; token picks: column 33, color 0, number 43, bomb 39, coin 0, row 35.
- 60 trinkets purchased for 180 coins; 659 trinket triggers. Numbered tokens: {"3":43,"4":34,"5":13,"6":0}.
- 355 special swaps. 5876 pip flights and 2270 Mult flights; mean 367.11 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 1 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 447 | 332 | 219 |
| color | 0 | 0 | 0 |
| number | 625 | 428 | 348 |
| bomb | 537 | 393 | 258 |
| coin | 0 | 0 | 0 |
| row | 478 | 342 | 241 |
### builder

- Mean 76.08 actions/run; 1.38 waves/board action; p99 4, maximum 5.
- 0 rerolls, 0 without an immediate match; 561 coins earned, 413 spent.
- Score shares: match levels 24.1%, trinket pips 58.7%, trinket Mult 6.0%, match base 7.4%, special base 0.7%, cascade bonus 2.3%, low-pip bonus 0.9%.
- 59 packs purchased for 236 coins; 549 coins in round payouts; token picks: column 1, color 0, number 8, bomb 2, coin 0, row 1.
- 59 trinkets purchased for 177 coins; 1025 trinket triggers. Numbered tokens: {"3":79,"4":73,"5":25,"6":0}.
- 40 special swaps. 2753 pip flights and 1228 Mult flights; mean 220.44 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 2 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 14 | 9 | 1 |
| color | 0 | 0 | 0 |
| number | 78 | 23 | 0 |
| bomb | 18 | 6 | 0 |
| coin | 0 | 0 | 0 |
| row | 5 | 5 | 1 |

## multi-pack-cost-6

### greedy

- Mean 75.92 actions/run; 1.44 waves/board action; p99 3, maximum 6.
- 0 rerolls, 0 without an immediate match; 526 coins earned, 498 spent.
- Score shares: match levels 2.7%, trinket pips 25.2%, trinket Mult 7.3%, match base 13.6%, special base 43.6%, cascade bonus 5.5%, low-pip bonus 2.1%.
- 52 packs purchased for 268 coins; 516 coins in round payouts; token picks: column 26, color 0, number 46, bomb 40, coin 0, row 30.
- 46 trinkets purchased for 230 coins; 538 trinket triggers. Numbered tokens: {"3":9,"4":10,"5":5,"6":0}.
- 379 special swaps. 5906 pip flights and 2103 Mult flights; mean 361.05 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 2 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 337 | 259 | 165 |
| color | 0 | 0 | 0 |
| number | 631 | 442 | 345 |
| bomb | 438 | 354 | 208 |
| coin | 0 | 0 | 0 |
| row | 424 | 318 | 193 |
### builder

- Mean 47.92 actions/run; 1.38 waves/board action; p99 4, maximum 5.
- 0 rerolls, 0 without an immediate match; 374 coins earned, 343 spent.
- Score shares: match levels 16.8%, trinket pips 55.9%, trinket Mult 8.8%, match base 11.9%, special base 1.2%, cascade bonus 3.9%, low-pip bonus 1.5%.
- 19 packs purchased for 113 coins; 364 coins in round payouts; token picks: column 2, color 0, number 9, bomb 3, coin 0, row 1.
- 46 trinkets purchased for 230 coins; 685 trinket triggers. Numbered tokens: {"3":24,"4":20,"5":10,"6":0}.
- 31 special swaps. 2052 pip flights and 881 Mult flights; mean 161.60 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 2 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 12 | 6 | 1 |
| color | 0 | 0 | 0 |
| number | 49 | 18 | 0 |
| bomb | 18 | 6 | 0 |
| coin | 0 | 0 | 0 |
| row | 5 | 5 | 1 |

## start-pips-3

### greedy

- Mean 84.42 actions/run; 1.46 waves/board action; p99 4, maximum 6.
- 0 rerolls, 0 without an immediate match; 662 coins earned, 593 spent.
- Score shares: match levels 14.0%, trinket pips 32.2%, trinket Mult 5.9%, match base 9.8%, special base 32.6%, cascade bonus 4.1%, low-pip bonus 1.4%.
- 80 packs purchased for 368 coins; 644 coins in round payouts; token picks: column 37, color 0, number 47, bomb 41, coin 0, row 31.
- 45 trinkets purchased for 225 coins; 723 trinket triggers. Numbered tokens: {"3":47,"4":38,"5":11,"6":0}.
- 333 special swaps. 5786 pip flights and 2137 Mult flights; mean 359.42 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 0 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 455 | 323 | 228 |
| color | 0 | 0 | 0 |
| number | 627 | 387 | 313 |
| bomb | 500 | 354 | 238 |
| coin | 0 | 0 | 0 |
| row | 466 | 325 | 208 |
### builder

- Mean 75.75 actions/run; 1.40 waves/board action; p99 4, maximum 5.
- 0 rerolls, 0 without an immediate match; 637 coins earned, 488 spent.
- Score shares: match levels 22.9%, trinket pips 61.2%, trinket Mult 5.6%, match base 6.7%, special base 0.6%, cascade bonus 2.2%, low-pip bonus 0.9%.
- 62 packs purchased for 248 coins; 613 coins in round payouts; token picks: column 1, color 0, number 8, bomb 2, coin 0, row 1.
- 48 trinkets purchased for 240 coins; 1152 trinket triggers. Numbered tokens: {"3":88,"4":74,"5":24,"6":0}.
- 41 special swaps. 2849 pip flights and 1212 Mult flights; mean 224.79 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 4 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 8 | 2 | 0 |
| color | 0 | 0 | 0 |
| number | 78 | 30 | 0 |
| bomb | 22 | 10 | 2 |
| coin | 0 | 0 | 0 |
| row | 10 | 4 | 2 |

## start-mult-3

### greedy

- Mean 84.33 actions/run; 1.41 waves/board action; p99 3, maximum 6.
- 0 rerolls, 0 without an immediate match; 634 coins earned, 580 spent.
- Score shares: match levels 13.3%, trinket pips 26.9%, trinket Mult 9.3%, match base 10.4%, special base 34.8%, cascade bonus 3.7%, low-pip bonus 1.5%.
- 76 packs purchased for 350 coins; 614 coins in round payouts; token picks: column 35, color 0, number 43, bomb 37, coin 0, row 35.
- 46 trinkets purchased for 230 coins; 729 trinket triggers. Numbered tokens: {"3":40,"4":37,"5":13,"6":0}.
- 342 special swaps. 5695 pip flights and 2289 Mult flights; mean 361.38 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 0 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 422 | 330 | 212 |
| color | 0 | 0 | 0 |
| number | 575 | 336 | 275 |
| bomb | 451 | 341 | 222 |
| coin | 0 | 0 | 0 |
| row | 485 | 348 | 242 |
### builder

- Mean 74.67 actions/run; 1.40 waves/board action; p99 4, maximum 4.
- 0 rerolls, 0 without an immediate match; 639 coins earned, 475 spent.
- Score shares: match levels 23.0%, trinket pips 58.4%, trinket Mult 7.3%, match base 7.5%, special base 0.7%, cascade bonus 2.1%, low-pip bonus 0.9%.
- 60 packs purchased for 240 coins; 615 coins in round payouts; token picks: column 1, color 0, number 8, bomb 2, coin 0, row 1.
- 47 trinkets purchased for 235 coins; 1122 trinket triggers. Numbered tokens: {"3":85,"4":69,"5":26,"6":0}.
- 40 special swaps. 2704 pip flights and 1290 Mult flights; mean 221.52 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 1 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 11 | 4 | 1 |
| color | 0 | 0 | 0 |
| number | 75 | 22 | 0 |
| bomb | 29 | 12 | 2 |
| coin | 0 | 0 | 0 |
| row | 13 | 6 | 1 |

## start-pips-4

### greedy

- Mean 83.83 actions/run; 1.46 waves/board action; p99 3, maximum 6.
- 0 rerolls, 0 without an immediate match; 624 coins earned, 577 spent.
- Score shares: match levels 13.3%, trinket pips 31.2%, trinket Mult 6.0%, match base 11.0%, special base 32.5%, cascade bonus 4.4%, low-pip bonus 1.6%.
- 74 packs purchased for 342 coins; 600 coins in round payouts; token picks: column 33, color 0, number 46, bomb 39, coin 0, row 32.
- 47 trinkets purchased for 235 coins; 606 trinket triggers. Numbered tokens: {"3":38,"4":37,"5":9,"6":0}.
- 331 special swaps. 5571 pip flights and 2045 Mult flights; mean 347.67 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 0 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 362 | 260 | 178 |
| color | 0 | 0 | 0 |
| number | 583 | 366 | 290 |
| bomb | 440 | 313 | 215 |
| coin | 0 | 0 | 0 |
| row | 462 | 330 | 200 |
### builder

- Mean 73.67 actions/run; 1.41 waves/board action; p99 4, maximum 5.
- 0 rerolls, 0 without an immediate match; 605 coins earned, 461 spent.
- Score shares: match levels 23.9%, trinket pips 59.3%, trinket Mult 5.7%, match base 7.3%, special base 0.8%, cascade bonus 2.1%, low-pip bonus 0.8%.
- 59 packs purchased for 236 coins; 585 coins in round payouts; token picks: column 1, color 0, number 8, bomb 2, coin 0, row 1.
- 45 trinkets purchased for 225 coins; 997 trinket triggers. Numbered tokens: {"3":81,"4":70,"5":26,"6":0}.
- 43 special swaps. 2722 pip flights and 1169 Mult flights; mean 214.58 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 0 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 13 | 3 | 0 |
| color | 0 | 0 | 0 |
| number | 73 | 25 | 0 |
| bomb | 27 | 12 | 2 |
| coin | 0 | 0 | 0 |
| row | 9 | 7 | 1 |

## start-mult-4

### greedy

- Mean 87.17 actions/run; 1.44 waves/board action; p99 3, maximum 6.
- 0 rerolls, 0 without an immediate match; 616 coins earned, 567 spent.
- Score shares: match levels 12.2%, trinket pips 28.3%, trinket Mult 7.1%, match base 11.4%, special base 35.2%, cascade bonus 4.4%, low-pip bonus 1.5%.
- 74 packs purchased for 342 coins; 596 coins in round payouts; token picks: column 32, color 0, number 48, bomb 42, coin 0, row 28.
- 45 trinkets purchased for 225 coins; 654 trinket triggers. Numbered tokens: {"3":40,"4":35,"5":9,"6":0}.
- 368 special swaps. 6005 pip flights and 2216 Mult flights; mean 374.70 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 0 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 407 | 304 | 189 |
| color | 0 | 0 | 0 |
| number | 645 | 407 | 332 |
| bomb | 482 | 372 | 251 |
| coin | 0 | 0 | 0 |
| row | 420 | 298 | 179 |
### builder

- Mean 66.42 actions/run; 1.41 waves/board action; p99 4, maximum 5.
- 0 rerolls, 0 without an immediate match; 543 coins earned, 407 spent.
- Score shares: match levels 24.9%, trinket pips 57.1%, trinket Mult 6.2%, match base 7.6%, special base 0.8%, cascade bonus 2.5%, low-pip bonus 0.9%.
- 53 packs purchased for 212 coins; 533 coins in round payouts; token picks: column 1, color 0, number 8, bomb 2, coin 0, row 1.
- 39 trinkets purchased for 195 coins; 877 trinket triggers. Numbered tokens: {"3":74,"4":62,"5":23,"6":0}.
- 40 special swaps. 2451 pip flights and 1075 Mult flights; mean 194.13 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 0 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 13 | 3 | 0 |
| color | 0 | 0 | 0 |
| number | 82 | 29 | 0 |
| bomb | 15 | 5 | 0 |
| coin | 0 | 0 | 0 |
| row | 5 | 5 | 1 |

## start-pips-5

### greedy

- Mean 86.08 actions/run; 1.42 waves/board action; p99 4, maximum 6.
- 0 rerolls, 0 without an immediate match; 627 coins earned, 584 spent.
- Score shares: match levels 12.9%, trinket pips 31.8%, trinket Mult 5.6%, match base 10.6%, special base 33.2%, cascade bonus 4.3%, low-pip bonus 1.8%.
- 72 packs purchased for 334 coins; 597 coins in round payouts; token picks: column 28, color 0, number 50, bomb 41, coin 0, row 31.
- 50 trinkets purchased for 250 coins; 600 trinket triggers. Numbered tokens: {"3":35,"4":33,"5":10,"6":0}.
- 366 special swaps. 5814 pip flights and 2084 Mult flights; mean 358.67 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 1 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 330 | 249 | 149 |
| color | 0 | 0 | 0 |
| number | 683 | 433 | 348 |
| bomb | 483 | 352 | 222 |
| coin | 0 | 0 | 0 |
| row | 397 | 290 | 169 |
### builder

- Mean 80.00 actions/run; 1.36 waves/board action; p99 4, maximum 6.
- 0 rerolls, 0 without an immediate match; 626 coins earned, 496 spent.
- Score shares: match levels 24.7%, trinket pips 60.2%, trinket Mult 5.2%, match base 6.4%, special base 0.5%, cascade bonus 2.1%, low-pip bonus 0.8%.
- 64 packs purchased for 256 coins; 600 coins in round payouts; token picks: column 1, color 0, number 8, bomb 2, coin 0, row 1.
- 48 trinkets purchased for 240 coins; 1097 trinket triggers. Numbered tokens: {"3":100,"4":72,"5":20,"6":0}.
- 35 special swaps. 2875 pip flights and 1260 Mult flights; mean 229.71 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 1 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 13 | 3 | 0 |
| color | 0 | 0 | 0 |
| number | 90 | 22 | 0 |
| bomb | 23 | 9 | 2 |
| coin | 0 | 0 | 0 |
| row | 5 | 5 | 1 |

## start-mult-5

### greedy

- Mean 87.17 actions/run; 1.41 waves/board action; p99 4, maximum 6.
- 0 rerolls, 0 without an immediate match; 625 coins earned, 588 spent.
- Score shares: match levels 13.4%, trinket pips 29.6%, trinket Mult 6.3%, match base 10.7%, special base 34.3%, cascade bonus 4.1%, low-pip bonus 1.7%.
- 73 packs purchased for 338 coins; 595 coins in round payouts; token picks: column 26, color 0, number 48, bomb 43, coin 0, row 33.
- 50 trinkets purchased for 250 coins; 605 trinket triggers. Numbered tokens: {"3":38,"4":34,"5":9,"6":0}.
- 369 special swaps. 5887 pip flights and 2133 Mult flights; mean 363.75 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 1 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 318 | 246 | 151 |
| color | 0 | 0 | 0 |
| number | 664 | 413 | 327 |
| bomb | 493 | 364 | 234 |
| coin | 0 | 0 | 0 |
| row | 451 | 321 | 190 |
### builder

- Mean 79.33 actions/run; 1.37 waves/board action; p99 4, maximum 5.
- 0 rerolls, 0 without an immediate match; 617 coins earned, 488 spent.
- Score shares: match levels 23.9%, trinket pips 59.6%, trinket Mult 6.0%, match base 7.0%, special base 0.6%, cascade bonus 2.0%, low-pip bonus 0.9%.
- 62 packs purchased for 248 coins; 591 coins in round payouts; token picks: column 1, color 0, number 8, bomb 2, coin 0, row 1.
- 48 trinkets purchased for 240 coins; 1098 trinket triggers. Numbered tokens: {"3":92,"4":69,"5":25,"6":0}.
- 38 special swaps. 2890 pip flights and 1285 Mult flights; mean 231.49 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 1 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 13 | 3 | 0 |
| color | 0 | 0 | 0 |
| number | 92 | 25 | 0 |
| bomb | 19 | 9 | 2 |
| coin | 0 | 0 | 0 |
| row | 5 | 5 | 1 |

## start-pips-6

### greedy

- Mean 87.75 actions/run; 1.44 waves/board action; p99 4, maximum 6.
- 0 rerolls, 0 without an immediate match; 634 coins earned, 594 spent.
- Score shares: match levels 13.3%, trinket pips 28.5%, trinket Mult 5.5%, match base 10.9%, special base 35.5%, cascade bonus 4.6%, low-pip bonus 1.8%.
- 72 packs purchased for 334 coins; 600 coins in round payouts; token picks: column 23, color 0, number 51, bomb 43, coin 0, row 33.
- 52 trinkets purchased for 260 coins; 572 trinket triggers. Numbered tokens: {"3":34,"4":34,"5":10,"6":0}.
- 381 special swaps. 6087 pip flights and 2222 Mult flights; mean 375.97 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 1 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 319 | 246 | 145 |
| color | 0 | 0 | 0 |
| number | 734 | 472 | 379 |
| bomb | 537 | 405 | 265 |
| coin | 0 | 0 | 0 |
| row | 443 | 313 | 183 |
### builder

- Mean 78.42 actions/run; 1.42 waves/board action; p99 4, maximum 5.
- 0 rerolls, 0 without an immediate match; 638 coins earned, 505 spent.
- Score shares: match levels 23.4%, trinket pips 59.6%, trinket Mult 5.9%, match base 7.2%, special base 0.7%, cascade bonus 2.3%, low-pip bonus 0.9%.
- 60 packs purchased for 240 coins; 602 coins in round payouts; token picks: column 1, color 0, number 8, bomb 2, coin 0, row 1.
- 53 trinkets purchased for 265 coins; 1092 trinket triggers. Numbered tokens: {"3":85,"4":74,"5":21,"6":0}.
- 40 special swaps. 2915 pip flights and 1274 Mult flights; mean 231.84 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 2 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 13 | 3 | 0 |
| color | 0 | 0 | 0 |
| number | 85 | 26 | 0 |
| bomb | 25 | 8 | 0 |
| coin | 0 | 0 | 0 |
| row | 5 | 5 | 1 |

## start-mult-6

### greedy

- Mean 87.75 actions/run; 1.44 waves/board action; p99 4, maximum 6.
- 0 rerolls, 0 without an immediate match; 634 coins earned, 594 spent.
- Score shares: match levels 13.3%, trinket pips 28.2%, trinket Mult 5.6%, match base 10.9%, special base 35.5%, cascade bonus 4.6%, low-pip bonus 1.8%.
- 72 packs purchased for 334 coins; 600 coins in round payouts; token picks: column 23, color 0, number 51, bomb 43, coin 0, row 33.
- 52 trinkets purchased for 260 coins; 572 trinket triggers. Numbered tokens: {"3":34,"4":34,"5":10,"6":0}.
- 381 special swaps. 6086 pip flights and 2223 Mult flights; mean 375.97 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 1 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 319 | 246 | 145 |
| color | 0 | 0 | 0 |
| number | 734 | 472 | 379 |
| bomb | 537 | 405 | 265 |
| coin | 0 | 0 | 0 |
| row | 443 | 313 | 183 |
### builder

- Mean 78.42 actions/run; 1.42 waves/board action; p99 4, maximum 5.
- 0 rerolls, 0 without an immediate match; 638 coins earned, 505 spent.
- Score shares: match levels 23.4%, trinket pips 59.5%, trinket Mult 6.0%, match base 7.2%, special base 0.7%, cascade bonus 2.3%, low-pip bonus 0.9%.
- 60 packs purchased for 240 coins; 602 coins in round payouts; token picks: column 1, color 0, number 8, bomb 2, coin 0, row 1.
- 53 trinkets purchased for 265 coins; 1092 trinket triggers. Numbered tokens: {"3":85,"4":74,"5":21,"6":0}.
- 40 special swaps. 2914 pip flights and 1275 Mult flights; mean 231.84 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 2 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 13 | 3 | 0 |
| color | 0 | 0 | 0 |
| number | 85 | 26 | 0 |
| bomb | 25 | 8 | 0 |
| coin | 0 | 0 | 0 |
| row | 5 | 5 | 1 |

## Paired comparisons

| Scenario | Policy | Comparator | Win-rate change | Approx. 95% interval |
|---|---|---|---|---|
| no-upgrades | greedy | baseline, same policy | -50.0 pp | -79.5 to -20.5 pp |
| no-upgrades | builder | baseline, same policy | -50.0 pp | -79.5 to -20.5 pp |
| no-trinkets | greedy | baseline, same policy | -25.0 pp | -60.2 to 10.2 pp |
| no-trinkets | builder | baseline, same policy | -58.3 pp | -96.2 to -20.5 pp |
| boosts-half | greedy | baseline, same policy | -66.7 pp | -94.5 to -38.8 pp |
| boosts-half | builder | baseline, same policy | -66.7 pp | -94.5 to -38.8 pp |
| boosts-double | greedy | baseline, same policy | 0.0 pp | -24.1 to 24.1 pp |
| boosts-double | builder | baseline, same policy | 25.0 pp | -0.6 to 50.6 pp |
| tokens-1-percent | greedy | baseline, same policy | -75.0 pp | -100.0 to -49.4 pp |
| tokens-1-percent | builder | baseline, same policy | -8.3 pp | -37.5 to 20.8 pp |
| tokens-5-percent | greedy | baseline, same policy | 0.0 pp | -34.1 to 34.1 pp |
| tokens-5-percent | builder | baseline, same policy | 0.0 pp | -41.8 to 41.8 pp |
| trinket-cost-3 | greedy | baseline, same policy | 0.0 pp | -24.1 to 24.1 pp |
| trinket-cost-3 | builder | baseline, same policy | 8.3 pp | -8.0 to 24.7 pp |
| multi-pack-cost-6 | greedy | baseline, same policy | -33.3 pp | -61.2 to -5.5 pp |
| multi-pack-cost-6 | builder | baseline, same policy | -41.7 pp | -70.8 to -12.5 pp |
| start-pips-3 | greedy | baseline, same policy | -16.7 pp | -57.3 to 23.9 pp |
| start-pips-3 | builder | baseline, same policy | 0.0 pp | -41.8 to 41.8 pp |
| start-mult-3 | greedy | baseline, same policy | -16.7 pp | -49.3 to 16.0 pp |
| start-mult-3 | builder | baseline, same policy | 0.0 pp | -34.1 to 34.1 pp |
| start-pips-4 | greedy | baseline, same policy | -8.3 pp | -37.5 to 20.8 pp |
| start-pips-4 | builder | baseline, same policy | 8.3 pp | -8.0 to 24.7 pp |
| start-mult-4 | greedy | baseline, same policy | -8.3 pp | -37.5 to 20.8 pp |
| start-mult-4 | builder | baseline, same policy | 8.3 pp | -8.0 to 24.7 pp |
| start-pips-5 | greedy | baseline, same policy | -8.3 pp | -37.5 to 20.8 pp |
| start-pips-5 | builder | baseline, same policy | 25.0 pp | -0.6 to 50.6 pp |
| start-mult-5 | greedy | baseline, same policy | -8.3 pp | -37.5 to 20.8 pp |
| start-mult-5 | builder | baseline, same policy | 16.7 pp | -16.0 to 49.3 pp |
| start-pips-6 | greedy | baseline, same policy | -8.3 pp | -37.5 to 20.8 pp |
| start-pips-6 | builder | baseline, same policy | 25.0 pp | -0.6 to 50.6 pp |
| start-mult-6 | greedy | baseline, same policy | -8.3 pp | -37.5 to 20.8 pp |
| start-mult-6 | builder | baseline, same policy | 25.0 pp | -0.6 to 50.6 pp |
| baseline | builder | greedy | -16.7 pp | -49.3 to 16.0 pp |

## Limits

- Agent policies are not human skill estimates.
- Only visible information reaches policies; rollout samples use independent RNG.
- Matched seeds start equally, but streams diverge after different actions.
- Confidence intervals describe seed sampling under these fixed policies.
- Starter drafts, pack purchases, token choices, payouts and match upgrades, trinkets and nine-round progression are simulated using the production engine.
- Nominal scoring animation uses the same event plan and timings as the UI; decision time, falls, pauses and frame time are excluded.
- Pip-trinket score is allocated first at final Mult; Mult sources then use dice pips. Attribution is accounting, not causal lift.

Censored runs are retained in the denominator and are not counted as wins. Any nonzero censorship or resolution ceiling needs investigation before drawing balance conclusions. Sensitivity results are screening evidence, not automatic tuning instructions; confirm changes on held-out seeds.

Final engine replay verification: 67 example traces passed with SHA-256 `4f2704653748acd1a114e2fe57845aae01101a7cbd4a6faf385af30bc46584ae`. The post-simulation change only preserves pre-0.5 save rules during migration.
