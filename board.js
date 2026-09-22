import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
const HEX = ["#c66d5b", "#499c95", "#c69543", "#9280ba"];
const SYMBOL = { column: "\u2195", color: "\u25C8", number: "#", bomb: "\u2739", coin: "\u25CF" };
const DOTS = { 1: [[0, 0]], 2: [[-1, 1], [1, -1]], 3: [[-1, 1], [0, 0], [1, -1]], 4: [[-1, 1], [1, 1], [-1, -1], [1, -1]], 5: [[-1, 1], [1, 1], [0, 0], [-1, -1], [1, -1]], 6: [[-1, 1], [1, 1], [-1, 0], [1, 0], [-1, -1], [1, -1]] };
class Board {
  constructor(canvas, animate) {
    this.animate = animate;
    this.meshes = /* @__PURE__ */ new Map();
    this.materials = /* @__PURE__ */ new Map();
    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(-3.17, 3.17, 3.17, -3.17, 0.1, 50);
    this.camera.position.set(0, 0, 12);
    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "low-power" });
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
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(8, 8), new THREE.ShadowMaterial({ opacity: 0.35 }));
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
  material(color, n, special) {
    const key = [color, n, special].join("-");
    if (this.materials.has(key)) return this.materials.get(key);
    const c = document.createElement("canvas");
    c.width = c.height = 160;
    const ctx = c.getContext("2d");
    ctx.fillStyle = HEX[color];
    ctx.fillRect(0, 0, 160, 160);
    const grad = ctx.createLinearGradient(0, 0, 160, 160);
    grad.addColorStop(0, "#ffffff25");
    grad.addColorStop(1, "#0000000b");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 160, 160);
    ctx.fillStyle = "#fff4dc";
    const scale = special ? 31 : 34, cy = special ? 72 : 80;
    for (const [x, y] of DOTS[n]) {
      ctx.beginPath();
      ctx.arc(80 + x * scale, cy - y * scale, 10, 0, Math.PI * 2);
      ctx.fill();
    }
    if (special) {
      ctx.fillStyle = "#282239";
      ctx.beginPath();
      ctx.roundRect(61, 116, 38, 29, 8);
      ctx.fill();
      ctx.fillStyle = special === "coin" ? "#f5d578" : "#ffefd1";
      ctx.font = "bold 25px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(SYMBOL[special], 80, 131);
    }
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    const mat = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.36, metalness: 0.05 });
    this.materials.set(key, mat);
    return mat;
  }
  mats(d) {
    return [2, 5, 3, 4, d.n, 7 - d.n].map((n, i) => this.material(d.color, n, i === 4 ? d.special : null));
  }
  render() {
    this.renderer.render(this.scene, this.camera);
  }
  async set(board, { duration = 0, roll = false } = {}) {
    const ids = new Set(board.map((d) => d.id));
    for (const [id, m] of this.meshes) if (!ids.has(id)) {
      this.scene.remove(m);
      this.meshes.delete(id);
    }
    const transitions = [];
    board.forEach((d, i) => {
      let mesh = this.meshes.get(d.id), isNew = !mesh;
      if (!mesh) {
        mesh = new THREE.Mesh(this.geometry, this.mats(d));
        mesh.castShadow = true;
        this.scene.add(mesh);
        this.meshes.set(d.id, mesh);
        mesh.position.set(i % 6 - 2.5, 2.5 - Math.floor(i / 6) + (duration ? 6 : 0), 0);
      } else mesh.material = this.mats(d);
      const target = new THREE.Vector3(i % 6 - 2.5, 2.5 - Math.floor(i / 6), 0);
      transitions.push({ mesh, start: mesh.position.clone(), target, spin: (isNew || roll) && duration > 0 });
      mesh.scale.setScalar(1);
    });
    if (duration) await this.animate(duration, (t) => {
      const ease = 1 - Math.pow(1 - t, 3);
      for (const x of transitions) {
        x.mesh.position.lerpVectors(x.start, x.target, ease);
        x.mesh.rotation.set(0.1 + (x.spin ? (1 - ease) * Math.PI * 2 : 0), -0.13 + (x.spin ? (1 - ease) * Math.PI * 2 : 0), 0);
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
    const meshes = indices.map((i) => this.meshes.get(board[i].id)).filter(Boolean);
    await this.animate(duration, (t) => {
      for (const m of meshes) {
        m.scale.setScalar(Math.max(0.01, 1 - t * t));
        m.rotation.z = t * 0.45;
        m.position.z = t * 0.35;
      }
      this.render();
    });
  }
  async wobble(indices, board) {
    const meshes = indices.map((i) => this.meshes.get(board[i].id));
    await this.animate(220, (t) => {
      for (const m of meshes) m.rotation.z = Math.sin(t * Math.PI * 4) * (1 - t) * 0.1;
      this.render();
    });
    for (const m of meshes) m.rotation.z = 0;
    this.render();
  }
}
export {
  Board,
  HEX,
  SYMBOL
};
