import "@fontsource/dm-sans/latin-400.css";
import "@fontsource/dm-sans/latin-500.css";
import "@fontsource/dm-sans/latin-600.css";
import "@fontsource/dm-sans/latin-700.css";
import "@fontsource/space-grotesk/latin-500.css";
import "@fontsource/space-grotesk/latin-600.css";
import "@fontsource/space-grotesk/latin-700.css";
import {
  rulesFor,
  restoreGame,
  specialMultiplier,
  COLORS,
  newGame,
  act,
  nextRound,
  legalActions,
  preview,
  clone,
  DEFAULTS,
  TYPES,
} from "./engine.mjs";
import { Board, SPECIAL_HEX, dieColor, SYMBOL } from "./board.js";
import { scoringPlan, TIMING } from "./presentation.mjs";
import { CSSBoard } from "./css-board.js";
const $ = (id) => document.getElementById(id),
  fmt = (n) => n.toLocaleString();
const names = {
  column: "Column sweeper",
  row: "Row sweeper",
  color: "Special sweep",
  number: "Number sweep",
  bomb: "Bomb",
  coin: "Coin",
};
const descriptions = {
  column: "Clears its column",
  row: "Clears its row",
  color: "Clears all special dice",
  number: "Clears the swapped number",
  bomb: "Clears a 3 \xD7 3 area",
  coin: "Clears its four neighbours + 1 coin",
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
$("special-list").innerHTML = TYPES.map(
  (t) =>
    `<div class="special-item"><span class="special-token" style="background:${SPECIAL_HEX[t]};color:#51465e">${SYMBOL[t]}</span><div><b>${names[t]}</b><small>${descriptions[t]}</small></div></div>`,
).join("");
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
      `Row ${Math.floor(i / 6) + 1}, column ${(i % 6) + 1}: ${d.special ? `${names[d.special]}, ×${specialMultiplier(d, state.config)}` : `${COLORS[d.n - 1]} ${d.n}`}`,
    );
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
  $("moves").textContent = display.moves;
  $("coins").textContent = display.coins;
  document.querySelector(".tool-cost").innerHTML =
    `${rulesFor(state.config).rerollCost} <span>●</span>`;
  $("percent").textContent = Math.floor((display.score / target) * 100) + "%";
  $("progress").style.width =
    Math.min(100, (display.score / target) * 100) + "%";
  $("round-label").textContent = `ROUND 0${state.round + 1} / 03`;
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
  $("calc-detail").textContent = "Size + cascade + low-pip bonus";
  $("last-gain").textContent = "";
}
async function bang(id) {
  sound("match", id === "mult" ? 3 : 1);
  const el = $(id);
  try {
    await animate(TIMING.bang, t => {
      if (!prefs.reduced) el.style.transform = `scale(${1+Math.sin(t*Math.PI)*.32}) rotate(${Math.sin(t*Math.PI*4)*(1-t)*5}deg)`;
    });
  } finally { el.style.transform = ""; }
}
async function fly(indices, text, targetId, add) {
  const positions = indices.map(i => cells[i].getBoundingClientRect());
  const x = positions.reduce((n,r)=>n+r.x+r.width/2,0)/positions.length;
  const y = positions.reduce((n,r)=>n+r.y+r.height/2,0)/positions.length;
  const el = document.createElement("div");
  el.className = `score-fly ${targetId}-fly`;
  el.textContent = text;
  el.dataset.phase = "appear";
  el.style.left = x+"px"; el.style.top = y+"px";
  document.body.append(el);
  try {
    await animate(TIMING.appear);
    el.dataset.phase = "flight";
    await animate(TIMING.flight,t=>{
      const target = $(targetId).parentElement.getBoundingClientRect();
      const tx=target.x+target.width/2, ty=target.bottom+19;
      const ease=prefs.reduced ? 1 : 1-Math.pow(1-t,3);
      el.style.left=x+(tx-x)*ease+"px";
      el.style.top=y+(ty-y)*ease+"px";
    });
    el.dataset.phase = "hold";
    // The arrival remains readable for half a second, even in fast mode.
    await animate(TIMING.hold,()=>{},true);
    el.dataset.phase = "add";
    add();
    el.remove();
    await bang(targetId);
  } finally { el.remove(); }
}
function outlineGroup(entry) {
  const indices=entry.affected ?? entry.indices, selected=new Set(indices);
  const svg=document.createElementNS("http://www.w3.org/2000/svg","svg");
  svg.setAttribute("viewBox","0 0 600 600");
  svg.setAttribute("class",`group-outline ${entry.kind}`);
  let path="";
  for(const i of indices){
    const x=i%6*100,y=Math.floor(i/6)*100;
    if(entry.kind === "blast") path+=`M${x+7},${y+7}h86v86h-86Z `;
    else {
      if(i<6 || !selected.has(i-6)) path+=`M${x},${y}h100 `;
      if(i>=30 || !selected.has(i+6)) path+=`M${x},${y+100}h100 `;
      if(i%6===0 || !selected.has(i-1)) path+=`M${x},${y}v100 `;
      if(i%6===5 || !selected.has(i+1)) path+=`M${x+100},${y}v100 `;
    }
  }
  const p=document.createElementNS(svg.namespaceURI,"path");p.setAttribute("d",path);svg.append(p);
  $("effects").replaceChildren(svg);
}
function marks(indices, cls) {
  indices.forEach((i) => cells[i].classList.add(cls));
}
async function perform(action) {
  if (busy || paused || state.status !== "playing") return;
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
    for (const frame of outcome.frames) {
      clearMarks();
      renderCells(frame.before);
      $("chain-label").textContent = frame.depth ? `${frame.depth+1} DEEP · +${frame.depth} MULT` : frame.activations.length ? "SPECIAL ACTIVATED" : "MATCH FOUND";
      $("wave-label").textContent = frame.depth ? `CASCADE ${frame.depth+1}` : "FIRST WAVE";
      $("pips").textContent = "0";
      $("mult").textContent = "0";
      $("collected-total").textContent = "";
      $("calc-label").textContent = "COLLECTING PIPS";
      $("calc-detail").textContent = "";
      let collected=0;
      for (const event of scoringPlan(frame)) {
        if(event.kind === "pip") {
          await board.wobble([event.index],frame.before);
          await fly([event.index], `+${event.value}`, "pips",()=>{
            collected+=event.value;
            $("pips").textContent=collected;
          });
        } else {
          const {entry,contributions}=event;
          outlineGroup(entry);
          $("calc-label").textContent=entry.label.toUpperCase();
          $("collected-total").textContent=`${entry.pips} of ${collected} collected pips`;
          $("pips").textContent=entry.pips;
          $("mult").textContent="0";
          let mult=0;
          for(const [i,part] of contributions.entries()) {
            $("calc-detail").textContent=part.label;
            await fly(entry.affected ?? entry.indices,`${i ? '+' : '×'}${part.value}`,"mult",()=>{
              mult+=part.value; $("mult").textContent=mult;
            });
          }
          display.score+=entry.score;
          $("last-gain").textContent=`+${fmt(entry.score)} points`;
          hud();
          await animate(TIMING.group);
          clearMarks();
        }
      }
      if (!frame.entries.length) {
        $("calc-label").textContent="SPECIALS";
        $("calc-detail").textContent="No numbered dice affected";
      }
      if (frame.coins) {
        display.coins += frame.coins;
        sound("coin");
        toast(`+${frame.coins} coin${frame.coins > 1 ? "s" : ""}`);
        hud();
      }
      await board.remove(frame.cleared, frame.before, 210);
      clearMarks();
      await board.set(frame.after, { duration: 480 });
      renderCells(frame.after);
    }
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
  closeModal();
});
const closeButton =
  '<button class="close-modal" data-close aria-label="Close dialog">\xD7</button>';
function rules() {
  modal(
    `${closeButton}<div class="eyebrow">RULES</div><h2>How to play</h2><div class="rule">Swap neighbours. Match <strong>3+ identical numbers</strong> in a row or column. Each number has its own colour. Symbols do not form matches.</div><div class="rule"><strong>Pips \xD7 Mult = points.</strong><br>3 dice: \xD71 \xB7 4 dice: \xD72 \xB7 5+ dice: \xD73.<br>Matches of 1s or 2s add +1 Mult.</div><div class="rule">Each falling cascade adds <strong>+1 Mult</strong> for that wave. The chain resets after your move.</div>${TYPES.map((t) => `<div class="rule"><strong>${SYMBOL[t]} ${names[t]}</strong> \u2014 ${descriptions[t]}. Swap with a neighbour to activate (1 move). Only its effect area scores. Other specials can trigger it.</div>`).join("")}<div class="rule">Specials have <strong>no pips</strong>. Score affected pips × the special’s Mult (normally ×2), plus the cascade bonus. Each die scores once at its highest available Mult; no match bonus is added to special Mult.</div><div class="rule">Number sweeps target the swapped number. Chained sweeps inherit that target; swapping two specials uses the most common number (ties go higher). Specials hit by another special activate once.</div><div class="rule">Spend <strong>3 coins</strong> to reroll a 2\xD72 area. No move cost. Reach the goal before your moves run out.</div><div class="modal-actions"><button class="primary" data-close>Play</button><button class="secondary" id="rules-ledger">Score breakdown</button></div>`,
  );
  $("rules-ledger").onclick = ledger;
}
function ledger() {
  const last = state.history.at(-1);
  modal(
    `${closeButton}<div class="eyebrow">SCORE BREAKDOWN</div><h2>Last move.</h2>${last ? `<p>${last.waves} wave${last.waves === 1 ? "" : "s"} \xB7 ${last.specials} special${last.specials === 1 ? "" : "s"} \xB7 <strong>${fmt(last.score)} points</strong></p>${last.entries.map((e) => `<div class="ledger-entry"><div>${e.label}<small>${e.pips} pips \xD7 ${e.mult} Mult<br>${e.size} ${e.kind === "blast" ? "special" : "size"}${e.cascade ? ` + ${e.cascade} cascade` : ""}${e.low ? " + 1 low pips" : ""}</small></div><b>+${fmt(e.score)}</b></div>`).join("")}` : "<p>Make a move and every contribution will appear here.</p>"}<div class="modal-actions"><button class="primary" data-close>Back</button></div>`,
  );
}
function pauseMenu() {
  modal(
    `${closeButton}<div class="eyebrow">PAUSED</div><h2>Pause</h2><p>Your run is saved on this device.</p><div class="settings"><label>Sound<input id="pref-sound" type="checkbox" ${prefs.sound ? "checked" : ""}></label><label>Fast animations<input id="pref-fast" type="checkbox" ${prefs.fast ? "checked" : ""}></label><label>Reduced motion<input id="pref-reduced" type="checkbox" ${prefs.reduced ? "checked" : ""}></label></div><div class="modal-actions"><button class="primary" data-close>Keep playing</button><button class="secondary" id="restart">New run</button></div><p style="font-size:11px">Seed ${state.seed} \xB7 Playtest 03</p>`,
  );
  for (const k of ["sound", "fast", "reduced"])
    $("pref-" + k).onchange = (e) => {
      prefs[k] = e.target.checked;
      preferences();
    };
  $("restart").onclick = () => {
    modal(
      `${closeButton}<h2>Start fresh?</h2><p>This replaces your saved run.</p><div class="modal-actions"><button class="primary" id="confirm-restart">New run</button><button class="secondary" data-close>Keep this run</button></div>`,
    );
    $("confirm-restart").onclick = () => startNew();
  };
}
async function startNew(seed = Date.now() >>> 0, config = state.config) {
  epoch++;
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
}
function endRound() {
  const win = state.status === "won",
    lost = state.status === "lost";
  modal(
    `<div class="eyebrow">${lost ? "RUN ENDED" : win ? "RUN COMPLETE" : "TARGET CLEARED"}</div><h2>${lost ? "Target missed" : win ? "All rounds cleared" : "Round cleared"}</h2><p>${lost ? `${fmt(state.score)} of ${fmt(state.config.targets[state.round])} points. Try a new board or replay this seed.` : win ? "Run complete." : "Coins carry to the next round."}</p><div class="stats"><div><b>${fmt(state.total)}</b><span>TOTAL POINTS</span></div><div><b>${state.bestChain}</b><span>BEST CASCADE</span></div><div><b>${state.coins}</b><span>COINS</span></div></div><div class="modal-actions"><button class="primary" id="advance">${lost || win ? "New run" : "Next round \u2192"}</button>${lost ? '<button class="secondary" id="retry">Replay seed</button>' : ""}<button class="secondary" id="end-ledger">Breakdown</button></div>`,
  );
  $("advance").onclick = async () => {
    if (lost || win) return startNew();
    closeModal();
    state = nextRound(state);
    display = { score: state.score, moves: state.moves, coins: state.coins };
    save();
    resetCalc();
    clearMarks();
    renderCells(state.board);
    busy = true;
    hud();
    await board.set(state.board, { duration: 600, roll: true });
    busy = false;
    hud();
  };
  if (lost) $("retry").onclick = () => startNew(state.seed);
  $("end-ledger").onclick = () => {
    ledger();
    const b = document.createElement("button");
    b.className = "secondary";
    b.textContent = "Round result";
    b.onclick = endRound;
    $("modal-content").append(b);
  };
}
function lab() {
  modal(
    `${closeButton}<div class="eyebrow">PLAYTEST CONTROLS</div><h2>Test bench.</h2><p>Changes start a fresh seeded run. Each special has its own spawn chance.</p><div class="settings"><label>Seed<input id="seed" class="wide" type="number" min="0" max="4294967295" value="${state.seed}"></label><label>Moves per round<input id="lab-moves" type="number" min="1" max="30" value="${state.config.moves}"></label>${state.config.targets.map((n, i) => `<label>Round ${i + 1} target<input id="target-${i}" type="number" min="1" max="999999" value="${n}"></label>`).join("")}${TYPES.map((t, i) => `<label>${names[t]} %<input id="rate-${i}" type="number" min="0" max="20" step="1" value="${state.config.rates[i]}"></label>`).join("")}<label>1s & 2s get +1 Mult<input id="low-bonus" type="checkbox" ${state.config.lowBonus ? "checked" : ""}></label></div><div class="modal-actions"><button class="primary" id="apply-test">Start test run</button><button class="secondary" id="reset-test">Defaults</button></div><div class="modal-actions"><button class="secondary" id="export-run">Export run log</button></div>`,
  );
  $("apply-test").onclick = () => {
    const moves = +$("lab-moves").value,
      targets = [0, 1, 2].map((i) => +$("target-" + i).value),
      rates = TYPES.map((_, i) => +$("rate-" + i).value),
      seed = +$("seed").value;
    if (
      !Number.isInteger(moves) ||
      moves < 1 ||
      moves > 30 ||
      targets.some((n) => !Number.isInteger(n) || n < 1 || n > 999999) ||
      rates.some((n) => !Number.isFinite(n) || n < 0 || n > 20) ||
      rates.reduce((a,b)=>a+b,0)>100 ||
      !Number.isInteger(seed) ||
      seed < 0 ||
      seed > 4294967295
    ) {
      toast("Please use values within the shown limits.");
      return;
    }
    startNew(seed, { moves, targets, rates, lowBonus: $("low-bonus").checked });
  };
  $("reset-test").onclick = () => startNew(Date.now() >>> 0, DEFAULTS);
  $("export-run").onclick = () => {
    const blob = new Blob(
        [JSON.stringify({ build: "0.3.1", ...state }, null, 2)],
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
  if(amount || idleActive) board.idle(viewBoard,amount);
  idleActive=Boolean(amount);
  requestAnimationFrame(idleTick);
}
requestAnimationFrame(idleTick);
