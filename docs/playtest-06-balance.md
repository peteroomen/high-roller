# Playtest 06 balance decisions

2026-09-23. Provisional defaults for human testing. The production engine simulates every rule; these bot results are not estimates of player win rates.

## Defaults

| Addition | Rule | Price / rarity |
|---|---|---|
| Six to One | Generated/rerolled sixes become ones; red 1 over six pips, one-colour body | 6 coins, weight 3 |
| Echo Die | +1 Mult once per cascade wave after the initial wave | 6 coins, weight 3 |
| One More | +1 Mult per unique cleared actual one, including blast clears | 7 coins, weight 3 |
| Loaded Die | ×4 final move Mult, once | 20 coins, weight 0.7 |
| Full Spectrum | +10 once when all six actual numbers have cleared during a move | 7 coins, weight 2 |
| Big Bang | Bomb expands from existing 3×3 to clipped 5×5 | 8 coins, weight 2 |
| Broad Columns / Rows | Three adjacent full columns/rows, clipped at edges | 8 coins each, weight 2 |
| Symbol special pips | 10 once per cleared die; Twenty is 20 | Existing active special group adds +2 Mult |
| Gold finish | Independent 5% on ordinary dice; natural match pays 1 coin | No token, may coexist with Shiny |
| Shiny finish | ×1.5 running Mult per naturally matched Shiny | Rare token |
| Round payout | 5 + remaining swaps, including final victory | No interest |
| Packs | Reveal 3, choose 1, one pack per shop | Numbered 4 coins; special 5 |

All eight ordinary match-tier trinkets and the nine targets are unchanged from Playtest 05. No special-pair combo patterns or new reroll mode were added. The old paid 2×2 reroll remains.

Six to One and One More form a deliberate synergy. Conversion blocks Full Spectrum because sixes no longer enter the board; the item description calls this out. Wild contributes 10 pips but does not pretend to be a missing actual number for Spectrum. A Wild takes one consistent identity per wave, with deterministic longest-run/high-number tie breaking. Twenty cannot freely activate: its swapped partner must make a match, or another special must clear it.

Group additions occur before global additions and Shiny multipliers in each wave. Later cascades can add to the already multiplied running Mult. Loaded Die applies after the last wave. Mult rounds to two decimals after multiplication and the final score rounds down; animation and model share this order.

## Rarity

| Token | Offer weight | Label |
|---|---:|---|
| Twenty | 5 | Common |
| Row / Column | 4 each | Common |
| Bomb / Number | 2 each | Uncommon |
| Wild / Shiny / Special Sweep | 1 each | Rare |

Weights select three distinct offers without replacement; they are not percentages. Special Sweep is excluded from the starter draft. Every picked token adds the same **1 percentage point** to its type. There is no per-type or total token cap. If raw rates ever total over 100, they become proportional weights and ordinary remainder becomes zero. Bag displays effective rates.

The isolated exposure pilot gave each type a free starting 5% across 16 seeds and two policies. Bomb and Wild produced roughly 2,390–2,628 mean points per board action; Twenty about 826–1,166. This supports more frequent Twenty offers and rarer broad-clearing/matching power. These are full-run outcomes with subsequent purchases, not causal values per die. Special Sweep had weak measured exposure/value; its rare placement is a conservative chain-clearing design choice, not a proven power ranking.

## Evidence and decisions

The 480-run design pilot compared intrinsic special pips, equal rarity, Gold removal, ×2 versus ×4, quad pricing and build synergies. Raising Loaded Die from 14 to 20 reduced its observed trigger exposure while preserving the pilot's mixed-policy win counts. Final weights make Twenty more available and Bomb less available than the pilot. Final targets remain 220, 500, 1,000, 1,700, 2,700, 4,000, 5,500, 7,200, 9,500, with ten swaps each.

Final validation contains **664 runs**: 160 held-out baseline runs, 24 planning runs, and 480 sensitivity runs. The cosmetic converted-face flag was added after the first validation; the same matrix was regenerated with final engine hashes, preserving the gameplay outcomes.

| Policy | Wins / runs | Win rate, 95% Wilson interval |
|---|---:|---|
| Random | 1 / 40 | 2.5%, 0.4–12.9% |
| Greedy mixed shop | 22 / 40 | 55.0%, 39.8–69.3% |
| Numbered/trinket builder | 27 / 40 | 67.5%, 52.0–79.9% |
| Special-only control | 0 / 40 | 0%, 0–8.8% |
| Aggressive reroll spender | 6 / 12 | 50.0%, 25.4–74.6% |
| Sampled planner | 9 / 12 | 75.0%, 46.8–91.1% |

Held-out seeds are 7001–7040; planning uses the first twelve of that range and two independent samples per candidate. Sensitivity uses matched seeds 1–12, Greedy and Builder. No censored runs, wave ceilings or score/coin conservation failures. Reports include each round's reach/clear rate, score deficits, move usage and economy.

- **Keep 10 special pips to test.** Sensitivity Greedy won 8/12 at 10 versus 3/12 at 0 and 4/12 at 5; Builder won 9/12, 10/12 and 9/12 respectively. Policy disagreement and small samples rule out calling 10 an optimum.
- **Keep ×4, make acquisition costly and rare.** Free starting Loaded Die won 12/12 for both policies. This is the strongest general-purpose item and deserves close observation. Neither its rarity nor 20-coin price proves it balanced; they limit access.
- **Keep the ones synergy.** Free conversion+One More won 11/12 Greedy and 12/12 Builder. Conversion alone won 8/12 and 9/12, equal to those small baseline cells. It trades pip value and Spectrum access for match frequency and synergy.
- **Do not infer weak individual items from noisy full runs.** Echo's Greedy free-start result was 5/12 versus 8/12 baseline; that is not evidence its positive bonus harms score. Altered decisions and board streams, displaced slots and buying affect outcomes.
- **Special-only is insufficient late game.** The control cannot use trinkets or levels and reaches late rounds rarely. One-point tokens successfully avoid flooding, but specials currently support builds more reliably than they sustain a build alone. Human testing should decide whether future shops need specialist support.
- **Large-area upgrades are strong with supply.** A free three-footprint build with 6% initial special supply won 12/12 Greedy and 10/12 Builder. Buying those pieces naturally is slower; edge clipping and activation counts are tested.
- **Gold at 5% is a modest supplement.** Held-out Greedy earned 361 Gold coins against 2,958 round-payout coins across 40 runs. No need to increase the rate yet.

Reports: [held-out](../modelling/results/expansion-held-out/report.md), [planning](../modelling/results/expansion-planners/report.md), [sensitivity](../modelling/results/expansion-sensitivity/report.md), [pilot](../modelling/results/expansion-pilot/report.md), [type exposure](../modelling/results/rarity-exposure/report.md).

The policies are finite heuristics, favouring common matches and particular tokens. Twenty and Special Sweep are underchosen; rare large groups and combo builds remain weakly estimated. Cross-source score attribution is accounting, not causal lift. Free starting-item tests stress power rather than reproducing shop acquisition. Real play remains necessary for pacing, readable effects, item desirability and deliberate match setup.
