# Playtest 03 verification

- 30 passing engine, modelling and scoring-plan tests. Includes tap activation, row/column geometry, number targeting, Coin edges, chained specials, overlapping-score ownership, migration, replay, accounting, and all-pips-before-Mult ordering.
- 160 complete seeded runs: 40 each for random, greedy, spender and rollout policies. The report includes Wilson intervals, round clear/reach rates, deficits, economy, per-special exposure, scoring animation counts and nominal durations. No censored runs, cascade caps or conservation failures. These are exploratory bot results, not human win rates or tuning recommendations.
- Required 20-run smoke and production build pass.
- Browser checks at a 390 × 844 mobile viewport and desktop: symbol-only bone specials, one-tap activation, one move charged, horizontal clear, regular swap, low-pip bonus, cascades, big pip arrival held below the counter, boxed special group and sequential multiplier presentation.
- Seed 1, tapping row special at index 20: five numbered dice sum to 20, ×2 gives 40 points, one move, one wave. Browser and headless engine agree.
- Cloud browser uses the CSS 3D fallback. Three.js changes compile but still need a real-device WebGL visual check.

The half-second arrival hold is deliberately unscaled in fast/reduced modes. Nominal scoring animation time excludes decisions, falls, pauses, hidden tabs and rendering performance.
