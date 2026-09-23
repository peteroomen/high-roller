import {writeFileSync,readFileSync} from 'node:fs';
import {TYPES,TRINKETS} from '../engine.mjs';
import {arena} from './power-study.mjs';
import {identity} from './eight-stage.mjs';
const config=JSON.parse(readFileSync(process.argv[2]??'modelling/results/eight-stage/candidate-d-config.json'));
const runs=+(process.argv[3]??100),buildIdentity=identity(),study={};
const common={trinkets:['convert','ones','pips-3','mult-3'],matchLevels:{3:5}};
const scenarios={plain:{},...Object.fromEntries(TRINKETS.map(t=>[t.id,{trinkets:[t.id]}])),common,
 ...Object.fromEntries(TYPES.map((t,i)=>[`common-${t}`,{...common,rates:TYPES.map((_,j)=>i===j?5:0)}])),
 big:{trinkets:['convert','pips-4','mult-4','pips-5'],matchLevels:{4:5,5:3}},
 jackpot:{trinkets:['convert','pips-5','mult-5','pips-6'],matchLevels:{5:5,6:3}},
 bombs:{rates:TYPES.map(t=>t==='bomb'?5:0),trinkets:['bigbomb']},
 columns:{rates:TYPES.map(t=>t==='column'?5:0),trinkets:['widecolumn']},
 rows:{rates:TYPES.map(t=>t==='row'?5:0),trinkets:['widerow']},
 specialMix:{rates:[5,0,5,5,0,5,0,0],trinkets:['bigbomb','widecolumn','widerow']},
 twentyMult2:{rates:TYPES.map(t=>t==='twenty'?5:0),rules:{...config.rules,specialMult:{twenty:2}}},
};
for(const [id,c]of Object.entries(scenarios)){study[id]=arena({...config,...c},runs,50001);console.log(id,Math.round(study[id].score.mean),Math.round(study[id].score.p50),Math.round(study[id].score.p99));}
writeFileSync('modelling/results/eight-stage/synergy.json',JSON.stringify({identity:buildIdentity,config,scenarios,runs,seedStart:50001,study},null,2));
