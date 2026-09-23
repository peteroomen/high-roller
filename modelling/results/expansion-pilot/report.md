# High Roller — full-run model

24 runs per scenario/policy; seeds 1–24; 1 independent samples per rollout candidate.

Engine SHA-256: `5117a565ca96986489715334a976f89186fd95122f046ac581b8dc0dfb708a40`. Model SHA-256: `5f1e88c7002b3cc922d055e903f14af5a11c397cc8cba71a44810e114e3e40b1`.

| Scenario | Policy | Run wins (95% CI) | R1 clear | R2 clear | R3 clear | R4 clear | R5 clear | R6 clear | R7 clear | R8 clear | R9 clear | Runs using reroll | Censored |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| baseline | greedy | 83.3% (64.1%–93.3%) | 100.0% | 100.0% | 100.0% | 100.0% | 95.8% | 91.7% | 87.5% | 83.3% | 83.3% | 0.0% | 0 |
| baseline | builder | 83.3% (64.1%–93.3%) | 100.0% | 91.7% | 91.7% | 87.5% | 87.5% | 87.5% | 83.3% | 83.3% | 83.3% | 0.0% | 0 |
| special-pips-0 | greedy | 58.3% (38.8%–75.5%) | 100.0% | 100.0% | 100.0% | 100.0% | 83.3% | 79.2% | 79.2% | 70.8% | 58.3% | 0.0% | 0 |
| special-pips-0 | builder | 83.3% (64.1%–93.3%) | 100.0% | 95.8% | 95.8% | 91.7% | 87.5% | 87.5% | 83.3% | 83.3% | 83.3% | 0.0% | 0 |
| special-pips-5 | greedy | 41.7% (24.5%–61.2%) | 100.0% | 100.0% | 95.8% | 95.8% | 79.2% | 70.8% | 66.7% | 45.8% | 41.7% | 0.0% | 0 |
| special-pips-5 | builder | 79.2% (59.5%–90.8%) | 100.0% | 91.7% | 91.7% | 87.5% | 83.3% | 83.3% | 79.2% | 79.2% | 79.2% | 0.0% | 0 |
| equal-rarity | greedy | 45.8% (27.9%–64.9%) | 100.0% | 95.8% | 95.8% | 95.8% | 87.5% | 87.5% | 70.8% | 66.7% | 45.8% | 0.0% | 0 |
| equal-rarity | builder | 70.8% (50.8%–85.1%) | 100.0% | 95.8% | 87.5% | 83.3% | 79.2% | 75.0% | 75.0% | 70.8% | 70.8% | 0.0% | 0 |
| quad-x2 | greedy | 75.0% (55.1%–88.0%) | 100.0% | 100.0% | 100.0% | 100.0% | 95.8% | 91.7% | 83.3% | 79.2% | 75.0% | 0.0% | 0 |
| quad-x2 | builder | 75.0% (55.1%–88.0%) | 100.0% | 91.7% | 91.7% | 87.5% | 87.5% | 87.5% | 83.3% | 83.3% | 75.0% | 0.0% | 0 |
| quad-cost-20 | greedy | 83.3% (64.1%–93.3%) | 100.0% | 100.0% | 100.0% | 100.0% | 95.8% | 91.7% | 87.5% | 83.3% | 83.3% | 0.0% | 0 |
| quad-cost-20 | builder | 83.3% (64.1%–93.3%) | 100.0% | 91.7% | 91.7% | 87.5% | 87.5% | 87.5% | 83.3% | 83.3% | 83.3% | 0.0% | 0 |
| gold-0 | greedy | 58.3% (38.8%–75.5%) | 100.0% | 100.0% | 100.0% | 87.5% | 87.5% | 79.2% | 79.2% | 66.7% | 58.3% | 0.0% | 0 |
| gold-0 | builder | 79.2% (59.5%–90.8%) | 100.0% | 91.7% | 91.7% | 87.5% | 83.3% | 83.3% | 79.2% | 79.2% | 79.2% | 0.0% | 0 |
| ones-build | greedy | 87.5% (69.0%–95.7%) | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 95.8% | 95.8% | 95.8% | 87.5% | 0.0% | 0 |
| ones-build | builder | 87.5% (69.0%–95.7%) | 100.0% | 100.0% | 95.8% | 95.8% | 95.8% | 95.8% | 95.8% | 87.5% | 87.5% | 0.0% | 0 |
| blast-build | greedy | 87.5% (69.0%–95.7%) | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 95.8% | 95.8% | 91.7% | 87.5% | 0.0% | 0 |
| blast-build | builder | 87.5% (69.0%–95.7%) | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 95.8% | 95.8% | 87.5% | 0.0% | 0 |
| shiny-quad | greedy | 95.8% (79.8%–99.3%) | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 95.8% | 95.8% | 95.8% | 95.8% | 0.0% | 0 |
| shiny-quad | builder | 100.0% (86.2%–100.0%) | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 0.0% | 0 |

Round clear rates above use all starting runs as the denominator. Conditional rates and score deficits are in summary.json.

## baseline

### greedy

- Mean 73.83 actions/run; 1.63 waves/board action; p99 4, maximum 8.
- 0 rerolls, 0 without an immediate match; 2417 coins earned, 1699 spent.
- Score shares: match levels 7.4%, trinket pips 34.5%, trinket Mult 5.4%, match base 9.5%, special base 1.7%, cascade bonus 4.0%, low-pip bonus 1.8%.
- 161 packs purchased for 736 coins; 2018 coins in round payouts; token picks: column 9, color 0, number 38, bomb 29, twenty 0, row 9, wild 8, shiny 23.
- 156 trinkets purchased for 963 coins; 2576 trinket triggers. Numbered tokens: {"3":52,"4":17,"5":0,"6":0}.
- 134 special swaps. 7250 pip flights and 3477 Mult flights; mean 284.02 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 0 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 22 | 17 | 3 |
| color | 0 | 0 | 0 |
| number | 145 | 69 | 17 |
| bomb | 134 | 69 | 15 |
| twenty | 0 | 0 | 0 |
| row | 38 | 20 | 1 |
| wild | 31 | 2 | 2 |
| shiny | 95 | 0 | 0 |
### builder

- Mean 64.96 actions/run; 1.63 waves/board action; p99 5, maximum 9.
- 0 rerolls, 0 without an immediate match; 2350 coins earned, 1495 spent.
- Score shares: match levels 13.2%, trinket pips 33.6%, trinket Mult 4.3%, match base 7.1%, special base 0.3%, cascade bonus 3.2%, low-pip bonus 1.4%.
- 135 packs purchased for 540 coins; 1980 coins in round payouts; token picks: column 0, color 0, number 9, bomb 5, twenty 0, row 3, wild 2, shiny 5.
- 153 trinkets purchased for 955 coins; 2321 trinket triggers. Numbered tokens: {"3":101,"4":34,"5":0,"6":0}.
- 36 special swaps. 5562 pip flights and 2994 Mult flights; mean 233.66 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 2 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 0 | 0 | 0 |
| color | 0 | 0 | 0 |
| number | 50 | 22 | 0 |
| bomb | 26 | 9 | 0 |
| twenty | 0 | 0 | 0 |
| row | 23 | 5 | 0 |
| wild | 8 | 0 | 0 |
| shiny | 27 | 0 | 0 |

## special-pips-0

### greedy

- Mean 71.29 actions/run; 1.60 waves/board action; p99 4, maximum 8.
- 0 rerolls, 0 without an immediate match; 2262 coins earned, 1582 spent.
- Score shares: match levels 8.0%, trinket pips 35.6%, trinket Mult 4.8%, match base 9.2%, special base 0.8%, cascade bonus 3.7%, low-pip bonus 1.8%.
- 151 packs purchased for 691 coins; 1876 coins in round payouts; token picks: column 7, color 0, number 36, bomb 20, twenty 0, row 7, wild 15, shiny 26.
- 146 trinkets purchased for 891 coins; 2457 trinket triggers. Numbered tokens: {"3":53,"4":11,"5":0,"6":0}.
- 105 special swaps. 6776 pip flights and 3351 Mult flights; mean 271.67 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 2 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 14 | 11 | 1 |
| color | 0 | 0 | 0 |
| number | 144 | 50 | 7 |
| bomb | 106 | 51 | 6 |
| twenty | 0 | 0 | 0 |
| row | 26 | 9 | 1 |
| wild | 25 | 1 | 1 |
| shiny | 98 | 0 | 0 |
### builder

- Mean 64.33 actions/run; 1.64 waves/board action; p99 5, maximum 9.
- 0 rerolls, 0 without an immediate match; 2422 coins earned, 1532 spent.
- Score shares: match levels 12.3%, trinket pips 32.6%, trinket Mult 4.2%, match base 7.0%, special base 0.2%, cascade bonus 3.1%, low-pip bonus 1.3%.
- 138 packs purchased for 552 coins; 2054 coins in round payouts; token picks: column 0, color 0, number 9, bomb 5, twenty 0, row 3, wild 2, shiny 5.
- 156 trinkets purchased for 980 coins; 2229 trinket triggers. Numbered tokens: {"3":104,"4":34,"5":0,"6":0}.
- 33 special swaps. 5321 pip flights and 2897 Mult flights; mean 224.66 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 2 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 0 | 0 | 0 |
| color | 0 | 0 | 0 |
| number | 48 | 19 | 0 |
| bomb | 25 | 8 | 0 |
| twenty | 0 | 0 | 0 |
| row | 24 | 7 | 1 |
| wild | 5 | 0 | 0 |
| shiny | 27 | 0 | 0 |

## special-pips-5

### greedy

- Mean 66.29 actions/run; 1.57 waves/board action; p99 4, maximum 8.
- 0 rerolls, 0 without an immediate match; 2102 coins earned, 1544 spent.
- Score shares: match levels 6.7%, trinket pips 31.5%, trinket Mult 5.4%, match base 10.1%, special base 1.3%, cascade bonus 4.1%, low-pip bonus 1.9%.
- 137 packs purchased for 630 coins; 1760 coins in round payouts; token picks: column 7, color 0, number 37, bomb 21, twenty 0, row 7, wild 13, shiny 21.
- 148 trinkets purchased for 914 coins; 2080 trinket triggers. Numbered tokens: {"3":41,"4":14,"5":0,"6":0}.
- 100 special swaps. 6026 pip flights and 2947 Mult flights; mean 239.48 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 2 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 16 | 13 | 2 |
| color | 0 | 0 | 0 |
| number | 144 | 53 | 8 |
| bomb | 91 | 45 | 7 |
| twenty | 0 | 0 | 0 |
| row | 27 | 9 | 0 |
| wild | 16 | 0 | 0 |
| shiny | 77 | 0 | 0 |
### builder

- Mean 63.58 actions/run; 1.61 waves/board action; p99 5, maximum 9.
- 0 rerolls, 0 without an immediate match; 2306 coins earned, 1468 spent.
- Score shares: match levels 12.7%, trinket pips 36.2%, trinket Mult 4.0%, match base 6.8%, special base 0.3%, cascade bonus 3.1%, low-pip bonus 1.3%.
- 133 packs purchased for 532 coins; 1946 coins in round payouts; token picks: column 0, color 0, number 9, bomb 5, twenty 0, row 3, wild 2, shiny 5.
- 151 trinkets purchased for 936 coins; 2246 trinket triggers. Numbered tokens: {"3":102,"4":31,"5":0,"6":0}.
- 33 special swaps. 5386 pip flights and 2867 Mult flights; mean 225.32 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 2 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 0 | 0 | 0 |
| color | 0 | 0 | 0 |
| number | 46 | 21 | 0 |
| bomb | 25 | 8 | 0 |
| twenty | 0 | 0 | 0 |
| row | 23 | 5 | 0 |
| wild | 4 | 0 | 0 |
| shiny | 27 | 0 | 0 |

## equal-rarity

### greedy

- Mean 70.83 actions/run; 1.65 waves/board action; p99 6, maximum 6.
- 0 rerolls, 0 without an immediate match; 2270 coins earned, 1595 spent.
- Score shares: match levels 8.5%, trinket pips 36.4%, trinket Mult 6.4%, match base 11.1%, special base 0.9%, cascade bonus 5.0%, low-pip bonus 2.1%.
- 151 packs purchased for 689 coins; 1868 coins in round payouts; token picks: column 4, color 0, number 17, bomb 15, twenty 0, row 4, wild 33, shiny 36.
- 150 trinkets purchased for 906 coins; 2518 trinket triggers. Numbered tokens: {"3":49,"4":17,"5":0,"6":0}.
- 69 special swaps. 6705 pip flights and 3395 Mult flights; mean 272.82 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 1 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 19 | 12 | 1 |
| color | 0 | 0 | 0 |
| number | 85 | 43 | 3 |
| bomb | 54 | 23 | 3 |
| twenty | 0 | 0 | 0 |
| row | 7 | 3 | 0 |
| wild | 114 | 2 | 2 |
| shiny | 145 | 0 | 0 |
### builder

- Mean 59.29 actions/run; 1.60 waves/board action; p99 5, maximum 8.
- 0 rerolls, 0 without an immediate match; 2214 coins earned, 1384 spent.
- Score shares: match levels 11.2%, trinket pips 28.4%, trinket Mult 3.9%, match base 7.0%, special base 0.2%, cascade bonus 2.9%, low-pip bonus 1.3%.
- 120 packs purchased for 480 coins; 1894 coins in round payouts; token picks: column 0, color 0, number 4, bomb 1, twenty 0, row 1, wild 8, shiny 10.
- 144 trinkets purchased for 904 coins; 1886 trinket triggers. Numbered tokens: {"3":93,"4":27,"5":0,"6":0}.
- 18 special swaps. 4767 pip flights and 2566 Mult flights; mean 200.69 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 2 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 0 | 0 | 0 |
| color | 0 | 0 | 0 |
| number | 32 | 16 | 0 |
| bomb | 3 | 2 | 0 |
| twenty | 0 | 0 | 0 |
| row | 8 | 1 | 0 |
| wild | 33 | 0 | 0 |
| shiny | 45 | 0 | 0 |

## quad-x2

### greedy

- Mean 75.88 actions/run; 1.63 waves/board action; p99 4, maximum 8.
- 0 rerolls, 0 without an immediate match; 2357 coins earned, 1690 spent.
- Score shares: match levels 9.0%, trinket pips 40.0%, trinket Mult 6.5%, match base 11.5%, special base 2.1%, cascade bonus 4.9%, low-pip bonus 2.2%.
- 159 packs purchased for 727 coins; 1948 coins in round payouts; token picks: column 9, color 0, number 37, bomb 32, twenty 0, row 8, wild 9, shiny 20.
- 156 trinkets purchased for 963 coins; 2771 trinket triggers. Numbered tokens: {"3":49,"4":19,"5":0,"6":0}.
- 153 special swaps. 7775 pip flights and 3738 Mult flights; mean 304.12 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 0 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 28 | 22 | 5 |
| color | 0 | 0 | 0 |
| number | 164 | 79 | 16 |
| bomb | 144 | 78 | 16 |
| twenty | 0 | 0 | 0 |
| row | 32 | 18 | 1 |
| wild | 38 | 2 | 2 |
| shiny | 92 | 0 | 0 |
### builder

- Mean 68.67 actions/run; 1.63 waves/board action; p99 5, maximum 9.
- 0 rerolls, 0 without an immediate match; 2319 coins earned, 1510 spent.
- Score shares: match levels 16.7%, trinket pips 39.8%, trinket Mult 5.0%, match base 8.5%, special base 0.4%, cascade bonus 3.8%, low-pip bonus 1.7%.
- 135 packs purchased for 540 coins; 1925 coins in round payouts; token picks: column 0, color 0, number 9, bomb 5, twenty 0, row 3, wild 2, shiny 5.
- 155 trinkets purchased for 970 coins; 2613 trinket triggers. Numbered tokens: {"3":102,"4":33,"5":0,"6":0}.
- 43 special swaps. 6193 pip flights and 3411 Mult flights; mean 261.93 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 2 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 0 | 0 | 0 |
| color | 0 | 0 | 0 |
| number | 48 | 21 | 0 |
| bomb | 34 | 19 | 1 |
| twenty | 0 | 0 | 0 |
| row | 21 | 4 | 0 |
| wild | 9 | 0 | 0 |
| shiny | 27 | 0 | 0 |

## quad-cost-20

### greedy

- Mean 76.25 actions/run; 1.63 waves/board action; p99 4, maximum 8.
- 0 rerolls, 0 without an immediate match; 2369 coins earned, 1731 spent.
- Score shares: match levels 9.1%, trinket pips 42.3%, trinket Mult 6.7%, match base 10.6%, special base 1.7%, cascade bonus 4.7%, low-pip bonus 2.1%.
- 161 packs purchased for 736 coins; 1951 coins in round payouts; token picks: column 10, color 0, number 36, bomb 31, twenty 0, row 8, wild 9, shiny 22.
- 156 trinkets purchased for 995 coins; 2822 trinket triggers. Numbered tokens: {"3":52,"4":17,"5":0,"6":0}.
- 145 special swaps. 7720 pip flights and 3740 Mult flights; mean 304.45 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 1 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 27 | 20 | 4 |
| color | 0 | 0 | 0 |
| number | 157 | 73 | 14 |
| bomb | 144 | 70 | 12 |
| twenty | 0 | 0 | 0 |
| row | 37 | 18 | 1 |
| wild | 33 | 1 | 1 |
| shiny | 93 | 0 | 0 |
### builder

- Mean 66.33 actions/run; 1.63 waves/board action; p99 5, maximum 9.
- 0 rerolls, 0 without an immediate match; 2329 coins earned, 1516 spent.
- Score shares: match levels 15.8%, trinket pips 40.9%, trinket Mult 5.0%, match base 8.2%, special base 0.4%, cascade bonus 3.7%, low-pip bonus 1.6%.
- 135 packs purchased for 540 coins; 1948 coins in round payouts; token picks: column 0, color 0, number 9, bomb 5, twenty 0, row 3, wild 2, shiny 5.
- 152 trinkets purchased for 976 coins; 2449 trinket triggers. Numbered tokens: {"3":107,"4":28,"5":0,"6":0}.
- 40 special swaps. 5912 pip flights and 3130 Mult flights; mean 246.31 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 2 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 0 | 0 | 0 |
| color | 0 | 0 | 0 |
| number | 50 | 22 | 0 |
| bomb | 26 | 12 | 1 |
| twenty | 0 | 0 | 0 |
| row | 23 | 7 | 0 |
| wild | 7 | 0 | 0 |
| shiny | 27 | 0 | 0 |

## gold-0

### greedy

- Mean 69.29 actions/run; 1.63 waves/board action; p99 5, maximum 7.
- 0 rerolls, 0 without an immediate match; 1978 coins earned, 1530 spent.
- Score shares: match levels 7.8%, trinket pips 40.3%, trinket Mult 6.7%, match base 11.8%, special base 2.0%, cascade bonus 5.0%, low-pip bonus 2.2%.
- 144 packs purchased for 664 coins; 1861 coins in round payouts; token picks: column 9, color 0, number 33, bomb 29, twenty 0, row 10, wild 14, shiny 17.
- 144 trinkets purchased for 866 coins; 2451 trinket triggers. Numbered tokens: {"3":35,"4":21,"5":0,"6":0}.
- 145 special swaps. 7172 pip flights and 3279 Mult flights; mean 275.74 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 0 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 29 | 16 | 3 |
| color | 0 | 0 | 0 |
| number | 127 | 71 | 15 |
| bomb | 135 | 71 | 15 |
| twenty | 0 | 0 | 0 |
| row | 44 | 26 | 2 |
| wild | 38 | 1 | 1 |
| shiny | 77 | 0 | 0 |
### builder

- Mean 61.38 actions/run; 1.63 waves/board action; p99 5, maximum 6.
- 0 rerolls, 0 without an immediate match; 2112 coins earned, 1498 spent.
- Score shares: match levels 10.1%, trinket pips 25.7%, trinket Mult 3.2%, match base 5.8%, special base 0.3%, cascade bonus 2.2%, low-pip bonus 1.1%.
- 126 packs purchased for 504 coins; 1969 coins in round payouts; token picks: column 0, color 0, number 9, bomb 5, twenty 0, row 3, wild 2, shiny 5.
- 153 trinkets purchased for 994 coins; 2026 trinket triggers. Numbered tokens: {"3":92,"4":34,"5":0,"6":0}.
- 38 special swaps. 5061 pip flights and 2697 Mult flights; mean 211.09 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 2 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 0 | 0 | 0 |
| color | 0 | 0 | 0 |
| number | 42 | 24 | 0 |
| bomb | 26 | 9 | 0 |
| twenty | 0 | 0 | 0 |
| row | 23 | 5 | 0 |
| wild | 5 | 0 | 0 |
| shiny | 24 | 0 | 0 |

## ones-build

### greedy

- Mean 64.46 actions/run; 1.75 waves/board action; p99 5, maximum 7.
- 0 rerolls, 0 without an immediate match; 2597 coins earned, 1424 spent.
- Score shares: match levels 8.1%, trinket pips 27.9%, trinket Mult 3.1%, match base 6.6%, special base 0.9%, cascade bonus 3.3%, low-pip bonus 1.5%.
- 187 packs purchased for 843 coins; 2296 coins in round payouts; token picks: column 8, color 0, number 28, bomb 34, twenty 0, row 10, wild 19, shiny 20.
- 86 trinkets purchased for 581 coins; 2517 trinket triggers. Numbered tokens: {"3":74,"4":18,"5":0,"6":0}.
- 101 special swaps. 6282 pip flights and 3188 Mult flights; mean 250.40 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 0 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 22 | 11 | 3 |
| color | 0 | 0 | 0 |
| number | 101 | 34 | 2 |
| bomb | 150 | 62 | 11 |
| twenty | 0 | 0 | 0 |
| row | 32 | 18 | 3 |
| wild | 54 | 3 | 3 |
| shiny | 70 | 0 | 0 |
### builder

- Mean 62.00 actions/run; 1.75 waves/board action; p99 5, maximum 7.
- 0 rerolls, 0 without an immediate match; 2541 coins earned, 1249 spent.
- Score shares: match levels 13.5%, trinket pips 28.5%, trinket Mult 3.1%, match base 6.2%, special base 0.2%, cascade bonus 2.6%, low-pip bonus 1.3%.
- 168 packs purchased for 672 coins; 2229 coins in round payouts; token picks: column 0, color 0, number 6, bomb 7, twenty 0, row 1, wild 6, shiny 4.
- 86 trinkets purchased for 577 coins; 2281 trinket triggers. Numbered tokens: {"3":120,"4":48,"5":0,"6":0}.
- 33 special swaps. 5457 pip flights and 3039 Mult flights; mean 229.84 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 0 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 0 | 0 | 0 |
| color | 0 | 0 | 0 |
| number | 35 | 16 | 0 |
| bomb | 34 | 15 | 1 |
| twenty | 0 | 0 | 0 |
| row | 5 | 3 | 0 |
| wild | 23 | 0 | 0 |
| shiny | 25 | 0 | 0 |

## blast-build

### greedy

- Mean 63.33 actions/run; 1.74 waves/board action; p99 5, maximum 7.
- 0 rerolls, 0 without an immediate match; 2899 coins earned, 1638 spent.
- Score shares: match levels 11.1%, trinket pips 17.6%, trinket Mult 3.1%, match base 7.9%, special base 9.6%, cascade bonus 4.0%, low-pip bonus 1.9%.
- 188 packs purchased for 847 coins; 2398 coins in round payouts; token picks: column 5, color 0, number 30, bomb 39, twenty 0, row 9, wild 18, shiny 18.
- 119 trinkets purchased for 791 coins; 1651 trinket triggers. Numbered tokens: {"3":71,"4":22,"5":0,"6":0}.
- 336 special swaps. 9150 pip flights and 2821 Mult flights; mean 261.41 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 0 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 343 | 187 | 124 |
| color | 0 | 0 | 0 |
| number | 152 | 86 | 60 |
| bomb | 545 | 314 | 143 |
| twenty | 0 | 0 | 0 |
| row | 394 | 226 | 130 |
| wild | 60 | 15 | 15 |
| shiny | 73 | 0 | 0 |
### builder

- Mean 63.54 actions/run; 1.66 waves/board action; p99 5, maximum 5.
- 0 rerolls, 0 without an immediate match; 2919 coins earned, 1540 spent.
- Score shares: match levels 13.9%, trinket pips 22.0%, trinket Mult 3.2%, match base 5.7%, special base 5.1%, cascade bonus 2.4%, low-pip bonus 1.3%.
- 188 packs purchased for 752 coins; 2437 coins in round payouts; token picks: column 0, color 0, number 6, bomb 6, twenty 0, row 2, wild 2, shiny 8.
- 119 trinkets purchased for 788 coins; 1859 trinket triggers. Numbered tokens: {"3":140,"4":48,"5":0,"6":0}.
- 237 special swaps. 6887 pip flights and 2659 Mult flights; mean 225.59 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 0 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 320 | 151 | 81 |
| color | 0 | 0 | 0 |
| number | 36 | 19 | 10 |
| bomb | 322 | 150 | 65 |
| twenty | 0 | 0 | 0 |
| row | 317 | 158 | 74 |
| wild | 13 | 0 | 0 |
| shiny | 49 | 0 | 0 |

## shiny-quad

### greedy

- Mean 57.46 actions/run; 1.75 waves/board action; p99 5, maximum 6.
- 0 rerolls, 0 without an immediate match; 2724 coins earned, 1528 spent.
- Score shares: match levels 3.8%, trinket pips 7.2%, trinket Mult 1.6%, match base 3.2%, special base 0.6%, cascade bonus 1.5%, low-pip bonus 0.6%.
- 184 packs purchased for 831 coins; 2464 coins in round payouts; token picks: column 4, color 0, number 38, bomb 28, twenty 0, row 19, wild 15, shiny 15.
- 121 trinkets purchased for 697 coins; 1565 trinket triggers. Numbered tokens: {"3":62,"4":27,"5":0,"6":0}.
- 93 special swaps. 3980 pip flights and 2430 Mult flights; mean 169.12 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 0 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 10 | 5 | 2 |
| color | 0 | 0 | 0 |
| number | 112 | 43 | 4 |
| bomb | 92 | 44 | 10 |
| twenty | 0 | 0 | 0 |
| row | 59 | 21 | 3 |
| wild | 51 | 2 | 2 |
| shiny | 642 | 0 | 0 |
### builder

- Mean 55.13 actions/run; 1.77 waves/board action; p99 5, maximum 6.
- 0 rerolls, 0 without an immediate match; 2831 coins earned, 1417 spent.
- Score shares: match levels 5.4%, trinket pips 9.3%, trinket Mult 0.9%, match base 2.3%, special base 0.1%, cascade bonus 0.9%, low-pip bonus 0.5%.
- 173 packs purchased for 692 coins; 2546 coins in round payouts; token picks: column 0, color 0, number 9, bomb 5, twenty 0, row 3, wild 2, shiny 5.
- 125 trinkets purchased for 725 coins; 1402 trinket triggers. Numbered tokens: {"3":126,"4":47,"5":0,"6":0}.
- 26 special swaps. 3291 pip flights and 2057 Mult flights; mean 145.49 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 0 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 0 | 0 | 0 |
| color | 0 | 0 | 0 |
| number | 37 | 12 | 0 |
| bomb | 20 | 9 | 2 |
| twenty | 0 | 0 | 0 |
| row | 19 | 9 | 2 |
| wild | 3 | 0 | 0 |
| shiny | 548 | 0 | 0 |

## Paired comparisons

| Scenario | Policy | Comparator | Win-rate change | Approx. 95% interval |
|---|---|---|---|---|
| special-pips-0 | greedy | baseline, same policy | -25.0 pp | -46.3 to -3.7 pp |
| special-pips-0 | builder | baseline, same policy | 0.0 pp | -16.7 to 16.7 pp |
| special-pips-5 | greedy | baseline, same policy | -41.7 pp | -61.8 to -21.5 pp |
| special-pips-5 | builder | baseline, same policy | -4.2 pp | -18.5 to 10.2 pp |
| equal-rarity | greedy | baseline, same policy | -37.5 pp | -60.5 to -14.5 pp |
| equal-rarity | builder | baseline, same policy | -12.5 pp | -30.4 to 5.4 pp |
| quad-x2 | greedy | baseline, same policy | -8.3 pp | -19.6 to 3.0 pp |
| quad-x2 | builder | baseline, same policy | -8.3 pp | -19.6 to 3.0 pp |
| quad-cost-20 | greedy | baseline, same policy | 0.0 pp | 0.0 to 0.0 pp |
| quad-cost-20 | builder | baseline, same policy | 0.0 pp | 0.0 to 0.0 pp |
| gold-0 | greedy | baseline, same policy | -25.0 pp | -42.7 to -7.3 pp |
| gold-0 | builder | baseline, same policy | -4.2 pp | -12.3 to 4.0 pp |
| ones-build | greedy | baseline, same policy | 4.2 pp | -17.8 to 26.2 pp |
| ones-build | builder | baseline, same policy | 4.2 pp | -14.4 to 22.7 pp |
| blast-build | greedy | baseline, same policy | 4.2 pp | -14.4 to 22.7 pp |
| blast-build | builder | baseline, same policy | 4.2 pp | -14.4 to 22.7 pp |
| shiny-quad | greedy | baseline, same policy | 12.5 pp | -5.4 to 30.4 pp |
| shiny-quad | builder | baseline, same policy | 16.7 pp | 1.4 to 31.9 pp |
| baseline | builder | greedy | 0.0 pp | -23.6 to 23.6 pp |

## Limits

- Agent policies are not human skill estimates.
- Only visible information reaches policies; rollout samples use independent RNG.
- Matched seeds start equally, but streams diverge after different actions.
- Confidence intervals describe seed sampling under these fixed policies.
- Starter drafts, pack purchases, token choices, payouts and match upgrades, trinkets and nine-round progression are simulated using the production engine.
- Nominal scoring animation uses the same event plan and timings as the UI; decision time, falls, pauses and frame time are excluded.
- Pip-trinket score is allocated first at final Mult; Mult sources then use dice pips. Attribution is accounting, not causal lift.

Censored runs are retained in the denominator and are not counted as wins. Any nonzero censorship or resolution ceiling needs investigation before drawing balance conclusions. Sensitivity results are screening evidence, not automatic tuning instructions; confirm changes on held-out seeds.
