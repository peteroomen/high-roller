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
| Configured progression (9 live / 24 research) | `act`, `visit_shop`, `next_round` | Reach/clear rates, failures/deficits, overshoot, moves, stage and round economy, final payout |
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

Gold income, all round payouts (including victory), sales, rerolls and purchases conserve coins. Every simulated run asserts both identities. The runner limits max(400, 80 × encounter count) accepted actions and the engine 80 waves. Censored runs remain in the denominator, are not wins, and must be investigated. Wilson intervals quantify sampling uncertainty under fixed bots; paired comparisons are screening evidence, with multiple-comparison and heuristic bias.

Nominal scoring time counts shared animation events. It excludes human decisions, swap/fall animations, pauses and device frame time, so it is not predicted human run length. Simulation cannot establish mobile readability or GPU rendering quality.

## Playtest 06 results

Final engine: 160 runs across four policies on seeds 7001–7040, 24 planning runs on 7001–7012, 480 sensitivity runs on seeds 1–12: **664 runs**. No censoring, resolution caps, score or coin failures. Reports include intermediate reach/clear rates, failure deficits and economy:

- [Held-out baseline](results/expansion-held-out/report.md)
- [Planning policies](results/expansion-planners/report.md)
- [Sensitivity](results/expansion-sensitivity/report.md)
- [Design decisions and caveats](../docs/playtest-06-balance.md)

Earlier pilot and per-type exposure summaries preserve their intermediate source hashes and CSV, without replay examples. The final reports were regenerated after adding cosmetic conversion provenance. Free starting-item/build scenarios measure stress cases, not natural shop availability. Rarity and prices remain provisional; special-only late-game weakness and multiplicative builds deserve human testing. Older Playtest 04/05 reports remain historical evidence, not current defaults.


## Eight-stage research baseline

The opt-in candidate is [configs/eight-stage-v1.json](configs/eight-stage-v1.json). Live `DEFAULTS` remain Playtest 07. See [the balance report](../docs/eight-stage-balance.md) for held-out results and limitations.

```sh
node modelling/eight-stage.mjs heldout-v1 150 100001 balanced,cascade,large-supported,large,large6,specials modelling/configs/eight-stage-v1.json
node modelling/power-study.mjs 200
node modelling/synergy-study.mjs modelling/configs/eight-stage-v1.json 100
```

Research agents buy actual shop offers and token packs, sell/replace items and finish complete 24-encounter games. `balanced`, `cascade`, `large-supported` (4-match foundation), `large` (5 focus), `large6` (6+ focus) and `specials` have separate shopping preferences. Six to One is deliberately recognized as large-match support, not reserved for the cascade agent. Special agents purchase matching footprint upgrades and prioritize early token supply. These are fixed heuristics, not optimizing agents; relative win rates depend on their choices.

`-paid` variants retain the same build policy and evaluate the existing paid 2×2 reroll with four independent samples per area when three swaps or fewer remain. This is a rescue-spending control, not optimal economy planning. Their private RNG never reads the real game RNG.

New opt-in engine rules: `singleRerollsPerRound` enables `reroll_single` on an ordinary numbered die, keeping its finishes, charging one use even if the face repeats, costing no coins/swaps, and immediately resolving matches. Charges reset each encounter; zero disables it. `packStageIncrease` adds a fixed amount per stage to both pack prices; zero preserves live pricing. Shop display, affordability and actual payment share `packCost`. These changes have engine tests; the single-die action is not exposed in the live UI yet.

Telemetry distinguishes first-wave groups from refill cascades, counts single-die rerolls, records bought item IDs and per-encounter/final loadouts, upgrade levels and spawn rates. Research runner exports per-cell config/source identity, complete run rows, score/economy/clear-rate summaries and a replay-verified example. Confidence intervals use Wilson for wins and approximate paired intervals for matched-seed changes. Censored/capped resolutions and accounting assertions are explicit. Source identity is captured before each experiment begins; do not edit model sources while a study is running.

Power arenas use the exact production engine, ten swaps and an unreachable goal, with free prescribed loadouts and no shopping. They measure conditional strength and score tails, not acquisition feasibility or full-game win rates. Each scenario stores individual scores for paired comparisons. Geometry tests exhaustively inspect visible swaps and all six one-die reroll outcomes on seeded stable boards; they do not inspect future RNG. Six-to-One rerolls correctly give the face 1 probability 2/6.

## Playstyle laboratory (opt-in; not shipped)

`modelling/configs/lab-final.json` is the frozen follow-up candidate. `rules.lab` gates the new shop pool and rules. Live defaults, UI and deployment remain unchanged. Research engine identity is the full exported config plus source hashes; numeric engine 7 alone does not identify a lab build.

- End-of-action conditional ×Mult for Echo, tier-5/6 Mult dice, natural Wild matches and symbol chains; each applicable item settles once, after wave additions/Shiny and before Loaded Die. Tier Multipliers replace that item's old additive effect. They do not replace numbered-token levels or pip trinkets.
- Full Spectrum records actually cleared numbered faces across an encounter. When all six have appeared, its final ×Mult applies to that action and later scoring actions. Reset each encounter; collecting Wilds does not invent missing numbered faces. Conversion prevents generated sixes as before.
- Mimic Ring spends a single-reroll charge to copy an orthogonally adjacent ordinary numbered face, once per encounter. Finishes stay on the destination; special/finish copying is prohibited. Actual matches resolve immediately; counters reset. A tested variant also spent a swap and was rejected.
- Clingstone extends qualifying natural groups into orthogonally adjacent equal-number ordinary dice. The final candidate requires an original group of four or more and only one adjacency step. Overlapping expanded groups merge without double-counting. Added dice belong to the natural match, affect its size and can trigger Gold/Shiny. It does not pull in an unmatched Wild. The expanded group's exact size selects the scoring tier.
- Spare Die adds encounter charges; it remains available for experiments but has zero candidate offer weight. Battery Twenty refunds at most one spent charge per action collecting a Twenty, never above the initial budget; it is a rejected/test-only alternative unless the report says otherwise.
- The candidate exposes six shop offers, still four owned slots, one pack and one pick per shop. Prices, weights, size rewards, Shiny factor, footprint prices and all proposed factors are in the frozen config.

New laboratory policies cover flexible, cascade, four/five/six, symbol specials, Wild and Spectrum portfolios. `-patient` doubles the ordinary reroll threshold (0.35 rather than 0.18 of the best visible swap); `-cluster` prioritizes Clingstone over other items to test whether it is universally dominant. `lab-battery` prioritizes Twenty tokens as a deliberate replacement-die experiment. All policies see public observations only. They use exact visible first-wave scoring, enumerate possible reroll faces, and do not predict the real refill stream.

New measurements: Mimic uses and immediate 5+ outcomes, Clingstone added dice and triggers, battery refunds, per-item final multiplier triggers, public encounter face collection, complete purchase/sale histories and per-round builds. Tests cover spending, no copied finishes, charge/refund limits, conditional once-only effects, preview/actual accounting, expanded-group overlap and seed replay. Every run asserts score/coin conservation. The two-stage prototype evolution and all rejected cases are documented in the report.

```sh
node modelling/lab-study.mjs heldout baseline,final 200 400001 all 6
node modelling/lab-arenas.mjs modelling/configs/lab-final.json 120 600001
```

Each phase stores full configurations, per-policy summaries, compressed per-run rows and a replay-verified example. Historical pilot source snapshots match their recorded SHA-256s under `modelling/snapshots`; later phases automatically retain a `source` snapshot. Run from a historical snapshot to replay its trace. `pilot4-invalid-min-size` is explicitly discarded because a temporary conditional expansion could duplicate group membership; it contributes no evidence. Final held-out data must not be used for further tuning.
