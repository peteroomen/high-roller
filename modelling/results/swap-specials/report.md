# High Roller — full-run model

50 runs per scenario/policy; seeds 1–50; 3 independent samples per rollout candidate.

Engine SHA-256: `fbfac16980c1aa12dfa9187a33f6d5351b64282377a8bf55b7daf8e24e615a1e`. Model SHA-256: `ad28cb6c051b9bfed122edd3dc23992ab1f2a4906f99413fab3a0e1f0ed7b4d2`.

| Scenario | Policy | Run wins (95% CI) | R1 clear | R2 clear | R3 clear | Runs using reroll | Censored |
|---|---|---|---|---|---|---|---|
| baseline | random | 4.0% (1.1%–13.5%) | 72.0% | 40.0% | 4.0% | 0.0% | 0 |
| baseline | greedy | 44.0% (31.2%–57.7%) | 98.0% | 88.0% | 44.0% | 0.0% | 0 |
| baseline | spender | 50.0% (36.6%–63.4%) | 98.0% | 82.0% | 50.0% | 66.0% | 0 |
| baseline | rollout | 68.0% (54.2%–79.2%) | 100.0% | 90.0% | 68.0% | 78.0% | 0 |

Round clear rates above use all starting runs as the denominator. Conditional rates and score deficits are in summary.json.

## baseline

### random

- Mean 17.54 actions/run; 1.36 waves/action; p99 3, maximum 5.
- 0 rerolls, 0 without an immediate match; 140 coins earned, 0 spent.
- Score shares: match base 29.0%, special base 53.0%, cascade bonus 14.6%, low-pip bonus 3.4%.
- 458 special swaps.
- 6 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 214 | 161 | 62 |
| color | 192 | 155 | 58 |
| number | 198 | 148 | 51 |
| bomb | 202 | 155 | 64 |
| coin | 185 | 140 | 45 |
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
### rollout

- Mean 16.18 actions/run; 1.71 waves/action; p99 5, maximum 7.
- 45 rerolls, 41 without an immediate match; 207 coins earned, 135 spent.
- Score shares: match base 21.5%, special base 58.7%, cascade bonus 16.9%, low-pip bonus 2.8%.
- 509 special swaps.
- 1 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 302 | 219 | 89 |
| color | 272 | 203 | 76 |
| number | 297 | 221 | 71 |
| bomb | 292 | 224 | 102 |
| coin | 293 | 207 | 133 |

## Paired comparisons

| Scenario | Policy | Comparator | Win-rate change | Approx. 95% interval |
|---|---|---|---|---|
| baseline | random | greedy | -40.0 pp | -53.7 to -26.3 pp |
| baseline | spender | greedy | 6.0 pp | -5.8 to 17.8 pp |
| baseline | rollout | greedy | 24.0 pp | 7.6 to 40.4 pp |

## Limits

- Agent policies are not human skill estimates.
- Only visible information reaches policies; rollout samples use independent RNG.
- Matched seeds start equally, but streams diverge after different actions.
- Confidence intervals describe seed sampling under these fixed policies.
- No purchases or future content are simulated before those mechanics exist.
- Pacing is reported in moves/actions/waves, not unmeasured human minutes.

Censored runs are retained in the denominator and are not counted as wins. Any nonzero censorship or resolution ceiling needs investigation before drawing balance conclusions. Sensitivity results are screening evidence, not automatic tuning instructions; confirm changes on held-out seeds.
