# Whole-game modelling

The model runs the production `engine.mjs` from the initial board to a win or loss. It does not approximate the rules with a score formula. Current scope includes every implemented mechanical system, including match levels, trinkets and shops. Face modification does not exist. Additions must extend the model as part of the same change.

## Commands

```sh
npm test
npm run simulate:smoke
npm run simulate -- --runs 250 --samples 6
npm run simulate:sweep
# Confirm a candidate on an independent seed range:
npm run simulate -- --scenarios baseline,coin-rate-5 --policies greedy,spender,rollout --runs 500 --samples 8 --seed-start 100001 --out modelling/results/held-out
# Verify a stored run against the exact engine:
node modelling/cli.mjs --replay modelling/results/stages-held-out/baseline-greedy-win.trace.json
```

The CLI writes summary JSON, a Markdown report, CSV/JSONL run-level data, and example win/loss traces for each cell. Traces include before/after state fingerprints and accepted actions. Reports include engine/model hashes, Node version, commit, seed interval, sample counts and full rule configurations. Timestamps vary; seeded game outcomes do not.

## Coverage contract

| System                                   | Authoritative engine path       | Model coverage / metrics                                                                            |
| ---------------------------------------- | ------------------------------- | --------------------------------------------------------------------------------------------------- |
| Initial board, colour/number supply      | `newGame`, `freshBoard`, `die`  | Actual generated board, visible special spawns, deterministic seeds                                 |
| Adjacent swaps and legal-move search     | `adjacent`, `legalActions`, `act` | All legal ordinary matches and special swaps available to policies; invalid actions fail a model run                             |
| Horizontal/vertical matches and overlaps | `matches`, `wave`               | Group-size frequencies, pip-value frequencies, no duplicate clears                                  |
| Pips and multipliers                     | `wave`                          | Move-wide total pips × additive Mult, exact point attribution by Mult source                 |
| Falling, refills and cascades            | `collapse`, `act`               | Full resolution, depth histograms, mean/tail/max waves, new special spawns                          |
| Column, row, special sweep, number, bomb             | `effect`, `wave`                | Spawn/trigger counts by type; activations caused by other specials; blast scoring                   |
| Coins                                    | `wave`, `act`                   | Coins earned/spent/remaining, round-level economy, affordability                                    |
| 2×2 rerolls                              | `act`                           | All 25 distinct areas; budget, score, zero-match frequency, saved moves                             |
| Dead boards                              | `reshuffle`                     | Actual free reshuffles and event count                                                              |
| Round targets, moves, carry-over         | `act`, `nextRound`              | All rounds, conditional and unconditional clear rates, score deficits, overshoot, spare moves       |
| Run failure and victory                  | `act`                           | Full-run win rate with Wilson 95% intervals and sample counts                                       |
| Save/reload                              | JSON state and action replay    | Deterministic continuation and before/after fingerprints                                            |
| Safety ceilings                          | `act`, runner action budget     | Resolution-cap events and explicit censored-run counts                                              |
| Presentation duration                    | `presentation.mjs`               | Pip/Mult flights and nominal normal-speed scoring duration; decision time and device frame time excluded |

Per-type trigger counts are descriptive exposure measurements, not causal lift. Ablation scenarios (remove one type) measure system-level differences. Initial board rejection conditions mean initial visible face frequencies need not equal unconditioned refill frequencies.

## Playtest 05 coverage

| System | Shared engine / presentation | Telemetry and checks |
|---|---|---|
| Numbered tokens | `buy_pack`, `choose_token`, `matchMult` | Per-tier picks, numbered pack cost, exact selected-tier stacking, duplicate numbered offers, partial-save resume |
| Match tier lookup | `tierFor`, `wave` | Exact 3/4/5 and 6+ tier; intersections merge; special footprints excluded |
| Eight trinkets | `wave`, `trinketValue` | Per-item triggers and bonus amounts, per-group/cascade ownership, pip/Mult accounting; every item has a starting-item scenario |
| Trinket shop and inventory | `buy_trinket`, `sell_trinket` | Purchases, sales, coin spending/income, four slots, no duplicates or repeated sales; policies can replace rare-tier items |
| Three stages / nine rounds | `stageInfo`, `act` | All intermediate reaches/clears, targets, deficits, overshoots, moves and economy; full nine-round replay test |
| Weaker special tokens | `canTakeToken` | +2 percentage points, 30% total cap; 1/3/5-point sensitivity scenarios |
| Combined group scoring | `scoringPlan`, `pacing` | One group Mult flight; individual trinket flights; shorter pip holds; exact counters match engine results |
| Save migration | `restoreGame` | New fields; old goals/rules retained; legacy high-rate partial pack remains completable |

Current reports: [held-out](results/stages-held-out/report.md), [planning policies](results/stages-planners/report.md), [sensitivity](results/stages-sensitivity/report.md). [Balance decisions and limitations](../docs/playtest-05-balance.md).

## Policies

- **Random:** uniform legal swaps, random token and pack picks, random available trinket picks; never rerolls. A weak baseline.
- **Greedy:** largest guaranteed first-wave score including current tier upgrades, trinkets and visible special chains. Mixed shopping: assorted packs until 24% special chance, then numbered packs. Buys affordable trinkets before a pack in alternating shops, or after the pack; prefers common match tiers. Never rerolls.
- **Spender:** greedy moves; when affordable, rerolls immediately. Samples all 25 areas and chooses using expected immediate gain plus the next board's visible opportunity. This is an intentionally aggressive economy control.
- **Rollout:** independently samples complete cascades for every legal swap, adds a discounted next-board opportunity and a coin shadow price; rerolls when estimated gain plus setup exceeds retaining the current move and coin value. This is a heuristic planner, not an optimal or human-equivalent agent.

- **Builder:** greedy board moves, prioritises trinkets then numbered packs; keeps only its starter special rate when those packs remain available. This is a deliberately match-focused economy.
- **Specialist:** greedy board moves, buys special packs to the cap then numbered packs. Never buys trinkets or rerolls. This is a specials-first control, not a pure-special-only build.

Nonrandom token priorities favour tiers 3 then 4 then 5 then 6+, and Number/Bomb/line specials (Spender favours Coin). Non-specialists can sell a higher-tier trinket when full to afford an offered lower-tier replacement. These finite heuristics are part of the experiment.

The observation API excludes actual run RNG, seed and future state. Samples use a separate policy random stream and common samples across candidate actions. The default six samples per candidate is inexpensive and noisy; increase it to assess policy sensitivity. Two policies can legitimately rank differently with other sample counts, and a more elaborate heuristic is not guaranteed to outperform greedy.

A run can spend coins multiple times and carry them between rounds. It cannot buy a reroll after the final move has already lost the round, matching the playable game. Different actions consume different random draws; matched starting seeds do not promise identical subsequent boards.

## Sensitivity suite

The scenario catalogue includes baseline, no specials, doubled specials, no low bonus, no cascade bonus, increased coin spawns, cheaper rerolls, eight/twelve moves, targets ±20%, and individual removal of each special type. All use the same production engine, including configurable rule values returned by `rulesFor`. Pack and trinket cost, round reward and token boost scenarios exercise progression; per-type ablations disable that token type. New scenarios cover no upgrades, no trinkets, half/double bonuses and every starting trinket.

Paired comparisons show win-rate changes, gained/lost wins and approximate paired intervals. These are screening results. Multiple comparisons, small samples, noisy planners and policy bias can produce misleading winners. Confirm a proposed change on held-out seeds and a real playtest; do not tune directly against the baseline seeds indefinitely.

Score conservation and coin conservation are enforced on every simulated run. Censored runs stay in the overall denominator and are not counted as wins; investigate any nonzero action ceiling or cascade ceiling before interpreting the results. Every example trace is replayed before the report is saved.

## Interpretation

Good balance needs more than a chosen win rate. Check whether strategies differ, whether low pips have a useful role, how much score comes from random cascades versus chosen matches, whether specials can dominate, whether the coin action is actually available, and where runs fail. Quantiles reveal rare explosions hidden by averages. Action/wave counts describe mechanical pacing; they cannot establish how many minutes a human run lasts.


## Historical Playtest 04: additive Mult and token progression

Historical report: [token-packs/report.md](results/token-packs/report.md). The test matrix uses held-out seeds 1001–1020 after a small design pilot; twenty runs per policy, including random, greedy, spender and rollout. Confidence intervals are deliberately shown because these are small samples. The target ladder increased after the initial goals were clearing in one or two late-round swaps.

All move pips are counted once, and all match/special Mult is added across the full cascade. The attribution identity is `movePips × sum(groupMult)`. Reported match/special/cascade/low point shares attribute points to the source of **Mult**, not ownership of the affected pip. Frame scores are increments in the running product and sum exactly to the final move score. Group entry scores attribute the final product by Mult contribution, and need not equal the incremental score of their animation frame.

| New system | Engine actions | Telemetry and checks |
|---|---|---|
| Starter draft | `choose_token` | Three distinct offers, one free pick, rates initially zero; no standalone Special sweep starter |
| Token stacking | `choose_token`, `canTakeToken` | Per-type picks, +5 percentage points, type/total caps, disabled-type ablations |
| Round payout | `visit_shop` | Shop visits, payout amount, no repeated claims |
| Foil packs | `buy_pack`, `choose_token` | Purchases, coin spending, five distinct offers, exactly three picks, no duplicate picks or repeat purchases |
| Next round | `next_round` | Six-round reach/clear rates, score deficits, moves used, persistent token rates and coins |
| Save/replay | Every accepted action | Partial draft resume, original configuration, fingerprints including tokens/draft/shop/rates |
| Presentation | `scoringPlan`, `pacing` | Outline first, accelerating pip beats, additive group beats, pop/clear last; shared timing constants |

Policies see only visible draft offers, tokens, shop availability, rules and board. Sealed pack contents and true RNG state are absent. Nonrandom token priorities prefer Number/Bomb/line clears; Spender favours Coin. Policies buy one affordable pack per shop; they may skip only for affordability or caps. These are explicit limited strategies, not optimal drafting or spending. The cached rollout previews reuse identical visible boards within a single decision, with the same fixed rules; no future stream is exposed.

Coin conservation includes both round payouts and Coin specials, subtracting both rerolls and packs. Score conservation includes all cross-group and cross-wave Mult contributions. Actions include progression choices; waves and scores per board action exclude those menu choices. Action-cap runs remain explicitly censored.

The 0.4 engine is required to replay the historical Playtest 04 traces.


## Playtest 05 accounting and reproducibility

Conservation uses a fixed attribution order: allocate `trinket bonus pips × final move Mult` to pip trinkets, then allocate `ordinary dice pips × each Mult source` to base matches, specials, levels, low bonus, cascade and Mult trinkets. The parts sum exactly to the banked move score. This allocation assigns cross-terms once; it is not causal lift. Raw `trinketTriggers` and `trinketBonuses` also expose actual item activity. Entry scores in the gameplay ledger retain final move-pip attribution by Mult, so they sum to the same total via a different partition.

Round records include stage number. Purchases, sales, token picks, draft/round transitions and board actions all appear in accepted-action traces. State fingerprints include configuration (levels and trinkets), rates, inventory offers, sold stock and partial draft picks. Max 400 actions; capped runs remain censored. The runner avoids double-recording a cleared round when an action cap falls inside its shop.

The final validation has 264 held-out runs and 408 sensitivity runs. No censored runs, resolution ceilings, score errors or coin errors occurred. Confidence intervals and sample sizes remain in the reports. Six-plus triggers remain sparse; targeted unit fixtures cover merged 7/11-die groups, but those do not establish empirical frequency or player value.

The 78 final-model example traces were replayed with the final engine after a migration-only safeguard. Summary JSON preserves the original `engineHash` and records the final `verifiedEngineHash`; gameplay and policy semantics did not change between them. Pilot reports retain hashes of intermediate development code and preserve configurations, summaries and CSV data for interpreting the tuning sequence. The release replay examples are in the final held-out and sensitivity folders.
