# Playtest 06 verification

2026-09-23. Build 0.6.0, engine 7.

## Automated gates

- `npm test`: **55 passed**, zero failures. Covers all sixteen trinkets, Wild identities, Twenty conditional activation, Gold/Shiny natural-match rewards, 10-pip specials and overlap ownership, expanded footprints, conversion provenance, uncapped normalized rates, rarity, one-of-three packs, final payout, migration and replay.
- Presentation-event assertions reproduce fractional running Mult and final score across 100 seeds with Shiny and new trinkets. A plain group still contributes one combined group Mult flight.
- `npm run simulate:smoke`: 20 complete Greedy/Spender runs, two independent planner samples. Score and coins conserved; example traces replayed.
- `npm run build`: production Vite bundle succeeds. Runtime used Node 24.19; deployment remains configured for Node 22.x.
- Final balance matrix: **664 runs**, zero censored runs, resolution caps or conservation failures. All **86 example traces** replay during report generation. Final engine SHA-256 `5ddbad8174bee3a5fe561ba9629b0911b0ebd46f628ee8b475363ce848dcdeab`.
- `git diff --check`: clean.

## Browser checks

Actual app inside phone viewport wrappers at **390×844, 360×740 and 320×640**. Board, trinket rack, HUD, Bag, hint, reroll and wallet fit without scrolling the page. The smallest viewport omits the tier strip to preserve playable dice size. Shop has an internal scroll region and a fixed next-round action; four trinkets remain the first purchase category.

Used Test bench with seed 42, goals set to 1, 8% Twenty/Wild/Shiny and Six to One/Echo/One More/Loaded Die. Picked Shiny from the starter's three choices. Saw ordinary colours, bone Twenty/Wild, Gold marker, Shiny sparkle and converted-six artwork. The converted-face SVG explicitly uses red `#b92835`; the trinket uses the same scrawl. Converted dice still identify as ones, including accessible labels.

Rejected an invalid swap without consuming a move. Swapped row 1 column 2 with row 2 column 2, producing a three-wave cascade. Final visible counters were **27 pips × 84 Mult = 2,268**, exactly matching the same engine fixture. Loaded Die applied once at the end. Gold paid one coin. Entering the shop added 14 coins (5 + nine spare swaps), wallet 15.

Bought Lucky Dip for 5, saw three distinct token offers, chose Twenty: returned immediately to the shop, wallet 10, both packs sold out. At 320×640 sold Echo for 3, bought 4 Pip Die for 5 and entered round 2 with 8 coins and the replacement in the rack. Reloading the wrapper retained the game/shop state. Hint located a valid Blue/Wild swap; played it to clear the next test round. Bought Count Me In, checked its three numbered choices and picked the 4-match token: the pack closed after one pick.

Browser error logs showed extension metadata messages, not game exceptions. Production deployment is not part of this local verification.

## Renderer limitation

This browser cannot initialize WebGL: `#css-scene` exists and the Three.js canvas is hidden. Screenshots therefore verify the CSS fallback and shared UI/game flow. Three.js face textures now have cream rounded light rims, red scrawled conversion artwork, Gold rims and Shiny marks, but their actual GPU lighting appearance needs confirmation on a WebGL-capable device. The two renderers share palette and symbol vectors but retain different geometry and lighting.

Evidence: [320×640 game](playtest-06-mobile-320.png), [390×844 shop](playtest-06-shop.png). QA uses deliberately boosted supply and free trinkets to expose features; screenshots are not a default starting run.
