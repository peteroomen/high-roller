import {Board,iconMarkup} from './board.js';
import {TRINKETS,tierLabel} from './engine.mjs';
import {createTrinket,createToken,trinketAppearance,tokenAppearance} from './object-studio.mjs';

// Native DOM placeholders preserve layout, accessibility, clipping and scoring
// transforms. One small shared WebGL atlas supplies all visible object canvases.
function markup(kind,id,look,art,classes){
  return `<span class="${classes} object-piece ${look.swirl?'object-resin':''}" data-object-kind="${kind}" data-object-id="${id}" style="--piece:${look.body};--piece-accent:${look.accent??look.body};--piece-ink:${look.ink}"><span class="object-fallback" aria-hidden="true">${art}</span><canvas class="object-canvas" aria-hidden="true"></canvas></span>`;
}
export function trinketMarkup(t){
  const look=trinketAppearance(t),art=t.tier?`<b>${tierLabel(t.tier)}</b><small>${t.stat==='pips'?'PIP':'MULT'}</small>`:iconMarkup(look.icon);
  return markup('trinket',t.id,look,art,`trinket-die ${t.stat??'charm'}`);
}
export function tokenMarkup(type,classes='token-coin'){
  const numeric=typeof type==='number',look=tokenAppearance(type);
  return markup('token',type,look,numeric?`<b>${tierLabel(type)}</b>`:iconMarkup(type),`${classes} ${numeric?'number-token':''}`);
}
export class ObjectViews {
  constructor({webgl,motion}){
    this.motion=motion;this.cache=new Map();this.elements=[];this.dirty=true;this.lastPaint=0;this.lastTime=0;this.time=0;
    this.observer=new MutationObserver(()=>{this.elements=[...document.querySelectorAll('[data-object-kind]')];this.dirty=true;});
    this.observer.observe(document.body,{childList:true,subtree:true});
    addEventListener('resize',()=>{this.dirty=true;});
    addEventListener('scroll',()=>{this.dirty=true;},{capture:true,passive:true});
    if(webgl)try{
      const host=document.createElement('div'),atlas=document.createElement('canvas');host.append(atlas);
      this.board=new Board(atlas,async(_,fn)=>fn(1));this.board.observer.disconnect();
      const renderer=this.board.renderer;renderer.setPixelRatio(1);renderer.autoClear=false;renderer.setScissorTest(true);
      this.atlas=atlas;atlas.addEventListener('webglcontextlost',()=>this.fallback());
    }catch(error){this.board=null;console.warn('Object artwork using CSS fallback:',error.message);}
    const frame=now=>{this.frame= requestAnimationFrame(frame);try{this.tick(now);}catch(error){this.fallback(error);}};this.frame=requestAnimationFrame(frame);
  }
  fallback(error){
    this.board=null;this.dirty=true;
    for(const el of this.elements)el.classList.remove('object-ready');
    if(error)console.warn('Object artwork using CSS fallback:',error.message);
  }
  getObject(el){
    const key=el.dataset.objectKind+':'+el.dataset.objectId;
    if(!this.cache.has(key)){
      const id=el.dataset.objectId;
      const object=el.dataset.objectKind==='trinket'?createTrinket(this.board,TRINKETS.find(t=>t.id===id)):createToken(/^\d+$/.test(id)?Number(id):id);
      object.visible=false;this.board.scene.add(object);this.cache.set(key,object);
    }
    return this.cache.get(key);
  }
  tick(now){
    const dt=Math.min(.05,(now-this.lastTime)/1000);this.lastTime=now;
    const moving=this.motion()&&!document.hidden;
    if(moving)this.time+=dt;
    if(document.hidden||now-this.lastPaint<50)return;
    // Idle resin animates at 20 fps; static/reduced-motion pieces only refresh
    // when their DOM changes. Canvases naturally follow CSS shake/zoom/scroll.
    const animated=moving&&this.elements.some(el=>el.classList.contains('object-resin'));
    if(!this.dirty&&!animated)return;
    this.lastPaint=now;this.dirty=false;
    const modal=document.querySelector('dialog[open]');
    const visible=this.elements.filter(el=>{
      if(!el.isConnected||!el.getClientRects().length||modal&&!modal.contains(el))return false;
      const r=el.getBoundingClientRect();return r.width>0&&r.height>0&&r.bottom>0&&r.top<innerHeight&&r.right>0&&r.left<innerWidth;
    });
    if(!this.board){
      if(moving)for(const el of visible)el.style.setProperty('--object-flow',`${this.time*18}deg`);
      return;
    }
    if(!visible.length)return;
    const byObject=new Map();
    for(const el of visible){const object=this.getObject(el);if(!byObject.has(object))byObject.set(object,[]);byObject.get(object).push(el);}
    const renderer=this.board.renderer,size=128,columns=Math.min(4,byObject.size),rows=Math.ceil(byObject.size/columns);
    if(this.atlas.width!==columns*size||this.atlas.height!==rows*size)renderer.setSize(columns*size,rows*size,false);
    const tiles=[];let i=0;
    for(const [object,elements] of byObject){
      const x=i%columns*size,y=Math.floor(i/columns)*size,bottom=this.atlas.height-y-size;i++;
      object.traverse(m=>{if(m.isMesh)for(const mat of Array.isArray(m.material)?m.material:[m.material])if(mat.userData.pearlUniforms)mat.userData.pearlUniforms.hrPearlTime.value=this.time;});
      const half=elements[0].dataset.objectKind==='token'?.50:.57,camera=this.board.camera;
      camera.left=-half;camera.right=half;camera.top=half;camera.bottom=-half;camera.updateProjectionMatrix();
      renderer.setViewport(x,bottom,size,size);renderer.setScissor(x,bottom,size,size);renderer.clear();
      object.visible=true;this.board.render();object.visible=false;tiles.push({x,y,elements});
    }
    // Copy in the same task, before the non-preserved WebGL buffer is discarded.
    for(const {x,y,elements} of tiles)for(const el of elements){
      const canvas=el.querySelector('canvas');if(canvas.width!==size){canvas.width=canvas.height=size;}
      const ctx=canvas.getContext('2d');ctx.clearRect(0,0,size,size);ctx.drawImage(this.atlas,x,y,size,size,0,0,size,size);el.classList.add('object-ready');
    }
  }
}
