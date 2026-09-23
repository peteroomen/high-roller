import * as THREE from 'three';
import {Board} from './board.js';
import {LIGHTING} from './lighting.mjs';
import {createStudioCollection,MATERIAL_ROWS} from './object-studio.mjs';
const canvas=document.querySelector('canvas'),status=document.querySelector('#render-status'),wrap=document.querySelector('.canvas-wrap');
const labels=document.querySelector('#labels'),flow=document.querySelector('#flow'),autoShake=document.querySelector('#auto-shake');
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
flow.checked=autoShake.checked=!reduced;
const animate=(duration,fn)=>new Promise(resolve=>{const start=performance.now();const frame=now=>{const t=Math.min(1,(now-start)/duration);fn(t);if(t<1)requestAnimationFrame(frame);else resolve();};requestAnimationFrame(frame);});
const info={
 materials:['Material palette','Compare the original colours in satin, flowing resin and matte. The extra palette runs black, navy, teal, orange, wine and slate from left to right.'],
 trinkets:['Trinket dice','Numbered trinkets share their dice colours and swirls. Echo uses satin orange. Six to One uses red/orange; bomb and sweeper upgrades use coloured ribbons on bone.'],
 tokens:['Upgrade tokens','Eight bone special-die tokens and four swirling match-level tokens. The numbered tokens share their matching dice colours; Wild is a question mark and Shiny is a four-point star.'],
 specials:['Special dice','The existing special symbols on warm bone. Shiny is shown as its token symbol; the numbered result uses flowing resin.'],
};
let board,collections,current='materials',items=[],width=7.4,height=11.2,busy=false,lastFrame=0,lastPaint=0,frameHandle,beat;
const getMaterials=objects=>{const set=new Set();for(const item of objects)item.object.traverse(m=>{if(m.isMesh)for(const mat of Array.isArray(m.material)?m.material:[m.material])set.add(mat);});return set;};
let activeMaterials=new Set();
function layout(){
 if(!collections)return;
 const isMaterials=current==='materials',cols=isMaterials?6:wrap.clientWidth<600?3:4;
 width=isMaterials?7.4:cols*1.65+.45;
 const step=isMaterials?1.35:1.85,rows=Math.ceil(items.length/cols);
 height=isMaterials?11.2:rows*step+.5;
 wrap.style.aspectRatio=`${width}/${height}`;
 labels.replaceChildren();
 items.forEach((item,i)=>{
   const row=Math.floor(i/cols),x=(i%cols-(cols-1)/2)*(isMaterials?1:1.65);
   const y=height/2-(isMaterials?.9:.95)-row*step;
   item.object.position.set(x,y,0);item.object.scale.setScalar(isMaterials?1:1.12);
   item.object.userData.restScale=isMaterials?1:1.12;
   if(!isMaterials){const label=document.createElement('span');label.className='object-label';label.textContent=item.name;label.title=item.note??item.name;label.style.left=`${(x/width+.5)*100}%`;label.style.top=`${(.5-(y-.63)/height)*100}%`;label.style.width=`${1.55/width*100}%`;labels.append(label);}
 });
 if(isMaterials)for(let row=0;row<MATERIAL_ROWS.length;row++){
   const label=document.createElement('div');label.className='row-label';label.style.top=`${(.22+row*step)/height*100}%`;
   const name=document.createElement('b');name.textContent=MATERIAL_ROWS[row][1];const note=document.createElement('small');note.textContent=MATERIAL_ROWS[row][2];label.append(name,note);labels.append(label);
 }
 board.camera.left=-width/2;board.camera.right=width/2;board.camera.top=height/2;board.camera.bottom=-height/2;board.camera.updateProjectionMatrix();
 const rect=wrap.getBoundingClientRect();board.renderer.setSize(rect.width,rect.height,false);board.render();
}
function show(name){
 if(busy)return;
 current=name;items=collections[name];
 for(const [key,entries] of Object.entries(collections))for(const {object} of entries)object.visible=key===name;
 activeMaterials=getMaterials(items);
 document.querySelectorAll('[data-collection]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.collection===name)));
 document.querySelector('#collection-title').textContent=info[name][0];document.querySelector('#collection-note').textContent=info[name][1];document.querySelector('#collection-count').textContent=`${items.length} objects`;
 canvas.setAttribute('aria-label',`${info[name][0]}: ${items.map(i=>i.name).join(', ')}`);
 layout();
}
async function shake(){
 if(busy)return;busy=true;
 const targets=items.filter(i=>i.kind!=='standard'),start=targets.map(i=>i.object.rotation.clone());
 document.querySelectorAll('[data-collection]').forEach(b=>b.disabled=true);
 await animate(850,t=>{
   const rock=Math.sin(t*Math.PI*4)*Math.pow(1-t,1.4);
   targets.forEach((item,i)=>{const m=item.object;m.rotation.set(start[i].x,start[i].y+rock*.16,start[i].z+rock*.10);m.scale.setScalar(m.userData.restScale*(1+Math.sin(t*Math.PI)*.045));});board.render();
 });
 targets.forEach((item,i)=>{item.object.rotation.copy(start[i]);item.object.scale.setScalar(item.object.userData.restScale);});board.render();busy=false;
 document.querySelectorAll('[data-collection]').forEach(b=>b.disabled=false);
}
try{
 board=new Board(canvas,animate);board.renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));
 board.observer.disconnect();board.resize=layout;
 const shadow=board.scene.children.find(c=>c.material?.isShadowMaterial);
 shadow.geometry.dispose();shadow.geometry=new THREE.PlaneGeometry(12,18);
 board.keyLight.shadow.camera.top=8;board.keyLight.shadow.camera.bottom=-8;board.keyLight.shadow.camera.left=-8;board.keyLight.shadow.camera.right=8;board.keyLight.shadow.camera.updateProjectionMatrix();
 collections=createStudioCollection(board);
 for(const entries of Object.values(collections))for(const {object} of entries)board.scene.add(object);
 board.observer=new ResizeObserver(layout);board.observer.observe(wrap);
 document.querySelectorAll('[data-collection]').forEach(b=>b.onclick=()=>show(b.dataset.collection));
 document.querySelectorAll('[data-light]').forEach(b=>b.onclick=()=>{board.setLighting(b.dataset.light);document.querySelectorAll('[data-light]').forEach(p=>p.setAttribute('aria-pressed',String(p===b)));document.querySelector('#light-description').textContent=LIGHTING[b.dataset.light].description;});
 document.querySelector('#shake').onclick=shake;
 document.querySelector('#angle').oninput=e=>{if(busy)return;autoShake.checked=false;const angle=Number(e.target.value)*Math.PI/180;for(const entries of Object.values(collections))for(const {object} of entries)object.rotation.y=angle;board.render();};
 document.querySelector('#save-image').onclick=()=>{board.render();const a=document.createElement('a');a.download=`High-Roller-${current}-06.png`;a.href=canvas.toDataURL('image/png');a.click();};
 beat=setInterval(()=>{if(autoShake.checked&&!document.hidden)void shake();},4400);
 const frame=now=>{
   const seconds=Math.min(.06,(now-lastFrame)/1000);lastFrame=now;
   if(flow.checked&&!document.hidden){let changed=false;for(const material of activeMaterials){const u=material.userData.pearlUniforms;if(u){u.hrPearlTime.value+=seconds;changed=true;}}if(changed&&now-lastPaint>=32){board.render();lastPaint=now;}}
   frameHandle=requestAnimationFrame(frame);
 };
 show('materials');frameHandle=requestAnimationFrame(frame);
 status.textContent='84 objects · animated resin shader · matte and expanded colour palette · movement-driven metal glints';
 addEventListener('pagehide',()=>{clearInterval(beat);cancelAnimationFrame(frameHandle);board.observer.disconnect();},{once:true});
}catch(error){
 status.textContent=`The 3D studio could not open: ${error.message}. This file needs a WebGL2 browser with hardware acceleration.`;status.classList.add('unavailable');wrap.classList.add('failed');document.querySelectorAll('button,input').forEach(el=>el.disabled=true);console.warn('Object studio:',error);
}
