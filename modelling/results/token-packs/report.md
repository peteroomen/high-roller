# High Roller — full-run model

20 runs per scenario/policy; seeds 1001–1020; 1 independent samples per rollout candidate.

Engine SHA-256: `f5ef083c7b1a083c20c79e799e9da6af55d17dce7aab92816a7795c67983f48b`. Model SHA-256: `cba209edda4e479fda66b22303831737b1066a986b4069418556b03b3206442a`.

| Scenario | Policy | Run wins (95% CI) | R1 clear | R2 clear | R3 clear | R4 clear | R5 clear | R6 clear | Runs using reroll | Censored |
|---|---|---|---|---|---|---|---|---|---|---|
| baseline | random | 10.0% (2.8%–30.1%) | 95.0% | 90.0% | 85.0% | 85.0% | 80.0% | 10.0% | 0.0% | 0 |
| baseline | greedy | 55.0% (34.2%–74.2%) | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 55.0% | 0.0% | 0 |
| baseline | spender | 90.0% (69.9%–97.2%) | 100.0% | 100.0% | 100.0% | 95.0% | 95.0% | 90.0% | 100.0% | 0 |
| baseline | rollout | 55.0% (34.2%–74.2%) | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 55.0% | 100.0% | 0 |

Round clear rates above use all starting runs as the denominator. Conditional rates and score deficits are in summary.json.

## baseline

### random

- Mean 59.80 actions/run; 1.18 waves/board action; p99 3, maximum 4.
- 0 rerolls, 0 without an immediate match; 1891 coins earned, 435 spent.
- Score shares: match base 1.5%, special base 96.8%, cascade bonus 1.3%, low-pip bonus 0.4%.
- 87 packs purchased for 435 coins; 547 coins in round payouts; token picks: column 39, color 46, number 57, bomb 57, coin 46, row 36.
- 588 special swaps. 5509 pip flights and 8736 Mult flights; mean 856.58 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 0 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 1470 | 1239 | 1096 |
| color | 1710 | 1440 | 1319 |
| number | 1803 | 1523 | 1371 |
| bomb | 2046 | 1732 | 1577 |
| coin | 1583 | 1344 | 1207 |
| row | 1239 | 1053 | 950 |
### greedy

- Mean 57.85 actions/run; 1.18 waves/board action; p99 3, maximum 5.
- 0 rerolls, 0 without an immediate match; 683 coins earned, 500 spent.
- Score shares: match base 1.3%, special base 97.2%, cascade bonus 1.1%, low-pip bonus 0.4%.
- 100 packs purchased for 500 coins; 683 coins in round payouts; token picks: column 48, color 49, number 98, bomb 83, coin 0, row 42.
- 522 special swaps. 6010 pip flights and 10579 Mult flights; mean 983.12 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 0 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 1901 | 1628 | 1453 |
| color | 1486 | 1296 | 1221 |
| number | 3827 | 3208 | 3058 |
| bomb | 3061 | 2615 | 2379 |
| coin | 0 | 0 | 0 |
| row | 1765 | 1501 | 1338 |
### spender

- Mean 114.80 actions/run; 0.44 waves/board action; p99 2, maximum 5.
- 1085 rerolls, 1054 without an immediate match; 3941 coins earned, 3745 spent.
- Score shares: match base 1.5%, special base 96.6%, cascade bonus 1.4%, low-pip bonus 0.5%.
- 98 packs purchased for 490 coins; 644 coins in round payouts; token picks: column 0, color 31, number 108, bomb 68, coin 107, row 0.
- 586 special swaps. 6239 pip flights and 10053 Mult flights; mean 969.48 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 1 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 0 | 0 | 0 |
| color | 674 | 608 | 550 |
| number | 4023 | 3300 | 3096 |
| bomb | 2849 | 2414 | 2054 |
| coin | 3940 | 3297 | 3051 |
| row | 0 | 0 | 0 |
### rollout

- Mean 61.10 actions/run; 1.12 waves/board action; p99 3, maximum 5.
- 56 rerolls, 51 without an immediate match; 682 coins earned, 668 spent.
- Score shares: match base 1.4%, special base 96.8%, cascade bonus 1.4%, low-pip bonus 0.4%.
- 100 packs purchased for 500 coins; 682 coins in round payouts; token picks: column 44, color 46, number 96, bomb 86, coin 0, row 48.
- 535 special swaps. 6001 pip flights and 10381 Mult flights; mean 973.78 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 0 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 1716 | 1436 | 1273 |
| color | 1377 | 1219 | 1133 |
| number | 3638 | 2990 | 2839 |
| bomb | 3229 | 2751 | 2501 |
| coin | 0 | 0 | 0 |
| row | 1914 | 1598 | 1446 |

## Paired comparisons

| Scenario | Policy | Comparator | Win-rate change | Approx. 95% interval |
|---|---|---|---|---|
| baseline | random | greedy | -45.0 pp | -67.4 to -22.6 pp |
| baseline | spender | greedy | 35.0 pp | 9.3 to 60.7 pp |
| baseline | rollout | greedy | 0.0 pp | -24.6 to 24.6 pp |

## Limits

- Agent policies are not human skill estimates.
- Only visible information reaches policies; rollout samples use independent RNG.
- Matched seeds start equally, but streams diverge after different actions.
- Confidence intervals describe seed sampling under these fixed policies.
- Starter drafts, pack purchases, token choices, payouts and six-round progression are simulated using the production engine.
- Pacing is reported in moves/actions/waves, not unmeasured human minutes.

Censored runs are retained in the denominator and are not counted as wins. Any nonzero censorship or resolution ceiling needs investigation before drawing balance conclusions. Sensitivity results are screening evidence, not automatic tuning instructions; confirm changes on held-out seeds.
