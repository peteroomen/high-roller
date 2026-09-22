# High Roller — full-run model

12 runs per scenario/policy; seeds 5001–5012; 2 independent samples per rollout candidate.

Engine SHA-256: `823a570e1d9e1bf4b47b6b9cff347440131335ea61cd7406ff64e9ab273d67d1`. Model SHA-256: `c20709ee0db3b1a038f44c119571b64bba64d27c90618f4e7233196804525c4b`.

| Scenario | Policy | Run wins (95% CI) | R1 clear | R2 clear | R3 clear | R4 clear | R5 clear | R6 clear | R7 clear | R8 clear | R9 clear | Runs using reroll | Censored |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| baseline | spender | 41.7% (19.3%–68.0%) | 100.0% | 91.7% | 91.7% | 91.7% | 75.0% | 75.0% | 50.0% | 41.7% | 41.7% | 100.0% | 0 |
| baseline | rollout | 91.7% (64.6%–98.5%) | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 100.0% | 91.7% | 91.7% | 0 |

Round clear rates above use all starting runs as the denominator. Conditional rates and score deficits are in summary.json.

## baseline

### spender

- Mean 83.58 actions/run; 1.16 waves/board action; p99 4, maximum 4.
- 140 rerolls, 111 without an immediate match; 877 coins earned, 856 spent.
- Score shares: match levels 7.2%, trinket pips 29.2%, trinket Mult 7.8%, match base 15.7%, special base 32.1%, cascade bonus 6.0%, low-pip bonus 2.0%.
- 48 packs purchased for 231 coins; 471 coins in round payouts; token picks: column 0, color 0, number 40, bomb 41, coin 48, row 0.
- 41 trinkets purchased for 205 coins; 525 trinket triggers. Numbered tokens: {"3":13,"4":12,"5":2,"6":0}.
- 330 special swaps. 4877 pip flights and 1788 Mult flights; mean 315.35 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 1 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 0 | 0 | 0 |
| color | 0 | 0 | 0 |
| number | 408 | 274 | 208 |
| bomb | 417 | 319 | 143 |
| coin | 600 | 400 | 271 |
| row | 0 | 0 | 0 |
### rollout

- Mean 82.08 actions/run; 1.70 waves/board action; p99 4, maximum 5.
- 28 rerolls, 24 without an immediate match; 646 coins earned, 633 spent.
- Score shares: match levels 10.9%, trinket pips 23.1%, trinket Mult 8.0%, match base 14.3%, special base 34.5%, cascade bonus 7.2%, low-pip bonus 2.0%.
- 64 packs purchased for 304 coins; 644 coins in round payouts; token picks: column 32, color 0, number 49, bomb 47, coin 0, row 28.
- 49 trinkets purchased for 245 coins; 607 trinket triggers. Numbered tokens: {"3":22,"4":19,"5":7,"6":0}.
- 388 special swaps. 6214 pip flights and 2294 Mult flights; mean 391.08 seconds of nominal scoring animation per run (excludes decision time, falls, pauses and device frame time).
- 0 dead-board shuffles; 0 resolution ceilings.

| Special | Spawned | Triggered | Triggered by another special |
|---|---:|---:|---:|
| column | 453 | 311 | 205 |
| color | 0 | 0 | 0 |
| number | 646 | 424 | 321 |
| bomb | 594 | 418 | 264 |
| coin | 0 | 0 | 0 |
| row | 353 | 244 | 159 |

## Limits

- Agent policies are not human skill estimates.
- Only visible information reaches policies; rollout samples use independent RNG.
- Matched seeds start equally, but streams diverge after different actions.
- Confidence intervals describe seed sampling under these fixed policies.
- Starter drafts, pack purchases, token choices, payouts and match upgrades, trinkets and nine-round progression are simulated using the production engine.
- Nominal scoring animation uses the same event plan and timings as the UI; decision time, falls, pauses and frame time are excluded.
- Pip-trinket score is allocated first at final Mult; Mult sources then use dice pips. Attribution is accounting, not causal lift.

Censored runs are retained in the denominator and are not counted as wins. Any nonzero censorship or resolution ceiling needs investigation before drawing balance conclusions. Sensitivity results are screening evidence, not automatic tuning instructions; confirm changes on held-out seeds.

Final engine replay verification: 4 example traces passed with SHA-256 `4f2704653748acd1a114e2fe57845aae01101a7cbd4a6faf385af30bc46584ae`. The post-simulation change only preserves pre-0.5 save rules during migration.
