import { DEFAULTS, clone } from "../engine.mjs";
export const SCENARIOS = {
  baseline: {},
  "no-upgrades":{disableUpgrades:true},
  "no-trinkets":{disableTrinkets:true},
  "boosts-half":{rules:{levelBoost:[1,2,3,4],trinketPips:[8,16,28,44],trinketMult:[1,2,4,6]}},
  "boosts-double":{rules:{levelBoost:[4,8,12,16],trinketPips:[32,64,112,176],trinketMult:[4,8,16,24]}},
  "trinket-cost-3":{rules:{trinketCost:3}},
  "multi-pack-cost-6":{rules:{multiPackCost:6}},
  "tokens-1-percent":{rules:{tokenBoost:1}},
  "tokens-5-percent":{rules:{tokenBoost:5}},
  "special-cap-50":{rules:{specialRateCap:50}},
  ...Object.fromEntries([3,4,5,6].flatMap(t=>['pips','mult'].map(stat=>[`start-${stat}-${t}`,{trinkets:[`${stat}-${t}`]}]))),
  "pack-cost-7":{rules:{packCost:7}},
  "round-reward-3":{rules:{roundReward:3}},
  "tokens-3-percent":{rules:{tokenBoost:3}},
  "special-mult-1": {
    rules: {
      specialMult: { column: 1, color: 1, number: 1, bomb: 1, coin: 1, row: 1 },
    },
  },
  "special-mult-3": {
    rules: {
      specialMult: { column: 3, color: 3, number: 3, bomb: 3, coin: 3, row: 3 },
    },
  },
  "no-specials": { rates: [0, 0, 0, 0, 0, 0], draft:false, rules:{tokenBoost:0} },
  "double-specials": { rules:{tokenBoost:10} },
  "no-low-bonus": { lowBonus: false },
  "no-cascade-bonus": { rules: { cascadeStep: 0 } },
  "coin-rate-5": { rates: [0, 0, 0, 0, 5, 0] },
  "reroll-cost-2": { rules: { rerollCost: 2 } },
  "eight-moves": { moves: 8 },
  "twelve-moves": { moves: 12 },
  "targets-minus-20": { targets: DEFAULTS.targets.map(n=>Math.round(n*.8)) },
  "targets-plus-20": { targets: DEFAULTS.targets.map(n=>Math.round(n*1.2)) },
  ...Object.fromEntries(
    ["column", "color", "number", "bomb", "coin", "row"].map((t, i) => [
      `without-${t}`,
      { disabledTypes:[t] },
    ]),
  ),
};
export function scenarioConfig(name) {
  if (!SCENARIOS[name]) throw Error(`Unknown scenario ${name}`);
  return { ...clone(DEFAULTS), ...clone(SCENARIOS[name]) };
}
