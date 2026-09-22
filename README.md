# High Roller — playtest 01

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

## Rules

- 6×6 board; swap orthogonally adjacent dice to match three or more numbers. Colours do not form matches.
- Invalid swaps cost no moves. A board with no legal moves is automatically reshuffled for free.
- Per matched group: pip sum × (size multiplier + cascade bonus + low-number bonus).
- Size multiplier: three dice = 1, four = 2, five or more = 3. Intersecting matching runs merge into one group, with each die counted once.
- The first wave has no cascade bonus; the next wave gets +1 Mult, then +2, etc. It resets after each action.
- Matches of ones and twos receive +1 Mult (toggle in Test bench).
- Specials activate on a natural match or another special's clear. Each die scores and activates at most once in a wave.
- Column sweeper clears its column; special sweep clears all special dice; number sweep clears its own face value; bomb clears a clipped 3×3; coin awards one coin.
- Blast-only dice score pips × (1 + cascade depth), with no size or low-number bonus.
- Each die has a 2% chance of each of the five specials, mutually exclusive: 10% combined. Ordinary dice are bone with dark pips. Each special type has a distinct colour and symbol; colours never form matches. Legacy colour fields remain in saves solely for compatibility. Initial boards are conditioned on having no pre-existing matches.
- Three coins buy a 2×2 reroll without spending a move. Faces change; colours and special identities stay. Edges clamp the area to the board.
- Three rounds, ten moves each; targets 260, 420, 620. Coins carry; score and moves reset. The last move can win. A winning chain resolves completely before the round transitions.
- No passives, face modifications, shop, or starting tokens in this build.

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

Nineteen automated tests pass, including 250 seeded board sequences. Historical colour-board modelling covers 1,000 baseline runs (250 per policy) and 3,200 sensitivity runs (16 configurations × two policies × 100 seeds). Every example trace is replayed, and every run checks score/coin accounting. No action or cascade ceilings were reached.

Baseline full-run clears are 11.6% for random swaps, 26.4% for immediate-score greedy, 34.0% for greedy with aggressive coin spending, and 69.6% for the sampled planner. These are policy-specific bot results, not human win-rate estimates. Confidence intervals, configuration, source hashes and raw run data accompany the [baseline report](modelling/results/baseline/report.md) and [sensitivity report](modelling/results/sensitivity/report.md).

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

Special sweep replaces colour sweep: it targets every special die, triggering normal special chains. The internal `color` key is retained for saves and telemetry. Reports in `modelling/results/baseline` and `sensitivity` describe the previous engine and are historical; current-engine results are in `modelling/results/bone`.
