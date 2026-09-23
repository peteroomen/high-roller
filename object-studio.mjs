import * as THREE from 'three';
import { ICON_PATHS, SCRAWL, SPECIAL_HEX, dieColor, pipColor } from './board.js';
import { applyPearlSwirl, PEARL_ACCENTS } from './pearl.mjs';
import { applyGoldGlint } from './gold-glint.mjs';
import { TRINKETS, TYPES, MATCH_TIERS, tierLabel, trinketDescription } from './engine.mjs';

export const SPECIAL_NAMES = { column:'Column sweeper', row:'Row sweeper', color:'Special sweep', number:'Number sweep', bomb:'Bomb', twenty:'Twenty', wild:'Wild', shiny:'Shiny' };
export const MATERIAL_ROWS = [
  ['standard','Original','Satin · six face colours'],
  ['pearl','Swirl resin','Two colours · flowing shader'],
  ['matte','Matte','Six face colours · soft, dry finish'],
  ['palette','Extra palette','Black · navy · teal · orange · wine · slate'],
  ['gold','Gold','Warm metal · reactive glint'],
  ['silver','Silver','Cool metal · reactive glint'],
  ['copper','Copper','Rose metal · reactive glint'],
  ['cube','Gold cube','Sharp-edge comparison'],
];
const COLOURS = ['#dfc48b','#b39bc9','#8fb6a3','#d29791','#88a8c6','#bd9dc2'];
const ACCENTS = ['#8cb9ac','#79c8c0','#e1c887','#bca1d6','#cfa9d8','#edae88'];
const INK = '#322939';
const EXTRA_PALETTE = [
  {name:'Black',body:'#25262c',ink:'#f5e9ce'},
  {name:'Navy',body:'#354467',ink:'#f5e9ce'},
  {name:'Teal',body:'#398d88',ink:'#fff4dc'},
  {name:'Orange',body:'#dc8b47',ink:'#3a2928'},
  {name:'Wine',body:'#87435c',ink:'#fff4dc'},
  {name:'Slate',body:'#8d9298',ink:'#302b36'},
];
const UPGRADE_FINISHES = {
  bigbomb:{icon:'bomb',accent:'#a187c4',seed:5},
  widecolumn:{icon:'column',accent:'#d58268',seed:1},
  widerow:{icon:'row',accent:'#54a99b',seed:3},
};

function texture(draw) {
  const canvas=document.createElement('canvas');canvas.width=canvas.height=256;
  const ctx=canvas.getContext('2d');draw(ctx);
  const map=new THREE.CanvasTexture(canvas);map.colorSpace=THREE.SRGBColorSpace;map.anisotropy=4;
  return map;
}
function icon(ctx,id,ink=INK) {
  ctx.save();ctx.translate(44,44);ctx.scale(1.68,1.68);
  ctx.fillStyle=ink;ctx.strokeStyle=ink;ctx.lineWidth=6;ctx.lineCap='round';ctx.lineJoin='round';
  if(id==='convert') {
    for(const x of [24,76])for(const y of [23,50,77]){ctx.beginPath();ctx.arc(x,y,8,0,Math.PI*2);ctx.fill();}
    ctx.strokeStyle='#b92835';ctx.lineWidth=9;ctx.stroke(new Path2D(SCRAWL));
  } else {
    const path=new Path2D(ICON_PATHS[id]);
    if(id==='bomb')ctx.fill(path);else ctx.stroke(path);
  }
  ctx.restore();
}
function inscription(ctx,number,caption,ink=INK) {
  ctx.fillStyle=ink;ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.font=`700 ${String(number).length>1?104:120}px system-ui,sans-serif`;
  ctx.fillText(String(number),128,caption?107:132);
  if(caption){ctx.font='700 27px system-ui,sans-serif';ctx.fillText(caption,128,186);}
}
function matchingResin(map,face,{body=dieColor({n:face}),accent}={}) {
  // Same seed, colours, strength and polish as the equivalent numbered die.
  const material=new THREE.MeshPhysicalMaterial({map,roughness:.23,clearcoat:1,clearcoatRoughness:.045});
  applyPearlSwirl(material,body,face);
  if(accent)material.userData.pearlUniforms.hrPearlAccent.value.set(accent);
  return material;
}
function pose(object,index=0) {
  object.rotation.set(.1,-.13,[-.10,.07,-.045,.11][index%4]);
  object.traverse(child=>{if(child.isMesh)child.castShadow=true;});
  return object;
}
function metalDie(board,n,kind) {
  if(kind==='gold'||kind==='cube')return new THREE.Mesh(kind==='cube'?board.cubeGeometry:board.geometry,board.mats({n,gold:true}));
  const colour=kind==='silver'?'#bfc8d4':'#c78159';
  const ink=kind==='silver'?'#303642':'#482b27';
  const map=board.material(colour,ink,n,null,2,false,true).map;
  const material=new THREE.MeshPhysicalMaterial({map,metalness:1,roughness:kind==='silver'?.26:.3,clearcoat:.16});
  applyGoldGlint(material,colour,kind==='silver'?'#e6f4ff':'#ffd4b9');
  return new THREE.Mesh(board.geometry,material);
}
function materialDie(board,n,kind) {
  let object;
  if(kind==='matte'||kind==='palette'){
    const colour=kind==='palette'?EXTRA_PALETTE[n-1]:{body:dieColor({n}),ink:pipColor({n})};
    const material=board.material(colour.body,colour.ink,n,null).clone();
    if(kind==='matte'){material.roughness=1;material.clearcoat=0;material.specularIntensity=.18;}
    object=new THREE.Mesh(board.geometry,material);
  }
  else if(['gold','silver','copper','cube'].includes(kind))object=metalDie(board,n,kind);
  else object=new THREE.Mesh(board.geometry,board.mats({n,shiny:kind==='pearl'}));
  object.rotation.set(.1,-.13,0);
  object.traverse(m=>{if(m.isMesh)m.castShadow=true;});
  return object;
}
export function trinketAppearance(t) {
  const index=TRINKETS.indexOf(t),upgrade=UPGRADE_FINISHES[t.id];
  const face=t.tier??({convert:1,ones:1,quad:4}[t.id]);
  if(t.id==='cascade')return {...EXTRA_PALETTE.find(c=>c.name==='Orange'),icon:t.icon,swirl:false};
  if(upgrade)return {body:SPECIAL_HEX[upgrade.icon],accent:upgrade.accent,ink:'#51465e',icon:upgrade.icon,seed:upgrade.seed,swirl:true};
  if(face)return {body:dieColor({n:face}),accent:PEARL_ACCENTS[face-1],ink:pipColor({n:face}),icon:t.icon,seed:face,swirl:true};
  return {body:COLOURS[index%6],accent:ACCENTS[index%6],ink:INK,icon:t.icon,seed:index%6+1,swirl:true,strength:.75};
}
export function tokenAppearance(type) {
  return typeof type==='number'?{body:dieColor({n:type}),accent:PEARL_ACCENTS[type-1],ink:pipColor({n:type}),seed:type,swirl:true}:{body:SPECIAL_HEX[type],ink:'#51465e',icon:type,swirl:false};
}
function objectMaterial(map,look) {
  if(!look.swirl)return new THREE.MeshPhysicalMaterial({map,roughness:.55,clearcoat:.08,clearcoatRoughness:.22});
  const material=matchingResin(map,look.seed,{body:look.body,accent:look.accent});
  material.userData.pearlUniforms.hrPearlStrength.value=look.strength??1;
  if(look.strength===.75){material.roughness=.29;material.clearcoat=.8;material.clearcoatRoughness=.08;}
  return material;
}
export function createTrinket(board,t,index=TRINKETS.indexOf(t)) {
  const look=trinketAppearance(t);
  const map=texture(ctx=>{
    if(!look.swirl){ctx.fillStyle=look.body;ctx.fillRect(0,0,256,256);}
    if(t.tier)inscription(ctx,tierLabel(t.tier),t.stat==='pips'?'PIP':'MULT',look.ink);else icon(ctx,look.icon,look.ink);
  });
  return pose(new THREE.Mesh(board.geometry,objectMaterial(map,look)),index);
}
export function createToken(type,index=[...TYPES,...MATCH_TIERS].indexOf(type)) {
  const group=new THREE.Group(),isMulti=typeof type==='number',look=tokenAppearance(type);
  const map=texture(ctx=>{
    if(!look.swirl){ctx.fillStyle=look.body;ctx.fillRect(0,0,256,256);}
    if(isMulti)inscription(ctx,tierLabel(type),'MATCH',look.ink);else icon(ctx,type,look.ink);
  });
  const material=objectMaterial(map,look);
  const edge=new THREE.MeshStandardMaterial({color:isMulti?'#bb8c63':SPECIAL_HEX[type],metalness:isMulti?.78:0,roughness:isMulti?.3:.55});
  // Lathed edge gives the token real thickness and a chamfered silhouette.
  const profile=[[0,-.067],[.37,-.067],[.405,-.058],[.423,-.032],[.423,.032],[.405,.058],[.37,.067],[0,.067]];
  const body=new THREE.Mesh(new THREE.LatheGeometry(profile.map(([x,y])=>new THREE.Vector2(x,y)),64),edge);
  body.rotation.x=Math.PI/2;group.add(body);
  for(const side of [1,-1]){
    const face=new THREE.Mesh(new THREE.CircleGeometry(.397,64),material);face.position.z=.072*side;if(side<0)face.rotation.y=Math.PI;group.add(face);
  }
  // Subtle radial cuts make a minted edge, not a painted outline.
  const notchGeometry=new THREE.BoxGeometry(.014,.032,.045);
  const notchMaterial=new THREE.MeshStandardMaterial({color:isMulti?'#76533c':'#c5baa6',metalness:isMulti?.7:0,roughness:isMulti?.4:.6});
  for(let i=0;i<32;i++){
    const angle=i*Math.PI/16,notch=new THREE.Mesh(notchGeometry,notchMaterial);
    notch.position.set(Math.cos(angle)*.420,Math.sin(angle)*.420,0);notch.rotation.z=angle;group.add(notch);
  }
  return pose(group,index);
}
export function createStudioCollection(board) {
  const materialItems=MATERIAL_ROWS.flatMap(([kind,name])=>Array.from({length:6},(_,i)=>({object:materialDie(board,i+1,kind),name:kind==='palette'?EXTRA_PALETTE[i].name:`${name} ${i+1}`,kind,row:MATERIAL_ROWS.findIndex(r=>r[0]===kind)})));
  const trinkets=TRINKETS.map((t,i)=>({object:createTrinket(board,t,i),name:t.name,note:trinketDescription(t,{}),id:t.id}));
  const tokens=[...TYPES,...MATCH_TIERS].map((type,i)=>({object:createToken(type,i),name:typeof type==='number'?`${tierLabel(type)}-match`:SPECIAL_NAMES[type],note:typeof type==='number'?'Match level token':'Special die token'}));
  const specials=TYPES.map((type,i)=>({object:pose(new THREE.Mesh(board.geometry,board.mats({special:type,n:1})),i),name:SPECIAL_NAMES[type],note:type==='shiny'?'Spawn token symbol':'Bone · dark ink'}));
  return {materials:materialItems,trinkets,tokens,specials};
}
