# High Roller — full-run model

30 runs per scenario/policy; seeds 1–30; 1 independent samples per rollout candidate.

Engine SHA-256: `181e5aae4fdd3b23c90739079374953a3e309e909a577ace86312eb61edc55e8`. Model SHA-256: `e4060af1aa3a59ad06adaea30a6f1cd4cc6b34193a165999eef650c97b7abb15`.

| Scenario | Policy | Run wins (95% CI) | R1 clear | R2 clear | R3 clear | R4 clear | R5 clear | R6 clear | R7 clear | R8 clear | R9 clear | Runs using reroll | Censored |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| weaker-specials | greedy | 83.3% (66.4%–92.7%) | 100.0% | 100.0% | 100.0% | 96.7% | 96.7% | 96.7% | 90.0% | 90.0% | 83.3% | 0.0% | 0 |
| weaker-specials | builder | 33.3% (19.2%–51.2%) | 100.0% | 100.0% | 90.0% | 76.7% | 70.0% | 66.7% | 63.3% | 50.0% | 33.3% | 0.0% | 0 |
| weaker-specials | specialist | 76.7% (59.1%–88.2%) | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 96.7% | 86.7% | 76.7% | 0.0% | 0 |
| one-percent-specials | greedy | 13.3% (5.3%–29.7%) | 100.0% | 100.0% | 96.7% | 86.7% | 80.0% | 66.7% | 56.7% | 20.0% | 13.3% | 0.0% | 0 |
| one-percent-specials | builder | 60.0% (42.3%–75.4%) | 100.0% | 96.7% | 86.7% | 83.3% | 80.0% | 76.7% | 73.3% | 70.0% | 60.0% | 0.0% | 0 |
| one-percent-specials | specialist | 0.0% (0.0%–11.4%) | 100.0% | 100.0% | 76.7% | 66.7% | 50.0% | 36.7% | 6.7% | 3.3% | 0.0% | 0.0% | 0 |

Round clear rates above use all starting runs as the denominator. Conditional rates and score deficits are in summary.json.

## weaker-specials

### greedy

- Mean 83.67 actions/run; 1.48 waves/board action; p99 4, maximum 6.
- 0 rerolls, 0 without an immediate match; 1520 coins earned, 1430 spent.
- Score shares: match levels 9.3%, trinket pips 24.8%, trinket Mult 5.6%, match base 11.4%, special base 42.1%, cascade bonus 5.1%, low-pip bonus 1.7%.
- 175 packs purchased for 840 coins; 1520 coins in round payouts; token picks: column 74, color 0, number 145, bomb 128, coin 0, row 79.
- 118 trinkets purchased for 590 coins; 1420 trinket triggers. Numbered tokens: {"3":46,"4":41,"5":18,"6":0}.
- 960 special swaps. 15883 pip flights and 5981 Mult flights; mean 393.96 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 2 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 987 | 755 | 510 |
| color | 0 | 0 | 0 |
| number | 1933 | 1329 | 1095 |
| bomb | 1598 | 1210 | 790 |
| coin | 0 | 0 | 0 |
| row | 1063 | 806 | 536 |
### builder

- Mean 64.30 actions/run; 1.38 waves/board action; p99 4, maximum 5.
- 0 rerolls, 0 without an immediate match; 1236 coins earned, 995 spent.
- Score shares: match levels 23.0%, trinket pips 56.0%, trinket Mult 6.0%, match base 9.8%, special base 1.1%, cascade bonus 3.0%, low-pip bonus 1.2%.
- 105 packs purchased for 420 coins; 1236 coins in round payouts; token picks: column 1, color 0, number 19, bomb 9, coin 0, row 1.
- 115 trinkets purchased for 575 coins; 2038 trinket triggers. Numbered tokens: {"3":148,"4":124,"5":43,"6":0}.
- 112 special swaps. 6438 pip flights and 2561 Mult flights; mean 197.18 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 5 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 11 | 3 | 0 |
| color | 0 | 0 | 0 |
| number | 202 | 76 | 0 |
| bomb | 81 | 34 | 3 |
| coin | 0 | 0 | 0 |
| row | 5 | 5 | 1 |
### specialist

- Mean 87.83 actions/run; 1.42 waves/board action; p99 3, maximum 5.
- 0 rerolls, 0 without an immediate match; 1559 coins earned, 1090 spent.
- Score shares: match levels 12.3%, trinket pips 0.0%, trinket Mult 0.0%, match base 9.9%, special base 71.8%, cascade bonus 4.5%, low-pip bonus 1.5%.
- 235 packs purchased for 1090 coins; 1559 coins in round payouts; token picks: column 82, color 0, number 143, bomb 137, coin 0, row 88.
- 0 trinkets purchased for 0 coins; 0 trinket triggers. Numbered tokens: {"3":121,"4":102,"5":32,"6":0}.
- 1138 special swaps. 17871 pip flights and 7425 Mult flights; mean 434.03 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 1 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 1618 | 1262 | 947 |
| color | 0 | 0 | 0 |
| number | 2708 | 1948 | 1716 |
| bomb | 2557 | 2020 | 1471 |
| coin | 0 | 0 | 0 |
| row | 1688 | 1320 | 943 |

## one-percent-specials

### greedy

- Mean 72.23 actions/run; 1.48 waves/board action; p99 4, maximum 7.
- 0 rerolls, 0 without an immediate match; 1171 coins earned, 1117 spent.
- Score shares: match levels 11.2%, trinket pips 33.2%, trinket Mult 10.3%, match base 19.1%, special base 15.6%, cascade bonus 7.7%, low-pip bonus 2.9%.
- 126 packs purchased for 612 coins; 1171 coins in round payouts; token picks: column 70, color 0, number 108, bomb 104, coin 0, row 72.
- 101 trinkets purchased for 505 coins; 1683 trinket triggers. Numbered tokens: {"3":26,"4":23,"5":5,"6":0}.
- 488 special swaps. 10419 pip flights and 3580 Mult flights; mean 275.11 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 4 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 270 | 198 | 89 |
| color | 0 | 0 | 0 |
| number | 471 | 292 | 160 |
| bomb | 464 | 341 | 143 |
| coin | 0 | 0 | 0 |
| row | 273 | 195 | 92 |
### builder

- Mean 68.73 actions/run; 1.41 waves/board action; p99 4, maximum 5.
- 0 rerolls, 0 without an immediate match; 1342 coins earned, 1060 spent.
- Score shares: match levels 23.8%, trinket pips 57.3%, trinket Mult 6.1%, match base 8.8%, special base 0.4%, cascade bonus 2.6%, low-pip bonus 1.1%.
- 125 packs purchased for 500 coins; 1342 coins in round payouts; token picks: column 1, color 0, number 19, bomb 9, coin 0, row 1.
- 112 trinkets purchased for 560 coins; 2310 trinket triggers. Numbered tokens: {"3":169,"4":155,"5":51,"6":0}.
- 51 special swaps. 6596 pip flights and 2791 Mult flights; mean 208.12 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 7 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 7 | 2 | 0 |
| color | 0 | 0 | 0 |
| number | 76 | 32 | 0 |
| bomb | 51 | 16 | 0 |
| coin | 0 | 0 | 0 |
| row | 2 | 1 | 0 |
### specialist

- Mean 58.20 actions/run; 1.51 waves/board action; p99 4, maximum 5.
- 0 rerolls, 0 without an immediate match; 854 coins earned, 660 spent.
- Score shares: match levels 0.0%, trinket pips 0.0%, trinket Mult 0.0%, match base 31.4%, special base 50.1%, cascade bonus 13.8%, low-pip bonus 4.7%.
- 132 packs purchased for 660 coins; 854 coins in round payouts; token picks: column 86, color 0, number 128, bomb 117, coin 0, row 95.
- 0 trinkets purchased for 0 coins; 0 trinket triggers. Numbered tokens: {"3":0,"4":0,"5":0,"6":0}.
- 630 special swaps. 9509 pip flights and 2579 Mult flights; mean 217.11 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 3 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 385 | 311 | 151 |
| color | 0 | 0 | 0 |
| number | 617 | 484 | 313 |
| bomb | 483 | 392 | 164 |
| coin | 0 | 0 | 0 |
| row | 405 | 339 | 154 |

## Limits

- Agent policies are not human skill estimates.
- Only visible information reaches policies; rollout samples use independent RNG.
- Matched seeds start equally, but streams diverge after different actions.
- Confidence intervals describe seed sampling under these fixed policies.
- Starter drafts, pack purchases, token choices, payouts and match upgrades, trinkets and nine-round progression are simulated using the production engine.
- Nominal scoring animation uses the same event plan and timings as the UI; decision time, falls, pauses and frame time are excluded.
- Pip-trinket score is allocated first at final Mult; Mult sources then use dice pips. Attribution is accounting, not causal lift.

Censored runs are retained in the denominator and are not counted as wins. Any nonzero censorship or resolution ceiling needs investigation before drawing balance conclusions. Sensitivity results are screening evidence, not automatic tuning instructions; confirm changes on held-out seeds.
