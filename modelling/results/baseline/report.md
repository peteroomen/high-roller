# High Roller — full-run model

250 runs per scenario/policy; seeds 1–250; 6 independent samples per rollout candidate.

Engine SHA-256: `36ded503c212a34850397f2da51ce4f410178d30ae4a95f9a00469d4e6445cce`. Model SHA-256: `f6b40fc8a6cb015b593d54e77bd18644375a6cdff88635b002ba0fae54785d8c`.

| Scenario | Policy | Run wins (95% CI) | R1 clear | R2 clear | R3 clear | Runs using reroll | Censored |
|---|---|---|---|---|---|---|---|
| baseline | random | 11.6% (8.2%–16.2%) | 82.4% | 40.4% | 11.6% | 0.0% | 0 |
| baseline | greedy | 26.4% (21.3%–32.2%) | 95.6% | 68.0% | 26.4% | 0.0% | 0 |
| baseline | spender | 34.0% (28.4%–40.1%) | 95.6% | 70.8% | 34.0% | 65.2% | 0 |
| baseline | rollout | 69.6% (63.6%–75.0%) | 99.6% | 95.6% | 69.6% | 69.6% | 0 |

Round clear rates above use all starting runs as the denominator. Conditional rates and score deficits are in summary.json.

## baseline

### random

- Mean 17.54 actions/run; 1.50 waves/action; p99 5, maximum 8.
- 0 rerolls, 0 without an immediate match; 694 coins earned, 0 spent.
- Score shares: match base 40.8%, blast base 21.0%, cascade bonus 33.0%, low-pip bonus 5.1%.
- 38 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 1123 | 690 | 243 |
| color | 1072 | 703 | 267 |
| number | 1097 | 714 | 248 |
| bomb | 1120 | 680 | 268 |
| coin | 1146 | 694 | 248 |
### greedy

- Mean 18.63 actions/run; 1.59 waves/action; p99 5, maximum 8.
- 0 rerolls, 0 without an immediate match; 917 coins earned, 0 spent.
- Score shares: match base 43.8%, blast base 23.9%, cascade bonus 27.6%, low-pip bonus 4.6%.
- 42 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 1480 | 1069 | 368 |
| color | 1381 | 1026 | 320 |
| number | 1447 | 1016 | 344 |
| bomb | 1413 | 1042 | 311 |
| coin | 1419 | 917 | 415 |
### spender

- Mean 19.41 actions/run; 1.56 waves/action; p99 5, maximum 10.
- 209 rerolls, 148 without an immediate match; 938 coins earned, 627 spent.
- Score shares: match base 43.2%, blast base 23.8%, cascade bonus 28.6%, low-pip bonus 4.5%.
- 36 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 1565 | 1133 | 393 |
| color | 1449 | 1081 | 331 |
| number | 1478 | 1075 | 366 |
| bomb | 1468 | 1082 | 338 |
| coin | 1462 | 938 | 409 |
### rollout

- Mean 17.71 actions/run; 1.90 waves/action; p99 6, maximum 10.
- 226 rerolls, 163 without an immediate match; 1055 coins earned, 678 spent.
- Score shares: match base 36.9%, blast base 20.2%, cascade bonus 39.0%, low-pip bonus 4.0%.
- 37 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 1681 | 1139 | 375 |
| color | 1620 | 1187 | 399 |
| number | 1615 | 1119 | 362 |
| bomb | 1618 | 1175 | 433 |
| coin | 1609 | 1055 | 403 |

## Paired comparisons

| Scenario | Policy | Comparator | Win-rate change | Approx. 95% interval |
|---|---|---|---|---|
| baseline | random | greedy | -14.8 pp | -21.5 to -8.1 pp |
| baseline | spender | greedy | 7.6 pp | 1.2 to 14.0 pp |
| baseline | rollout | greedy | 43.2 pp | 35.6 to 50.8 pp |

## Limits

- Agent policies are not human skill estimates.
- Only visible information reaches policies; rollout samples use independent RNG.
- Matched seeds start equally, but streams diverge after different actions.
- Confidence intervals describe seed sampling under these fixed policies.
- No purchases or future content are simulated before those mechanics exist.
- Pacing is reported in moves/actions/waves, not unmeasured human minutes.

Censored runs are retained in the denominator and are not counted as wins. Any nonzero censorship or resolution ceiling needs investigation before drawing balance conclusions. Sensitivity results are screening evidence, not automatic tuning instructions; confirm changes on held-out seeds.
