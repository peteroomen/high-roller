# Playtest 04 verification

- **37 tests pass.** Coverage includes additive scoring across overlapping groups and all cascade waves; rounded outlines before accelerating pip beats; draft/pack limits; coin charges and payouts; partial-pack resume; original-config preservation; token caps; deterministic full-campaign replay and no-future-information policies.
- **80 held-out full runs**, seeds 1001–1020, twenty each for random, greedy, spender and rollout; one independent sample for planning policies. No censored runs, cascade caps or conservation failures. Full results and Wilson 95% intervals: [report](../modelling/results/token-packs/report.md).
- Bot win rates: random 10% (2.8–30.1%), greedy 55% (34.2–74.2%), spender 90% (69.9–97.2%), rollout 55% (34.2–74.2%). These are exploratory bot outcomes, not human skill estimates. Greedy's round-six mean is 9.8 moves; coin spending remains strong and warrants playtesting.
- Required 20-run model smoke and production build pass. Model forecasts use exact production previews, cached only for identical visible boards within one fixed-rule decision.
- Early design pilot: the original late-round targets frequently cleared in one or two swaps after additive Mult and token stacking. Final targets are 220/900/2,400/6,000/10,000/14,000. The reported seed range was held out from that pilot.

## Browser checks

390×844 mobile: starter choice; all other rates at zero; centred vector symbols; slightly brighter dice; rounded natural match outline visible while pip count is still zero; individual shake/zoom/number flight; rounded special footprints visible before scoring; round completion; round payout; foil shop; one pack charge; three distinct picks; token stacking; reload with one pick saved and two remaining; sold-out pack state; next round restores moves and retains coins/rates.

The short shop walkthrough used test-bench goals of 1 to exercise transitions quickly. The production goals above remain unchanged. Its first move made three 5s: 15 pips ×1 =15; a later Number sweep displayed six outlined cells before any pip was credited.

Desktop foil-shop layout and controls were also checked.

The browser uses the CSS 3D fallback. The Three.js renderer and shared vector symbols compile; WebGL visuals still need a real-device check. All new foil/token UI uses normal HTML/CSS.

## Pacing

Normal-speed model estimates average roughly 14–16 minutes of scoring animation across these complete runs, excluding player decisions, falls and pauses. Each pip retains the requested 500 ms arrival hold; shake/flight/bang durations accelerate within each wave. Fast mode shortens movement. Large special chains can still take time; this is a deliberate first playtest of the readable sequence, not a claim that pacing is settled.
