# High Roller — full-run model

60 runs per scenario/policy; seeds 5001–5060; 1 independent samples per rollout candidate.

Engine SHA-256: `823a570e1d9e1bf4b47b6b9cff347440131335ea61cd7406ff64e9ab273d67d1`. Model SHA-256: `c20709ee0db3b1a038f44c119571b64bba64d27c90618f4e7233196804525c4b`.

| Scenario | Policy | Run wins (95% CI) | R1 clear | R2 clear | R3 clear | R4 clear | R5 clear | R6 clear | R7 clear | R8 clear | R9 clear | Runs using reroll | Censored |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| baseline | random | 0.0% (0.0%–6.0%) | 98.3% | 83.3% | 56.7% | 35.0% | 18.3% | 6.7% | 1.7% | 0.0% | 0.0% | 0.0% | 0 |
| baseline | greedy | 63.3% (50.7%–74.4%) | 100.0% | 100.0% | 96.7% | 96.7% | 91.7% | 86.7% | 73.3% | 68.3% | 63.3% | 0.0% | 0 |
| baseline | builder | 46.7% (34.6%–59.1%) | 100.0% | 98.3% | 93.3% | 86.7% | 75.0% | 71.7% | 63.3% | 53.3% | 46.7% | 0.0% | 0 |
| baseline | specialist | 81.7% (70.1%–89.4%) | 100.0% | 100.0% | 98.3% | 98.3% | 98.3% | 96.7% | 96.7% | 90.0% | 81.7% | 0.0% | 0 |

Round clear rates above use all starting runs as the denominator. Conditional rates and score deficits are in summary.json.

## baseline

### random

- Mean 40.43 actions/run; 1.38 waves/board action; p99 4, maximum 5.
- 0 rerolls, 0 without an immediate match; 1294 coins earned, 1152 spent.
- Score shares: match levels 12.1%, trinket pips 23.2%, trinket Mult 8.2%, match base 29.7%, special base 11.4%, cascade bonus 11.9%, low-pip bonus 3.5%.
- 75 packs purchased for 337 coins; 1142 coins in round payouts; token picks: column 34, color 13, number 32, bomb 34, coin 28, row 30.
- 163 trinkets purchased for 815 coins; 798 trinket triggers. Numbered tokens: {"3":32,"4":25,"5":28,"6":29}.
- 471 special swaps. 8564 pip flights and 2783 Mult flights; mean 120.80 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 6 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 158 | 118 | 13 |
| color | 31 | 24 | 6 |
| number | 163 | 118 | 23 |
| bomb | 176 | 130 | 31 |
| coin | 154 | 102 | 27 |
| row | 155 | 116 | 24 |
### greedy

- Mean 78.60 actions/run; 1.48 waves/board action; p99 4, maximum 6.
- 0 rerolls, 0 without an immediate match; 2897 coins earned, 2740 spent.
- Score shares: match levels 12.8%, trinket pips 26.0%, trinket Mult 6.8%, match base 12.6%, special base 34.9%, cascade bonus 5.0%, low-pip bonus 1.9%.
- 312 packs purchased for 1465 coins; 2841 coins in round payouts; token picks: column 156, color 0, number 206, bomb 201, coin 0, row 148.
- 255 trinkets purchased for 1275 coins; 2857 trinket triggers. Numbered tokens: {"3":147,"4":111,"5":27,"6":0}.
- 1637 special swaps. 27450 pip flights and 10052 Mult flights; mean 342.26 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 1 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 1829 | 1328 | 853 |
| color | 0 | 0 | 0 |
| number | 2643 | 1755 | 1366 |
| bomb | 2315 | 1679 | 1058 |
| coin | 0 | 0 | 0 |
| row | 1746 | 1314 | 843 |
### builder

- Mean 68.03 actions/run; 1.40 waves/board action; p99 4, maximum 7.
- 0 rerolls, 0 without an immediate match; 2618 coins earned, 2172 spent.
- Score shares: match levels 21.8%, trinket pips 55.8%, trinket Mult 7.1%, match base 9.9%, special base 1.1%, cascade bonus 3.2%, low-pip bonus 1.2%.
- 213 packs purchased for 852 coins; 2556 coins in round payouts; token picks: column 3, color 0, number 34, bomb 18, coin 0, row 5.
- 264 trinkets purchased for 1320 coins; 4661 trinket triggers. Numbered tokens: {"3":297,"4":253,"5":89,"6":0}.
- 223 special swaps. 13828 pip flights and 5798 Mult flights; mean 215.43 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 8 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 22 | 9 | 1 |
| color | 0 | 0 | 0 |
| number | 278 | 134 | 0 |
| bomb | 180 | 93 | 17 |
| coin | 0 | 0 | 0 |
| row | 36 | 10 | 1 |
### specialist

- Mean 86.65 actions/run; 1.45 waves/board action; p99 3, maximum 6.
- 0 rerolls, 0 without an immediate match; 3094 coins earned, 2165 spent.
- Score shares: match levels 13.3%, trinket pips 0.0%, trinket Mult 0.0%, match base 10.7%, special base 69.8%, cascade bonus 4.6%, low-pip bonus 1.6%.
- 467 packs purchased for 2165 coins; 3094 coins in round payouts; token picks: column 179, color 0, number 280, bomb 263, coin 0, row 170.
- 0 trinkets purchased for 0 coins; 0 trinket triggers. Numbered tokens: {"3":243,"4":196,"5":71,"6":0}.
- 2165 special swaps. 35112 pip flights and 14363 Mult flights; mean 424.69 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 1 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 3334 | 2600 | 1938 |
| color | 0 | 0 | 0 |
| number | 5123 | 3664 | 3269 |
| bomb | 4765 | 3716 | 2707 |
| coin | 0 | 0 | 0 |
| row | 3234 | 2518 | 1800 |

## Paired comparisons

| Scenario | Policy | Comparator | Win-rate change | Approx. 95% interval |
|---|---|---|---|---|
| baseline | random | greedy | -63.3 pp | -75.6 to -51.0 pp |
| baseline | builder | greedy | -16.7 pp | -35.4 to 2.1 pp |
| baseline | specialist | greedy | 18.3 pp | 3.2 to 33.4 pp |

## Limits

- Agent policies are not human skill estimates.
- Only visible information reaches policies; rollout samples use independent RNG.
- Matched seeds start equally, but streams diverge after different actions.
- Confidence intervals describe seed sampling under these fixed policies.
- Starter drafts, pack purchases, token choices, payouts and match upgrades, trinkets and nine-round progression are simulated using the production engine.
- Nominal scoring animation uses the same event plan and timings as the UI; decision time, falls, pauses and frame time are excluded.
- Pip-trinket score is allocated first at final Mult; Mult sources then use dice pips. Attribution is accounting, not causal lift.

Censored runs are retained in the denominator and are not counted as wins. Any nonzero censorship or resolution ceiling needs investigation before drawing balance conclusions. Sensitivity results are screening evidence, not automatic tuning instructions; confirm changes on held-out seeds.

Final engine replay verification: 7 example traces passed with SHA-256 `4f2704653748acd1a114e2fe57845aae01101a7cbd4a6faf385af30bc46584ae`. The post-simulation change only preserves pre-0.5 save rules during migration.
