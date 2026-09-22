# Whole-game modelling

The model runs the production `engine.mjs` from the initial board to a win or loss. It does not approximate the rules with a score formula. Current scope includes every implemented mechanical system. Passives and face modification do not exist yet; additions must extend the model as part of the same change.

## Commands

```sh
npm test
npm run simulate:smoke
npm run simulate -- --runs 250 --samples 6
npm run simulate:sweep
# Confirm a candidate on an independent seed range:
npm run simulate -- --scenarios baseline,coin-rate-5 --policies greedy,spender,rollout --runs 500 --samples 8 --seed-start 100001 --out modelling/results/held-out
# Verify a stored run against the exact engine:
node modelling/cli.mjs --replay modelling/results/token-packs/baseline-greedy-win.trace.json
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

## Policies

- **Random:** chooses uniformly among legal swaps, including specials. Buys an affordable pack, picks tokens randomly, never rerolls. A weak baseline.
- **Greedy:** takes the largest guaranteed first-wave score including visible special chains. Buys affordable assorted packs and uses fixed visible token priorities; never rerolls.
- **Spender:** greedy moves; when affordable, rerolls immediately. Samples all 25 areas and chooses using expected immediate gain plus the next board's visible opportunity. This is an intentionally aggressive economy control.
- **Rollout:** independently samples complete cascades for every legal swap, adds a discounted next-board opportunity and a coin shadow price; rerolls when estimated gain plus setup exceeds retaining the current move and coin value. This is a heuristic planner, not an optimal or human-equivalent agent.

The observation API excludes actual run RNG, seed and future state. Samples use a separate policy random stream and common samples across candidate actions. The default six samples per candidate is inexpensive and noisy; increase it to assess policy sensitivity. Two policies can legitimately rank differently with other sample counts, and a more elaborate heuristic is not guaranteed to outperform greedy.

A run can spend coins multiple times and carry them between rounds. It cannot buy a reroll after the final move has already lost the round, matching the playable game. Different actions consume different random draws; matched starting seeds do not promise identical subsequent boards.

## Sensitivity suite

Twenty-two configurations include baseline, no specials, doubled specials, no low bonus, no cascade bonus, increased coin spawns, cheaper rerolls, eight/twelve moves, targets ±20%, and individual removal of each special type. All use the same production engine, including configurable rule values returned by `rulesFor`. Pack cost, round reward and token boost scenarios exercise progression; per-type ablations disable that token type.

Paired comparisons show win-rate changes, gained/lost wins and approximate paired intervals. These are screening results. Multiple comparisons, small samples, noisy planners and policy bias can produce misleading winners. Confirm a proposed change on held-out seeds and a real playtest; do not tune directly against the baseline seeds indefinitely.

Score conservation and coin conservation are enforced on every simulated run. Censored runs stay in the overall denominator and are not counted as wins; investigate any nonzero action ceiling or cascade ceiling before interpreting the results. Every example trace is replayed before the report is saved.

## Interpretation

Good balance needs more than a chosen win rate. Check whether strategies differ, whether low pips have a useful role, how much score comes from random cascades versus chosen matches, whether specials can dominate, whether the coin action is actually available, and where runs fail. Quantiles reveal rare explosions hidden by averages. Action/wave counts describe mechanical pacing; they cannot establish how many minutes a human run lasts.


## Playtest 04: additive Mult and token progression

Current report: [token-packs/report.md](results/token-packs/report.md). The test matrix uses held-out seeds 1001–1020 after a small design pilot; twenty runs per policy, including random, greedy, spender and rollout. Confidence intervals are deliberately shown because these are small samples. The target ladder increased after the initial goals were clearing in one or two late-round swaps.

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

Earlier reports are historical. The 0.4 engine is required to replay the current traces.
