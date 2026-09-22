# High Roller — Playtest 05

Mobile-first dice matching roguelite. Three stages, numbered match upgrades, and trinkets. Three.js draws the dice; CSS 3D is the fallback when WebGL is unavailable. No backend or accounts.

## Run and deploy

```sh
npm ci
npm run dev
npm test
npm run simulate:smoke
npm run build
```

Vercel: root `./`, Vite preset, Node 22, `npm ci`, `npm run build`, output `dist`. No environment variables. See [DEPLOY.md](DEPLOY.md).

## Scoring

Swap adjacent dice to match at least three equal numbers in a row or column. Intersections merge into one group. Invalid swaps are free. Ordinary dice use one colour per pip count; bone specials have symbols and no pips.

**Move score = (all cleared pips + trinket pip bonuses) × all earned Mult**, accumulated over every cascade, then banked once. An affected ordinary die scores once per wave, even when effects overlap. No separate chips stat.

| Match size | Starting Mult | Mult gained per numbered token | Pip trinket per group | Mult trinket per group |
|---|---:|---:|---:|---:|
| 3 | +2 | +2 | +16 pips | +2 Mult |
| 4 | +3 | +4 | +32 pips | +4 Mult |
| 5 | +4 | +6 | +56 pips | +8 Mult |
| 6+ | +5 | +8 | +88 pips | +12 Mult |

Levels start at 1. A token upgrades only its match tier for the rest of the run. Each owned trinket triggers once per matching group, including cascades. Large connected groups use 6+. Specials do not trigger match trinkets or tier upgrades.

Matches of 1s/2s add +1 Mult. Each group in cascade wave two adds +1, wave three +2, and so on. Group bonuses combine into **one flying Mult number**. Trinkets then shake/zoom and send their own number to the appropriate counter. Two plain three-die matches of 4s and 5s score `(12 + 15) × (2 + 2) = 108`.

## Specials and economy

Swap a special with any neighbour to activate it at its destination. The displaced die only counts if naturally inside the footprint. Row/Column clear their line; Bomb clears a clipped 3×3 area; Number sweep clears the swapped face; Special sweep hits all specials; Coin clears orthogonal neighbours and grants one coin. Chained specials trigger once each. Number sweeps inherit the initial target; swapping two specials targets the most common numbered value (ties higher). Each special adds its carried Mult, normally +2, plus cascade bonus.

All spawn rates start at zero. Choose one of three free starter tokens; each special token adds **2 percentage points**, reduced from 5. Total special chance is capped at **30%**, leaving at least 70% ordinary dice in the unconditioned refill distribution. Fresh-board match rejection slightly changes observed initial-board frequencies. Starter offers exclude Special sweep.

Between rounds receive **5 coins + floor(unused moves / 3)**. Coins carry. Reroll a 2×2 area for 3 coins without using a move; special symbols stay unchanged.

- Buy at most one foil pack per shop. Special packs cost 5, reveal five distinct types, and let you keep three. Lucky Dip is general; Straight Flush favours lines; Wild Things favours sweeps and coins. Caps can reduce the remaining eligible choices.
- **Count Me In** costs 4. Its five numbered tokens contain all four tiers plus one extra (weighted toward 3); keep three. Duplicate numbered offers can both be selected and stack.
- Each shop offers up to three unowned trinkets at 5 coins each. Four inventory slots; no duplicate trinkets. Sell for 2 coins in the shop. Sold stock cannot be bought again in that visit.

## Stages

Ten moves per round; the full cascade resolves before checking the target.

| Stage | Rounds | Goals |
|---|---|---|
| Opening Table | 1–3 | 220 / 500 / 1,000 |
| High Stakes | 4–6 | 1,700 / 2,700 / 4,000 |
| Final Table | 7–9 | 5,500 / 7,200 / 9,500 |

Stage boundaries are progression milestones with stronger targets, not additional boss rules. Shops appear between every round, including stage boundaries.

## Animation, testing and saves

Rounded outlines appear immediately after a swap. Each numbered die shakes/zooms, sends pips, then clears with a pop after the groups score. Pip movement accelerates die by die. Landing holds are now **180 ms for pips / 300 ms for group and trinket numbers**, down from 500 ms. A plain three-die scoring sequence takes about 2.74 seconds, versus 5.47 seconds previously (excluding swap/refill). Fast mode shortens motion; landing holds remain legible. Reduced motion suppresses idle shakes and punches.

The test bench supports seeds, goals, initial rates, match levels and up to four starting trinkets. All accepted actions save before animation. Reloading mid-animation restores the settled result; partial packs retain picks. Exports identify build 0.5.0 / engine 6 and the original configuration. Old saves keep their goals and old special/size rules so a partly opened pack remains finishable. **Start a new run for the new balance and all nine rounds.**

[Whole-game modelling](modelling/README.md) covers every mechanic using the production engine. [Balance notes](docs/playtest-05-balance.md) include held-out results and limitations. [Verification](docs/playtest-05-verification.md) records browser and automated checks. The 6+ rewards have sparse empirical exposure and remain provisional. Face modification and permanent unlocks remain outside scope.
