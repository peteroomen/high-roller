# High Roller — full-run model

10 runs per scenario/policy; seeds 1–10; 2 independent samples per rollout candidate.

Engine SHA-256: `9bf1f9cb7b2a11aa11328b7833eb5d2ddee2f62c2c142b0c9fd3079d4f45b15a`. Model SHA-256: `1339de66f623a4fb8962fbfe062151f2cdbdc5620d43a35f840a238fdff36c83`.

| Scenario | Policy | Run wins (95% CI) | R1 clear | R2 clear | R3 clear | Runs using reroll | Censored |
|---|---|---|---|---|---|---|---|
| baseline | greedy | 60.0% (31.3%–83.2%) | 100.0% | 90.0% | 60.0% | 0.0% | 0 |
| baseline | spender | 60.0% (31.3%–83.2%) | 100.0% | 90.0% | 60.0% | 60.0% | 0 |

Round clear rates above use all starting runs as the denominator. Conditional rates and score deficits are in summary.json.

## baseline

### greedy

- Mean 17.10 actions/run; 1.50 waves/action; p99 3, maximum 4.
- 0 rerolls, 0 without an immediate match; 51 coins earned, 0 spent.
- Score shares: match base 16.9%, special base 70.9%, cascade bonus 10.2%, low-pip bonus 2.0%.
- 134 special swaps. 1703 pip flights and 628 Mult flights; mean 336.81 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 2 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 60 | 53 | 30 |
| color | 55 | 41 | 12 |
| number | 62 | 51 | 37 |
| bomb | 74 | 67 | 28 |
| coin | 63 | 51 | 28 |
| row | 54 | 45 | 26 |
### spender

- Mean 17.90 actions/run; 1.46 waves/action; p99 4, maximum 4.
- 10 rerolls, 9 without an immediate match; 47 coins earned, 30 spent.
- Score shares: match base 16.2%, special base 71.1%, cascade bonus 10.4%, low-pip bonus 2.3%.
- 131 special swaps. 1689 pip flights and 640 Mult flights; mean 336.16 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 1 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 58 | 55 | 27 |
| color | 56 | 42 | 14 |
| number | 65 | 53 | 37 |
| bomb | 74 | 63 | 31 |
| coin | 57 | 47 | 25 |
| row | 49 | 39 | 21 |

## Paired comparisons

| Scenario | Policy | Comparator | Win-rate change | Approx. 95% interval |
|---|---|---|---|---|
| baseline | spender | greedy | 0.0 pp | 0.0 to 0.0 pp |

## Limits

- Agent policies are not human skill estimates.
- Only visible information reaches policies; rollout samples use independent RNG.
- Matched seeds start equally, but streams diverge after different actions.
- Confidence intervals describe seed sampling under these fixed policies.
- No purchases or future content are simulated before those mechanics exist.
- Pacing is reported in moves/actions/waves, not unmeasured human minutes.

Censored runs are retained in the denominator and are not counted as wins. Any nonzero censorship or resolution ceiling needs investigation before drawing balance conclusions. Sensitivity results are screening evidence, not automatic tuning instructions; confirm changes on held-out seeds.
