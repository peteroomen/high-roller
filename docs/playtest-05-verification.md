# Playtest 05 verification

## Automated

- `npm test`: 47 tests passed. Includes all eight trinkets, each match tier, 6+ connected groups, ordinary/special overlap ownership, additive cascade totals, combined Mult flights, exact UI event totals, token stacking, purchases/sales, slot enforcement, partial packs and old-save migration.
- `npm run simulate:smoke`: 20 complete runs (greedy/spender, two rollout samples), conserved score/coins and replayed examples.
- `npm run build`: Vite production bundle succeeds.
- 264 held-out runs across six policies plus 408 final sensitivity runs; zero censored runs, resolution caps or conservation failures.
- All 78 final-model example traces replay against the final engine hash. Reports retain the original simulation source hash and record the migration-only post-simulation verification separately.

## Browser flow

Verified at a 390 × 844 phone viewport with the actual app:

1. Resumed a Playtest 04 save, entered the next round and reached its shop.
2. Bought a 3 Pip Die for 5 coins, confirmed the owned rack and wallet persisted into the next round.
3. Started a fresh default run: three stages/nine rounds; starter offers showed 0% → 2%.
4. Used the test bench to start seed 21 with both three-match trinkets, three-match level 2 and goals set to 1 for a short flow test.
5. Swapped row 2 column 3 with row 3 column 3, matching three 3s. Observed the combined +4 match flight. Final visible counters were **25 pips × 6 Mult = 150**, agreeing with the production engine: 9 cleared pips +16 pip trinket; +2 base +2 level +2 Mult trinket. No cascade in this fixture.
6. Collected the round payout and opened Count Me In for 4 coins. Picked a 3 token, reloaded the page and verified “Choose 2 more”, the already-picked token disabled and tier 3 at level 3. Finished with 4 and 5 tokens.
7. Checked the foil-shop layout, numbered tokens and trinket descriptions at mobile width. The next round retained tier levels 3/2/2/1, both trinkets and the 2% Bomb token.
8. Browser error logs only contained preview-extension metadata errors; no game error was observed.

These are deliberately short UI fixtures. Default target difficulty comes from the full-run simulations, not goal-1 browser tests.

## Renderer limitation

The preview browser cannot initialise WebGL and uses `CSSBoard`; inspection confirmed `#css-scene` exists and the Three.js canvas is hidden. This explains why earlier screenshots had different dice shading/geometry from devices running Three.js. Both renderers share colours and symbol vectors; the 3D renderer itself was not changed in this pass. Browser evidence verifies the fallback UI and shared gameplay/animation sequencing, not the appearance of the Three.js renderer on a GPU-enabled device.

The numbered-pack screenshot shows shared HTML UI rather than a substitute design mockup. The board screenshot is explicitly the CSS fallback.

Artifacts: [numbered pack](playtest-05-numbered-pack.jpg), [trinket rack / fallback board](playtest-05-trinket-board.jpg).
