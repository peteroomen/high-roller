# High Roller — playtest 02

A mobile-first dice matching roguelite prototype. Built with Three.js and a plain HTML/CSS interface; a CSS 3D renderer takes over automatically when WebGL is unavailable. No backend, analytics, paid APIs, or accounts required to play.

## Run

Use Node.js 22.x (22.12 or newer).

```sh
npm ci
npm run dev
npm test
npm run build
```

The development server uses port 4173. The production output is `dist/`.

## Deploy to Vercel

Import this repository in Vercel with the Vite preset, root `./`, install `npm ci`, build `npm run build`, output `dist`, and Node.js 22.x. No environment variables are needed. These settings are included in `vercel.json`; see [DEPLOY.md](DEPLOY.md).

## Rules (0.2.0)

- 6×6 board; match 3+ identical numbers horizontally or vertically. Each pip value always has the same colour, so matching colour and number are equivalent. Symbols have no pip value and never form matches.
- Swap adjacent ordinary dice to make a match. Invalid swaps are free. Swapping a special with any neighbour is legal, costs one move and activates it at its destination.
- Special dice carry a visible multiplier (default ×2 for all five types). Their swapped neighbour is always affected, even outside the effect's shape.
- Column clears the destination column. Bomb clears the clipped 3×3 area. Number sweep clears the swapped neighbour's number/colour. Special sweep clears other specials. Coin clears its swapped neighbour and awards one coin.
- Other specials hit by an effect activate once. Chained Number sweeps inherit the original swapped pip value. Swapping two specials fires both; Number sweeps in such a combination clear all numbered dice.
- A normal match scores pip sum × (size Mult + low-pip bonus + cascade bonus). Size Mult: 3 dice = 1, 4 = 2, 5+ = 3. Intersections merge, counting each die once. Matches of ones/twos add +1 Mult.
- A special scores affected pip sum × (its carried Mult + cascade bonus). Symbol dice themselves score zero pips. No size/low-pip bonus is added to special Mult.
- Overlapping effects/matches count each numbered die once at the highest applicable Mult. Ties retain match scoring first, then the first activated special; multipliers do not stack across specials.
- The first resolution has +0 cascade; subsequent falling matches get +1, +2, etc., resetting on each action.
- Special spawn rates remain 2% each, mutually exclusive (10% total). Numbered pips are uniform before initial-board match rejection.
- Three coins reroll numbered dice in a 2×2 area for no move cost. Their colours update with the new pips. Specials keep their symbol and multiplier.
- Three rounds: ten moves each, targets 260/420/620. Coins carry; round score/moves reset. Resolve the entire action before checking victory, including the last move.
- Dead boards reshuffle free. No passives, shop, starting tokens or permanent face modifications.

## Controls

Swipe, or tap one die and then an adjacent die. Keyboard users can focus the grid, move with arrow keys, and select with Enter/Space. `?` explains rules; Pause controls audio, animation speed and reduced motion. The Test bench changes seed, rates, targets, moves and the low-number bonus, and exports a JSON run log.

## Persistence

Every accepted action is fully resolved by the deterministic engine and saved before the visual animation starts. Reloading during a cascade restores its final board, score, coins and move count. Settings and run progress use localStorage. Storage is best-effort on browsers that disallow localStorage. No cross-device sync.

## Architecture

- `engine.mjs`: deterministic PRNG, board generation, legal moves, intersecting groups, special-chain resolution, scoring, gravity and round progression.
- `main.js`: input, animation sequencing, score explanation, audio, dialogs and saves.
- `board.js`: Three.js renderer with rounded dice and procedural pip textures.
- `css-board.js`: six-faced CSS 3D fallback using identical game state.
- `style.css`: desktop/tablet/phone presentation.
- `tests/engine.test.mjs`: scoring, chaining, deterministic saves and seeded invariant checks.
- `modelling/`: full-run policies, economy decisions, sensitivity scenarios, replay and score attribution.
- `tests/modelling.test.mjs`: deterministic policies, no future-RNG access, conservation, replay and censored-run reporting.
- `.github/workflows/validate.yml`: engine tests, model smoke runs and build on pushes/PRs.

The engine has a defensive 80-wave resolution ceiling. It settles a fresh board if ever reached, retaining scores already earned. No tested default-rate run reached it.

## Verification and limits

28 automated tests pass, including 250 seeded board sequences. The current pilot covers 200 complete runs across four policies plus 300 multiplier-sensitivity runs. All runs enforce exact score/coin accounting, and stored example traces replay. No action or cascade ceilings were reached.

See the [current baseline report](modelling/results/swap-specials/report.md) and [multiplier sensitivity report](modelling/results/swap-mult-sensitivity/report.md) for source hashes, seed counts and confidence intervals. These are bot results, not human win-rate estimates. Earlier colour-board and bone-dice results remain historical.

```sh
npm run simulate:smoke
npm run simulate -- --runs 250 --samples 6
npm run simulate:sweep
```

See [modelling/README.md](modelling/README.md) for coverage, policy assumptions, custom runs and replay. [AGENTS.md](AGENTS.md) makes modelling a required part of future gameplay changes.

Browser testing uses a 390×844 embedded phone viewport and desktop. The test browser disables WebGL, so visual and interactive checks cover the CSS 3D fallback. The Three.js renderer compiles but still needs a physical-device WebGL playtest. Touch-sized pointer drags are checked in the browser; native Android touch and haptics need the user's device.

## Useful playtest feedback

- Can you identify special dice and predict what they clear?
- Do the score animations explain the points without dragging?
- Does the best move feel different from the first legal move?
- Are coin rerolls available often enough to matter?
- Which round did you reach, and what seed was shown in Pause?

## Bone dice update (0.1.2)

Special sweep replaces colour sweep: it targets every special die, triggering normal special chains. The internal `color` key is retained for saves and telemetry. Reports in `modelling/results/baseline` and `sensitivity` describe earlier engines and are historical after 0.2.0. Current symbol-swap results are in `modelling/results/swap-specials`.

## Symbol swaps (0.2.0)

The live game and policies share special-aware legal swaps and first-wave previews. Run telemetry includes direct special swaps, chained activations and score attributed per special type. Multiplier sensitivity scenarios test ×1/×2/×3 using the carried values from the same engine. Older baseline, sensitivity and bone reports are historical and carry their original engine hashes.

Version-1 saves migrate existing specials to symbol-only dice at ×2 and map ordinary colours to their pips. Existing progress remains; older score history reflects the rules used at that time. New runs provide a clean comparison for balancing.
