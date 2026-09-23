import "@fontsource/dm-sans/latin-400.css";
import "@fontsource/dm-sans/latin-500.css";
import "@fontsource/dm-sans/latin-600.css";
import "@fontsource/dm-sans/latin-700.css";
import "@fontsource/space-grotesk/latin-500.css";
import "@fontsource/space-grotesk/latin-600.css";
import "@fontsource/space-grotesk/latin-700.css";
import {
  rulesFor,
  PACKS, canTakeToken, canBuyPack, packCost,
  trinketCost, trinketDescription, applyBonus, pipValue,
  MATCH_TIERS, TRINKETS, tierLabel, trinketValue, matchMult, stageInfo,
  restoreGame,
  specialMultiplier,
  COLORS,
  newGame,
  act,
  legalActions,
  preview,
  clone,
  DEFAULTS,
  TYPES,
} from "./engine.mjs";
import { Board, SPECIAL_HEX, dieColor, SYMBOL, iconMarkup } from "./board.js";
import { scoringPlan, TIMING, outlinePaths } from "./presentation.mjs";
import { CSSBoard } from "./css-board.js";
const $ = (id) => document.getElementById(id),
  fmt = (n) => n.toLocaleString();
const names = {
  column: "Column sweeper",
  row: "Row sweeper",
  color: "Special sweep",
  number: "Number sweep",
  bomb: "Bomb",
  twenty:"Twenty",wild:"Wild",shiny:"Shiny",
};
const descriptions = {
  column: "Clears its column",
  row: "Clears its row",
  color: "Clears all special dice",
  number: "Clears the swapped number",
  bomb: "Clears a 3 \xD7 3 area",
  twenty:"20 pips · collect with a match swap or blast",wild:"Matches any number",shiny:"Normal die · ×1.5 Mult when matched",
};
let prefs = {
  sound: true,
  fast: false,
  reduced: matchMedia("(prefers-reduced-motion: reduce)").matches,
};
try {
  prefs = {
    ...prefs,
    ...JSON.parse(localStorage.getItem("piptrip-prefs") || "{}"),
  };
} catch {}
let state;
try {
  const saved = JSON.parse(localStorage.getItem("piptrip-save"));
  state = restoreGame(saved);
} catch {}
if (!state) state = newGame();
let display = { score: state.score, moves: state.moves, coins: state.coins };
let busy = false,
  paused = false,
  epoch = 0,
  selected = null,
  rerollMode = false,
  toastTimer,
  audioCtx;
const cells = [];
let viewBoard = state.board;
function trinketMarkup(t) {
  const index=TRINKETS.indexOf(t),colours=['#dfc48b','#b39bc9','#8fb6a3','#d29791','#88a8c6','#bd9dc2'];
  return `<span class="trinket-die ${t.stat??'charm'}" style="--piece:${colours[index%colours.length]};--angle:${[-7,5,-3,8][index%4]}deg">${t.tier?`<b>${tierLabel(t.tier)}</b><small>${t.stat==='pips'?'PIP':'MULT'}</small>`:iconMarkup(t.icon)}</span>`;
}
function trinketInfo(t) {
  if(busy)return;
  modal(`${closeButton}<div class="trinket-detail">${trinketMarkup(t)}<h2>${t.name}</h2><p>${trinketDescription(t,state.config)}</p></div><button class="primary" data-close>Back</button>`);
}
function inventory() {
  $('match-levels').innerHTML=MATCH_TIERS.map(t=>`<span title="Matches of ${tierLabel(t)} dice add ${matchMult(t,state.config)} Mult before bonuses"><b>${tierLabel(t)}</b><small>Lv ${(state.config.matchLevels[t]??0)+1}</small><em>+${matchMult(t,state.config)}×</em></span>`).join('');
  $('trinket-rack').innerHTML=Array.from({length:rulesFor(state.config).trinketSlots},(_,i)=>{
    const t=TRINKETS.find(t=>t.id===state.config.trinkets[i]);
    return t?`<button class="owned-trinket" id="trinket-${t.id}" data-trinket-info="${t.id}" title="${trinketDescription(t,state.config)}" aria-label="${t.name}: ${trinketDescription(t,state.config)}">${trinketMarkup(t)}<span>${t.name}</span></button>`:`<div class="empty-slot"><span>+</span><small>TRINKET</small></div>`;
  }).join('');
  document.querySelectorAll('[data-trinket-info]').forEach(el=>el.onclick=()=>trinketInfo(TRINKETS.find(t=>t.id===el.dataset.trinketInfo)));
}
function tokenBag() {
  $("special-list").innerHTML=TYPES.map((t,i)=>`<div class="special-item"><span class="special-token">${iconMarkup(t)}</span><div><b>${names[t]} <em>${state.config.rates[i]}%</em></b><small>${descriptions[t]}</small></div></div>`).join("");
  $("token-bag").innerHTML=TYPES.flatMap((t,i)=>state.config.rates[i]>0?[`<span class="bag-token" title="${names[t]}">${iconMarkup(t)}<b>${state.config.rates[i]}%</b></span>`]:[]).join("") || '<small>Choose a starter token</small>';
}
function save() {
  try {
    localStorage.setItem("piptrip-save", JSON.stringify(state));
    $("saved").textContent = "Auto-saved";
  } catch {
    $("saved").textContent = "Saving unavailable";
  }
}
function preferences() {
  document.body.classList.toggle("reduced", prefs.reduced);
  $("sound").textContent = prefs.sound ? "\u266B" : "\u266A";
  $("sound").setAttribute(
    "aria-label",
    prefs.sound ? "Turn sound off" : "Turn sound on",
  );
  try {
    localStorage.setItem("piptrip-prefs", JSON.stringify(prefs));
  } catch {}
}
preferences();
function animate(ms, fn = () => {}, fixed = false) {
  const token = epoch;
  if (!fixed) ms *= prefs.reduced ? 0.12 : prefs.fast ? 0.38 : 1;
  return new Promise((resolve, reject) => {
    let last = performance.now(),
      elapsed = 0;
    const tick = (now) => {
      if (token !== epoch) return reject(new Error("cancelled"));
      if (!paused && !document.hidden) elapsed += Math.min(60, now - last);
      last = now;
      const t = Math.min(1, elapsed / Math.max(1, ms));
      fn(t);
      if (t === 1) resolve();
      else requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}
let board;
try {
  if (!document.createElement("canvas").getContext("webgl2"))
    throw Error("No WebGL");
  board = new Board($("scene"), animate);
} catch {
  board = new CSSBoard($("scene"), animate);
}
function sound(kind, level = 0) {
  if (!prefs.sound) return;
  try {
    audioCtx ??= new (window.AudioContext || window.webkitAudioContext)();
    audioCtx.resume();
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator(),
      gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.type = kind === "match" ? "sine" : "triangle";
    const freq =
      kind === "coin"
        ? 740
        : kind === "match"
          ? 220 * Math.pow(1.16, Math.min(level, 8))
          : 130;
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(
      kind === "swap" ? 65 : freq * 1.12,
      now + 0.1,
    );
    gain.gain.setValueAtTime(1e-3, now);
    gain.gain.exponentialRampToValueAtTime(0.07, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(1e-3, now + 0.16);
    osc.start();
    osc.stop(now + 0.18);
  } catch {}
}
function haptic(ms = 12) {
  if (!prefs.reduced) navigator.vibrate?.(ms);
}
function toast(text) {
  $("toast").textContent = text;
  $("toast").classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $("toast").classList.remove("show"), 2600);
}
function renderCells(b) {
  viewBoard = b;
  b.forEach((d, i) => {
    const el = cells[i];
    el.setAttribute(
      "aria-label",
      `Row ${Math.floor(i / 6) + 1}, column ${(i % 6) + 1}: ${d.special ? `${names[d.special]}${specialMultiplier(d,state.config)?`, +${specialMultiplier(d,state.config)} Mult`:""}` : `${COLORS[d.n - 1]} ${d.n}`}`,
    );
    if(d.converted)el.setAttribute('aria-label',el.getAttribute('aria-label')+', six converted to one');
    el.dataset.shiny=d.shiny?'true':'';el.dataset.gold=d.gold?'true':'';
    if(d.shiny||d.gold)el.setAttribute('aria-label',el.getAttribute('aria-label')+(d.shiny?', shiny ×1.5':'')+(d.gold?', gold +1 coin':''));
    el.dataset.n = d.special ? "" : d.n;
    el.dataset.color = d.special ? "special" : d.n;
    el.dataset.special = d.special || "";
    if (false) {
      el.classList.add("fallback");
      el.style.setProperty("--die", dieColor(d));
      el.innerHTML = `${d.n}${d.special ? `<small>${SYMBOL[d.special]}</small>` : ""}`;
    }
  });
}
function clearMarks() {
  $("effects").replaceChildren();
  cells.forEach((c) =>
    c.classList.remove(
      "selected",
      "hinted",
      "matching",
      "blasted",
      "reroll-target",
    ),
  );
}
function hud() {
  const target = state.config.targets[state.round];
  $("target").textContent = fmt(target);
  $("score").textContent = fmt(display.score);
  $("score").dataset.digits=String(fmt(display.score).length);
  $("target").dataset.digits=String(fmt(target).length);
  $("moves").textContent = display.moves;
  $("coins").textContent = display.coins;
  document.querySelector(".tool-cost").innerHTML =
    `${rulesFor(state.config).rerollCost} <span>●</span>`;
  $("percent").textContent = Math.floor((display.score / target) * 100) + "%";
  $("progress").style.width =
    Math.min(100, (display.score / target) * 100) + "%";
  const stage=stageInfo(state.round,state.config);
  $("round-label").textContent = `STAGE ${stage.number} / ${stage.total} · ${stage.leg} / ${stage.length}`;
  $('round-label').title=stage.name;
  document.querySelector(".round-dots").innerHTML=state.config.targets.map((_,i)=>`<i class="${i===state.round?"active":""}"></i>`).join("");
  tokenBag();
  inventory();
  document
    .querySelectorAll(".round-dots i")
    .forEach((el, i) => el.classList.toggle("active", i === state.round));
  $("reroll").disabled =
    busy ||
    paused ||
    state.status !== "playing" ||
    display.coins < rulesFor(state.config).rerollCost;
  $("hint").disabled = busy || paused || state.status !== "playing";
  $("reroll").classList.toggle("active", rerollMode);
  $("moves").style.color = display.moves <= 2 ? "#f3a390" : "";
}
function resetCalc() {
  $("pips").textContent = "0";
  $("collected-total").textContent = "";
  $("mult").textContent = "0";
  $("calc-label").textContent = "MAKE A MATCH";
  $("wave-label").textContent = "";
  $("calc-detail").textContent = "One Mult total per group";
  $("last-gain").textContent = "";
}
async function bang(id, tempo=1) {
  sound("match", id === "mult" ? 3 : 1);
  const el = $(id);
  try {
    await animate(TIMING.bang*tempo, t => {
      if (!prefs.reduced) el.style.transform = `scale(${1+Math.sin(t*Math.PI)*.32}) rotate(${Math.sin(t*Math.PI*4)*(1-t)*5}deg)`;
    });
  } finally { el.style.transform = ""; }
}
async function fly(indices, text, targetId, add, tempo=1, hold=TIMING.multHold) {
  const positions = typeof indices === "string" ? [$(indices).getBoundingClientRect()] : indices.map(i => cells[i].getBoundingClientRect());
  const x = positions.reduce((n,r)=>n+r.x+r.width/2,0)/positions.length;
  const y = positions.reduce((n,r)=>n+r.y+r.height/2,0)/positions.length;
  const el = document.createElement("div");
  el.className = `score-fly ${targetId}-fly`;
  el.textContent = text;
  el.dataset.phase = "appear";
  el.style.left = x+"px"; el.style.top = y+"px";
  document.body.append(el);
  try {
    await animate(TIMING.appear*tempo);
    el.dataset.phase = "flight";
    await animate(TIMING.flight*tempo,t=>{
      const target = $(targetId).parentElement.getBoundingClientRect();
      const tx=target.x+target.width/2, ty=target.bottom+19;
      const ease=prefs.reduced ? 1 : 1-Math.pow(1-t,3);
      el.style.left=x+(tx-x)*ease+"px";
      el.style.top=y+(ty-y)*ease+"px";
    });
    el.dataset.phase = "hold";
    // A short, fixed landing beat stays legible as the dice accelerate.
    await animate(hold,()=>{},true);
    el.dataset.phase = "add";
    add();
    el.remove();
    await bang(targetId,tempo);
  } finally { el.remove(); }
}
function outlineGroups(entries,active=-1) {
  const nodes=entries.map((entry,i)=>{
    const svg=document.createElementNS("http://www.w3.org/2000/svg","svg");
    svg.setAttribute("viewBox","-4 -4 608 608");
    svg.setAttribute("class",`group-outline ${entry.kind}${active>=0 && i!==active?' quiet':''}`);
    for(const d of outlinePaths(entry.affected,entry.kind==='blast')) {
      const p=document.createElementNS(svg.namespaceURI,"path");p.setAttribute("d",d);svg.append(p);
    }
    return svg;
  });
  $("effects").replaceChildren(...nodes);
}
async function shakeTrinket(id) {
  const piece=$('trinket-'+id);if(!piece)return;
  piece.classList.add('triggering');
  try{await animate(TIMING.shake,t=>{if(!prefs.reduced)piece.style.transform=`scale(${1+Math.sin(t*Math.PI)*.25}) rotate(${Math.sin(t*Math.PI*5)*8}deg)`;});}
  finally{piece.style.transform='';piece.classList.remove('triggering');}
}
async function clearDice(frame) {
  const particles=[];
  for(const index of frame.cleared) for(let j=0;j<3;j++) {
    const el=document.createElement("i");el.className="clear-mote";
    const x=(index%6+.5)/6*100,y=(Math.floor(index/6)+.5)/6*100;
    el.style.left=x+'%';el.style.top=y+'%';
    el.style.background=dieColor(frame.before[index]);
    $("effects").append(el);particles.push({el,angle:(index+j*2.1)*2.399});
  }
  await Promise.all([board.remove(frame.cleared,frame.before,TIMING.clear),animate(TIMING.clear,t=>{
    for(const {el,angle} of particles) {
      const distance=prefs.reduced?0:28*t;
      el.style.transform=`translate(${Math.cos(angle)*distance}px,${Math.sin(angle)*distance-10*t}px) scale(${1-t})`;
      el.style.opacity=String(Math.sin(t*Math.PI));
    }
    $("effects").querySelectorAll('svg').forEach(el=>el.style.opacity=String(1-t));
  })]);
}
function marks(indices, cls) {
  indices.forEach((i) => cells[i].classList.add(cls));
}
async function perform(action) {
  if (busy || paused || state.status !== "playing") return;
  clearTimeout(toastTimer); $("toast").classList.remove("show");
  selected = null;
  rerollMode = false;
  clearMarks();
  board.idle(state.board, 0);
  idleActive=false;
  const outcome = act(state, action);
  if (!outcome) {
    busy = true;
    hud();
    sound("swap");
    $("instruction").textContent = "That swap needs a match of 3.";
    try {
      await board.wobble([action.a, action.b], state.board);
    } finally {
      busy = false;
      hud();
    }
    return;
  }
  busy = true;
  const token = epoch;
  state = outcome.state;
  save();
  display.moves = state.moves;
  if (action.type === "reroll")
    display.coins -= rulesFor(state.config).rerollCost;
  hud();
  $("instruction").textContent = "";
  $("last-gain").textContent = "";
  sound("swap");
  haptic();
  try {
    await board.set(outcome.initial, {
      duration: action.type === "reroll" ? 440 : 220,
      roll: action.type === "reroll",
    });
    renderCells(outcome.initial);
    let collected=0, mult=0;
    $("pips").textContent="0"; $("mult").textContent="0";
    for (const frame of outcome.frames) {
      clearMarks();
      renderCells(frame.before);
      $("chain-label").textContent = frame.depth ? `${frame.depth+1} DEEP · +${frame.depth} MULT` : frame.activations.length ? "SPECIAL ACTIVATED" : "MATCH FOUND";
      $("wave-label").textContent = frame.depth ? `CASCADE ${frame.depth+1}` : "FIRST WAVE";
      $("collected-total").textContent = "THIS MOVE · ALL CASCADES";
      $("calc-label").textContent = "COLLECTING PIPS";
      $("calc-detail").textContent = "";
      for (const event of scoringPlan(frame)) {
        if(event.kind==='outline') {
          outlineGroups(event.entries);
          for(const id of new Set(frame.upgrades??[]))await shakeTrinket(id);
          await animate(TIMING.outline);
        } else if(event.kind === "pip") {
          await board.wobble([event.index],frame.before,TIMING.shake*event.tempo);
          await fly([event.index], `+${event.value}`, "pips",()=>{
            collected+=event.value;$("pips").textContent=collected;
            if(mult) $("last-gain").textContent=`${fmt(collected)} × ${mult} = ${fmt(Math.floor(collected*mult))}`;
          },event.tempo,TIMING.hold);
        } else if(event.kind === 'group') {
          const {entry,contributions}=event;
          outlineGroups(frame.entries,frame.entries.indexOf(entry));
          $("calc-label").textContent=entry.label.toUpperCase();
          for(const part of contributions) {
            $("calc-detail").textContent=part.label;
            if(part.source) {
              const piece=$('trinket-'+part.source);piece.classList.add('triggering');
              try {await animate(TIMING.shake,t=>{if(!prefs.reduced)piece.style.transform=`scale(${1+Math.sin(t*Math.PI)*.25}) rotate(${Math.sin(t*Math.PI*5)*8}deg)`;});}
              finally {piece.style.transform='';piece.classList.remove('triggering');}
            }
            const target=part.target??'mult';
            await fly(part.source?'trinket-'+part.source:entry.affected,`+${part.value}`,target,()=>{
              if(target==='pips') {collected+=part.value;$('pips').textContent=collected;}
              else {mult+=part.value;$("mult").textContent=mult;}
              $("last-gain").textContent=`${fmt(collected)} × ${mult} = ${fmt(Math.floor(collected*mult))}`;
            });
          }
          $("last-gain").textContent=`${fmt(collected)} × ${mult} = ${fmt(Math.floor(collected*mult))}`;
          await animate(TIMING.group);
        } else if(event.kind === 'bonus') {
          $('calc-label').textContent=event.label.toUpperCase();$('calc-detail').textContent=event.op==='multiply'?'Multiply Mult':'Add Mult';
          if(event.source)await shakeTrinket(event.source);else if(event.indices)await board.wobble(event.indices,frame.before,TIMING.shake);
          await fly(event.source?'trinket-'+event.source:event.indices??frame.cleared,`${event.op==='multiply'?'×':'+'}${event.value}`,'mult',()=>{mult=applyBonus(mult,event);$('mult').textContent=fmt(mult);$('last-gain').textContent=`${fmt(collected)} × ${fmt(mult)} = ${fmt(Math.floor(collected*mult))}`;});
        } else if(event.kind === 'clear') {
          outlineGroups(frame.entries);
          await clearDice(frame);
        }
      }
      if (frame.coins) {
        display.coins += frame.coins;
        sound("coin");
        toast(`+${frame.coins} coin${frame.coins > 1 ? "s" : ""}`);
        hud();
      }
      clearMarks();
      await board.set(frame.after, { duration: 480 });
      renderCells(frame.after);
    }
    display.score += outcome.summary.score;
    hud();
    await bang("score");
    if (outcome.shuffled) {
      toast("No moves. Free shuffle.");
      await board.set(state.board, { duration: 400, roll: true });
    } else await board.set(state.board);
    renderCells(state.board);
    display = { score: state.score, moves: state.moves, coins: state.coins };
    $("last-gain").textContent = outcome.summary.score
      ? `This move: +${fmt(outcome.summary.score)}`
      : "No match";
    $("chain-label").textContent =
      outcome.frames.length > 1
        ? `${outcome.frames.length}-WAVE CASCADE`
        : "MAKE YOUR MOVE";
    $("instruction").textContent = "Match 3 numbers \xB7 swap specials";
    busy = false;
    hud();
    if (state.status !== "playing") {
      await animate(350);
      endRound();
    }
  } catch (err) {
    if (err.message !== "cancelled") {
      console.error(err);
      toast("Move saved. Restoring the board.");
    }
  } finally {
    if (token === epoch) {
      busy = false;
      display = { score: state.score, moves: state.moves, coins: state.coins };
      clearMarks();
      renderCells(state.board);
      await board.set(state.board);
      hud();
    }
  }
}
function select(i) {
  if (busy || paused || state.status !== "playing") return;
  sound("swap");
  if (rerollMode) {
    perform({ type: "reroll", index: i });
    return;
  }
  if (selected === i) {
    selected = null;
    clearMarks();
    $("instruction").textContent = "Match 3 numbers \xB7 swap specials";
    return;
  }
  if (selected !== null) {
    const a = selected;
    if (
      Math.abs((a % 6) - (i % 6)) +
        Math.abs(Math.floor(a / 6) - Math.floor(i / 6)) ===
      1
    ) {
      perform({ type: "swap", a, b: i });
      return;
    }
  }
  selected = i;
  clearMarks();
  cells[i].classList.add("selected");
  const d = state.board[i];
  $("instruction").textContent = d.special
    ? `${names[d.special]} \xB7 ${descriptions[d.special]}`
    : "Tap a neighbouring die to swap.";
}
let pointer = null,
  suppressClickUntil = 0;
for (let i = 0; i < 36; i++) {
  const el = document.createElement("button");
  el.className = "cell";
  el.dataset.index = i;
  el.addEventListener("pointerdown", (e) => {
    if (busy || paused) return;
    pointer = { i, x: e.clientX, y: e.clientY };
    el.setPointerCapture(e.pointerId);
  });
  el.addEventListener("pointermove", (e) => {
    if (!pointer || busy) return;
    const dx = e.clientX - pointer.x,
      dy = e.clientY - pointer.y;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 15) return;
    let j =
      pointer.i +
      (Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 1 : -1) : dy > 0 ? 6 : -6);
    const p = preview(state.board, pointer.i, j, state.config);
    if (p) {
      $("instruction").textContent =
        `${fmt(p.score)} guaranteed \xB7 cascades may add more`;
      clearMarks();
      marks(p.cleared, "hinted");
    }
  });
  el.addEventListener("pointerup", (e) => {
    if (!pointer) return;
    const from = pointer;
    pointer = null;
    suppressClickUntil = performance.now() + 350;
    const dx = e.clientX - from.x,
      dy = e.clientY - from.y;
    if (!rerollMode && Math.max(Math.abs(dx), Math.abs(dy)) > 18) {
      const horizontal = Math.abs(dx) > Math.abs(dy),
        step = horizontal ? (dx > 0 ? 1 : -1) : dy > 0 ? 6 : -6,
        to = from.i + step;
      if (
        to >= 0 &&
        to < 36 &&
        (!horizontal || Math.floor(to / 6) === Math.floor(from.i / 6))
      )
        perform({ type: "swap", a: from.i, b: to });
      else clearMarks();
    } else select(i);
  });
  el.addEventListener("pointercancel", () => {
    pointer = null;
    clearMarks();
  });
  el.addEventListener("click", () => {
    if (performance.now() > suppressClickUntil) select(i);
  });
  el.addEventListener("keydown", (e) => {
    const steps = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -6, ArrowDown: 6 };
    if (steps[e.key]) {
      e.preventDefault();
      const j = i + steps[e.key];
      if (j >= 0 && j < 36) cells[j].focus();
    }
  });
  el.addEventListener("mouseenter", () => {
    if (!rerollMode || busy) return;
    clearMarks();
    const r = Math.min(4, Math.floor(i / 6)),
      c = Math.min(4, i % 6);
    marks(
      [r * 6 + c, r * 6 + c + 1, (r + 1) * 6 + c, (r + 1) * 6 + c + 1],
      "reroll-target",
    );
  });
  cells.push(el);
  $("cells").append(el);
}
function modal(html) {
  paused = true;
  hud();
  $("modal-content").innerHTML = html;
  $("modal").classList.toggle("shop-dialog",state.status==='shop');
  $("modal").showModal();
  $("modal-content")
    .querySelectorAll("[data-close]")
    .forEach((b) => (b.onclick = closeModal));
}
function closeModal() {
  paused = false;
  $("modal").close();
  hud();
}
$("modal").addEventListener("cancel", (e) => {
  e.preventDefault();
  if(["draft","shop"].includes(state.status)) return;
  closeModal();
});
const closeButton =
  '<button class="close-modal" data-close aria-label="Close dialog">\xD7</button>';
function rules() {
  const r=rulesFor(state.config);
  modal(`${closeButton}<div class="eyebrow">RULES</div><h2>Pips × Mult</h2><div class="rule">Match 3+ identical numbers. Wilds substitute for one number per wave: longest run wins, then higher number. Intersections of the same number merge.</div><div class="rule">All pips and Mult carry through the move. Matches add ${r.sizeMult.join('/')} Mult for 3/4/5/6+ dice, plus levels, +1 for low numbers and cascade depth. Group bonuses fly together. Trinkets score separately.</div><div class="rule">Shiny matches multiply running Mult by ×${r.shinyFactor} per shiny die after that wave’s additions. Loaded Die multiplies once at the end. Mult rounds to two decimals per multiplication; final points round down.</div><div class="rule">Gold dice keep their number and colour. ${r.goldRate}% of ordinary dice are gold; each matched gold die pays 1 coin. Blasts do not pay gold.</div>${TYPES.map(t=>`<div class="rule"><strong>${names[t]}</strong> — ${descriptions[t]}.</div>`).join('')}<div class="rule">Activated specials and cleared Wilds contribute ${r.specialPips} pips; Twenty contributes 20. No automatic inclusion of the swapped neighbour. Active specials add +2 Mult; Wild/Twenty add no separate Mult.</div><div class="rule">Each token adds ${r.tokenBoost} percentage point with no upgrade cap. If total rates exceed 100, spawn shares normalise proportionally. Stronger token types have rarer pack offers.</div><div class="rule">Shop packs reveal 3 tokens: choose 1. Each cleared round pays ${r.roundReward} + 1 coin per swap left. Four trinket slots. Reroll 2×2 costs ${r.rerollCost} coins and no swap.</div><button class="primary" data-close>Play</button>`);
}
function ledger() {
  const last=state.history.findLast(h=>h.action.type==='swap'||h.action.type==='reroll');
  modal(`${closeButton}<div class="eyebrow">SCORE BREAKDOWN</div><h2>Last move</h2>${last?`<p class="ledger-total">${last.pips ?? '—'} pips × ${last.mult ?? '—'} Mult = <strong>${fmt(last.score)}</strong></p><p>${last.waves} waves · pips count once, Mult adds</p>${last.entries.map(e=>`<div class="ledger-entry"><div>${e.label}<small>${e.size} ${e.kind==='blast'?'special':'size'}${e.upgrade?` + ${e.upgrade} level`:''}${e.low?` + ${e.low} low pips`:''}${e.cascade?` + ${e.cascade} cascade`:''}</small></div><b>+${e.mult} Mult${e.pipBonus?`<small>+${e.pipBonus} bonus pips</small>`:""}</b></div>${(e.trinkets??[]).map(t=>`<div class="ledger-trinket">${t.name} · +${t.value} ${t.stat}</div>`).join("")}`).join('')}${(last.bonuses??[]).map(b=>`<div class="ledger-entry"><span>${b.label}</span><b>${b.op==='multiply'?'×':'+'}${b.value} Mult</b></div>`).join('')}`:'<p>Make a move to see its contributions.</p>'}<button class="primary" data-close>Back</button>`);
}
function bagInfo() {
 const total=state.config.rates.reduce((a,b)=>a+b,0),den=Math.max(100,total);
 modal(`${closeButton}<div class="eyebrow">YOUR DICE</div><h2>Dice bag</h2>${TYPES.map((t,i)=>`<div class="ledger-entry"><span>${names[t]}<small>${descriptions[t]}</small></span><b>${(state.config.rates[i]/den*100).toFixed(1)}%</b></div>`).join('')}<p>${rulesFor(state.config).goldRate}% gold on ordinary dice</p><button class="primary" data-close>Back</button>`);
}
function pauseMenu() {
  modal(
    `${closeButton}<div class="eyebrow">PAUSED</div><h2>Pause</h2><p>Your run is saved on this device.</p><div class="settings"><label>Sound<input id="pref-sound" type="checkbox" ${prefs.sound ? "checked" : ""}></label><label>Fast animations<input id="pref-fast" type="checkbox" ${prefs.fast ? "checked" : ""}></label><label>Reduced motion<input id="pref-reduced" type="checkbox" ${prefs.reduced ? "checked" : ""}></label></div><div class="modal-actions"><button class="primary" data-close>Keep playing</button><button class="secondary" id="restart">New run</button><button class="secondary" id="pause-lab">Test bench</button><button class="secondary" id="pause-bag">Dice bag</button></div><p style="font-size:11px">Seed ${state.seed} \xB7 Playtest 06</p>`,
  );
  for (const k of ["sound", "fast", "reduced"])
    $("pref-" + k).onchange = (e) => {
      prefs[k] = e.target.checked;
      preferences();
    };
  $('pause-lab').onclick=()=>{if(!busy)lab();};$('pause-bag').onclick=bagInfo;
  $("restart").onclick = () => {
    modal(
      `${closeButton}<h2>Start fresh?</h2><p>This replaces your saved run.</p><div class="modal-actions"><button class="primary" id="confirm-restart">New run</button><button class="secondary" data-close>Keep this run</button></div>`,
    );
    $("confirm-restart").onclick = () => startNew();
  };
}
async function startNew(seed = Date.now() >>> 0, config = DEFAULTS) {
  epoch++;
  clearTimeout(toastTimer); $("toast").classList.remove("show");
  closeModal();
  state = newGame(seed, config);
  busy = false;
  selected = null;
  rerollMode = false;
  display = { score: 0, moves: state.moves, coins: 0 };
  save();
  clearMarks();
  resetCalc();
  renderCells(state.board);
  await board.set(state.board, { duration: 0 });
  hud();
  $("chain-label").textContent = "MAKE YOUR MOVE";
  $("instruction").textContent = "Match 3 numbers \xB7 swap specials";
  if(state.status==="draft") progressionScreen();
}
function endRound() {
  if(["draft","shop"].includes(state.status)) return progressionScreen();
  const stage=stageInfo(state.round,state.config);
  const win = state.status === "won",
    lost = state.status === "lost";
  modal(
    `<div class="eyebrow">${lost ? "RUN ENDED" : win ? "RUN COMPLETE" : "TARGET CLEARED"}</div><h2>${lost ? "Target missed" : win ? "All stages cleared" : stage.leg===stage.length ? `Stage ${stage.number} cleared` : "Round cleared"}</h2><p>${lost ? `${fmt(state.score)} of ${fmt(state.config.targets[state.round])} points. Try a new board or replay this seed.` : win ? "Run complete." : "Coins carry to the next round."}</p><div class="stats"><div><b>${fmt(state.total)}</b><span>TOTAL POINTS</span></div><div><b>${state.bestChain}</b><span>BEST CASCADE</span></div><div><b>${state.coins}</b><span>COINS</span></div></div><div class="modal-actions"><button class="primary" id="advance">${lost || win ? "New run" : "Visit shop →"}</button>${lost ? '<button class="secondary" id="retry">Replay seed</button>' : ""}<button class="secondary" id="end-ledger">Breakdown</button></div>`,
  );
  $("advance").onclick = async () => {
    if (lost || win) return startNew();
    await progress({type:"visit_shop"});
  };
  if (lost) $("retry").onclick = () => startNew(state.seed,state.initialConfig ?? DEFAULTS);
  $("end-ledger").onclick = () => {
    ledger();
    const b = document.createElement("button");
    b.className = "secondary";
    b.textContent = "Round result";
    b.onclick = endRound;
    $("modal-content").append(b);
  };
}
async function progress(action) {
  if(busy) return;
  const out=act(state,action);if(!out) return;
  state=out.state;display={score:state.score,moves:state.moves,coins:state.coins};save();hud();
  if(state.status==='playing') {
    closeModal();busy=true;hud();resetCalc();clearMarks();renderCells(state.board);
    const token=epoch;
    try {
      await board.set(state.board,{duration:550,roll:true});
      $("chain-label").textContent="MAKE YOUR MOVE";
    } catch(err) {if(err.message!=="cancelled") console.error(err);}
    finally {if(token===epoch){busy=false;hud();}}
  } else progressionScreen();
}
function progressionScreen() {
  const r=rulesFor(state.config);
  if(state.status==='draft') {
    const d=state.draft,starter=d.kind==='starter',remaining=d.limit-d.picks.length,multi=d.offers[0]?.startsWith('multi-');
    modal(`<div class="eyebrow">${starter?'YOUR FIRST TOKEN':d.name.toUpperCase()}</div><h2>${starter?'Pick your starter':'Choose one'}</h2><p class="draft-note">${starter?'Choose 1 of 3 · free':`Keep ${d.limit} of ${d.offers.length} tokens`} · ${multi?'level up match Mult':`+${r.tokenBoost}% spawn chance each`}</p><div class="token-choices ${starter?'starter':''} ${!starter&&!d.picks.length?'pack-opening':''}">${d.offers.map((t,i)=>{
      const tier=Number(t.slice(6)),picked=d.picks.includes(i),name=multi?`${tierLabel(tier)}-match`:names[t];
      return `<button class="token-choice ${picked?'picked':''}" data-token="${i}" ${picked||!canTakeToken(state,t)?'disabled':''} aria-label="Choose ${name} token"><span class="token-coin ${multi?'number-token':''}">${multi?tierLabel(tier):iconMarkup(t)}</span><b>${name}</b>${multi?'':`<span class="rarity">${r.specialWeights[t]>=4?'COMMON':r.specialWeights[t]>=2?'UNCOMMON':'RARE'}</span>`}<small>${multi?`Level ${(state.config.matchLevels[tier]??0)+1} · +${r.levelBoost[tier-3]} Mult per level`:descriptions[t]}</small><em>${picked?'✓ Added':multi?`+${matchMult(tier,state.config)} → +${matchMult(tier,state.config)+r.levelBoost[tier-3]} Mult`:`${state.config.rates[TYPES.indexOf(t)]}% → ${state.config.rates[TYPES.indexOf(t)]+r.tokenBoost}%`}</em></button>`;
    }).join('')}</div><div class="pack-footer">${starter?'Every other special starts at 0%.':`${d.picks.length} / ${d.limit} kept · tokens last the whole run`}</div>`);
    document.querySelectorAll('[data-token]').forEach(el=>el.onclick=()=>progress({type:'choose_token',index:Number(el.dataset.token)}));
  } else if(state.status==='shop') {
    const next=stageInfo(state.round+1,state.config),nextStage=next.leg===1;
    modal(`<div class="shop-heading"><div><div class="eyebrow">ROUND ${state.round+1} · +${state.shop.reward} ●</div><h2>Table shop</h2></div><span class="shop-wallet">● ${state.coins}</span></div><div class="shop-scroll"><div class="shop-section"><b>Trinkets</b><small>${state.config.trinkets.length} / ${r.trinketSlots} slots</small></div><div class="trinket-shelf">${(state.shop.offers??[]).map(id=>{
      const t=TRINKETS.find(t=>t.id===id),sold=state.shop.sold.includes(id),cost=trinketCost(t,state.config);
      return `<button class="trinket-card" data-buy-trinket="${id}" ${sold||state.config.trinkets.includes(id)||state.coins<cost||state.config.trinkets.length>=r.trinketSlots?'disabled':''} aria-label="Buy ${t.name} for ${cost} coins">${trinketMarkup(t)}<b>${t.name}</b><small>${trinketDescription(t,state.config)}</small><em>${sold?'SOLD':`${cost} ●`}</em></button>`;
    }).join('')||'<small>No trinkets available</small>'}</div><div class="shop-section"><b>Token packs</b><small>Choose 1 of 3</small></div><div class="foil-shelf">${PACKS.map((pack,i)=>`<button class="foil-pack foil-${i}" data-pack="${pack.id}" ${!canBuyPack(state,pack)?'disabled':''} aria-label="Open ${pack.name} pack for ${packCost(pack,state.config)} coins"><span class="foil-art ${pack.kind==='multi'?'number-art':''}">${pack.kind==='multi'?'3⁺':iconMarkup('wild')}</span><b>${pack.name}</b><small>${pack.note}</small><em>${state.shop.bought?'SOLD OUT':`${packCost(pack,state.config)} ●`}</em></button>`).join('')}</div>${state.config.trinkets.length?`<div class="shop-section"><b>Your trinkets</b><small>Tap to sell</small></div><div class="owned-shelf">${state.config.trinkets.map(id=>{const t=TRINKETS.find(t=>t.id===id);return `<button class="sell-trinket" data-sell-trinket="${id}" aria-label="Sell ${t.name}">${trinketMarkup(t)}<span>${t.name}<small>${Math.floor(trinketCost(t,state.config)/2)} ●</small></span></button>`;}).join('')}</div>`:''}</div><button class="primary shop-next" id="next-shop-round">${nextStage?`Stage ${next.number} · ${next.name}`:`Round ${state.round+2}`} · ${fmt(state.config.targets[state.round+1])} →</button>`);
    document.querySelectorAll('[data-pack]').forEach(el=>el.onclick=()=>progress({type:'buy_pack',pack:el.dataset.pack}));
    document.querySelectorAll('[data-buy-trinket]').forEach(el=>el.onclick=()=>progress({type:'buy_trinket',id:el.dataset.buyTrinket}));
    document.querySelectorAll('[data-sell-trinket]').forEach(el=>el.onclick=()=>progress({type:'sell_trinket',id:el.dataset.sellTrinket}));
    $('next-shop-round').onclick=()=>progress({type:'next_round'});
  }
}

function lab() {
  modal(
    `${closeButton}<div class="eyebrow">PLAYTEST CONTROLS</div><h2>Test bench.</h2><p>Changes start a fresh seeded run. Each special has its own spawn chance.</p><div class="settings"><label>Seed<input id="seed" class="wide" type="number" min="0" max="4294967295" value="${state.seed}"></label><label>Moves per round<input id="lab-moves" type="number" min="1" max="30" value="${state.config.moves}"></label>${state.config.targets.map((n, i) => `<label>Round ${i + 1} target<input id="target-${i}" type="number" min="1" max="999999" value="${n}"></label>`).join("")}${TYPES.map((t, i) => `<label>${names[t]} %<input id="rate-${i}" type="number" min="0" max="20" step="1" value="0"></label>`).join("")}${MATCH_TIERS.map(t=>`<label>${tierLabel(t)}-match starting level<input id="lab-level-${t}" type="number" min="1" max="99" value="1"></label>`).join('')}${TRINKETS.map(t=>`<label>Start with ${t.name}<input id="lab-trinket-${t.id}" type="checkbox"></label>`).join('')}<label>1s & 2s get +1 Mult<input id="low-bonus" type="checkbox" ${state.config.lowBonus ? "checked" : ""}></label></div><div class="modal-actions"><button class="primary" id="apply-test">Start test run</button><button class="secondary" id="reset-test">Defaults</button></div><div class="modal-actions"><button class="secondary" id="export-run">Export run log</button></div>`,
  );
  $("apply-test").onclick = () => {
    const moves = +$("lab-moves").value,
      targets = state.config.targets.map((_, i) => +$("target-" + i).value),
      rates = TYPES.map((_, i) => +$("rate-" + i).value),
      seed = +$("seed").value,
      matchLevels=Object.fromEntries(MATCH_TIERS.map(t=>[t,+$('lab-level-'+t).value-1])),
      trinkets=TRINKETS.filter(t=>$('lab-trinket-'+t.id).checked).map(t=>t.id);
    if (
      trinkets.length>rulesFor(DEFAULTS).trinketSlots ||
      Object.values(matchLevels).some(n=>!Number.isInteger(n)||n<0||n>98) ||
      !Number.isInteger(moves) ||
      moves < 1 ||
      moves > 30 ||
      targets.some((n) => !Number.isInteger(n) || n < 1 || n > 999999) ||
      rates.some((n) => !Number.isFinite(n) || n < 0 || n > 20) ||
      !Number.isInteger(seed) ||
      seed < 0 ||
      seed > 4294967295
    ) {
      toast("Use the shown limits and at most four trinkets.");
      return;
    }
    startNew(seed, { moves, targets, rates, matchLevels,trinkets,stageLength:3,draft:true, lowBonus: $("low-bonus").checked });
  };
  $("reset-test").onclick = () => startNew(Date.now() >>> 0, DEFAULTS);
  $("export-run").onclick = () => {
    const blob = new Blob(
        [JSON.stringify({ build: "0.6.0", ...state }, null, 2)],
        { type: "application/json" },
      ),
      url = URL.createObjectURL(blob),
      a = document.createElement("a");
    a.href = url;
    a.download = `high-roller-${state.seed}-round-${state.round + 1}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1e3);
  };
}
$('bag').onclick=bagInfo;
$("info").onclick = rules;
$("pause").onclick = () =>
  state.status !== "playing" && !busy ? endRound() : pauseMenu();
$("sound").onclick = () => {
  prefs.sound = !prefs.sound;
  preferences();
  sound("swap");
};
$("ledger").onclick = ledger;
$("lab").onclick = () => {
  if (!busy) lab();
  else toast("Finish this cascade first.");
};
$("reroll").onclick = () => {
  if (busy || display.coins < rulesFor(state.config).rerollCost) return;
  rerollMode = !rerollMode;
  selected = null;
  clearMarks();
  hud();
  $("instruction").textContent = rerollMode
    ? "Tap the top-left of a 2 \xD7 2 area."
    : "Match 3 numbers \xB7 swap specials";
};
$("hint").onclick = () => {
  clearMarks();
  selected = null;
  const list = legalActions(state.board);
  if (list.length) {
    const a=list[0];
    marks([a.a,a.b], "hinted");
    $("instruction").textContent = "Swap the two outlined dice.";
  }
};
$("calc-detail").parentElement.addEventListener("dblclick", ledger);
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    audioCtx?.suspend();
  }
});
renderCells(state.board);
board.set(state.board);
hud();
save();
resetCalc();
if (state.status !== "playing") endRound();

let idleActive=false;
function idleTick(now) {
  const enabled=!busy && !paused && !document.hidden && !prefs.reduced && state.status==="playing";
  const phase=(now%4400)/650;
  const amount=enabled && phase<1 ? Math.sin(phase*Math.PI*8)*Math.sin(phase*Math.PI) : 0;
  board.tickFinish?.(now,prefs.reduced||paused);
  const hasFinish=enabled&&viewBoard.some(d=>d.gold||d.shiny);
  if(amount || idleActive || hasFinish) board.idle(viewBoard,amount);
  idleActive=Boolean(amount);
  requestAnimationFrame(idleTick);
}
requestAnimationFrame(idleTick);
