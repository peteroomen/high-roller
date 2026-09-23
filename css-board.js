import { TIMING } from "./presentation.mjs";
import { dieColor, pipColor, iconMarkup } from "./board.js";
const dots = {
  1: [4],
  2: [0, 8],
  3: [0, 4, 8],
  4: [0, 2, 6, 8],
  5: [0, 2, 4, 6, 8],
  6: [0, 2, 3, 5, 6, 8],
};
class CSSBoard {
  constructor(canvas, animate) {
    this.animate = animate;
    this.meshes = /* @__PURE__ */ new Map();
    canvas.style.visibility = "hidden";
    this.root = document.createElement("div");
    this.root.id = "css-scene";
    this.root.setAttribute("aria-hidden", "true");
    canvas.after(this.root);
    this.size = 0;
    this.ro = new ResizeObserver(() => {
      this.size = (this.root.clientWidth / 6) * 0.76;
      this.root.style.setProperty("--half", this.size / 2 + "px");
    });
    this.ro.observe(this.root);
  }
  faces(d) {
    return Array.from(
      { length: 6 },
      (_, i) =>
        `<div class="face face-${i}" style="--die:${dieColor(d)};--pip:${pipColor(d)}">${d.converted ? `<span class="converted-glyph">${iconMarkup("convert")}</span>` : d.special ? `<span class="special-glyph">${iconMarkup(d.special)}</span>` : `<div class="pip-grid">${Array.from({ length: 9 }, (_, p) => `<i class="${dots[d.converted?6:d.n].includes(p) ? "pip" : ""}"></i>`).join("")}</div>`}</div>`,
    ).join("");
  }

  async set(board, { duration = 0, roll = false } = {}) {
    const ids = new Set(board.map((d) => d.id));
    for (const [id, m] of this.meshes)
      if (!ids.has(id)) {
        m.el.remove();
        this.meshes.delete(id);
      }
    const transitions = [];
    board.forEach((d, i) => {
      let m = this.meshes.get(d.id),
        isNew = !m;
      if (!m) {
        const el = document.createElement("div");
        el.className = "css-die";
        const cube = document.createElement("div");
        cube.className = "cube";
        el.append(cube);
        this.root.append(el);
        m = {
          el,
          cube,
          x: i % 6,
          y: Math.floor(i / 6) - (duration ? 6 : 0),
          key: "",
        };
        this.meshes.set(d.id, m);
      }
      m.el.classList.toggle("is-shiny",Boolean(d.shiny));m.el.classList.toggle("is-gold",Boolean(d.gold));
      const key = `${d.n}-${d.special}-${d.mult}-${d.converted}`;
      if (m.key !== key) {
        m.cube.innerHTML = this.faces(d);
        m.key = key;
      }
      m.el.style.opacity = "1";
      transitions.push({
        m,
        x: m.x,
        y: m.y,
        tx: i % 6,
        ty: Math.floor(i / 6),
        spin: (isNew || roll) && duration,
      });
    });
    const paint = (t) => {
      const e = 1 - Math.pow(1 - t, 3);
      for (const a of transitions) {
        a.m.x = a.x + (a.tx - a.x) * e;
        a.m.y = a.y + (a.ty - a.y) * e;
        a.m.el.style.left = (a.m.x * 100) / 6 + "%";
        a.m.el.style.top = (a.m.y * 100) / 6 + "%";
        a.m.cube.style.transform = `rotateX(${10 + (a.spin ? (1 - e) * 360 : 0)}deg) rotateY(${-12 + (a.spin ? (1 - e) * 360 : 0)}deg)`;
      }
    };
    if (duration) await this.animate(duration, paint);
    paint(1);
  }
  async remove(indices, b, duration) {
    const ms = indices.map((i) => this.meshes.get(b[i].id));
    await this.animate(duration, (t) => {
      for (const m of ms) {
        m.el.style.opacity = 1-Math.max(0,(t-.2)/.8);
        m.cube.style.transform = `rotateX(10deg) rotateY(-12deg) rotateZ(${t*18}deg) scale(${t<.22?1+t*.9:1.198*Math.pow(1-(t-.22)/.78,2)})`;
      }
    });
  }
  idle(b,amount) {
    for(const d of b) if(d.special) {const m=this.meshes.get(d.id); if(m) m.cube.style.transform=`rotateX(10deg) rotateY(-12deg) rotateZ(${amount*5}deg)`;}
  }
  async wobble(indices, b, duration=TIMING.shake) {
    const ms = indices.map((i) => this.meshes.get(b[i].id));
    await this.animate(duration, (t) => {
      for (const m of ms)
        if (m)
          m.cube.style.transform = `rotateX(10deg) rotateY(-12deg) rotateZ(${Math.sin(t * Math.PI * 4) * (1 - t) * 8}deg) scale(${1+Math.sin(t*Math.PI)*.22})`;
    });
  }
}
export { CSSBoard };
