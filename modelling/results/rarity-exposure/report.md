# High Roller — full-run model

16 runs per scenario/policy; seeds 1–16; 1 independent samples per rollout candidate.

Engine SHA-256: `a7ef19a4e312a44a4e88f01ec01e139a92a5d9e517b936331898c1fcccd04797`. Model SHA-256: `33352a2f7993b8e8bbbbc45f07d8adb0d5e6fbdcd99a7dddc024f4d48fe26edd`.

| Scenario | Policy | Run wins (95% CI) | R1 clear | R2 clear | R3 clear | R4 clear | R5 clear | R6 clear | R7 clear | R8 clear | R9 clear | Runs using reroll | Censored |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| exposure-column | greedy | 81.3% (57.0%–93.4%) | 100.0% | 100.0% | 100.0% | 87.5% | 87.5% | 87.5% | 87.5% | 87.5% | 81.3% | 0.0% | 0 |
| exposure-column | builder | 93.8% (71.7%–98.9%) | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 93.8% | 0.0% | 0 |
| exposure-row | greedy | 81.3% (57.0%–93.4%) | 100.0% | 100.0% | 100.0% | 100.0% | 93.8% | 81.3% | 81.3% | 81.3% | 81.3% | 0.0% | 0 |
| exposure-row | builder | 75.0% (50.5%–89.8%) | 100.0% | 100.0% | 93.8% | 93.8% | 87.5% | 87.5% | 81.3% | 75.0% | 75.0% | 0.0% | 0 |
| exposure-bomb | greedy | 81.3% (57.0%–93.4%) | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 87.5% | 87.5% | 81.3% | 81.3% | 0.0% | 0 |
| exposure-bomb | builder | 93.8% (71.7%–98.9%) | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 93.8% | 0.0% | 0 |
| exposure-number | greedy | 93.8% (71.7%–98.9%) | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 93.8% | 0.0% | 0 |
| exposure-number | builder | 93.8% (71.7%–98.9%) | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 93.8% | 93.8% | 93.8% | 93.8% | 0.0% | 0 |
| exposure-color | greedy | 68.8% (44.4%–85.8%) | 100.0% | 100.0% | 100.0% | 100.0% | 87.5% | 87.5% | 81.3% | 68.8% | 68.8% | 0.0% | 0 |
| exposure-color | builder | 75.0% (50.5%–89.8%) | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 93.8% | 87.5% | 81.3% | 75.0% | 0.0% | 0 |
| exposure-twenty | greedy | 43.8% (23.1%–66.8%) | 100.0% | 93.8% | 93.8% | 87.5% | 81.3% | 68.8% | 62.5% | 43.8% | 43.8% | 0.0% | 0 |
| exposure-twenty | builder | 50.0% (28.0%–72.0%) | 100.0% | 93.8% | 93.8% | 93.8% | 81.3% | 81.3% | 81.3% | 75.0% | 50.0% | 0.0% | 0 |
| exposure-wild | greedy | 81.3% (57.0%–93.4%) | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 87.5% | 87.5% | 81.3% | 0.0% | 0 |
| exposure-wild | builder | 87.5% (64.0%–96.5%) | 100.0% | 100.0% | 100.0% | 100.0% | 93.8% | 93.8% | 93.8% | 93.8% | 87.5% | 0.0% | 0 |
| exposure-shiny | greedy | 75.0% (50.5%–89.8%) | 100.0% | 100.0% | 100.0% | 93.8% | 93.8% | 87.5% | 87.5% | 87.5% | 75.0% | 0.0% | 0 |
| exposure-shiny | builder | 81.3% (57.0%–93.4%) | 100.0% | 87.5% | 87.5% | 81.3% | 81.3% | 81.3% | 81.3% | 81.3% | 81.3% | 0.0% | 0 |

Round clear rates above use all starting runs as the denominator. Conditional rates and score deficits are in summary.json.

## exposure-column

### greedy

- Mean 63.13 actions/run; 1.79 waves/board action; p99 5, maximum 5.
- 0 rerolls, 0 without an immediate match; 1608 coins earned, 1085 spent.
- Score shares: match levels 12.6%, trinket pips 17.5%, trinket Mult 6.2%, match base 13.4%, special base 11.8%, cascade bonus 6.7%, low-pip bonus 2.9%.
- 106 packs purchased for 484 coins; 1420 coins in round payouts; token picks: column 8, color 0, number 23, bomb 17, twenty 0, row 3, wild 7, shiny 18.
- 93 trinkets purchased for 601 coins; 1059 trinket triggers. Numbered tokens: {"3":33,"4":13,"5":0,"6":0}.
- 233 special swaps. 6133 pip flights and 2014 Mult flights; mean 276.90 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 0 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 586 | 349 | 142 |
| color | 0 | 0 | 0 |
| number | 122 | 72 | 49 |
| bomb | 80 | 54 | 34 |
| twenty | 0 | 0 | 0 |
| row | 18 | 10 | 5 |
| wild | 25 | 3 | 3 |
| shiny | 95 | 0 | 0 |
### builder

- Mean 67.69 actions/run; 1.68 waves/board action; p99 5, maximum 6.
- 0 rerolls, 0 without an immediate match; 1801 coins earned, 1222 spent.
- Score shares: match levels 21.1%, trinket pips 21.3%, trinket Mult 4.2%, match base 10.1%, special base 6.3%, cascade bonus 5.2%, low-pip bonus 2.1%.
- 100 packs purchased for 400 coins; 1550 coins in round payouts; token picks: column 0, color 0, number 5, bomb 3, twenty 0, row 0, wild 2, shiny 6.
- 122 trinkets purchased for 822 coins; 1122 trinket triggers. Numbered tokens: {"3":78,"4":22,"5":0,"6":0}.
- 197 special swaps. 5811 pip flights and 1847 Mult flights; mean 262.60 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 2 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 567 | 321 | 123 |
| color | 0 | 0 | 0 |
| number | 30 | 19 | 12 |
| bomb | 17 | 7 | 4 |
| twenty | 0 | 0 | 0 |
| row | 0 | 0 | 0 |
| wild | 14 | 4 | 4 |
| shiny | 35 | 0 | 0 |

## exposure-row

### greedy

- Mean 63.94 actions/run; 1.77 waves/board action; p99 5, maximum 5.
- 0 rerolls, 0 without an immediate match; 1630 coins earned, 1092 spent.
- Score shares: match levels 11.1%, trinket pips 22.0%, trinket Mult 4.6%, match base 13.0%, special base 11.9%, cascade bonus 5.8%, low-pip bonus 3.0%.
- 103 packs purchased for 472 coins; 1428 coins in round payouts; token picks: column 4, color 0, number 19, bomb 23, twenty 0, row 5, wild 10, shiny 15.
- 100 trinkets purchased for 620 coins; 1045 trinket triggers. Numbered tokens: {"3":33,"4":10,"5":0,"6":0}.
- 235 special swaps. 6210 pip flights and 1910 Mult flights; mean 276.34 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 0 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 17 | 9 | 4 |
| color | 0 | 0 | 0 |
| number | 101 | 55 | 41 |
| bomb | 97 | 62 | 41 |
| twenty | 0 | 0 | 0 |
| row | 594 | 360 | 152 |
| wild | 46 | 13 | 13 |
| shiny | 74 | 0 | 0 |
### builder

- Mean 61.50 actions/run; 1.57 waves/board action; p99 4, maximum 5.
- 0 rerolls, 0 without an immediate match; 1591 coins earned, 1048 spent.
- Score shares: match levels 15.9%, trinket pips 19.7%, trinket Mult 4.7%, match base 9.2%, special base 6.6%, cascade bonus 3.5%, low-pip bonus 1.9%.
- 86 packs purchased for 344 coins; 1387 coins in round payouts; token picks: column 0, color 0, number 5, bomb 3, twenty 0, row 0, wild 2, shiny 6.
- 105 trinkets purchased for 704 coins; 1086 trinket triggers. Numbered tokens: {"3":66,"4":20,"5":0,"6":0}.
- 188 special swaps. 4907 pip flights and 1754 Mult flights; mean 234.79 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 0 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 0 | 0 | 0 |
| color | 0 | 0 | 0 |
| number | 28 | 14 | 8 |
| bomb | 12 | 10 | 4 |
| twenty | 0 | 0 | 0 |
| row | 520 | 306 | 116 |
| wild | 10 | 0 | 0 |
| shiny | 34 | 0 | 0 |

## exposure-bomb

### greedy

- Mean 60.06 actions/run; 1.78 waves/board action; p99 5, maximum 5.
- 0 rerolls, 0 without an immediate match; 1729 coins earned, 1190 spent.
- Score shares: match levels 8.0%, trinket pips 10.7%, trinket Mult 4.4%, match base 11.1%, special base 10.8%, cascade bonus 5.6%, low-pip bonus 2.3%.
- 105 packs purchased for 482 coins; 1538 coins in round payouts; token picks: column 6, color 0, number 22, bomb 20, twenty 0, row 5, wild 11, shiny 14.
- 108 trinkets purchased for 708 coins; 867 trinket triggers. Numbered tokens: {"3":29,"4":14,"5":0,"6":0}.
- 207 special swaps. 6040 pip flights and 1658 Mult flights; mean 246.56 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 0 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 16 | 8 | 7 |
| color | 0 | 0 | 0 |
| number | 121 | 68 | 47 |
| bomb | 685 | 374 | 185 |
| twenty | 0 | 0 | 0 |
| row | 18 | 12 | 10 |
| wild | 44 | 7 | 7 |
| shiny | 82 | 0 | 0 |
### builder

- Mean 64.19 actions/run; 1.86 waves/board action; p99 5, maximum 6.
- 0 rerolls, 0 without an immediate match; 1838 coins earned, 1193 spent.
- Score shares: match levels 22.0%, trinket pips 14.8%, trinket Mult 5.7%, match base 11.2%, special base 7.3%, cascade bonus 5.7%, low-pip bonus 2.5%.
- 104 packs purchased for 416 coins; 1593 coins in round payouts; token picks: column 0, color 0, number 5, bomb 3, twenty 0, row 0, wild 2, shiny 6.
- 115 trinkets purchased for 777 coins; 1039 trinket triggers. Numbered tokens: {"3":84,"4":20,"5":0,"6":0}.
- 181 special swaps. 5895 pip flights and 1923 Mult flights; mean 262.57 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 1 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 0 | 0 | 0 |
| color | 0 | 0 | 0 |
| number | 32 | 18 | 9 |
| bomb | 621 | 335 | 161 |
| twenty | 0 | 0 | 0 |
| row | 0 | 0 | 0 |
| wild | 14 | 3 | 3 |
| shiny | 39 | 0 | 0 |

## exposure-number

### greedy

- Mean 66.13 actions/run; 1.95 waves/board action; p99 5, maximum 8.
- 0 rerolls, 0 without an immediate match; 1822 coins earned, 1246 spent.
- Score shares: match levels 8.9%, trinket pips 23.3%, trinket Mult 6.3%, match base 11.0%, special base 4.8%, cascade bonus 5.9%, low-pip bonus 2.2%.
- 112 packs purchased for 512 coins; 1570 coins in round payouts; token picks: column 3, color 0, number 28, bomb 25, twenty 0, row 5, wild 3, shiny 16.
- 107 trinkets purchased for 734 coins; 1394 trinket triggers. Numbered tokens: {"3":38,"4":10,"5":0,"6":0}.
- 249 special swaps. 5589 pip flights and 2217 Mult flights; mean 282.28 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 0 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 10 | 5 | 0 |
| color | 0 | 0 | 0 |
| number | 683 | 275 | 56 |
| bomb | 112 | 60 | 8 |
| twenty | 0 | 0 | 0 |
| row | 29 | 17 | 3 |
| wild | 16 | 0 | 0 |
| shiny | 63 | 0 | 0 |
### builder

- Mean 66.63 actions/run; 1.71 waves/board action; p99 4, maximum 5.
- 0 rerolls, 0 without an immediate match; 1782 coins earned, 1150 spent.
- Score shares: match levels 13.5%, trinket pips 28.9%, trinket Mult 3.4%, match base 7.3%, special base 2.1%, cascade bonus 3.1%, low-pip bonus 1.4%.
- 103 packs purchased for 412 coins; 1513 coins in round payouts; token picks: column 0, color 0, number 5, bomb 3, twenty 0, row 0, wild 2, shiny 6.
- 112 trinkets purchased for 738 coins; 1344 trinket triggers. Numbered tokens: {"3":67,"4":36,"5":0,"6":0}.
- 169 special swaps. 4678 pip flights and 1882 Mult flights; mean 246.42 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 0 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 0 | 0 | 0 |
| color | 0 | 0 | 0 |
| number | 548 | 194 | 3 |
| bomb | 13 | 8 | 2 |
| twenty | 0 | 0 | 0 |
| row | 0 | 0 | 0 |
| wild | 13 | 0 | 0 |
| shiny | 32 | 0 | 0 |

## exposure-color

### greedy

- Mean 67.25 actions/run; 1.58 waves/board action; p99 4, maximum 5.
- 0 rerolls, 0 without an immediate match; 1570 coins earned, 1155 spent.
- Score shares: match levels 6.6%, trinket pips 27.0%, trinket Mult 3.9%, match base 8.8%, special base 6.5%, cascade bonus 3.9%, low-pip bonus 1.8%.
- 99 packs purchased for 455 coins; 1343 coins in round payouts; token picks: column 3, color 0, number 19, bomb 18, twenty 0, row 5, wild 9, shiny 21.
- 106 trinkets purchased for 700 coins; 1246 trinket triggers. Numbered tokens: {"3":30,"4":10,"5":0,"6":0}.
- 159 special swaps. 4265 pip flights and 2027 Mult flights; mean 244.47 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 0 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 17 | 10 | 8 |
| color | 463 | 301 | 173 |
| number | 69 | 54 | 41 |
| bomb | 67 | 43 | 24 |
| twenty | 0 | 0 | 0 |
| row | 22 | 17 | 13 |
| wild | 31 | 8 | 8 |
| shiny | 84 | 0 | 0 |
### builder

- Mean 70.50 actions/run; 1.57 waves/board action; p99 5, maximum 6.
- 0 rerolls, 0 without an immediate match; 1675 coins earned, 1074 spent.
- Score shares: match levels 15.0%, trinket pips 38.4%, trinket Mult 4.4%, match base 9.1%, special base 5.2%, cascade bonus 3.9%, low-pip bonus 1.9%.
- 99 packs purchased for 396 coins; 1412 coins in round payouts; token picks: column 0, color 0, number 5, bomb 3, twenty 0, row 0, wild 2, shiny 6.
- 109 trinkets purchased for 678 coins; 1519 trinket triggers. Numbered tokens: {"3":70,"4":29,"5":0,"6":0}.
- 128 special swaps. 4143 pip flights and 2249 Mult flights; mean 257.43 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 0 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 0 | 0 | 0 |
| color | 481 | 311 | 189 |
| number | 32 | 25 | 19 |
| bomb | 18 | 16 | 12 |
| twenty | 0 | 0 | 0 |
| row | 0 | 0 | 0 |
| wild | 12 | 1 | 1 |
| shiny | 29 | 0 | 0 |

## exposure-twenty

### greedy

- Mean 67.81 actions/run; 1.48 waves/board action; p99 4, maximum 8.
- 0 rerolls, 0 without an immediate match; 1307 coins earned, 977 spent.
- Score shares: match levels 10.5%, trinket pips 39.4%, trinket Mult 6.8%, match base 12.3%, special base 2.4%, cascade bonus 4.0%, low-pip bonus 2.4%.
- 89 packs purchased for 410 coins; 1090 coins in round payouts; token picks: column 1, color 0, number 23, bomb 16, twenty 0, row 3, wild 12, shiny 15.
- 93 trinkets purchased for 567 coins; 1428 trinket triggers. Numbered tokens: {"3":32,"4":3,"5":0,"6":0}.
- 156 special swaps. 4195 pip flights and 1875 Mult flights; mean 244.02 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 7 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 7 | 5 | 0 |
| color | 0 | 0 | 0 |
| number | 67 | 40 | 9 |
| bomb | 65 | 46 | 7 |
| twenty | 429 | 117 | 38 |
| row | 13 | 4 | 1 |
| wild | 47 | 2 | 2 |
| shiny | 44 | 0 | 0 |
### builder

- Mean 68.44 actions/run; 1.47 waves/board action; p99 4, maximum 5.
- 0 rerolls, 0 without an immediate match; 1446 coins earned, 891 spent.
- Score shares: match levels 15.6%, trinket pips 42.8%, trinket Mult 5.1%, match base 8.2%, special base 0.3%, cascade bonus 2.7%, low-pip bonus 1.7%.
- 88 packs purchased for 352 coins; 1237 coins in round payouts; token picks: column 0, color 0, number 5, bomb 3, twenty 0, row 0, wild 2, shiny 6.
- 88 trinkets purchased for 539 coins; 1639 trinket triggers. Numbered tokens: {"3":64,"4":24,"5":0,"6":0}.
- 117 special swaps. 3900 pip flights and 2021 Mult flights; mean 245.35 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 11 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 0 | 0 | 0 |
| color | 0 | 0 | 0 |
| number | 23 | 12 | 0 |
| bomb | 14 | 8 | 0 |
| twenty | 433 | 102 | 5 |
| row | 0 | 0 | 0 |
| wild | 13 | 0 | 0 |
| shiny | 19 | 0 | 0 |

## exposure-wild

### greedy

- Mean 67.19 actions/run; 1.93 waves/board action; p99 6, maximum 9.
- 0 rerolls, 0 without an immediate match; 1768 coins earned, 1259 spent.
- Score shares: match levels 8.4%, trinket pips 23.8%, trinket Mult 5.9%, match base 11.1%, special base 1.2%, cascade bonus 6.3%, low-pip bonus 2.3%.
- 109 packs purchased for 498 coins; 1503 coins in round payouts; token picks: column 1, color 0, number 28, bomb 14, twenty 0, row 7, wild 8, shiny 20.
- 114 trinkets purchased for 761 coins; 1556 trinket triggers. Numbered tokens: {"3":36,"4":11,"5":0,"6":0}.
- 75 special swaps. 4540 pip flights and 2238 Mult flights; mean 264.60 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 1 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 3 | 0 | 0 |
| color | 0 | 0 | 0 |
| number | 95 | 44 | 7 |
| bomb | 66 | 36 | 5 |
| twenty | 0 | 0 | 0 |
| row | 30 | 14 | 3 |
| wild | 435 | 8 | 8 |
| shiny | 70 | 0 | 0 |
### builder

- Mean 63.88 actions/run; 1.76 waves/board action; p99 6, maximum 8.
- 0 rerolls, 0 without an immediate match; 1738 coins earned, 1091 spent.
- Score shares: match levels 16.5%, trinket pips 37.5%, trinket Mult 5.1%, match base 8.1%, special base 0.2%, cascade bonus 4.2%, low-pip bonus 1.6%.
- 105 packs purchased for 420 coins; 1519 coins in round payouts; token picks: column 1, color 0, number 5, bomb 2, twenty 0, row 2, wild 2, shiny 4.
- 101 trinkets purchased for 671 coins; 1509 trinket triggers. Numbered tokens: {"3":82,"4":23,"5":0,"6":0}.
- 17 special swaps. 3522 pip flights and 1902 Mult flights; mean 222.31 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 1 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 6 | 3 | 1 |
| color | 0 | 0 | 0 |
| number | 28 | 8 | 0 |
| bomb | 11 | 2 | 0 |
| twenty | 0 | 0 | 0 |
| row | 14 | 5 | 0 |
| wild | 370 | 1 | 1 |
| shiny | 16 | 0 | 0 |

## exposure-shiny

### greedy

- Mean 74.81 actions/run; 1.67 waves/board action; p99 6, maximum 9.
- 0 rerolls, 0 without an immediate match; 1603 coins earned, 1167 spent.
- Score shares: match levels 7.5%, trinket pips 26.9%, trinket Mult 4.8%, match base 8.2%, special base 1.1%, cascade bonus 4.6%, low-pip bonus 1.6%.
- 107 packs purchased for 489 coins; 1316 coins in round payouts; token picks: column 2, color 0, number 29, bomb 20, twenty 0, row 4, wild 7, shiny 15.
- 104 trinkets purchased for 678 coins; 1884 trinket triggers. Numbered tokens: {"3":39,"4":7,"5":0,"6":0}.
- 96 special swaps. 5068 pip flights and 2773 Mult flights; mean 312.10 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 2 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 7 | 5 | 0 |
| color | 0 | 0 | 0 |
| number | 115 | 52 | 4 |
| bomb | 81 | 43 | 3 |
| twenty | 0 | 0 | 0 |
| row | 13 | 6 | 0 |
| wild | 21 | 0 | 0 |
| shiny | 546 | 0 | 0 |
### builder

- Mean 58.56 actions/run; 1.64 waves/board action; p99 5, maximum 6.
- 0 rerolls, 0 without an immediate match; 1511 coins earned, 948 spent.
- Score shares: match levels 9.0%, trinket pips 27.8%, trinket Mult 2.9%, match base 6.1%, special base 0.4%, cascade bonus 2.5%, low-pip bonus 1.2%.
- 82 packs purchased for 328 coins; 1295 coins in round payouts; token picks: column 0, color 0, number 7, bomb 3, twenty 0, row 1, wild 2, shiny 3.
- 91 trinkets purchased for 620 coins; 1200 trinket triggers. Numbered tokens: {"3":63,"4":19,"5":0,"6":0}.
- 21 special swaps. 3236 pip flights and 1765 Mult flights; mean 203.79 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 0 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 0 | 0 | 0 |
| color | 0 | 0 | 0 |
| number | 40 | 13 | 0 |
| bomb | 17 | 9 | 3 |
| twenty | 0 | 0 | 0 |
| row | 4 | 2 | 0 |
| wild | 10 | 0 | 0 |
| shiny | 353 | 0 | 0 |

## Limits

- Agent policies are not human skill estimates.
- Only visible information reaches policies; rollout samples use independent RNG.
- Matched seeds start equally, but streams diverge after different actions.
- Confidence intervals describe seed sampling under these fixed policies.
- Starter drafts, pack purchases, token choices, payouts and match upgrades, trinkets and nine-round progression are simulated using the production engine.
- Nominal scoring animation uses the same event plan and timings as the UI; decision time, falls, pauses and frame time are excluded.
- Pip-trinket score is allocated first at final Mult; Mult sources then use dice pips. Attribution is accounting, not causal lift.

Censored runs are retained in the denominator and are not counted as wins. Any nonzero censorship or resolution ceiling needs investigation before drawing balance conclusions. Sensitivity results are screening evidence, not automatic tuning instructions; confirm changes on held-out seeds.
