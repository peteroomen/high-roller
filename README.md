# High Roller — Playtest 06

Mobile dice matching roguelite: three stages, nine rounds, token packs and sixteen trinkets. Three.js draws the dice, with CSS 3D fallback when WebGL is unavailable. No accounts or backend.

## Run and deploy

```sh
npm ci
npm run dev
npm test
npm run simulate:smoke
npm run build
```

Vercel: root `./`, Vite preset, Node 22, install `npm ci`, build `npm run build`, output `dist`. No environment variables. See [DEPLOY.md](DEPLOY.md).

## Rules

Swap adjacent dice to match three or more equal numbers. Intersections merge. Invalid swaps cost nothing. Dice colours identify pip values; symbol specials are bone. Six to One conversions retain the colour of ones, with a red handwritten 1 over six pips.

Move score is **all cleared pips plus trinket pips, multiplied by running Mult**, banked once after all cascades. Each die contributes pips once per wave. Each group sends one combined Mult number; trinkets send separate contributions. Ordinary matches of 1s/2s add +1 Mult. Each group gains +1 per cascade depth.

| Match size | Initial Mult | Per numbered token | Pip trinket | Mult trinket |
|---|---:|---:|---:|---:|
| 3 | +2 | +2 | +16 | +2 |
| 4 | +3 | +4 | +32 | +4 |
| 5 | +4 | +6 | +56 | +8 |
| 6+ | +5 | +8 | +88 | +12 |

Each wave applies group additions, global trinket additions, then ×1.5 for each matched Shiny. Loaded Die multiplies final move Mult by four once. Mult rounds to two decimal places after multiplication; points round down. Bonus pips are not a separate chips stat.

## Dice and economy

- Column/Row clear a line, Bomb clears 3×3, Number clears the swapped partner's number. Special Sweep clears symbol specials. Swapping activates these; the partner is excluded from that special's footprint.
- Symbol specials contribute 10 pips when cleared, plus their group Mult where applicable. Twenty contributes 20 pips and no own Mult: collect it by swapping with a partner that creates a match, or hit it with another special.
- Wild matches a number in its line, contributes 10 pips, and cannot activate on an arbitrary swap. A Wild takes one consistent identity per wave; longest runs win, then higher numbers and board order.
- Shiny is a normal numbered die with ×1.5 Mult when naturally matched. Gold is an independent 5% finish on ordinary dice, paying one coin per naturally matched die. Blasts alone trigger neither finish reward. Gold and Shiny can coexist.
- All special rates start at zero. Choose one of three starter tokens. Each special token adds **1 percentage point**, without a token cap. Above 100 combined points, rates normalize proportionally. Rarity affects token offers, not the value of a chosen token.
- Both packs reveal three choices; take one. Numbered pack costs 4 coins; special pack costs 5. One pack per shop. Four trinket slots, no duplicates; sell for half price rounded down.
- Each cleared round pays **5 coins + 1 per remaining swap**, including the final round. Coins carry. The existing 2×2 reroll costs 3 coins and no swap.

New trinkets: Six to One, Echo Die (+1 per cascade wave), One More (+1 per cleared one), Loaded Die (×4 final Mult), Full Spectrum (+10 once when the move clears all six numbers), Big Bang (bomb 5×5), Broad Columns and Broad Rows (three-wide lines). Bomb was already 3×3, so its upgrade expands to 5×5. Six to One prevents Full Spectrum while equipped.

## Playtesting

Trinkets have a permanent four-slot rack; tap for details. Bag shows rates. Pause → Test bench configures seeded runs, rates, goals, levels and starting items. Normal gameplay fits phone height; shop contents can scroll while its next-round button stays fixed. `mobile-check.html?w=320&h=640` is the viewport QA wrapper.

Build 0.6.0 / engine 7 exports original configuration and accepted actions. Old Coin dice migrate to Gold ordinary dice. Start a new run to use every new default. Both renderers share symbols, colours, converted-six artwork and light face rims; lighting and geometry still differ.

[Balance decisions](docs/playtest-06-balance.md), [verification](docs/playtest-06-verification.md), [whole-game modelling](modelling/README.md).

Future experiments: special-pair combo patterns could trade away trinket design space; deliberate reroll actions could help arrange four/five matches. Neither expansion is included here. The existing paid 2×2 reroll remains.
