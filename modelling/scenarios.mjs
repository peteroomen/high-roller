import { DEFAULTS, clone, TRINKETS, TYPES } from "../engine.mjs";
export const SCENARIOS = {
 baseline:{},
 "special-pips-0":{rules:{specialPips:0}},"special-pips-5":{rules:{specialPips:5}},
 "equal-rarity":{rules:{specialWeights:Object.fromEntries(TYPES.map(t=>[t,1]))}},
 "gold-0":{rules:{goldRate:0}},"gold-10":{rules:{goldRate:10}},
 "shiny-125":{rules:{shinyFactor:1.25}},
 "quad-x2":{rules:{charmValues:{quad:2}}},"quad-cost-14":{rules:{charmPrices:{quad:14}}},
 "no-new-trinkets":{disabledTrinkets:TRINKETS.filter(t=>!t.tier).map(t=>t.id)},
 "targets-minus-20":{targets:DEFAULTS.targets.map(n=>Math.round(n*.8))},
 "targets-plus-20":{targets:DEFAULTS.targets.map(n=>Math.round(n*1.2))},
 ...Object.fromEntries(TRINKETS.map(t=>[`start-${t.id}`,{trinkets:[t.id]}])),
 ...Object.fromEntries(TYPES.map((t,i)=>[`exposure-${t}`,{rates:TYPES.map((_,j)=>i===j?5:0)}])),
 "ones-build":{trinkets:['convert','ones']},
 "blast-build":{rates:[2,0,0,2,0,2,0,0],trinkets:['bigbomb','widecolumn','widerow']},
 "shiny-quad":{rates:[0,0,0,0,0,0,0,5],trinkets:['quad']},
};
export function scenarioConfig(name) {
  if (!SCENARIOS[name]) throw Error(`Unknown scenario ${name}`);
  return { ...clone(DEFAULTS), ...clone(SCENARIOS[name]) };
}
