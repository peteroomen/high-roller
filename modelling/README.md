# Whole-game modelling

The model runs the production `engine.mjs` from the initial board to a win or loss. It does not approximate the rules with a score formula. Current scope includes every implemented mechanical system. Passives, tokens, shops and face modification do not exist yet; additions must extend the model as part of the same change.

## Commands

```sh
npm test
npm run simulate:smoke
npm run simulate -- --runs 250 --samples 6
npm run simulate:sweep
# Confirm a candidate on an independent seed range:
npm run simulate -- --scenarios baseline,coin-rate-5 --policies greedy,spender,rollout --runs 500 --samples 8 --seed-start 100001 --out modelling/results/held-out
# Verify a stored run against the exact engine:
node modelling/cli.mjs --replay modelling/results/swap-specials/baseline-greedy-win.trace.json
```

The CLI writes summary JSON, a Markdown report, CSV/JSONL run-level data, and example win/loss traces for each cell. Traces include before/after state fingerprints and accepted actions. Reports include engine/model hashes, Node version, commit, seed interval, sample counts and full rule configurations. Timestamps vary; seeded game outcomes do not.

## Coverage contract

| System                                   | Authoritative engine path       | Model coverage / metrics                                                                            |
| ---------------------------------------- | ------------------------------- | --------------------------------------------------------------------------------------------------- |
| Initial board, colour/number supply      | `newGame`, `freshBoard`, `die`  | Actual generated board, visible special spawns, deterministic seeds                                 |
| Adjacent swaps and legal-move search     | `adjacent`, `legalMoves`, `act` | All legal matches and special swaps available to policies; invalid actions fail a model run                             |
| Horizontal/vertical matches and overlaps | `matches`, `wave`               | Group-size frequencies, pip-value frequencies, no duplicate clears                                  |
| Pips and multipliers                     | `wave`                          | Exact accounting split into match base, blast base, cascade bonus and low-pip bonus                 |
| Falling, refills and cascades            | `collapse`, `act`               | Full resolution, depth histograms, mean/tail/max waves, new special spawns                          |
| Column, special sweep, number, bomb             | `effect`, `wave`                | Spawn/trigger counts by type; activations caused by other specials; blast scoring                   |
| Coins                                    | `wave`, `act`                   | Coins earned/spent/remaining, round-level economy, affordability                                    |
| 2×2 rerolls                              | `act`                           | All 25 distinct areas; budget, score, zero-match frequency, saved moves                             |
| Dead boards                              | `reshuffle`                     | Actual free reshuffles and event count                                                              |
| Round targets, moves, carry-over         | `act`, `nextRound`              | All rounds, conditional and unconditional clear rates, score deficits, overshoot, spare moves       |
| Run failure and victory                  | `act`                           | Full-run win rate with Wilson 95% intervals and sample counts                                       |
| Save/reload                              | JSON state and action replay    | Deterministic continuation and before/after fingerprints                                            |
| Safety ceilings                          | `act`, runner action budget     | Resolution-cap events and explicit censored-run counts                                              |
| Presentation duration                    | UI animation sequence           | Actions/waves measured; human decision time and real-device frame time remain playtest measurements |

Per-type trigger counts are descriptive exposure measurements, not causal lift. Ablation scenarios (remove one type) measure system-level differences. Initial board rejection conditions mean initial visible face frequencies need not equal unconditioned refill frequencies.

## Policies

- **Random:** chooses uniformly among legal swaps. No coin spending. A weak baseline.
- **Greedy:** takes the largest guaranteed first-wave score including visible special chains. No coin spending. This isolates the match-selection baseline.
- **Spender:** greedy swaps; when affordable, rerolls immediately. Samples all 25 areas and chooses using expected immediate gain plus the next board's visible opportunity. This is an intentionally aggressive economy control.
- **Rollout:** independently samples complete cascades for every legal swap, adds a discounted next-board opportunity and a coin shadow price; rerolls when estimated gain plus setup exceeds retaining the current move and coin value. This is a heuristic planner, not an optimal or human-equivalent agent.

The observation API excludes actual run RNG, seed and future state. Samples use a separate policy random stream and common samples across candidate actions. The default six samples per candidate is inexpensive and noisy; increase it to assess policy sensitivity. Two policies can legitimately rank differently with other sample counts, and a more elaborate heuristic is not guaranteed to outperform greedy.

A run can spend coins multiple times and carry them between rounds. It cannot buy a reroll after the final move has already lost the round, matching the playable game. Different actions consume different random draws; matched starting seeds do not promise identical subsequent boards.

## Sensitivity suite

Eighteen configurations include baseline, no specials, doubled specials, no low bonus, no cascade bonus, increased coin spawns, cheaper rerolls, eight/twelve moves, targets ±20%, and individual removal of each special type. All use the same production engine, including configurable rule values returned by `rulesFor`.

Paired comparisons show win-rate changes, gained/lost wins and approximate paired intervals. These are screening results. Multiple comparisons, small samples, noisy planners and policy bias can produce misleading winners. Confirm a proposed change on held-out seeds and a real playtest; do not tune directly against the baseline seeds indefinitely.

Score conservation and coin conservation are enforced on every simulated run. Censored runs stay in the overall denominator and are not counted as wins; investigate any nonzero action ceiling or cascade ceiling before interpreting the results. Every example trace is replayed before the report is saved.

## Interpretation

Good balance needs more than a chosen win rate. Check whether strategies differ, whether low pips have a useful role, how much score comes from random cascades versus chosen matches, whether specials can dominate, whether the coin action is actually available, and where runs fail. Quantiles reveal rare explosions hidden by averages. Action/wave counts describe mechanical pacing; they cannot establish how many minutes a human run lasts.

## Bone dice (0.1.2)

The `color` special type now sweeps all special dice. It is exercised by all policies and the existing `without-color` ablation; trigger/chain metrics retain that key for compatibility. Colour-board baseline/sensitivity reports are historical. Historical bone-dice results are in `results/bone/`; source hashes distinguish the rule versions.

## Symbol-only specials (0.2.0)

Current output: `results/swap-specials/`. Legal-move enumeration includes any adjacent special swap; all four policies evaluate the exact first wave, including the destination effect, swapped neighbour, special combinations and carried multipliers. Specials have null pip values and break matching runs. Numbered colours are determined by pip value and rerolls preserve that relationship. Initial generation and save migration maintain these invariants.

`specialSwapActions` records decisions using a special. Activation metadata distinguishes direct swaps from chains; per-type `specialScore` attributes scored dice to their winning effect. Overlap ownership uses the highest Mult with deterministic ties, and every run still enforces score/coin conservation and replay. `blastBase` now includes the full carried special multiplier (the report labels it special base). Cascade and low-pip bonuses remain separate. The new `special-mult-1` and `special-mult-3` scenarios compare against the default ×2. No human win-rate inference is made from these agents.
