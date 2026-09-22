# High Roller — Playtest 04

Mobile-first dice match game with a six-round token-building run. Three.js renders the dice; a CSS 3D fallback keeps the game playable without WebGL. No backend, accounts or paid services.

## Develop and deploy

```sh
npm ci
npm run dev
npm test
npm run simulate:smoke
npm run build
```

Vercel: root `./`, Vite preset, Node 22, install `npm ci`, build `npm run build`, output `dist`. No environment variables. See [DEPLOY.md](DEPLOY.md).

## Current rules

- A 6×6 board; adjacent swaps make horizontal/vertical matches of at least three identical numbers. Invalid swaps are free. Intersecting matching lines merge into one group.
- Ordinary dice have one colour per pip value. Bone specials have centred symbols and no pips. Swap them with any neighbour to activate at the destination. The displaced neighbour is only affected if naturally in the effect footprint.
- Column and Row clear their line. Bomb clears a clipped 3×3 area. Number sweep clears the swapped face. Special sweep triggers all specials. Coin clears orthogonal neighbours and grants one coin. Specials chain once each; chained Number sweeps inherit the target. A swap of two specials uses the most common number (ties higher).
- **Move score = total cleared pips × total earned Mult across every wave of the move.** Each numbered die contributes its pips once per clear, including when effects overlap. All groups contribute Mult, including overlapping special effects.
- Match size adds +1/+2/+3 Mult for 3/4/5+ dice. Matches of 1s or 2s add +1. Every group in a cascade adds its depth bonus (+1 in wave two, +2 in wave three, etc.). Specials add +2 by default, plus cascade; no size/low-pip bonus. Both counters reset on the next move.
- Two matches of three — three 4s and three 5s — give `(12 + 15) × (1 + 1) = 54`. Later cascades add to both counters before the final score is banked.
- Reroll a 2×2 area for 3 coins, with no move cost. Specials keep their symbol. Coins carry between rounds.

## Tokens and shops

All six special spawn rates start at **0%**. Choose one free starter token from three distinct offers. Each token adds **5 percentage points** to that type's spawn chance, for the whole run. Special sweep is a shop token because it needs other special types to be useful.

Six rounds have ten moves each, with goals **220 / 900 / 2,400 / 6,000 / 10,000 / 14,000**. Between rounds, collect **5 coins + 1 per three unused moves**, then visit the token shop. Buy at most one 5-coin foil pack, or save the coins and continue.

Each pack reveals five distinct tokens; keep three. Lucky Dip offers a general assortment, Straight Flush favours rows/columns, and Wild Things favours sweeps/coins. Repeated types across packs stack with owned tokens. Limits: 30% per type and 90% total; ineligible choices are excluded and packs offer fewer picks only if the caps require it. Current six-round defaults can acquire sixteen tokens, totalling 80% spawn chance.

## Presentation and saves

Rounded group outlines appear as soon as the swap settles. Dice score in order, each shaking and growing briefly; movement accelerates with each die in the wave. Smaller pip numbers fly to the counter, remain below it for 500 ms, then add with a punch. Group multipliers add to the persistent move counter. Cleared dice pop, shrink and dissolve into fragments before refills and cascades.

Fast mode shortens movement but preserves the arrival hold. Reduced motion suppresses idle shakes and counter punches and reduces other movement. Centred vector icons share the same paths in the WebGL renderer, fallback and token UI.

Every accepted move, token pick, purchase and round transition is saved before presentation. Reloading mid-cascade restores the settled result; reloading mid-pack restores the remaining choices. Exported runs include build and rule version. Existing saves migrate without erasing progress; **start a new run for the zero-rate draft and six new goals**. Replay seed uses the original run configuration, not token-increased rates.

## Modelling and validation

The browser, policy previews and full-run simulations share `engine.mjs`. The model covers starter choices, all six special types, swaps, additive scoring, cascades, rerolls, round rewards, pack purchases, token stacking, caps and every round. See [modelling/README.md](modelling/README.md) and the [current report](modelling/results/token-packs/report.md).

`presentation.mjs` defines scoring events, rounded outlines and nominal timings. Pacing estimates exclude decision time, falls, pauses and device frame times. They are not human session-length estimates.

Historical reports retain their original engine hashes. Pre-0.4 reports use earlier scoring and progression; do not compare or replay them as current rules. Passives, shops for other items, face modifications and permanent unlocks remain outside this prototype.
