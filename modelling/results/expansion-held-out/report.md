# High Roller — full-run model

40 runs per scenario/policy; seeds 7001–7040; 1 independent samples per rollout candidate.

Engine SHA-256: `5ddbad8174bee3a5fe561ba9629b0911b0ebd46f628ee8b475363ce848dcdeab`. Model SHA-256: `d0d481898acef06fe3b6758cebe48335969d50396250119a862e978912071a74`.

| Scenario | Policy | Run wins (95% CI) | R1 clear | R2 clear | R3 clear | R4 clear | R5 clear | R6 clear | R7 clear | R8 clear | R9 clear | Runs using reroll | Censored |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| baseline | random | 2.5% (0.4%–12.9%) | 97.5% | 87.5% | 50.0% | 22.5% | 12.5% | 7.5% | 5.0% | 2.5% | 2.5% | 0.0% | 0 |
| baseline | greedy | 55.0% (39.8%–69.3%) | 100.0% | 100.0% | 95.0% | 77.5% | 72.5% | 65.0% | 57.5% | 55.0% | 55.0% | 0.0% | 0 |
| baseline | builder | 67.5% (52.0%–79.9%) | 100.0% | 100.0% | 100.0% | 100.0% | 90.0% | 80.0% | 72.5% | 67.5% | 67.5% | 0.0% | 0 |
| baseline | specialist | 0.0% (0.0%–8.8%) | 100.0% | 92.5% | 70.0% | 27.5% | 12.5% | 5.0% | 2.5% | 0.0% | 0.0% | 0.0% | 0 |

Round clear rates above use all starting runs as the denominator. Conditional rates and score deficits are in summary.json.

## baseline

### random

- Mean 38.67 actions/run; 1.41 waves/board action; p99 4, maximum 5.
- 0 rerolls, 0 without an immediate match; 1503 coins earned, 1261 spent.
- Score shares: multipliers 0.0%, global additive trinkets 4.7%, match levels 6.4%, trinket pips 32.6%, trinket Mult 7.9%, match base 29.6%, special base 3.0%, cascade bonus 11.5%, low-pip bonus 4.2%.
- 75 packs purchased for 332 coins; 1186 coins in round payouts; token picks: column 13, color 1, number 9, bomb 6, twenty 12, row 21, wild 7, shiny 3.
- 161 trinkets purchased for 929 coins; 715 trinket triggers. Numbered tokens: {"3":10,"4":12,"5":11,"6":10}.
- 215 gold matches from 609 observed gold spawns; 2 shiny matches; 5 wild clears.
- 82 special swaps. 4929 pip flights and 1870 Mult flights; mean 111.80 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 10 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Blast activations | Triggered by another special |
|---|---:|---:|---:|
| column | 32 | 25 | 0 |
| color | 0 | 0 | 0 |
| number | 21 | 14 | 0 |
| bomb | 14 | 11 | 0 |
| twenty | 41 | 6 | 1 |
| row | 40 | 30 | 3 |
| wild | 5 | 0 | 0 |
| shiny | 8 | 0 | 0 |
### greedy

- Mean 63.90 actions/run; 1.59 waves/board action; p99 5, maximum 8.
- 0 rerolls, 0 without an immediate match; 3493 coins earned, 2431 spent.
- Score shares: multipliers 23.5%, global additive trinkets 6.3%, match levels 9.5%, trinket pips 32.9%, trinket Mult 6.4%, match base 12.0%, special base 1.7%, cascade bonus 5.2%, low-pip bonus 2.4%.
- 215 packs purchased for 990 coins; 2958 coins in round payouts; token picks: column 13, color 0, number 52, bomb 29, twenty 0, row 15, wild 32, shiny 29.
- 227 trinkets purchased for 1441 coins; 3301 trinket triggers. Numbered tokens: {"3":72,"4":13,"5":0,"6":0}.
- 361 gold matches from 1021 observed gold spawns; 56 shiny matches; 76 wild clears.
- 193 special swaps. 10308 pip flights and 4847 Mult flights; mean 240.49 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 5 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Blast activations | Triggered by another special |
|---|---:|---:|---:|
| column | 30 | 19 | 4 |
| color | 0 | 0 | 0 |
| number | 178 | 101 | 9 |
| bomb | 112 | 75 | 8 |
| twenty | 0 | 0 | 0 |
| row | 47 | 26 | 2 |
| wild | 85 | 0 | 0 |
| shiny | 102 | 0 | 0 |
### builder

- Mean 68.75 actions/run; 1.56 waves/board action; p99 5, maximum 7.
- 0 rerolls, 0 without an immediate match; 4021 coins earned, 2363 spent.
- Score shares: multipliers 21.2%, global additive trinkets 3.6%, match levels 13.2%, trinket pips 43.1%, trinket Mult 4.7%, match base 8.6%, special base 0.3%, cascade bonus 3.5%, low-pip bonus 1.6%.
- 216 packs purchased for 864 coins; 3405 coins in round payouts; token picks: column 2, color 0, number 9, bomb 7, twenty 0, row 4, wild 11, shiny 7.
- 240 trinkets purchased for 1499 coins; 4073 trinket triggers. Numbered tokens: {"3":149,"4":67,"5":0,"6":0}.
- 427 gold matches from 1132 observed gold spawns; 16 shiny matches; 32 wild clears.
- 59 special swaps. 10094 pip flights and 5225 Mult flights; mean 252.87 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 6 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Blast activations | Triggered by another special |
|---|---:|---:|---:|
| column | 14 | 7 | 0 |
| color | 0 | 0 | 0 |
| number | 35 | 20 | 0 |
| bomb | 41 | 24 | 5 |
| twenty | 0 | 0 | 0 |
| row | 22 | 13 | 0 |
| wild | 37 | 0 | 0 |
| shiny | 27 | 0 | 0 |
### specialist

- Mean 38.83 actions/run; 1.43 waves/board action; p99 4, maximum 7.
- 0 rerolls, 0 without an immediate match; 1500 coins earned, 620 spent.
- Score shares: multipliers 1.8%, global additive trinkets 0.0%, match levels 0.0%, trinket pips 0.0%, trinket Mult 0.0%, match base 56.7%, special base 14.1%, cascade bonus 19.9%, low-pip bonus 7.5%.
- 124 packs purchased for 620 coins; 1243 coins in round payouts; token picks: column 13, color 0, number 43, bomb 27, twenty 0, row 14, wild 33, shiny 34.
- 0 trinkets purchased for 0 coins; 0 trinket triggers. Numbered tokens: {"3":0,"4":0,"5":0,"6":0}.
- 257 gold matches from 703 observed gold spawns; 27 shiny matches; 44 wild clears.
- 200 special swaps. 6307 pip flights and 1756 Mult flights; mean 122.82 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 7 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Blast activations | Triggered by another special |
|---|---:|---:|---:|
| column | 21 | 15 | 1 |
| color | 0 | 0 | 0 |
| number | 114 | 102 | 13 |
| bomb | 98 | 83 | 8 |
| twenty | 0 | 0 | 0 |
| row | 34 | 30 | 2 |
| wild | 48 | 2 | 2 |
| shiny | 68 | 0 | 0 |

## Paired comparisons

| Scenario | Policy | Comparator | Win-rate change | Approx. 95% interval |
|---|---|---|---|---|
| baseline | random | greedy | -52.5 pp | -68.2 to -36.8 pp |
| baseline | builder | greedy | 12.5 pp | -8.8 to 33.8 pp |
| baseline | specialist | greedy | -55.0 pp | -70.6 to -39.4 pp |

## Limits

- Agent policies are not human skill estimates.
- Only visible information reaches policies; rollout samples use independent RNG.
- Matched seeds start equally, but streams diverge after different actions.
- Confidence intervals describe seed sampling under these fixed policies.
- Starter drafts, pack purchases, token choices, payouts and match upgrades, trinkets and nine-round progression are simulated using the production engine.
- Nominal scoring animation uses the same event plan and timings as the UI; decision time, falls, pauses and frame time are excluded.
- Pip-trinket score is allocated at raw additive Mult; other additive sources use dice pips. The residual score is multiplicative lift after rounding. Attribution is accounting, not causal lift.

Censored runs are retained in the denominator and are not counted as wins. Any nonzero censorship or resolution ceiling needs investigation before drawing balance conclusions. Sensitivity results are screening evidence, not automatic tuning instructions; confirm changes on held-out seeds.
