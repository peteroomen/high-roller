import { LIGHTING } from "./lighting.mjs";
import { applyPearlSwirl } from "./pearl.mjs";
import { applyGoldGlint } from "./gold-glint.mjs";
import { TIMING } from "./presentation.mjs";
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
// One stable body colour per pip value; specials use a bone material.
const PIP_HEX = [
  "#c87468",
  "#d1ad60",
  "#87a56b",
  "#6f9ebd",
  "#a187c4",
  "#c77f9e",
];
const SPECIAL_HEX = Object.fromEntries(
  ["column", "color", "number", "bomb", "twenty", "row", "wild", "shiny"].map((t) => [t, "#eee6d5"]),
);
const dieColor = (d) => (d.special ? SPECIAL_HEX[d.special] : d.gold ? "#d5a83c" : PIP_HEX[d.n - 1]);
const pipColor = (d) =>
  d.special ? "#51465e" : d.gold ? "#493019" : d.n === 2 ? "#342a22" : "#fff4dc";
const SYMBOL = {
  column: "\u2195",
  color: "\u25C8",
  number: "#",
  bomb: "\u2739",
  twenty:"20",wild:"?",shiny:"✦",
  row: "↔",
};
const ICON_PATHS = {
 twenty:"M14 31C14 13 44 13 44 32C44 45 16 56 14 78H44 M71 20C50 20 50 80 71 80C92 80 92 20 71 20Z",
 wild:"M29 30C29 7 72 7 72 31C72 46 50 46 50 61V65 M50 83V84",
 shiny:"M50 9L60 39L91 50L60 61L50 91L40 61L9 50L40 39Z",
 convert:"M10 25C10 12 34 12 34 28V39C34 52 10 52 10 39C10 26 34 26 34 39 M42 50H64 M55 41L64 50L55 59 M76 57L87 48V87 M76 87H96",
 cascade:"M15 18H48V44H77V77 M61 63L77 80L93 63 M11 53H32V80",
 ones:"M15 29L31 17V77 M14 77H47 M64 40V73 M48 57H82",
 quad:"M12 31L39 65 M39 31L12 65 M77 20L52 58H88 M77 20V80",
 rainbow:"M9 79C9 5 91 5 91 79 M25 79C25 26 75 26 75 79 M41 79C41 48 59 48 59 79",
 bigbomb:"M15 15H85V85H15Z M38 16V84 M62 16V84 M16 38H84 M16 62H84",
 widecolumn:"M24 14V86 M50 14V86 M76 14V86 M14 26L24 14L34 26 M40 26L50 14L60 26 M66 26L76 14L86 26",
 widerow:"M14 24H86 M14 50H86 M14 76H86 M26 14L14 24L26 34 M26 40L14 50L26 60 M26 66L14 76L26 86",
 column:"M50 12V88 M28 34L50 12L72 34 M28 66L50 88L72 66",
 row:"M12 50H88 M34 28L12 50L34 72 M66 28L88 50L66 72",
 color:"M50 8L92 50L50 92L8 50Z M50 28L72 50L50 72L28 50Z",
 number:"M38 14L28 86 M72 14L62 86 M16 38H86 M12 64H82",
 bomb:"M50 6L60 26L80 16L77 38L98 43L81 58L90 79L67 78L59 98L45 81L24 91L25 68L4 58L23 45L14 24L37 26Z",
 coin:"M72 29C63 13 26 17 26 36C26 58 74 42 74 65C74 85 34 89 24 72 M50 8V92"
};
const SCRAWL = "M35 37L57 21L49 80 M31 80L69 76 M54 26L47 72";
const conversionMarkup = () => `<svg viewBox="0 0 100 100" aria-hidden="true" focusable="false">${[24,76].flatMap(x=>[23,50,77].map(y=>`<circle cx="${x}" cy="${y}" r="8" fill="currentColor"/>`)).join('')}<path d="${SCRAWL}" fill="none" stroke="#b92835" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const iconMarkup = type => type==='convert'?conversionMarkup(): `<svg viewBox="0 0 100 100" aria-hidden="true" focusable="false"><path d="${ICON_PATHS[type]}" fill="${type==='bomb'?'currentColor':'none'}" stroke="currentColor" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const DOTS = {
  1: [[0, 0]],
  2: [
    [-1, 1],
    [1, -1],
  ],
  3: [
    [-1, 1],
    [0, 0],
    [1, -1],
  ],
  4: [
    [-1, 1],
    [1, 1],
    [-1, -1],
    [1, -1],
  ],
  5: [
    [-1, 1],
    [1, 1],
    [0, 0],
    [-1, -1],
    [1, -1],
  ],
  6: [
    [-1, 1],
    [1, 1],
    [-1, 0],
    [1, 0],
    [-1, -1],
    [1, -1],
  ],
};
class Board {
  constructor(canvas, animate) {
    this.animate = animate;
    this.meshes = /* @__PURE__ */ new Map();
    this.materials = /* @__PURE__ */ new Map();
    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(
      -3.17,
      3.17,
      3.17,
      -3.17,
      0.1,
      50,
    );
    this.camera.position.set(0, 0, 12);
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "low-power",
    });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.fillLight=new THREE.AmbientLight(0xffffff,.12);
    this.scene.add(this.fillLight);
    const room=new RoomEnvironment(),pmrem=new THREE.PMREMGenerator(this.renderer);
    this.environment=pmrem.fromScene(room,.04);
    this.scene.environment=this.environment.texture;
    this.scene.environmentIntensity=.65;
    room.dispose();pmrem.dispose();

    const light = new THREE.DirectionalLight(16772824, 3);
    light.position.set(-3, 6, 10);
    light.castShadow = true;
    light.shadow.mapSize.set(512, 512);
    light.shadow.camera.left = -4;
    light.shadow.camera.right = 4;
    light.shadow.camera.top = 4;
    light.shadow.camera.bottom = -4;
    light.shadow.normalBias = 0.03;
    this.keyLight=light;
    this.scene.add(light);
    this.rimLight=new THREE.DirectionalLight(0xffffff,.25);
    this.rimLight.position.set(4,2,-1);this.scene.add(this.rimLight);
    this.setLighting('dramatic',false);
    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(8, 8),
      new THREE.ShadowMaterial({ opacity: 0.35 }),
    );
    plane.position.z = -0.48;
    plane.receiveShadow = true;
    this.scene.add(plane);
    this.geometry = new RoundedBoxGeometry(0.79, 0.79, 0.79, 8, 0.055);
    this.cubeGeometry = new THREE.BoxGeometry(0.79, 0.79, 0.79);
    this.observer = new ResizeObserver(() => this.resize());
    this.observer.observe(canvas.parentElement);
    this.resize();
  }
  resize() {
    const r = this.renderer.domElement.parentElement.getBoundingClientRect();
    if (!r.width) return;
    this.renderer.setSize(r.width, r.width, false);
    this.render();
  }
  material(body, ink, n, special, mult = 2, shiny=false, gold=false, converted=false) {
    const key = [body, ink, n, special, mult, shiny, gold, converted].join("-");
    if (this.materials.has(key)) return this.materials.get(key);
    const c = document.createElement("canvas");
    c.width = c.height = 160;
    const ctx = c.getContext("2d");
    const pearl = shiny && !gold && !special;
    ctx.fillStyle = body;
    if (!pearl && !gold) ctx.fillRect(0, 0, 160, 160);
    ctx.fillStyle = "#493c2d12";
    for(let i=0;i<(gold||pearl?0:210);i++) ctx.fillRect((i*47)%160,(i*73+Math.floor(i/7)*11)%160,1.3,1.3);
    ctx.fillStyle = ink;
    const scale = special ? 31 : 34,
      cy = special ? 72 : 80;
    for (const [x, y] of special ? [] : DOTS[converted?6:n] || []) {
      ctx.beginPath();
      ctx.arc(80 + x * scale, cy - y * scale, 10, 0, Math.PI * 2);
      ctx.fill();
    }
    if(converted) {
      ctx.save();ctx.translate(0,0);ctx.scale(1.6,1.6);
      ctx.strokeStyle='#b92835';ctx.lineWidth=9;ctx.lineCap='round';ctx.lineJoin='round';
      ctx.stroke(new Path2D(SCRAWL));ctx.restore();
    }
    if (special) {
      ctx.save();ctx.translate(25,25);ctx.scale(1.1,1.1);
      ctx.strokeStyle=ink;ctx.fillStyle=ink;ctx.lineWidth=7;ctx.lineCap="round";ctx.lineJoin="round";
      const path=new Path2D(ICON_PATHS[special]);
      if(special==='bomb')ctx.fill(path);else ctx.stroke(path);
      ctx.restore();
    }
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    const mat = new THREE.MeshPhysicalMaterial({
      map: tex,
      roughness: gold?.33:shiny?.23:.55,
      metalness: gold?1:0,
      clearcoat: gold?.12:shiny?1:.08,
      clearcoatRoughness:shiny?.045:.22,
      iridescence: 0,
      envMapIntensity: 1,
    });
    if (pearl) applyPearlSwirl(mat, body, n);
    if (gold) applyGoldGlint(mat, body);
    this.materials.set(key, mat);
    return mat;
  }
  mats(d) {
    return Array.from({ length: 6 }, () =>
      this.material(dieColor(d), pipColor(d), d.n, d.special, d.mult, d.shiny, d.gold, d.converted),
    );
  }
  setLighting(name, render=true) {
    const preset=LIGHTING[name]??LIGHTING.table;
    this.fillLight.intensity=preset.ambient;
    this.keyLight.intensity=preset.key;this.keyLight.position.set(...preset.position);
    this.rimLight.intensity=preset.rim;
    this.scene.environmentIntensity=preset.environment;
    this.scene.environmentRotation.y=preset.rotation;
    if(render)this.render();
  }
  render() {
    this.renderer.render(this.scene, this.camera);
  }
  advanceFinish(seconds) {
    for (const mat of this.materials.values()) {
      if (mat.userData.pearlUniforms) mat.userData.pearlUniforms.hrPearlTime.value += seconds;
    }
  }
  async set(board, { duration = 0, roll = false } = {}) {
    const ids = new Set(board.map((d) => d.id));
    for (const [id, m] of this.meshes)
      if (!ids.has(id)) {
        this.scene.remove(m);
        this.meshes.delete(id);
      }
    const transitions = [];
    board.forEach((d, i) => {
      let mesh = this.meshes.get(d.id),
        isNew = !mesh;
      if (!mesh) {
        mesh = new THREE.Mesh(this.geometry, this.mats(d));
        mesh.castShadow = true;
        this.scene.add(mesh);
        this.meshes.set(d.id, mesh);
        mesh.position.set(
          (i % 6) - 2.5,
          2.5 - Math.floor(i / 6) + (duration ? 6 : 0),
          0,
        );
      } else mesh.material = this.mats(d);
      const target = new THREE.Vector3(
        (i % 6) - 2.5,
        2.5 - Math.floor(i / 6),
        0,
      );
      transitions.push({
        mesh,
        start: mesh.position.clone(),
        target,
        spin: (isNew || roll) && duration > 0,
      });
      mesh.scale.setScalar(1);
    });
    if (duration)
      await this.animate(duration, (t) => {
        const ease = 1 - Math.pow(1 - t, 3);
        for (const x of transitions) {
          x.mesh.position.lerpVectors(x.start, x.target, ease);
          x.mesh.rotation.set(
            0.1 + (x.spin ? (1 - ease) * Math.PI * 2 : 0),
            -0.13 + (x.spin ? (1 - ease) * Math.PI * 2 : 0),
            0,
          );
        }
        this.render();
      });
    for (const x of transitions) {
      x.mesh.position.copy(x.target);
      x.mesh.rotation.set(0.1, -0.13, 0);
    }
    this.render();
  }
  async remove(indices, board, duration) {
    const meshes = indices
      .map((i) => this.meshes.get(board[i].id))
      .filter(Boolean);
    await this.animate(duration, (t) => {
      for (const m of meshes) {
        m.scale.setScalar(Math.max(.01,t<.22?1+t*.9:1.198*Math.pow(1-(t-.22)/.78,2)));
        m.rotation.z = t * 0.45;
        m.position.z = Math.sin(t*Math.PI)*.65;
      }
      this.render();
    });
  }
  idle(b,amount) {
    for(const d of b) if(d.special||d.gold||d.shiny) { const m=this.meshes.get(d.id); if(m) {m.rotation.z=amount*.07;m.rotation.y=-.13+amount*.12;} }
    this.render();
  }
  async wobble(indices, board, duration=TIMING.shake) {
    const meshes = indices.map((i) => this.meshes.get(board[i].id));
    await this.animate(duration, (t) => {
      for (const m of meshes) {
        m.rotation.z = Math.sin(t * Math.PI * 4) * (1 - t) * 0.1;
        m.scale.setScalar(1+Math.sin(t*Math.PI)*.22);
      }
      this.render();
    });
    for (const m of meshes) {m.rotation.z=0;m.scale.setScalar(1);}
    this.render();
  }
}
export { iconMarkup, Board, SPECIAL_HEX, dieColor, pipColor, SYMBOL, ICON_PATHS, SCRAWL };
