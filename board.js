import { TIMING } from "./presentation.mjs";
import * as THREE from "three";
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
  ["column", "color", "number", "bomb", "coin", "row"].map((t) => [t, "#eee6d5"]),
);
const dieColor = (d) => (d.special ? SPECIAL_HEX[d.special] : PIP_HEX[d.n - 1]);
const pipColor = (d) =>
  d.special ? "#51465e" : d.n === 2 ? "#342a22" : "#fff4dc";
const SYMBOL = {
  column: "\u2195",
  color: "\u25C8",
  number: "#",
  bomb: "\u2739",
  coin: "$",
  row: "↔",
};
const ICON_PATHS = {
 column:"M50 12V88 M28 34L50 12L72 34 M28 66L50 88L72 66",
 row:"M12 50H88 M34 28L12 50L34 72 M66 28L88 50L66 72",
 color:"M50 8L92 50L50 92L8 50Z M50 28L72 50L50 72L28 50Z",
 number:"M38 14L28 86 M72 14L62 86 M16 38H86 M12 64H82",
 bomb:"M50 6L60 26L80 16L77 38L98 43L81 58L90 79L67 78L59 98L45 81L24 91L25 68L4 58L23 45L14 24L37 26Z",
 coin:"M72 29C63 13 26 17 26 36C26 58 74 42 74 65C74 85 34 89 24 72 M50 8V92"
};
const iconMarkup = type => `<svg viewBox="0 0 100 100" aria-hidden="true" focusable="false"><path d="${ICON_PATHS[type]}" fill="${type==='bomb'?'currentColor':'none'}" stroke="currentColor" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
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
    this.scene.add(new THREE.AmbientLight(16777215, 2));
    const light = new THREE.DirectionalLight(16772824, 3);
    light.position.set(-3, 6, 10);
    light.castShadow = true;
    light.shadow.mapSize.set(512, 512);
    light.shadow.camera.left = -4;
    light.shadow.camera.right = 4;
    light.shadow.camera.top = 4;
    light.shadow.camera.bottom = -4;
    light.shadow.normalBias = 0.03;
    this.scene.add(light);
    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(8, 8),
      new THREE.ShadowMaterial({ opacity: 0.35 }),
    );
    plane.position.z = -0.48;
    plane.receiveShadow = true;
    this.scene.add(plane);
    this.geometry = new RoundedBoxGeometry(0.79, 0.79, 0.65, 3, 0.095);
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
  material(body, ink, n, special, mult = 2) {
    const key = [body, ink, n, special, mult].join("-");
    if (this.materials.has(key)) return this.materials.get(key);
    const c = document.createElement("canvas");
    c.width = c.height = 160;
    const ctx = c.getContext("2d");
    ctx.fillStyle = body;
    ctx.fillRect(0, 0, 160, 160);
    const grad = ctx.createLinearGradient(0, 0, 160, 160);
    grad.addColorStop(0, "#ffffff25");
    grad.addColorStop(1, "#0000000b");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 160, 160);
    ctx.fillStyle = "#493c2d12";
    for(let i=0;i<210;i++) ctx.fillRect((i*47)%160,(i*73+Math.floor(i/7)*11)%160,1.3,1.3);
    ctx.fillStyle = ink;
    const scale = special ? 31 : 34,
      cy = special ? 72 : 80;
    for (const [x, y] of special ? [] : DOTS[n] || []) {
      ctx.beginPath();
      ctx.arc(80 + x * scale, cy - y * scale, 10, 0, Math.PI * 2);
      ctx.fill();
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
    const mat = new THREE.MeshStandardMaterial({
      map: tex,
      roughness: 0.68,
      metalness: 0.01,
    });
    this.materials.set(key, mat);
    return mat;
  }
  mats(d) {
    return Array.from({ length: 6 }, () =>
      this.material(dieColor(d), pipColor(d), d.n, d.special, d.mult),
    );
  }
  render() {
    this.renderer.render(this.scene, this.camera);
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
    for(const d of b) if(d.special) { const m=this.meshes.get(d.id); if(m) m.rotation.z=amount*.07; }
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
export { iconMarkup, Board, SPECIAL_HEX, dieColor, pipColor, SYMBOL };
