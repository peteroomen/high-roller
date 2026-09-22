# High Roller — full-run model

50 runs per scenario/policy; seeds 1–50; 3 independent samples per rollout candidate.

Engine SHA-256: `fbfac16980c1aa12dfa9187a33f6d5351b64282377a8bf55b7daf8e24e615a1e`. Model SHA-256: `ad28cb6c051b9bfed122edd3dc23992ab1f2a4906f99413fab3a0e1f0ed7b4d2`.

| Scenario | Policy | Run wins (95% CI) | R1 clear | R2 clear | R3 clear | Runs using reroll | Censored |
|---|---|---|---|---|---|---|---|
| baseline | greedy | 44.0% (31.2%–57.7%) | 98.0% | 88.0% | 44.0% | 0.0% | 0 |
| baseline | spender | 50.0% (36.6%–63.4%) | 98.0% | 82.0% | 50.0% | 66.0% | 0 |
| special-mult-1 | greedy | 12.0% (5.6%–23.8%) | 84.0% | 48.0% | 12.0% | 0.0% | 0 |
| special-mult-1 | spender | 12.0% (5.6%–23.8%) | 84.0% | 50.0% | 12.0% | 62.0% | 0 |
| special-mult-3 | greedy | 64.0% (50.1%–75.9%) | 100.0% | 88.0% | 64.0% | 0.0% | 0 |
| special-mult-3 | spender | 64.0% (50.1%–75.9%) | 100.0% | 94.0% | 64.0% | 62.0% | 0 |

Round clear rates above use all starting runs as the denominator. Conditional rates and score deficits are in summary.json.

## baseline

### greedy

- Mean 18.08 actions/run; 1.46 waves/action; p99 4, maximum 7.
- 0 rerolls, 0 without an immediate match; 184 coins earned, 0 spent.
- Score shares: match base 20.9%, special base 66.3%, cascade bonus 9.9%, low-pip bonus 2.8%.
- 540 special swaps.
- 3 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 313 | 258 | 120 |
| color | 281 | 198 | 63 |
| number | 284 | 228 | 77 |
| bomb | 296 | 227 | 88 |
| coin | 291 | 184 | 113 |
### spender

- Mean 18.18 actions/run; 1.40 waves/action; p99 4, maximum 7.
- 40 rerolls, 32 without an immediate match; 186 coins earned, 120 spent.
- Score shares: match base 20.7%, special base 66.6%, cascade bonus 10.0%, low-pip bonus 2.7%.
- 523 special swaps.
- 1 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 304 | 248 | 111 |
| color | 282 | 199 | 67 |
| number | 281 | 216 | 70 |
| bomb | 302 | 237 | 95 |
| coin | 303 | 186 | 125 |

## special-mult-1

### greedy

- Mean 18.22 actions/run; 1.45 waves/action; p99 4, maximum 7.
- 0 rerolls, 0 without an immediate match; 178 coins earned, 0 spent.
- Score shares: match base 34.3%, special base 47.1%, cascade bonus 14.3%, low-pip bonus 4.3%.
- 471 special swaps.
- 1 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 299 | 255 | 128 |
| color | 286 | 207 | 75 |
| number | 279 | 239 | 98 |
| bomb | 273 | 229 | 104 |
| coin | 280 | 178 | 139 |
### spender

- Mean 18.92 actions/run; 1.42 waves/action; p99 4, maximum 7.
- 41 rerolls, 29 without an immediate match; 177 coins earned, 123 spent.
- Score shares: match base 34.5%, special base 46.4%, cascade bonus 14.6%, low-pip bonus 4.5%.
- 474 special swaps.
- 2 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 280 | 238 | 112 |
| color | 275 | 194 | 71 |
| number | 277 | 235 | 88 |
| bomb | 268 | 225 | 99 |
| coin | 284 | 177 | 135 |

## special-mult-3

### greedy

- Mean 14.38 actions/run; 1.43 waves/action; p99 3, maximum 7.
- 0 rerolls, 0 without an immediate match; 163 coins earned, 0 spent.
- Score shares: match base 13.7%, special base 78.0%, cascade bonus 6.6%, low-pip bonus 1.7%.
- 472 special swaps.
- 4 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 264 | 202 | 84 |
| color | 247 | 177 | 66 |
| number | 255 | 188 | 70 |
| bomb | 268 | 208 | 81 |
| coin | 270 | 163 | 83 |
### spender

- Mean 15.24 actions/run; 1.41 waves/action; p99 4, maximum 7.
- 35 rerolls, 24 without an immediate match; 166 coins earned, 105 spent.
- Score shares: match base 13.9%, special base 77.2%, cascade bonus 7.0%, low-pip bonus 1.9%.
- 479 special swaps.
- 3 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 275 | 203 | 87 |
| color | 255 | 185 | 70 |
| number | 265 | 194 | 71 |
| bomb | 270 | 205 | 80 |
| coin | 262 | 166 | 85 |

## Paired comparisons

| Scenario | Policy | Comparator | Win-rate change | Approx. 95% interval |
|---|---|---|---|---|
| special-mult-1 | greedy | baseline, same policy | -32.0 pp | -47.3 to -16.7 pp |
| special-mult-1 | spender | baseline, same policy | -38.0 pp | -54.7 to -21.3 pp |
| special-mult-3 | greedy | baseline, same policy | 20.0 pp | 3.2 to 36.8 pp |
| special-mult-3 | spender | baseline, same policy | 14.0 pp | 1.5 to 26.5 pp |
| baseline | spender | greedy | 6.0 pp | -5.8 to 17.8 pp |

## Limits

- Agent policies are not human skill estimates.
- Only visible information reaches policies; rollout samples use independent RNG.
- Matched seeds start equally, but streams diverge after different actions.
- Confidence intervals describe seed sampling under these fixed policies.
- No purchases or future content are simulated before those mechanics exist.
- Pacing is reported in moves/actions/waves, not unmeasured human minutes.

Censored runs are retained in the denominator and are not counted as wins. Any nonzero censorship or resolution ceiling needs investigation before drawing balance conclusions. Sensitivity results are screening evidence, not automatic tuning instructions; confirm changes on held-out seeds.
