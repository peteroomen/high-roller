# Reactive pearl and lighting review

Draft, not on production main. Supersedes the continuously moving foil design.

- Shiny uses the same base colour texture as its ordinary counterpart. Zero metalness; clearcoat 1, coat roughness 0.085, subtle physical iridescence 0.18. No hue/filter shader. Gold takes precedence over pearl colour shifts when finishes coexist.
- Gold uses a gold base texture, metalness 1, roughness 0.25 and fixed room reflections. No rainbow/UV/time animation.
- All lights and the reflection environment remain stationary. Dice shake/roll/turn causes the reflection change. Periodic excitement shakes include Gold and Shiny; they rest between beats. Reduced motion disables idle shakes.
- CSS fallback preserves the base colour beneath a restrained highlight and changes reflection position during motion only. Pack reflections respond to hover/press; continuous animations are removed.
- Three.js rigs are defined in `lighting.mjs`: hard tabletop, product studio, and raking light. `lighting-review.html` uses the production Board materials to compare 18 dice under each rig. Shake, viewing-angle slider and PNG capture are provided.
- A self-contained downloadable HTML is bundled from `lighting-review.mjs` with esbuild and the review HTML; it needs no install, server or network after download.

Validation: JS syntax and production build pass. No gameplay, scoring or RNG changes. This preview environment reports GL_VENDOR/GL_RENDERER Disabled and cannot create WebGL2. The comparison correctly presents an unavailable-renderer message instead of substituting CSS. Material appearance and lighting values remain unverified on a GPU-enabled device. Do not describe fallback screenshots as Three.js evidence.

## Iteration 02 — user selected C

Raking light is now selected by default. The comparison adds a fourth row of true sharp gold cubes, matching the refined rounded gold's 0.79 dimensions and material. The refined geometry uses a smaller 0.055 radius (was 0.105), eight arc segments (was five) and full cube depth (was 0.65). The comparison's Original gold rounding checkbox restores the old radius, subdivision and depth for a direct comparison. Gold's face texture no longer has decorative grain at UV seams, and roughness rises from 0.25 to 0.33 to soften extreme reflection bands. These are candidate fixes; GPU appearance is still unverified here.

Pearl retains the same base texture and zero metalness. Iridescence rises to 0.85 with IOR 1.45, thickness 280–380 nm, clearcoat roughness 0.045 and environment intensity multiplier 2.2. Base roughness is 0.23. This makes reflection colour and gloss stronger without adding a moving colour filter. Gold remains non-iridescent. The fallback highlight is stronger too. Geometry positions/normals/UVs are finite, sharp/refined dimensions match, JS syntax and production build pass. All effects remain motion-dependent.
## Iteration 03 — visible resin swirls and reactive gold glints

User's phone screenshot confirmed physical iridescence was effectively invisible. Replaced it with a procedural two-colour resin shader: original pip colour plus a chosen contrasting accent, broad warped ribbons, and a narrow satin crest. Mesh rotation shifts the pattern; there is no time uniform or perpetual animation. Ink is an independent alpha-masked layer, preserving pips and converted-six markings. The CSS fallback uses an approximate two-colour surface, not the Three.js shader.

Gold keeps the approved refined rounding and C lighting. A warm reflection sweep is driven by departure from the resting pose, fading out as a shake settles. Rotation inputs are normalized so scaling alone cannot trigger the glint. Existing gameplay idle beats already include gold and shiny dice. The review adds an optional periodic beat (off for reduced motion), preserving a quiet interval between shakes. The sharp cube remains as a diagnostic comparison.

Validation: production build and JS syntax pass; both shader hooks attach to the installed Three.js physical shader. Actual GLSL compilation and appearance still need the user's GPU browser; the supported review browser here has WebGL disabled. No gameplay rules, probabilities or scoring changed, so no balance simulations were run. Draft only.

## Iteration 04 — object studio and flowing resin

The two-colour resin is now an approved visual motif. Use it on collectible bodies and token inlays; preserve the pip-number palette and keep symbols as an independent, high-contrast ink layer. Keep the interface flat so the objects carry the material detail. Metal has its own warm/cool identity and glints during movement.

The user explicitly requested continuously swirling resin, superseding the earlier pose-only constraint for this material. The shader now rotates and advects the colour field over time, with additional pose response. The gameplay renderer advances the same shader while visible and playing, including during scoring; pause, hidden pages and reduced motion stop the flow. The CSS fallback approximates it. Metal glints remain pose-driven.

The single-renderer studio contains 84 objects in four collections:
- Materials: original, flowing resin, transparent coloured plastic, coloured glass, rounded gold, silver, copper, and the sharp gold comparison (six of each).
- Trinkets: all 16 existing engine definitions, in resin with their current icons/numbers and the red Six to One scrawl.
- Tokens: all eight special types plus four match tiers, with resin inlays, lathed/chamfered metal edges and radial cuts.
- Specials: all eight existing symbols on bone dice.

Plastic and glass use actual physical transmission and thickness, separate opaque pip decals, different roughness/IOR/attenuation, and a patterned backing to reveal refraction. Silver and copper use the existing metal glint shader with their own metal/highlight colours. These are material experiments, not new gameplay mechanics. The collection factory is reusable; gameplay token/trinket UI has not yet been replaced by the 3D catalogue.

Validation: JavaScript syntax and production build pass; browser loads the studio UI and its explicit WebGL-unavailable message. This environment still cannot render WebGL, so glass/reflection appearance and mobile rendering speed remain for device review. Studio flow is capped at approximately 30 renders/second, with a 1.5 pixel-ratio cap, one renderer, and only the selected collection visible. No gameplay/balance changes or simulations. Draft branch only.

## Iteration 05 — colour families, bone upgrades and matte

Numbered trinkets now use the numbered die's authoritative base colour, pearl accent, seed, swirl strength and polish. Both PIP and MULT trinkets of a given tier share that finish, as do the matching numbered upgrade tokens. Six to One and One More use the 1's red/orange; Loaded Die uses the 4's blue/pink-lilac. Six to One retains the six pips and red scrawl.

Big Bang now uses the normal bomb icon on the existing bone base with purple resin ribbons. Broad Columns and Broad Rows use the normal column/row icons on bone, with coral and teal respectively. Names and gameplay descriptions still distinguish their upgraded effects; no rules changed.

Removed the rejected plastic/glass showcase rows and their refraction backing. Added a matte row in the six original colours (roughness 1, no clearcoat, reduced specular intensity), and a satin extra palette of black, navy, teal, orange, wine and slate. The collection remains 84 objects. Animated swirls, C lighting and reactive metal glints remain.

Syntax, production build and standalone bundle pass. GPU appearance still needs device review; no new browser or gameplay checks were necessary for this material-only iteration. Kept on the draft branch.

## Iteration 06 — bone tokens and clearer symbols

Special-die tokens now have bone faces and bone edges, with dark purple ink and no resin swirl. Group tokens retain the exact numbered-die swirl palettes and their metal edges. Wild now uses a question mark; Shiny uses the former Wild four-point star. The shared icon definitions update both the studio and the game's Three.js/HTML presentations. Echo uses the extra palette's exact orange base and dark ink in the same satin finish. No gameplay changes.

Syntax, production build and standalone bundle pass. GPU appearance remains for device review; kept off main.
