# High Roller — full-run model

30 runs per scenario/policy; seeds 1–30; 1 independent samples per rollout candidate.

Engine SHA-256: `181e5aae4fdd3b23c90739079374953a3e309e909a577ace86312eb61edc55e8`. Model SHA-256: `f2783e44a79e488ca828cd876d4ba4c3eeacee6adada7c1c30ce0b19c2d8d9ee`.

| Scenario | Policy | Run wins (95% CI) | R1 clear | R2 clear | R3 clear | R4 clear | R5 clear | R6 clear | R7 clear | R8 clear | R9 clear | Runs using reroll | Censored |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| baseline | greedy | 16.7% (7.3%–33.6%) | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 96.7% | 76.7% | 43.3% | 16.7% | 0.0% | 0 |
| baseline | builder | 0.0% (0.0%–11.4%) | 100.0% | 93.3% | 80.0% | 63.3% | 26.7% | 3.3% | 0.0% | 0.0% | 0.0% | 0.0% | 0 |
| baseline | specialist | 0.0% (0.0%–11.4%) | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 33.3% | 0.0% | 0.0% | 0.0% | 0 |
| no-upgrades | greedy | 0.0% (0.0%–11.4%) | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 96.7% | 0.0% | 0.0% | 0 |
| no-upgrades | builder | 6.7% (1.8%–21.3%) | 100.0% | 93.3% | 76.7% | 53.3% | 50.0% | 40.0% | 40.0% | 40.0% | 6.7% | 0.0% | 0 |
| no-upgrades | specialist | 0.0% (0.0%–11.4%) | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 33.3% | 0.0% | 0.0% | 0.0% | 0 |
| no-trinkets | greedy | 30.0% (16.7%–47.9%) | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 96.7% | 90.0% | 56.7% | 30.0% | 0.0% | 0 |
| no-trinkets | builder | 0.0% (0.0%–11.4%) | 100.0% | 100.0% | 76.7% | 50.0% | 10.0% | 0.0% | 0.0% | 0.0% | 0.0% | 0.0% | 0 |
| no-trinkets | specialist | 0.0% (0.0%–11.4%) | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 23.3% | 0.0% | 0.0% | 0.0% | 0 |
| boosts-half | greedy | 26.7% (14.2%–44.4%) | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 96.7% | 73.3% | 50.0% | 26.7% | 0.0% | 0 |
| boosts-half | builder | 0.0% (0.0%–11.4%) | 100.0% | 90.0% | 70.0% | 43.3% | 26.7% | 6.7% | 3.3% | 0.0% | 0.0% | 0.0% | 0 |
| boosts-half | specialist | 0.0% (0.0%–11.4%) | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 33.3% | 0.0% | 0.0% | 0.0% | 0 |
| boosts-double | greedy | 60.0% (42.3%–75.4%) | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 80.0% | 60.0% | 0.0% | 0 |
| boosts-double | builder | 6.7% (1.8%–21.3%) | 100.0% | 100.0% | 86.7% | 73.3% | 70.0% | 53.3% | 30.0% | 6.7% | 6.7% | 0.0% | 0 |
| boosts-double | specialist | 0.0% (0.0%–11.4%) | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 33.3% | 0.0% | 0.0% | 0.0% | 0 |
| trinket-cost-3 | greedy | 16.7% (7.3%–33.6%) | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 96.7% | 70.0% | 36.7% | 16.7% | 0.0% | 0 |
| trinket-cost-3 | builder | 0.0% (0.0%–11.4%) | 100.0% | 96.7% | 83.3% | 56.7% | 36.7% | 13.3% | 6.7% | 0.0% | 0.0% | 0.0% | 0 |
| trinket-cost-3 | specialist | 0.0% (0.0%–11.4%) | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 33.3% | 0.0% | 0.0% | 0.0% | 0 |
| special-cap-50 | greedy | 16.7% (7.3%–33.6%) | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 96.7% | 76.7% | 43.3% | 16.7% | 0.0% | 0 |
| special-cap-50 | builder | 0.0% (0.0%–11.4%) | 100.0% | 93.3% | 80.0% | 63.3% | 26.7% | 3.3% | 0.0% | 0.0% | 0.0% | 0.0% | 0 |
| special-cap-50 | specialist | 86.7% (70.3%–94.7%) | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 86.7% | 0.0% | 0 |

Round clear rates above use all starting runs as the denominator. Conditional rates and score deficits are in summary.json.

## baseline

### greedy

- Mean 79.93 actions/run; 1.34 waves/board action; p99 3, maximum 4.
- 0 rerolls, 0 without an immediate match; 1440 coins earned, 1316 spent.
- Score shares: match levels 8.0%, trinket pips 6.0%, trinket Mult 1.6%, match base 3.5%, special base 76.9%, cascade bonus 3.0%, low-pip bonus 1.0%.
- 169 packs purchased for 736 coins; 1440 coins in round payouts; token picks: column 45, color 0, number 73, bomb 55, coin 0, row 37.
- 116 trinkets purchased for 580 coins; 634 trinket triggers. Numbered tokens: {"3":148,"4":130,"5":49,"6":0}.
- 1116 special swaps. 17299 pip flights and 10318 Mult flights; mean 995.53 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 1 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 2355 | 1813 | 1427 |
| color | 0 | 0 | 0 |
| number | 3709 | 2681 | 2479 |
| bomb | 2793 | 2184 | 1635 |
| coin | 0 | 0 | 0 |
| row | 1989 | 1584 | 1222 |
### builder

- Mean 41.83 actions/run; 1.56 waves/board action; p99 4, maximum 6.
- 0 rerolls, 0 without an immediate match; 725 coins earned, 640 spent.
- Score shares: match levels 12.3%, trinket pips 29.4%, trinket Mult 9.1%, match base 18.7%, special base 11.2%, cascade bonus 14.7%, low-pip bonus 4.7%.
- 30 packs purchased for 120 coins; 725 coins in round payouts; token picks: column 1, color 0, number 19, bomb 9, coin 0, row 1.
- 104 trinkets purchased for 520 coins; 1492 trinket triggers. Numbered tokens: {"3":44,"4":32,"5":14,"6":0}.
- 309 special swaps. 6736 pip flights and 3745 Mult flights; mean 424.18 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 3 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 22 | 9 | 2 |
| color | 0 | 0 | 0 |
| number | 418 | 240 | 0 |
| bomb | 128 | 98 | 26 |
| coin | 0 | 0 | 0 |
| row | 11 | 10 | 3 |
### specialist

- Mean 66.07 actions/run; 1.13 waves/board action; p99 3, maximum 4.
- 0 rerolls, 0 without an immediate match; 1335 coins earned, 940 spent.
- Score shares: match levels 0.0%, trinket pips 0.0%, trinket Mult 0.0%, match base 1.4%, special base 96.9%, cascade bonus 1.3%, low-pip bonus 0.4%.
- 190 packs purchased for 940 coins; 1335 coins in round payouts; token picks: column 61, color 98, number 160, bomb 151, coin 0, row 70.
- 0 trinkets purchased for 0 coins; 0 trinket triggers. Numbered tokens: {"3":14,"4":12,"5":4,"6":0}.
- 822 special swaps. 6505 pip flights and 20724 Mult flights; mean 1126.83 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 1 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 3006 | 2451 | 2244 |
| color | 3705 | 3222 | 3012 |
| number | 7439 | 6120 | 5859 |
| bomb | 6717 | 5681 | 5248 |
| coin | 0 | 0 | 0 |
| row | 3506 | 2854 | 2623 |

## no-upgrades

### greedy

- Mean 84.47 actions/run; 1.19 waves/board action; p99 3, maximum 4.
- 0 rerolls, 0 without an immediate match; 1605 coins earned, 1495 spent.
- Score shares: match levels 0.0%, trinket pips 2.1%, trinket Mult 0.5%, match base 1.7%, special base 93.8%, cascade bonus 1.5%, low-pip bonus 0.5%.
- 179 packs purchased for 895 coins; 1605 coins in round payouts; token picks: column 59, color 101, number 163, bomb 152, coin 0, row 63.
- 120 trinkets purchased for 600 coins; 226 trinket triggers. Numbered tokens: {"3":0,"4":0,"5":0,"6":0}.
- 1198 special swaps. 12534 pip flights and 24935 Mult flights; mean 1499.77 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 1 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 3748 | 3156 | 2832 |
| color | 3872 | 3437 | 3196 |
| number | 8962 | 7404 | 7076 |
| bomb | 8010 | 6807 | 6199 |
| coin | 0 | 0 | 0 |
| row | 3825 | 3265 | 2945 |
### builder

- Mean 56.67 actions/run; 1.43 waves/board action; p99 4, maximum 9.
- 0 rerolls, 0 without an immediate match; 954 coins earned, 840 spent.
- Score shares: match levels 0.0%, trinket pips 8.1%, trinket Mult 3.1%, match base 6.4%, special base 74.2%, cascade bonus 6.4%, low-pip bonus 1.8%.
- 67 packs purchased for 335 coins; 954 coins in round payouts; token picks: column 33, color 27, number 78, bomb 63, coin 0, row 30.
- 101 trinkets purchased for 505 coins; 1107 trinket triggers. Numbered tokens: {"3":0,"4":0,"5":0,"6":0}.
- 720 special swaps. 10707 pip flights and 9902 Mult flights; mean 808.36 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 4 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 1423 | 1215 | 1048 |
| color | 883 | 774 | 716 |
| number | 3216 | 2652 | 2345 |
| bomb | 2061 | 1778 | 1510 |
| coin | 0 | 0 | 0 |
| row | 1299 | 1141 | 982 |
### specialist

- Mean 64.73 actions/run; 1.13 waves/board action; p99 3, maximum 4.
- 0 rerolls, 0 without an immediate match; 1335 coins earned, 900 spent.
- Score shares: match levels 0.0%, trinket pips 0.0%, trinket Mult 0.0%, match base 1.4%, special base 96.9%, cascade bonus 1.3%, low-pip bonus 0.4%.
- 180 packs purchased for 900 coins; 1335 coins in round payouts; token picks: column 61, color 98, number 160, bomb 151, coin 0, row 70.
- 0 trinkets purchased for 0 coins; 0 trinket triggers. Numbered tokens: {"3":0,"4":0,"5":0,"6":0}.
- 822 special swaps. 6464 pip flights and 20762 Mult flights; mean 1127.14 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 1 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 2997 | 2443 | 2234 |
| color | 3722 | 3220 | 3010 |
| number | 7493 | 6180 | 5919 |
| bomb | 6767 | 5727 | 5295 |
| coin | 0 | 0 | 0 |
| row | 3445 | 2797 | 2568 |

## no-trinkets

### greedy

- Mean 84.77 actions/run; 1.35 waves/board action; p99 3, maximum 5.
- 0 rerolls, 0 without an immediate match; 1490 coins earned, 952 spent.
- Score shares: match levels 13.0%, trinket pips 0.0%, trinket Mult 0.0%, match base 3.2%, special base 80.0%, cascade bonus 2.8%, low-pip bonus 1.0%.
- 223 packs purchased for 952 coins; 1490 coins in round payouts; token picks: column 37, color 0, number 68, bomb 62, coin 0, row 43.
- 0 trinkets purchased for 0 coins; 0 trinket triggers. Numbered tokens: {"3":234,"4":187,"5":68,"6":0}.
- 1150 special swaps. 18153 pip flights and 10815 Mult flights; mean 1034.46 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 1 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 2113 | 1650 | 1328 |
| color | 0 | 0 | 0 |
| number | 3798 | 2707 | 2475 |
| bomb | 3516 | 2754 | 2136 |
| coin | 0 | 0 | 0 |
| row | 2459 | 1919 | 1528 |
### builder

- Mean 43.47 actions/run; 1.49 waves/board action; p99 4, maximum 7.
- 0 rerolls, 0 without an immediate match; 681 coins earned, 404 spent.
- Score shares: match levels 50.0%, trinket pips 0.0%, trinket Mult 0.0%, match base 18.5%, special base 12.5%, cascade bonus 14.1%, low-pip bonus 5.0%.
- 101 packs purchased for 404 coins; 681 coins in round payouts; token picks: column 1, color 0, number 19, bomb 9, coin 0, row 1.
- 0 trinkets purchased for 0 coins; 0 trinket triggers. Numbered tokens: {"3":139,"4":114,"5":50,"6":0}.
- 274 special swaps. 4889 pip flights and 2842 Mult flights; mean 306.01 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 2 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 12 | 10 | 2 |
| color | 0 | 0 | 0 |
| number | 338 | 197 | 0 |
| bomb | 147 | 114 | 33 |
| coin | 0 | 0 | 0 |
| row | 14 | 11 | 2 |
### specialist

- Mean 64.43 actions/run; 1.13 waves/board action; p99 3, maximum 4.
- 0 rerolls, 0 without an immediate match; 1318 coins earned, 928 spent.
- Score shares: match levels 0.0%, trinket pips 0.0%, trinket Mult 0.0%, match base 1.4%, special base 97.0%, cascade bonus 1.3%, low-pip bonus 0.3%.
- 187 packs purchased for 928 coins; 1318 coins in round payouts; token picks: column 66, color 100, number 160, bomb 147, coin 0, row 67.
- 0 trinkets purchased for 0 coins; 0 trinket triggers. Numbered tokens: {"3":11,"4":7,"5":3,"6":0}.
- 791 special swaps. 6322 pip flights and 19685 Mult flights; mean 1074.69 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 1 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 3078 | 2538 | 2328 |
| color | 3739 | 3178 | 2966 |
| number | 6866 | 5681 | 5396 |
| bomb | 6460 | 5354 | 4950 |
| coin | 0 | 0 | 0 |
| row | 3131 | 2565 | 2366 |

## boosts-half

### greedy

- Mean 80.13 actions/run; 1.36 waves/board action; p99 3, maximum 4.
- 0 rerolls, 0 without an immediate match; 1448 coins earned, 1324 spent.
- Score shares: match levels 7.9%, trinket pips 3.0%, trinket Mult 1.5%, match base 3.6%, special base 79.8%, cascade bonus 3.1%, low-pip bonus 1.1%.
- 171 packs purchased for 744 coins; 1448 coins in round payouts; token picks: column 44, color 0, number 73, bomb 56, coin 0, row 37.
- 116 trinkets purchased for 580 coins; 611 trinket triggers. Numbered tokens: {"3":151,"4":136,"5":46,"6":0}.
- 1114 special swaps. 17567 pip flights and 10520 Mult flights; mean 1011.24 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 1 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 2368 | 1835 | 1441 |
| color | 0 | 0 | 0 |
| number | 3698 | 2705 | 2505 |
| bomb | 2976 | 2355 | 1806 |
| coin | 0 | 0 | 0 |
| row | 1991 | 1575 | 1212 |
### builder

- Mean 39.80 actions/run; 1.57 waves/board action; p99 5, maximum 6.
- 0 rerolls, 0 without an immediate match; 669 coins earned, 594 spent.
- Score shares: match levels 14.1%, trinket pips 16.9%, trinket Mult 9.6%, match base 21.4%, special base 13.4%, cascade bonus 18.4%, low-pip bonus 6.2%.
- 26 packs purchased for 104 coins; 669 coins in round payouts; token picks: column 1, color 0, number 19, bomb 9, coin 0, row 1.
- 98 trinkets purchased for 490 coins; 1426 trinket triggers. Numbered tokens: {"3":34,"4":28,"5":16,"6":0}.
- 339 special swaps. 6801 pip flights and 3708 Mult flights; mean 422.37 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 4 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 9 | 8 | 1 |
| color | 0 | 0 | 0 |
| number | 450 | 267 | 0 |
| bomb | 126 | 99 | 21 |
| coin | 0 | 0 | 0 |
| row | 11 | 10 | 3 |
### specialist

- Mean 66.07 actions/run; 1.13 waves/board action; p99 3, maximum 4.
- 0 rerolls, 0 without an immediate match; 1335 coins earned, 940 spent.
- Score shares: match levels 0.0%, trinket pips 0.0%, trinket Mult 0.0%, match base 1.4%, special base 96.9%, cascade bonus 1.3%, low-pip bonus 0.4%.
- 190 packs purchased for 940 coins; 1335 coins in round payouts; token picks: column 61, color 98, number 160, bomb 151, coin 0, row 70.
- 0 trinkets purchased for 0 coins; 0 trinket triggers. Numbered tokens: {"3":14,"4":12,"5":4,"6":0}.
- 822 special swaps. 6505 pip flights and 20724 Mult flights; mean 1126.83 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 1 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 3006 | 2451 | 2244 |
| color | 3705 | 3222 | 3012 |
| number | 7439 | 6120 | 5859 |
| bomb | 6717 | 5681 | 5248 |
| coin | 0 | 0 | 0 |
| row | 3506 | 2854 | 2623 |

## boosts-double

### greedy

- Mean 86.50 actions/run; 1.33 waves/board action; p99 3, maximum 4.
- 0 rerolls, 0 without an immediate match; 1564 coins earned, 1410 spent.
- Score shares: match levels 14.8%, trinket pips 15.7%, trinket Mult 2.7%, match base 3.0%, special base 60.9%, cascade bonus 2.2%, low-pip bonus 0.8%.
- 190 packs purchased for 820 coins; 1564 coins in round payouts; token picks: column 43, color 0, number 72, bomb 54, coin 0, row 41.
- 118 trinkets purchased for 590 coins; 854 trinket triggers. Numbered tokens: {"3":170,"4":160,"5":60,"6":0}.
- 1142 special swaps. 17922 pip flights and 10814 Mult flights; mean 1039.83 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 1 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 2373 | 1818 | 1422 |
| color | 0 | 0 | 0 |
| number | 3863 | 2672 | 2437 |
| bomb | 2813 | 2181 | 1668 |
| coin | 0 | 0 | 0 |
| row | 2220 | 1701 | 1336 |
### builder

- Mean 57.97 actions/run; 1.46 waves/board action; p99 4, maximum 6.
- 0 rerolls, 0 without an immediate match; 1021 coins earned, 864 spent.
- Score shares: match levels 21.5%, trinket pips 53.6%, trinket Mult 7.5%, match base 7.0%, special base 3.7%, cascade bonus 4.9%, low-pip bonus 1.8%.
- 76 packs purchased for 304 coins; 1021 coins in round payouts; token picks: column 1, color 0, number 19, bomb 9, coin 0, row 1.
- 112 trinkets purchased for 560 coins; 2034 trinket triggers. Numbered tokens: {"3":110,"4":90,"5":28,"6":0}.
- 266 special swaps. 7320 pip flights and 4600 Mult flights; mean 491.92 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 3 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 24 | 16 | 4 |
| color | 0 | 0 | 0 |
| number | 454 | 188 | 0 |
| bomb | 161 | 94 | 27 |
| coin | 0 | 0 | 0 |
| row | 14 | 14 | 3 |
### specialist

- Mean 66.07 actions/run; 1.13 waves/board action; p99 3, maximum 4.
- 0 rerolls, 0 without an immediate match; 1335 coins earned, 940 spent.
- Score shares: match levels 0.0%, trinket pips 0.0%, trinket Mult 0.0%, match base 1.4%, special base 96.9%, cascade bonus 1.3%, low-pip bonus 0.4%.
- 190 packs purchased for 940 coins; 1335 coins in round payouts; token picks: column 61, color 98, number 160, bomb 151, coin 0, row 70.
- 0 trinkets purchased for 0 coins; 0 trinket triggers. Numbered tokens: {"3":14,"4":12,"5":4,"6":0}.
- 822 special swaps. 6505 pip flights and 20724 Mult flights; mean 1126.83 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 1 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 3006 | 2451 | 2244 |
| color | 3705 | 3222 | 3012 |
| number | 7439 | 6120 | 5859 |
| bomb | 6717 | 5681 | 5248 |
| coin | 0 | 0 | 0 |
| row | 3506 | 2854 | 2623 |

## trinket-cost-3

### greedy

- Mean 79.83 actions/run; 1.37 waves/board action; p99 3, maximum 4.
- 0 rerolls, 0 without an immediate match; 1421 coins earned, 1144 spent.
- Score shares: match levels 8.3%, trinket pips 6.5%, trinket Mult 1.5%, match base 3.6%, special base 76.1%, cascade bonus 3.1%, low-pip bonus 1.0%.
- 181 packs purchased for 784 coins; 1421 coins in round payouts; token picks: column 43, color 0, number 74, bomb 57, coin 0, row 36.
- 120 trinkets purchased for 360 coins; 619 trinket triggers. Numbered tokens: {"3":166,"4":144,"5":53,"6":0}.
- 1067 special swaps. 16626 pip flights and 9850 Mult flights; mean 956.49 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 1 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 2197 | 1697 | 1339 |
| color | 0 | 0 | 0 |
| number | 3656 | 2649 | 2419 |
| bomb | 2703 | 2113 | 1602 |
| coin | 0 | 0 | 0 |
| row | 1810 | 1418 | 1072 |
### builder

- Mean 47.50 actions/run; 1.55 waves/board action; p99 4, maximum 6.
- 0 rerolls, 0 without an immediate match; 786 coins earned, 606 spent.
- Score shares: match levels 22.8%, trinket pips 26.8%, trinket Mult 8.8%, match base 15.1%, special base 9.9%, cascade bonus 12.8%, low-pip bonus 3.9%.
- 63 packs purchased for 252 coins; 786 coins in round payouts; token picks: column 1, color 0, number 19, bomb 9, coin 0, row 1.
- 118 trinkets purchased for 354 coins; 1459 trinket triggers. Numbered tokens: {"3":90,"4":76,"5":23,"6":0}.
- 304 special swaps. 6636 pip flights and 3973 Mult flights; mean 429.00 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 3 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 14 | 7 | 2 |
| color | 0 | 0 | 0 |
| number | 403 | 216 | 0 |
| bomb | 186 | 147 | 51 |
| coin | 0 | 0 | 0 |
| row | 11 | 10 | 3 |
### specialist

- Mean 66.07 actions/run; 1.13 waves/board action; p99 3, maximum 4.
- 0 rerolls, 0 without an immediate match; 1335 coins earned, 940 spent.
- Score shares: match levels 0.0%, trinket pips 0.0%, trinket Mult 0.0%, match base 1.4%, special base 96.9%, cascade bonus 1.3%, low-pip bonus 0.4%.
- 190 packs purchased for 940 coins; 1335 coins in round payouts; token picks: column 61, color 98, number 160, bomb 151, coin 0, row 70.
- 0 trinkets purchased for 0 coins; 0 trinket triggers. Numbered tokens: {"3":14,"4":12,"5":4,"6":0}.
- 822 special swaps. 6505 pip flights and 20724 Mult flights; mean 1126.83 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 1 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 3006 | 2451 | 2244 |
| color | 3705 | 3222 | 3012 |
| number | 7439 | 6120 | 5859 |
| bomb | 6717 | 5681 | 5248 |
| coin | 0 | 0 | 0 |
| row | 3506 | 2854 | 2623 |

## special-cap-50

### greedy

- Mean 79.93 actions/run; 1.34 waves/board action; p99 3, maximum 4.
- 0 rerolls, 0 without an immediate match; 1440 coins earned, 1316 spent.
- Score shares: match levels 8.0%, trinket pips 6.0%, trinket Mult 1.6%, match base 3.5%, special base 76.9%, cascade bonus 3.0%, low-pip bonus 1.0%.
- 169 packs purchased for 736 coins; 1440 coins in round payouts; token picks: column 45, color 0, number 73, bomb 55, coin 0, row 37.
- 116 trinkets purchased for 580 coins; 634 trinket triggers. Numbered tokens: {"3":148,"4":130,"5":49,"6":0}.
- 1116 special swaps. 17299 pip flights and 10318 Mult flights; mean 995.53 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 1 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 2355 | 1813 | 1427 |
| color | 0 | 0 | 0 |
| number | 3709 | 2681 | 2479 |
| bomb | 2793 | 2184 | 1635 |
| coin | 0 | 0 | 0 |
| row | 1989 | 1584 | 1222 |
### builder

- Mean 41.83 actions/run; 1.56 waves/board action; p99 4, maximum 6.
- 0 rerolls, 0 without an immediate match; 725 coins earned, 640 spent.
- Score shares: match levels 12.3%, trinket pips 29.4%, trinket Mult 9.1%, match base 18.7%, special base 11.2%, cascade bonus 14.7%, low-pip bonus 4.7%.
- 30 packs purchased for 120 coins; 725 coins in round payouts; token picks: column 1, color 0, number 19, bomb 9, coin 0, row 1.
- 104 trinkets purchased for 520 coins; 1492 trinket triggers. Numbered tokens: {"3":44,"4":32,"5":14,"6":0}.
- 309 special swaps. 6736 pip flights and 3745 Mult flights; mean 424.18 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 3 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 22 | 9 | 2 |
| color | 0 | 0 | 0 |
| number | 418 | 240 | 0 |
| bomb | 128 | 98 | 26 |
| coin | 0 | 0 | 0 |
| row | 11 | 10 | 3 |
### specialist

- Mean 81.77 actions/run; 1.22 waves/board action; p99 3, maximum 4.
- 0 rerolls, 0 without an immediate match; 1670 coins earned, 1050 spent.
- Score shares: match levels 4.0%, trinket pips 0.0%, trinket Mult 0.0%, match base 1.5%, special base 93.0%, cascade bonus 1.1%, low-pip bonus 0.4%.
- 240 packs purchased for 1050 coins; 1670 coins in round payouts; token picks: column 44, color 25, number 97, bomb 80, coin 0, row 54.
- 0 trinkets purchased for 0 coins; 0 trinket triggers. Numbered tokens: {"3":208,"4":171,"5":71,"6":0}.
- 962 special swaps. 15403 pip flights and 14898 Mult flights; mean 1118.46 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 1 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 2644 | 2075 | 1834 |
| color | 1363 | 1116 | 959 |
| number | 5856 | 4557 | 4379 |
| bomb | 4674 | 3727 | 3295 |
| coin | 0 | 0 | 0 |
| row | 3158 | 2469 | 2166 |

## Paired comparisons

| Scenario | Policy | Comparator | Win-rate change | Approx. 95% interval |
|---|---|---|---|---|
| no-upgrades | greedy | baseline, same policy | -16.7 pp | -30.2 to -3.1 pp |
| no-upgrades | builder | baseline, same policy | 6.7 pp | -2.4 to 15.7 pp |
| no-upgrades | specialist | baseline, same policy | 0.0 pp | 0.0 to 0.0 pp |
| no-trinkets | greedy | baseline, same policy | 13.3 pp | -9.2 to 35.8 pp |
| no-trinkets | builder | baseline, same policy | 0.0 pp | 0.0 to 0.0 pp |
| no-trinkets | specialist | baseline, same policy | 0.0 pp | 0.0 to 0.0 pp |
| boosts-half | greedy | baseline, same policy | 10.0 pp | -9.6 to 29.6 pp |
| boosts-half | builder | baseline, same policy | 0.0 pp | 0.0 to 0.0 pp |
| boosts-half | specialist | baseline, same policy | 0.0 pp | 0.0 to 0.0 pp |
| boosts-double | greedy | baseline, same policy | 43.3 pp | 20.9 to 65.7 pp |
| boosts-double | builder | baseline, same policy | 6.7 pp | -2.4 to 15.7 pp |
| boosts-double | specialist | baseline, same policy | 0.0 pp | 0.0 to 0.0 pp |
| trinket-cost-3 | greedy | baseline, same policy | 0.0 pp | -18.8 to 18.8 pp |
| trinket-cost-3 | builder | baseline, same policy | 0.0 pp | 0.0 to 0.0 pp |
| trinket-cost-3 | specialist | baseline, same policy | 0.0 pp | 0.0 to 0.0 pp |
| special-cap-50 | greedy | baseline, same policy | 0.0 pp | 0.0 to 0.0 pp |
| special-cap-50 | builder | baseline, same policy | 0.0 pp | 0.0 to 0.0 pp |
| special-cap-50 | specialist | baseline, same policy | 86.7 pp | 74.3 to 99.0 pp |
| baseline | builder | greedy | -16.7 pp | -30.2 to -3.1 pp |
| baseline | specialist | greedy | -16.7 pp | -30.2 to -3.1 pp |

## Limits

- Agent policies are not human skill estimates.
- Only visible information reaches policies; rollout samples use independent RNG.
- Matched seeds start equally, but streams diverge after different actions.
- Confidence intervals describe seed sampling under these fixed policies.
- Starter drafts, pack purchases, token choices, payouts and match upgrades, trinkets and nine-round progression are simulated using the production engine.
- Nominal scoring animation uses the same event plan and timings as the UI; decision time, falls, pauses and frame time are excluded.
- Pip-trinket score is allocated first at final Mult; Mult sources then use dice pips. Attribution is accounting, not causal lift.

Censored runs are retained in the denominator and are not counted as wins. Any nonzero censorship or resolution ceiling needs investigation before drawing balance conclusions. Sensitivity results are screening evidence, not automatic tuning instructions; confirm changes on held-out seeds.
