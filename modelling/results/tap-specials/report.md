# High Roller — full-run model

40 runs per scenario/policy; seeds 1–40; 2 independent samples per rollout candidate.

Engine SHA-256: `80276c1bf6dae11b3ccdd5b40a7608fe7bd5061b399a80531831faca708a381a`. Model SHA-256: `0f2183da8b6279d1e05a741c76f4ad6133b5da2c08c2d7734013071643fa9e86`.

| Scenario | Policy | Run wins (95% CI) | R1 clear | R2 clear | R3 clear | Runs using reroll | Censored |
|---|---|---|---|---|---|---|---|
| baseline | random | 7.5% (2.6%–19.9%) | 87.5% | 55.0% | 7.5% | 0.0% | 0 |
| baseline | greedy | 50.0% (35.2%–64.8%) | 100.0% | 97.5% | 50.0% | 0.0% | 0 |
| baseline | spender | 42.5% (28.5%–57.8%) | 100.0% | 97.5% | 42.5% | 87.5% | 0 |
| baseline | rollout | 60.0% (44.6%–73.7%) | 100.0% | 97.5% | 60.0% | 72.5% | 0 |

Round clear rates above use all starting runs as the denominator. Conditional rates and score deficits are in summary.json.

## baseline

### random

- Mean 19.40 actions/run; 1.36 waves/action; p99 4, maximum 5.
- 0 rerolls, 0 without an immediate match; 137 coins earned, 0 spent.
- Score shares: match base 25.1%, special base 59.3%, cascade bonus 12.3%, low-pip bonus 3.3%.
- 380 special taps. 5287 pip flights and 2175 Mult flights; mean 269.10 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 1 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 201 | 148 | 82 |
| color | 182 | 144 | 71 |
| number | 207 | 148 | 84 |
| bomb | 198 | 138 | 74 |
| coin | 190 | 137 | 77 |
| row | 186 | 125 | 72 |
### greedy

- Mean 18.88 actions/run; 1.54 waves/action; p99 4, maximum 5.
- 0 rerolls, 0 without an immediate match; 199 coins earned, 0 spent.
- Score shares: match base 20.0%, special base 64.9%, cascade bonus 13.0%, low-pip bonus 2.1%.
- 568 special taps. 7116 pip flights and 2738 Mult flights; mean 355.55 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 1 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 263 | 223 | 137 |
| color | 228 | 191 | 65 |
| number | 269 | 224 | 141 |
| bomb | 259 | 213 | 116 |
| coin | 254 | 199 | 122 |
| row | 260 | 212 | 113 |
### spender

- Mean 20.27 actions/run; 1.45 waves/action; p99 4, maximum 5.
- 55 rerolls, 42 without an immediate match; 215 coins earned, 165 spent.
- Score shares: match base 19.9%, special base 65.7%, cascade bonus 12.3%, low-pip bonus 2.1%.
- 575 special taps. 7169 pip flights and 2716 Mult flights; mean 356.80 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 0 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 275 | 226 | 137 |
| color | 225 | 186 | 61 |
| number | 267 | 224 | 142 |
| bomb | 256 | 210 | 113 |
| coin | 268 | 215 | 131 |
| row | 247 | 203 | 105 |
### rollout

- Mean 19.50 actions/run; 1.59 waves/action; p99 4, maximum 6.
- 42 rerolls, 29 without an immediate match; 189 coins earned, 126 spent.
- Score shares: match base 23.6%, special base 58.2%, cascade bonus 15.7%, low-pip bonus 2.5%.
- 504 special taps. 7085 pip flights and 2911 Mult flights; mean 360.02 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 1 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 262 | 206 | 126 |
| color | 224 | 171 | 60 |
| number | 247 | 202 | 121 |
| bomb | 249 | 200 | 108 |
| coin | 252 | 189 | 119 |
| row | 248 | 195 | 125 |

## Paired comparisons

| Scenario | Policy | Comparator | Win-rate change | Approx. 95% interval |
|---|---|---|---|---|
| baseline | random | greedy | -42.5 pp | -59.5 to -25.5 pp |
| baseline | spender | greedy | -7.5 pp | -23.8 to 8.8 pp |
| baseline | rollout | greedy | 10.0 pp | -10.8 to 30.8 pp |

## Limits

- Agent policies are not human skill estimates.
- Only visible information reaches policies; rollout samples use independent RNG.
- Matched seeds start equally, but streams diverge after different actions.
- Confidence intervals describe seed sampling under these fixed policies.
- No purchases or future content are simulated before those mechanics exist.
- Pacing is reported in moves/actions/waves, not unmeasured human minutes.

Censored runs are retained in the denominator and are not counted as wins. Any nonzero censorship or resolution ceiling needs investigation before drawing balance conclusions. Sensitivity results are screening evidence, not automatic tuning instructions; confirm changes on held-out seeds.
