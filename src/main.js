import { config } from './config.js';
import { textes } from './i18n.js';
import { silk, drawVelvet, drawQuilt, petalImages, drawFrame, drawSwags, drawRing, drawBrooch } from './textures.js';
import { divider, globalDefs, pin, mic, chevron, soundOn, soundOff, icones, fleur } from './svg.js';
import * as music from './music.js';

const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
let lang = config.langue === 'fr' ? 'fr' : 'ar';
const isOpened = () => document.body.classList.contains('opened');

/* ================= Décor statique ================= */
$('#defs').innerHTML = globalDefs;
$$('.orn').forEach((el) => (el.innerHTML = divider));
$('#fleur').innerHTML = fleur;
$$('.tflower').forEach((el) => (el.innerHTML = fleur));
$('#fleur2').innerHTML = fleur;
drawRing($('#medal'), 136, 136, { r: 3, flowers: true, alt: true });
drawBrooch($('#topBrooch'), 92);
$('#chevron').innerHTML = chevron;
$('#pin').innerHTML = pin;
$('#micIco').innerHTML = mic;
$('#sound').innerHTML = soundOff;
$('#lieuImg').src = config.lieu.image;
$('#maps').href = config.lieu.maps;

// Fond soie turquoise
function paintSatin() {
  const url = silk(Math.min(window.innerWidth, 1400), Math.min(window.innerHeight, 1000));
  document.documentElement.style.setProperty('--silk', `url(${url})`);
}
paintSatin();

// Paillettes
for (let i = 0; i < 26; i++) {
  const s = document.createElement('i');
  s.style.left = `${Math.random() * 100}%`;
  s.style.top = `${Math.random() * 100}%`;
  s.style.animationDelay = `${-Math.random() * 6}s`;
  s.style.animationDuration = `${4 + Math.random() * 5}s`;
  $('#sparkles').appendChild(s);
}

// Lumières dorées (bokeh)
for (let i = 0; i < 14; i++) {
  const b = document.createElement('i');
  const s = 30 + Math.random() * 90;
  b.style.width = b.style.height = `${s}px`;
  b.style.left = `${Math.random() * 100}%`;
  b.style.top = `${Math.random() * 100}%`;
  b.style.animationDuration = `${14 + Math.random() * 16}s`;
  b.style.animationDelay = `${-Math.random() * 20}s`;
  $('#bokeh').appendChild(b);
}

/* ================= Écrin ================= */
const PETALS = petalImages();
PETALS.forEach((u, k) => document.documentElement.style.setProperty(`--tp${k}`, `url(${u})`));
const RINGS = [
  // n, largeur, hauteur, décalage, inclinaison fermée/ouverte, teintes possibles
  { n: 10, w: 0.5, h: 0.56, off: 0.03, tc: 14, to: 4, tones: [0, 1] },
  { n: 9, w: 0.44, h: 0.48, off: 0.02, tc: 30, to: 10, tones: [2] },
  { n: 8, w: 0.38, h: 0.4, off: 0.01, tc: 48, to: 16, tones: [0, 1] },
  { n: 7, w: 0.31, h: 0.32, off: 0, tc: 64, to: 24, tones: [2] },
  { n: 6, w: 0.24, h: 0.24, off: -0.01, tc: 76, to: 34, tones: [1] },
  { n: 5, w: 0.17, h: 0.17, off: -0.015, tc: 84, to: 46, tones: [2] },
];
function buildFlower() {
  const root = $('#flower');
  root.innerHTML = '';
  RINGS.forEach((r, ri) => {
    for (let i = 0; i < r.n; i++) {
      const p = document.createElement('div');
      p.className = `petal ring-${ri}`;
      const tone = r.tones[i % r.tones.length];
      p.style.backgroundImage = `var(--tp${(i % 3) * 3 + tone})`;
      const set = (k, v) => p.style.setProperty(k, v);
      set('--w', r.w * (0.94 + Math.random() * 0.12));
      set('--h', r.h * (0.94 + Math.random() * 0.12));
      set('--a', `${(360 / r.n) * i + ri * 17 + Math.random() * 8}deg`);
      set('--off', r.off);
      set('--tc', `${r.tc + Math.random() * 6 - 3}deg`);
      set('--to', `${r.to + Math.random() * 6 - 3}deg`);
      set('--z', `${ri * 6 + i * 0.2}px`);
      set('--d', `${(RINGS.length - ri) * 0.08 + Math.random() * 0.12}s`);
      set('--curl', `${Math.random() * 24 - 12}deg`);
      root.appendChild(p);
    }
  });
  // cœur de strass
  const heart = document.createElement('canvas');
  heart.className = 'heart';
  root.appendChild(heart);
  drawBrooch(heart, 60);
}
buildFlower();

function sizeCase() {
  const W = Math.round(Math.min(window.innerWidth * 0.86, window.innerHeight * 0.56, 420));
  const H = Math.round(W * 1.18);
  const c = $('#case');
  c.style.width = `${W}px`;
  c.style.height = `${H}px`;
  c.style.setProperty('--W', `${W}px`);
  const rad = Math.round(W * 0.09);
  drawVelvet($('#velvet'), W, H, { radius: rad });
  drawQuilt($('#quilt'), W, H, { radius: rad });
  drawQuilt($('#quilt2'), W, H, { radius: rad });
  drawBrooch($('#brooch'), Math.round(W * 0.22));
  const card = $('#card');
  drawFrame($('#cardFrame'), card.offsetWidth, card.offsetHeight, { margin: 6, r: 1.8, small: true, noGold: true });
}
sizeCase();

/* ================= Monogramme ================= */
function renderMono() {
  const t = textes[lang];
  const a = [...t.n1][0];
  const b = [...t.n2][0];
  $$('.mono').forEach((m) => (m.innerHTML = `<span class="m1">${a}</span><span class="m2">${b}</span><i></i>`));
}

/* ================= Compte à rebours ================= */
const units = ['jours', 'heures', 'minutes', 'secondes'];
$('#countdown').innerHTML = units
  .map((u) => `<div class="cd"><canvas></canvas><b id="cd-${u}">00</b><small data-t="${u}"></small></div>`)
  .join('');
$$('.cd canvas').forEach((c) => drawRing(c, 72, 98, { r: 2.6, flowers: true }));

function tick() {
  const diff = Math.max(0, new Date(config.date) - new Date());
  const v = {
    jours: Math.floor(diff / 864e5),
    heures: Math.floor((diff / 36e5) % 24),
    minutes: Math.floor((diff / 6e4) % 60),
    secondes: Math.floor((diff / 1e3) % 60),
  };
  units.forEach((u) => {
    const el = $(`#cd-${u}`);
    const val = String(v[u]).padStart(2, '0');
    if (el.textContent !== val) {
      el.textContent = val;
      el.classList.remove('tick');
      void el.offsetWidth;
      el.classList.add('tick');
    }
  });
}
tick();
setInterval(tick, 1000);

/* ================= Programme ================= */
function renderTimeline() {
  $('#timeline').innerHTML = config.programme
    .map(
      (p, i) => `<li class="reveal" style="transition-delay:${i * 0.18}s">
        <div class="tl-ico"><canvas></canvas>${icones[p.icone] || icones.bouquet}</div>
        <div class="tl-dot"></div>
        <div class="tl-txt"><span class="tl-h">${p.heure}</span><strong>${p[lang]}</strong></div>
      </li>`
    )
    .join('');
  $$('.tl-ico canvas').forEach((c) => drawRing(c, 64, 64, { r: 2.3 }));
  if (isOpened()) observe();
}

/* ================= Code couleur ================= */
function renderSwatches() {
  $('#swatches').innerHTML = config.couleurs
    .map(
      (c, i) => `<div class="sw reveal" style="transition-delay:${i * 0.12}s">
        <div class="sw-dot" style="--c:${c.hex}"><canvas></canvas></div>
        <span>${c[lang]}</span>
      </div>`
    )
    .join('');
  $$('.sw-dot canvas').forEach((cv) => drawRing(cv, 66, 66, { r: 1.9 }));
  $('#paletteBar').innerHTML = config.couleurs.map((c) => `<i style="background:${c.hex}"></i>`).join('');
}

/* ================= Traductions ================= */
function applyLang() {
  const t = textes[lang];
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  $$('[data-t]').forEach((el) => {
    const v = t[el.dataset.t];
    if (typeof v === 'string') el.textContent = v;
  });
  $$('[data-ph]').forEach((el) => (el.placeholder = t[el.dataset.ph]));
  $('#promise').innerHTML = t.promesse.map((p) => `<span>${p}</span>`).join('');
  $('#lang').textContent = t.langue;
  renderMono();
  renderTimeline();
  renderSwatches();
  if (isOpened()) observe();
  requestAnimationFrame(layout);
}
$('#lang').addEventListener('click', (e) => {
  e.stopPropagation();
  lang = lang === 'fr' ? 'ar' : 'fr';
  applyLang();
});

/* ================= Apparitions ================= */
const io = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    }),
  { threshold: 0.2 }
);
const observe = () => $$('.reveal:not(.in)').forEach((el) => io.observe(el));

/* ================= Panneaux empilés ================= */
const panels = $$('.panel');
const sizes = new Map();
function drawPanel(p) {
  const w = p.offsetWidth;
  const h = p.offsetHeight;
  const key = `${w}x${h}`;
  if (sizes.get(p) === key) return;
  sizes.set(p, key);
  const c = p.querySelector('.pframe');
  drawFrame(c, w, h, { margin: 20, r: Math.max(2.4, w / 150), topFlowers: +c.dataset.top || 0 });
  const sw = p.querySelector('.swags');
  if (sw) drawSwags(sw, w, Math.min(130, w * 0.3));
  const ph = p.querySelector('.photo-frame');
  if (ph) drawFrame(ph, ph.parentElement.offsetWidth, ph.parentElement.offsetHeight, { margin: 4, r: 2.2, small: true, noGold: true });
}
function layout() {
  panels.forEach((p) => {
    p.style.top = `${Math.min(0, window.innerHeight - p.offsetHeight)}px`;
    drawPanel(p);
  });
}
const ro = new ResizeObserver(() => requestAnimationFrame(layout));
panels.forEach((p) => ro.observe(p));

let ticking = false;
function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const vh = window.innerHeight;
    panels.forEach((p, i) => {
      const next = panels[i + 1];
      const prog = next ? Math.min(1, Math.max(0, 1 - next.getBoundingClientRect().top / vh)) : 0;
      p.style.setProperty('--cover', prog.toFixed(3));
    });
    const end = vh + window.scrollY >= document.documentElement.scrollHeight - 40;
    $('#chevron').classList.toggle('hide', end);
    ticking = false;
  });
}
window.addEventListener('scroll', onScroll, { passive: true });
let rz;
window.addEventListener('resize', () => {
  clearTimeout(rz);
  rz = setTimeout(() => {
    paintSatin();
    if ($('#stage')) sizeCase();
    layout();
    onScroll();
  }, 200);
});

applyLang();
onScroll();

/* ================= Musique ================= */
music.initMusic();
const setSound = (on) => ($('#sound').innerHTML = on ? soundOn : soundOff);
$('#sound').addEventListener('click', (e) => {
  e.stopPropagation();
  setSound(music.toggle());
});

/* ================= Ouverture de l'écrin ================= */
function burst(n = 40) {
  const b = $('#burst');
  for (let i = 0; i < n; i++) {
    const p = document.createElement('i');
    const a = Math.random() * Math.PI * 2;
    const d = 80 + Math.random() * Math.min(window.innerWidth, 420) * 0.6;
    p.style.setProperty('--x', `${Math.cos(a) * d}px`);
    p.style.setProperty('--y', `${Math.sin(a) * d}px`);
    p.style.setProperty('--s', (0.5 + Math.random()).toFixed(2));
    p.style.animationDelay = `${Math.random() * 0.25}s`;
    p.className = Math.random() < 0.5 ? 'pearl' : 'star';
    b.appendChild(p);
    setTimeout(() => p.remove(), 2200);
  }
}

let opened = false;
function openCase() {
  if (opened) return;
  opened = true;
  const stage = $('#stage');
  const at = (ms, fn) => setTimeout(fn, ms);
  music.play();
  setSound(true);

  stage.classList.add('s-clasp'); //                       le bijou s'illumine
  burst(26);
  at(500, () => stage.classList.add('s-lid')); //            le couvercle se lève
  at(2100, () => stage.classList.add('s-bloom')); //         la fleur bijou s'ouvre
  at(3300, () => {
    stage.classList.add('s-card'); //                        la carte s'élève
    burst(40);
  });
  at(7000, () => {
    const card = $('#card').getBoundingClientRect();
    const k = Math.max(window.innerWidth / card.width, window.innerHeight / card.height) * 1.15;
    const dx = window.innerWidth / 2 - (card.left + card.width / 2);
    const dy = window.innerHeight / 2 - (card.top + card.height / 2);
    $('#scene').style.transform = `translate(${dx * k}px, ${dy * k}px) scale(${k})`;
    stage.classList.add('s-zoom');
  });
  at(8100, () => {
    document.body.classList.add('opened');
    stage.classList.add('s-done');
    layout();
    observe();
  });
  at(9600, () => stage.remove());
}
$('#stage').addEventListener('click', openCase);

/* ================= Chevron ================= */
$('#chevron').addEventListener('click', () => {
  const next = panels.find((p) => p.getBoundingClientRect().top > 10);
  window.scrollTo({ top: next ? next.offsetTop : window.scrollY + window.innerHeight * 0.8, behavior: 'smooth' });
});

/* ================= RSVP ================= */
const nb = $('#f-nb');
$('#minus').onclick = () => (nb.value = Math.max(1, +nb.value - 1));
$('#plus').onclick = () => (nb.value = Math.min(20, +nb.value + 1));

let recorder = null;
let vocalData = null;
$('#vocal').addEventListener('click', async () => {
  const t = textes[lang];
  if (recorder && recorder.state === 'recording') return recorder.stop();
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const chunks = [];
    recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (e) => chunks.push(e.data);
    recorder.onstop = () => {
      stream.getTracks().forEach((tr) => tr.stop());
      const blob = new Blob(chunks, { type: recorder.mimeType });
      const player = $('#vocalPlay');
      player.src = URL.createObjectURL(blob);
      player.hidden = false;
      $('#vocal').classList.remove('rec');
      $('#vocalTxt').textContent = t.vocalOk;
      const fr = new FileReader();
      fr.onload = () => (vocalData = fr.result);
      fr.readAsDataURL(blob);
    };
    recorder.start();
    $('#vocal').classList.add('rec');
    $('#vocalTxt').textContent = t.stop;
    setTimeout(() => recorder.state === 'recording' && recorder.stop(), 60000);
  } catch {
    $('#vocalTxt').textContent = t.micErreur;
  }
});

$('#form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const t = textes[lang];
  const f = new FormData(e.target);
  const data = {
    nom: (f.get('nom') || '').trim(),
    presence: f.get('presence'),
    nombre: +f.get('nombre'),
    message: (f.get('message') || '').trim(),
    vocal: vocalData,
    date: new Date().toISOString(),
  };
  if (!data.nom) {
    $('#err').textContent = t.erreurNom;
    $('#f-nom').focus();
    return;
  }
  $('#err').textContent = '';
  try {
    if (config.rsvpEndpoint) {
      await fetch(config.rsvpEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    } else {
      const all = JSON.parse(localStorage.getItem('rsvp-reponses') || '[]');
      all.push({ ...data, vocal: data.vocal ? '(audio)' : null });
      localStorage.setItem('rsvp-reponses', JSON.stringify(all));
    }
  } catch {
    /* hors ligne */
  }
  e.target.hidden = true;
  $('#merci').hidden = false;
});
