# Whole-game modelling

The playable game and simulator use the same authoritative `engine.mjs`. Every mechanical addition needs a deterministic test, measurable telemetry and a scenario/policy that exercises it. Presentation timing also comes from the UI's `presentation.mjs`.

```sh
npm test
npm run simulate:smoke
npm run simulate -- --runs 250 --samples 6
npm run simulate:sweep
node modelling/cli.mjs --scenarios baseline --policies greedy,builder --runs 500 --seed-start 100001 --out modelling/results/next-held-out
node modelling/cli.mjs --replay modelling/results/expansion-held-out/baseline-greedy-win.trace.json
```

Outputs: summary JSON, Markdown report, per-run CSV/JSONL and example win/loss traces. Metadata includes engine/model SHA-256, configuration, Node version, seed range, samples and base commit. The source hashes identify uncommitted experimental code; the base commit alone does not identify that code. Example traces replay before report saving. Historical reports require their historical engines.

## Coverage

| System | Authoritative paths | Measurements / verification |
|---|---|---|
| Supply and starting board | `die`, `freshBoard`, `rollFace` | Number/finish/special supply, rejection of prematches, playable boards, seeded replay |
| Swaps and matches | `legalActions`, `matches`, `act` | All visible legal moves, intersections, Wild identity consistency, invalid-swap rejection |
| Special footprints | `effect`, `wave` | Type spawns/activations/chains, excluded partner, footprint clipping, intrinsic 0/5/10-pip scenarios |
| Twenty / Wild | `swapRoots`, `matches`, `wave` | Conditional collection, no free activation, pip values, `wildClears` and targeted exposure scenarios |
| Gold / Shiny | `die`, `wave` | Gold spawns/matches, coins, Shiny spawns/matches, unique natural-match rewards, multiplicative ordering |
| Eight tier trinkets | `wave` | Per-item trigger/amount, each tier's starting-item scenario, connected 6+ groups |
| Eight new trinkets | `rollFace`, `effect`, `wave`, `act` | Conversion counts, bonuses and footprint triggers; every item has a starting-item scenario; ones/blast/Shiny builds |
| Full-move score | `wave`, `act`, `applyBonus` | Cumulative pips/Mult, once-only Spectrum/Loaded Die, decimal rounding, exact score conservation |
| Falling/cascades | `collapse`, `act` | Actual refills, depth histogram and tails, resolution ceiling |
| Rerolls/dead boards | `act`, `reshuffle` | All 25 areas, budget, setup/zero-match rerolls, actual free shuffles |
| Tokens/packs | `buy_pack`, `choose_token` | Three distinct offers, one pick, weighted rarity, uncapped 1% rates and normalization beyond 100 |
| Shop/inventory | `buy_trinket`, `sell_trinket` | Variable prices, four slots, duplicates, sold stock, purchases/sales/affordability |
| Nine rounds | `act`, `visit_shop`, `next_round` | Reach/clear rates, failures/deficits, overshoot, moves, stage and round economy, final payout |
| Save and presentation | `restoreGame`, `scoringPlan`, `pacing` | Coin migration, accepted-action replay, fingerprints, per-die and per-group flights, exact animation totals |

`faceConversions` counts generated/rerolled sixes converted to ones, including rejected starting-face candidates and the preliminary face draw of a symbol die. It measures conversion operations, not visible converted dice. Visible converted dice retain a `converted` flag for red-overwrite artwork, without changing RNG consumption or scoring. Special `Blast activations` exclude naturally matched Wilds and Shiny finishes, which have dedicated metrics. Initial-board rejection means observed starting frequencies differ from raw refill probabilities.

## Policies

Policies receive visible board, inventory, offers, rules, score, moves and coins. No actual seed, RNG state, future dice or sealed packs reach them. Planning uses an independent policy RNG and common samples across candidates.

- Random: random legal swaps and purchases, no rerolls.
- Greedy: largest guaranteed first-wave score, including bonuses and finishes. Alternates special/numbered packs; buys and replaces ranked trinkets.
- Builder: greedy moves, prioritizes trinkets and numbered packs.
- Specialist: greedy moves, buys special packs only, no trinkets/rerolls. Deliberately incomplete build control.
- Spender: samples all reroll areas and aggressively spends available coins; useful economy control.
- Rollout: independent sampled cascades, discounted next-board opportunity and coin shadow price; considers paid rerolls.

Heuristics prefer common match tiers, Wild/Shiny/Number/Bomb, Loaded Die and the conversion/ones synergy. They avoid Spectrum with conversion. This preference limits inference about rejected items, especially Twenty and Special Sweep. No policy is optimal or a human-skill estimate. Matched seeds share a start; different decisions lead to different RNG consumption and future boards.

## Accounting and limits

Frame scores are increments in `floor(cumulative pips × running Mult)`. Groups and bonuses apply in the same order as presentation. Score attribution first assigns `trinket bonus pips × raw additive Mult` to pip trinkets; other additive sources use dice pips. Remaining points are multiplicative lift, including rounding. This partition conserves score but is not causal contribution. Group ledger entries alone no longer sum to the final score when global/multiplicative bonuses exist; the ledger includes those bonuses separately.

Gold income, all round payouts (including victory), sales, rerolls and purchases conserve coins. Every simulated run asserts both identities. The runner limits 400 accepted actions and the engine 80 waves. Censored runs remain in the denominator, are not wins, and must be investigated. Wilson intervals quantify sampling uncertainty under fixed bots; paired comparisons are screening evidence, with multiple-comparison and heuristic bias.

Nominal scoring time counts shared animation events. It excludes human decisions, swap/fall animations, pauses and device frame time, so it is not predicted human run length. Simulation cannot establish mobile readability or GPU rendering quality.

## Playtest 06 results

Final engine: 160 runs across four policies on seeds 7001–7040, 24 planning runs on 7001–7012, 480 sensitivity runs on seeds 1–12: **664 runs**. No censoring, resolution caps, score or coin failures. Reports include intermediate reach/clear rates, failure deficits and economy:

- [Held-out baseline](results/expansion-held-out/report.md)
- [Planning policies](results/expansion-planners/report.md)
- [Sensitivity](results/expansion-sensitivity/report.md)
- [Design decisions and caveats](../docs/playtest-06-balance.md)

Earlier pilot and per-type exposure summaries preserve their intermediate source hashes and CSV, without replay examples. The final reports were regenerated after adding cosmetic conversion provenance. Free starting-item/build scenarios measure stress cases, not natural shop availability. Rarity and prices remain provisional; special-only late-game weakness and multiplicative builds deserve human testing. Older Playtest 04/05 reports remain historical evidence, not current defaults.
