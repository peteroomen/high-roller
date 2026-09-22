# High Roller development rules

The user requires modelling for the whole game. Treat the headless model as a required part of every gameplay change.

- Keep authoritative rules in `engine.mjs`. Both the UI and full-run simulations must call that engine; never duplicate a simplified scoring/combat/economy model.
- Every gameplay addition or balance change needs an engine test, measurable run telemetry, and a scenario/policy capable of exercising it. Update `modelling/README.md` coverage before shipping. Cosmetic copy/style edits do not require new tests.
- Preserve deterministic seeds and replayable accepted actions. Exports must include configuration and build/engine identity.
- Player policies see the current board, rules, moves, score and coins only. Never feed the true RNG state or future board into a policy. Rollout predictions must use a separate random stream.
- Report complete runs, intermediate round reach/clear rates, economy and failure margins. Include confidence intervals and sample counts. Never label a bot win rate as a human win rate.
- Flag censored runs, loop guards and conservation failures explicitly. Do not silently count simulator failures as player losses.
- Use matched seed sets for comparisons and a separate held-out seed range to confirm proposed tuning. Do not change balance solely to improve one bot.
- Run `npm test`, `npm run simulate:smoke`, and `npm run build` before handing off gameplay changes. Broad sweeps are for material tuning work, not every CSS edit.
- Deployment is Vercel with the root directory, Vite preset, `npm ci`, `npm run build`, and `dist`. No secrets are required.
