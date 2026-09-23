# High Roller — full-run model

12 runs per scenario/policy; seeds 7001–7012; 2 independent samples per rollout candidate.

Engine SHA-256: `5ddbad8174bee3a5fe561ba9629b0911b0ebd46f628ee8b475363ce848dcdeab`. Model SHA-256: `d0d481898acef06fe3b6758cebe48335969d50396250119a862e978912071a74`.

| Scenario | Policy | Run wins (95% CI) | R1 clear | R2 clear | R3 clear | R4 clear | R5 clear | R6 clear | R7 clear | R8 clear | R9 clear | Runs using reroll | Censored |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| baseline | spender | 50.0% (25.4%–74.6%) | 100.0% | 91.7% | 91.7% | 91.7% | 91.7% | 83.3% | 83.3% | 66.7% | 50.0% | 100.0% | 0 |
| baseline | rollout | 75.0% (46.8%–91.1%) | 100.0% | 100.0% | 100.0% | 100.0% | 91.7% | 83.3% | 83.3% | 83.3% | 75.0% | 100.0% | 0 |

Round clear rates above use all starting runs as the denominator. Conditional rates and score deficits are in summary.json.

## baseline

### spender

- Mean 79.75 actions/run; 1.39 waves/board action; p99 4, maximum 9.
- 126 rerolls, 75 without an immediate match; 1207 coins earned, 1128 spent.
- Score shares: multipliers 3.0%, global additive trinkets 6.0%, match levels 12.0%, trinket pips 46.5%, trinket Mult 7.6%, match base 12.8%, special base 2.5%, cascade bonus 6.9%, low-pip bonus 2.7%.
- 73 packs purchased for 336 coins; 1001 coins in round payouts; token picks: column 7, color 0, number 13, bomb 10, twenty 0, row 5, wild 11, shiny 10.
- 70 trinkets purchased for 414 coins; 1350 trinket triggers. Numbered tokens: {"3":22,"4":7,"5":0,"6":0}.
- 143 gold matches from 370 observed gold spawns; 20 shiny matches; 39 wild clears.
- 81 special swaps. 3953 pip flights and 1856 Mult flights; mean 305.92 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 2 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Blast activations | Triggered by another special |
|---|---:|---:|---:|
| column | 35 | 22 | 5 |
| color | 0 | 0 | 0 |
| number | 61 | 39 | 10 |
| bomb | 56 | 35 | 6 |
| twenty | 0 | 0 | 0 |
| row | 24 | 14 | 4 |
| wild | 42 | 0 | 0 |
| shiny | 30 | 0 | 0 |
### rollout

- Mean 73.25 actions/run; 1.70 waves/board action; p99 6, maximum 8.
- 171 rerolls, 96 without an immediate match; 1467 coins earned, 1316 spent.
- Score shares: multipliers 3.7%, global additive trinkets 5.2%, match levels 9.7%, trinket pips 52.0%, trinket Mult 5.8%, match base 12.2%, special base 1.4%, cascade bonus 7.4%, low-pip bonus 2.5%.
- 79 packs purchased for 361 coins; 1244 coins in round payouts; token picks: column 5, color 0, number 11, bomb 15, twenty 0, row 8, wild 10, shiny 8.
- 76 trinkets purchased for 442 coins; 1269 trinket triggers. Numbered tokens: {"3":24,"4":10,"5":0,"6":0}.
- 148 gold matches from 359 observed gold spawns; 10 shiny matches; 28 wild clears.
- 66 special swaps. 3801 pip flights and 1669 Mult flights; mean 290.29 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 1 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Blast activations | Triggered by another special |
|---|---:|---:|---:|
| column | 26 | 13 | 3 |
| color | 0 | 0 | 0 |
| number | 50 | 25 | 3 |
| bomb | 72 | 34 | 8 |
| twenty | 0 | 0 | 0 |
| row | 27 | 8 | 0 |
| wild | 34 | 0 | 0 |
| shiny | 24 | 0 | 0 |

## Limits

- Agent policies are not human skill estimates.
- Only visible information reaches policies; rollout samples use independent RNG.
- Matched seeds start equally, but streams diverge after different actions.
- Confidence intervals describe seed sampling under these fixed policies.
- Starter drafts, pack purchases, token choices, payouts and match upgrades, trinkets and nine-round progression are simulated using the production engine.
- Nominal scoring animation uses the same event plan and timings as the UI; decision time, falls, pauses and frame time are excluded.
- Pip-trinket score is allocated at raw additive Mult; other additive sources use dice pips. The residual score is multiplicative lift after rounding. Attribution is accounting, not causal lift.

Censored runs are retained in the denominator and are not counted as wins. Any nonzero censorship or resolution ceiling needs investigation before drawing balance conclusions. Sensitivity results are screening evidence, not automatic tuning instructions; confirm changes on held-out seeds.
