# Playtest 07 — approved object collection

Approved art is now shared between the material studio and playable game: C raking light, refined natural bevels, coloured standard dice, flowing two-colour Shiny resin, and movement-driven gold glints. Wild is a question mark and Shiny is the former four-point Wild star.

The starter draft, shop, owned-trinket rack, trinket details and token inventory use the actual studio object factories. One shared offscreen WebGL atlas renders the visible pieces into native DOM canvases, preserving dialog clipping, click targets and scoring shake/zoom/number-flight origins. A matching colour/icon CSS fallback remains available when WebGL is unavailable. Numbered trinkets and match tokens share the corresponding numbered die palette; special tokens are bone; upgraded bomb/line trinkets have coloured swirls on bone; Echo is orange satin. Experimental matte/extra-palette/metals remain in the studio, without adding new gameplay types.

Motion respects reduced-motion preferences and tab visibility. UI resin renders at up to 20 fps. The studio is included in the Vite build at `/lighting-review.html`.

## Balance baseline

No engine rules, scoring timings, item values, token rates, stage targets, shop costs, RNG or saved-run migration changed. Engine SHA-256: `5ddbad8174bee3a5fe561ba9629b0911b0ebd46f628ee8b475363ce848dcdeab`. Model SHA-256: `d0d481898acef06fe3b6758cebe48335969d50396250119a862e978912071a74`.

Before publication: 55 tests pass; model smoke completes 20 runs (10 greedy, 10 spender, seeds 1–10), with no censoring, resolution ceilings or score/coin accounting failures. Both bots win 7/10, with very wide 95% Wilson intervals (39.7–89.2%); this is a regression check, not a human difficulty estimate or tuning result. Production builds include both game and studio.

## Next modelling pass

Start from this unchanged baseline. Audit policy biases and scenario coverage before increasing sample counts. Priorities: round/stage difficulty and failure margins; value per coin of each trinket and token tier; special frequency and intrinsic pips; multiplicative Shiny/Loaded Die tails; conversion/ones interactions; reroll value and economy; and cascade/animation length. Compare multiple visible-information policies on matched seeds, then verify proposed defaults on a separate held-out seed range. Report complete runs, per-round reach, conditional clear rates, spending, trigger rates, build composition, score tails and confidence intervals. Do not treat score attribution as causal item value or bot results as human win rates.

Browser integration check: a match with trinket bonuses completed, round result opened the shop, a numbered token pack opened, and choosing its 3-match token returned to the shop with the correct coin deduction. Pause/reduced-motion settings and saved-state restoration worked. The remote browser has WebGL disabled, so these interactions used the CSS fallback; actual GPU rendering of the new UI atlas and device performance remain a verification limitation. The atlas fails back to coloured/icon-matched DOM artwork if its context or rendering fails.
