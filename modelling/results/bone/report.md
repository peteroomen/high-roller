# High Roller — full-run model

50 runs per scenario/policy; seeds 1–50; 3 independent samples per rollout candidate.

Engine SHA-256: `6c08fd916ff37cf342ba67fc5acdc8df588bbd89c1cd7d3e0db42aacdb6f309e`. Model SHA-256: `f6b40fc8a6cb015b593d54e77bd18644375a6cdff88635b002ba0fae54785d8c`.

| Scenario | Policy | Run wins (95% CI) | R1 clear | R2 clear | R3 clear | Runs using reroll | Censored |
|---|---|---|---|---|---|---|---|
| baseline | greedy | 22.0% (12.8%–35.2%) | 96.0% | 64.0% | 22.0% | 0.0% | 0 |
| baseline | spender | 26.0% (15.9%–39.6%) | 96.0% | 66.0% | 26.0% | 72.0% | 0 |
| without-color | greedy | 12.0% (5.6%–23.8%) | 84.0% | 54.0% | 12.0% | 0.0% | 0 |
| without-color | spender | 8.0% (3.2%–18.8%) | 86.0% | 54.0% | 8.0% | 52.0% | 0 |

Round clear rates above use all starting runs as the denominator. Conditional rates and score deficits are in summary.json.

## baseline

### greedy

- Mean 19.88 actions/run; 1.59 waves/action; p99 5, maximum 8.
- 0 rerolls, 0 without an immediate match; 221 coins earned, 0 spent.
- Score shares: match base 47.1%, blast base 20.3%, cascade bonus 27.6%, low-pip bonus 5.0%.
- 11 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 326 | 261 | 107 |
| color | 276 | 227 | 95 |
| number | 260 | 203 | 93 |
| bomb | 270 | 223 | 101 |
| coin | 284 | 221 | 118 |
### spender

- Mean 20.46 actions/run; 1.51 waves/action; p99 4, maximum 7.
- 50 rerolls, 36 without an immediate match; 211 coins earned, 150 spent.
- Score shares: match base 48.5%, blast base 20.4%, cascade bonus 26.3%, low-pip bonus 4.8%.
- 9 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 303 | 244 | 99 |
| color | 256 | 211 | 93 |
| number | 258 | 210 | 98 |
| bomb | 277 | 224 | 100 |
| coin | 281 | 211 | 113 |

## without-color

### greedy

- Mean 19.00 actions/run; 1.49 waves/action; p99 5, maximum 7.
- 0 rerolls, 0 without an immediate match; 145 coins earned, 0 spent.
- Score shares: match base 53.4%, blast base 16.3%, cascade bonus 24.6%, low-pip bonus 5.7%.
- 5 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 246 | 169 | 40 |
| color | 0 | 0 | 0 |
| number | 223 | 159 | 34 |
| bomb | 233 | 156 | 31 |
| coin | 231 | 145 | 46 |
### spender

- Mean 19.78 actions/run; 1.45 waves/action; p99 5, maximum 7.
- 34 rerolls, 23 without an immediate match; 158 coins earned, 102 spent.
- Score shares: match base 53.8%, blast base 16.1%, cascade bonus 24.4%, low-pip bonus 5.7%.
- 6 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 255 | 176 | 39 |
| color | 0 | 0 | 0 |
| number | 231 | 165 | 40 |
| bomb | 237 | 155 | 30 |
| coin | 246 | 158 | 48 |

## Paired comparisons

| Scenario | Policy | Comparator | Win-rate change | Approx. 95% interval |
|---|---|---|---|---|
| without-color | greedy | baseline, same policy | -10.0 pp | -22.8 to 2.8 pp |
| without-color | spender | baseline, same policy | -18.0 pp | -31.4 to -4.6 pp |
| baseline | spender | greedy | 4.0 pp | -5.6 to 13.6 pp |

## Limits

- Agent policies are not human skill estimates.
- Only visible information reaches policies; rollout samples use independent RNG.
- Matched seeds start equally, but streams diverge after different actions.
- Confidence intervals describe seed sampling under these fixed policies.
- No purchases or future content are simulated before those mechanics exist.
- Pacing is reported in moves/actions/waves, not unmeasured human minutes.

Censored runs are retained in the denominator and are not counted as wins. Any nonzero censorship or resolution ceiling needs investigation before drawing balance conclusions. Sensitivity results are screening evidence, not automatic tuning instructions; confirm changes on held-out seeds.
