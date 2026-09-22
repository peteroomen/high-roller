import { DEFAULTS, clone } from "../engine.mjs";
export const SCENARIOS = {
  baseline: {},
  "no-specials": { rates: [0, 0, 0, 0, 0] },
  "double-specials": { rates: [4, 4, 4, 4, 4] },
  "no-low-bonus": { lowBonus: false },
  "no-cascade-bonus": { rules: { cascadeStep: 0 } },
  "coin-rate-5": { rates: [2, 2, 2, 2, 5] },
  "reroll-cost-2": { rules: { rerollCost: 2 } },
  "eight-moves": { moves: 8 },
  "twelve-moves": { moves: 12 },
  "targets-minus-20": { targets: [208, 336, 496] },
  "targets-plus-20": { targets: [312, 504, 744] },
  ...Object.fromEntries(
    ["column", "color", "number", "bomb", "coin"].map((t, i) => [
      `without-${t}`,
      { rates: DEFAULTS.rates.map((n, j) => (i === j ? 0 : n)) },
    ]),
  ),
};
export function scenarioConfig(name) {
  if (!SCENARIOS[name]) throw Error(`Unknown scenario ${name}`);
  return { ...clone(DEFAULTS), ...clone(SCENARIOS[name]) };
}
