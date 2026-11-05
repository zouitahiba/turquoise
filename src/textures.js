// Textures « joaillerie » dessinées en canvas : perles, strass, velours turquoise,
// satin capitonné, soie turquoise, pétales bijoux, cadres, broche.

const DPR = Math.min(2, window.devicePixelRatio || 1);
const rnd = (a, b) => a + Math.random() * (b - a);
const TAU = Math.PI * 2;

/* ================= Sprites ================= */
function makePearl(tint) {
  const S = 96;
  const c = document.createElement('canvas');
  c.width = c.height = S;
  const g = c.getContext('2d');
  const r = S * 0.36;
  const cx = S / 2;
  g.shadowColor = 'rgba(20,60,58,0.45)';
  g.shadowBlur = S * 0.08;
  g.shadowOffsetX = S * 0.03;
  g.shadowOffsetY = S * 0.05;
  const col = {
    ivory: ['#ffffff', '#f7f2ea', '#ddd3c4', '#b5a68f'],
    aqua: ['#ffffff', '#e4f6f3', '#a9dcd5', '#5fa9a1'],
    gold: ['#fff7e6', '#ecd9b4', '#c9a874', '#9a7a4c'],
  }[tint];
  const grd = g.createRadialGradient(cx - r * 0.35, cx - r * 0.4, r * 0.05, cx, cx, r);
  grd.addColorStop(0, col[0]);
  grd.addColorStop(0.35, col[1]);
  grd.addColorStop(0.82, col[2]);
  grd.addColorStop(1, col[3]);
  g.fillStyle = grd;
  g.beginPath();
  g.arc(cx, cx, r, 0, TAU);
  g.fill();
  g.shadowColor = 'transparent';
  const h = g.createRadialGradient(cx - r * 0.38, cx - r * 0.42, 0, cx - r * 0.38, cx - r * 0.42, r * 0.45);
  h.addColorStop(0, 'rgba(255,255,255,0.95)');
  h.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = h;
  g.beginPath();
  g.arc(cx, cx, r, 0, TAU);
  g.fill();
  const b = g.createRadialGradient(cx + r * 0.3, cx + r * 0.45, 0, cx + r * 0.3, cx + r * 0.45, r * 0.5);
  b.addColorStop(0, tint === 'aqua' ? 'rgba(220,255,250,0.6)' : 'rgba(230,250,246,0.5)');
  b.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = b;
  g.beginPath();
  g.arc(cx, cx, r, 0, TAU);
  g.fill();
  return c;
}

// Strass : cristal taillé serti dans une griffe argentée
function makeStrass(tint) {
  const S = 96;
  const c = document.createElement('canvas');
  c.width = c.height = S;
  const g = c.getContext('2d');
  const cx = S / 2;
  const R = S * 0.38;
  // sertissure
  g.shadowColor = 'rgba(20,50,50,0.5)';
  g.shadowBlur = 5;
  g.shadowOffsetY = 3;
  const cup = g.createRadialGradient(cx - R * 0.3, cx - R * 0.3, R * 0.2, cx, cx, R);
  cup.addColorStop(0, '#ffffff');
  cup.addColorStop(0.6, '#c9d2d1');
  cup.addColorStop(1, '#7d8a89');
  g.fillStyle = cup;
  g.beginPath();
  g.arc(cx, cx, R, 0, TAU);
  g.fill();
  g.shadowColor = 'transparent';
  // facettes
  const r = R * 0.84;
  const n = 8;
  const pal =
    tint === 'aqua'
      ? ['#e9fffc', '#7fd6cd', '#3fb2a8', '#b9f0ea', '#2a8f87', '#d6fbf7', '#5cc5bb', '#ffffff']
      : ['#ffffff', '#cfe9ee', '#9fb8c4', '#f4fbff', '#8ea6b4', '#e8f6fb', '#b8d0da', '#ffffff'];
  for (let i = 0; i < n; i++) {
    const a0 = (i / n) * TAU - Math.PI / 8;
    const a1 = ((i + 1) / n) * TAU - Math.PI / 8;
    g.fillStyle = pal[i];
    g.beginPath();
    g.moveTo(cx, cx);
    g.lineTo(cx + Math.cos(a0) * r, cx + Math.sin(a0) * r);
    g.lineTo(cx + Math.cos(a1) * r, cx + Math.sin(a1) * r);
    g.closePath();
    g.fill();
  }
  // table centrale
  g.fillStyle = tint === 'aqua' ? 'rgba(200,250,245,0.85)' : 'rgba(255,255,255,0.8)';
  g.beginPath();
  for (let i = 0; i < n; i++) {
    const a = (i / n) * TAU;
    g[i ? 'lineTo' : 'moveTo'](cx + Math.cos(a) * r * 0.45, cx + Math.sin(a) * r * 0.45);
  }
  g.closePath();
  g.fill();
  g.strokeStyle = 'rgba(255,255,255,0.7)';
  g.lineWidth = 1;
  g.stroke();
  // éclat
  const h = g.createRadialGradient(cx - r * 0.3, cx - r * 0.35, 0, cx - r * 0.3, cx - r * 0.35, r * 0.5);
  h.addColorStop(0, 'rgba(255,255,255,1)');
  h.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = h;
  g.beginPath();
  g.arc(cx, cx, r, 0, TAU);
  g.fill();
  // griffes
  g.fillStyle = '#e9eeee';
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * TAU + Math.PI / 4;
    g.beginPath();
    g.arc(cx + Math.cos(a) * R * 0.88, cx + Math.sin(a) * R * 0.88, R * 0.14, 0, TAU);
    g.fill();
  }
  return c;
}

const SPR = {};
function spr() {
  if (!SPR.ivory) {
    SPR.ivory = makePearl('ivory');
    SPR.aqua = makePearl('aqua');
    SPR.gold = makePearl('gold');
    SPR.strass = makeStrass('white');
    SPR.strassA = makeStrass('aqua');
  }
  return SPR;
}

export function gem(g, x, y, r, kind = 'ivory') {
  const s = spr()[kind];
  const d = r / (kind.startsWith('strass') ? 0.38 : 0.36);
  g.drawImage(s, x - d / 2, y - d / 2, d, d);
}

function strand(g, fn, r, gap = 0.15, kind = 'ivory', alt) {
  let t = 0;
  let [px, py] = fn(0);
  let n = 0;
  gem(g, px, py, r, kind);
  while (t < 1) {
    let nx, ny;
    do {
      t += 0.002;
      [nx, ny] = fn(Math.min(t, 1));
    } while (Math.hypot(nx - px, ny - py) < r * (2 + gap) && t < 1);
    if (t >= 1) break;
    n++;
    gem(g, nx, ny, r * (alt && n % 2 ? 0.7 : 1), alt && n % 2 ? alt : kind);
    px = nx;
    py = ny;
  }
}

// Fleur bijou : strass central + pétales de perles
export function jewelFlower(g, x, y, r, center = 'strassA') {
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * TAU - Math.PI / 2;
    gem(g, x + Math.cos(a) * r * 1.95, y + Math.sin(a) * r * 1.95, r, 'ivory');
  }
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * TAU - Math.PI / 2 + Math.PI / 6;
    gem(g, x + Math.cos(a) * r * 2.6, y + Math.sin(a) * r * 2.6, r * 0.45, 'strass');
  }
  gem(g, x, y, r * 1.2, center);
}

function setup(canvas, w, h) {
  canvas.width = Math.round(w * DPR);
  canvas.height = Math.round(h * DPR);
  canvas.style.width = `${w}px`;
  canvas.style.height = `${h}px`;
  const g = canvas.getContext('2d');
  g.setTransform(DPR, 0, 0, DPR, 0, 0);
  return g;
}

/* ================= Soie turquoise ================= */
export function silk(w, h, tone = 'turq') {
  const sc = 0.5;
  const W = Math.ceil(w * sc);
  const H = Math.ceil(h * sc);
  const c = document.createElement('canvas');
  c.width = W;
  c.height = H;
  const g = c.getContext('2d');
  const img = g.createImageData(W, H);
  const d = img.data;
  const base = tone === 'turq' ? [70, 178, 170] : [232, 244, 241];
  const hiC = tone === 'turq' ? [215, 250, 246] : [255, 255, 255];
  const loC = tone === 'turq' ? [22, 98, 96] : [170, 205, 200];
  for (let j = 0; j < H; j++) {
    for (let i = 0; i < W; i++) {
      const x = i / sc;
      const y = j / sc;
      const t =
        (x * 0.6 - y) * 0.019 +
        2.4 * Math.sin(x * 0.0058 - y * 0.0026) +
        1.5 * Math.sin(y * 0.0068 + x * 0.0031 + 1.1) +
        0.5 * Math.sin((x + y * 0.5) * 0.015);
      const s = Math.sin(t);
      const hi = Math.pow(Math.max(0, Math.sin(t + 0.9)), 12) * 0.85 + Math.max(0, s) * 0.15;
      const lo = Math.pow(Math.max(0, -Math.sin(t - 0.3)), 2) * 0.6;
      const k = (j * W + i) * 4;
      for (let ch = 0; ch < 3; ch++) {
        let v = base[ch] + (hiC[ch] - base[ch]) * hi - (base[ch] - loC[ch]) * lo + (Math.random() - 0.5) * 3;
        d[k + ch] = Math.max(0, Math.min(255, v));
      }
      d[k + 3] = 255;
    }
  }
  g.putImageData(img, 0, 0);
  return c.toDataURL('image/jpeg', 0.9);
}

/* ================= Velours turquoise (couvercle de l'écrin) ================= */
export function drawVelvet(canvas, w, h, opts = {}) {
  const g = setup(canvas, w, h);
  const rad = opts.radius || 28;
  g.save();
  g.beginPath();
  g.roundRect(0, 0, w, h, rad);
  g.clip();
  const bg = g.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#2fa39a');
  bg.addColorStop(0.5, '#1f8780');
  bg.addColorStop(1, '#14625e');
  g.fillStyle = bg;
  g.fillRect(0, 0, w, h);
  // poils de velours
  for (let i = 0; i < (w * h) / 6; i++) {
    g.fillStyle = Math.random() < 0.5 ? 'rgba(255,255,255,0.05)' : 'rgba(0,30,30,0.06)';
    g.fillRect(rnd(0, w), rnd(0, h), 1, 1);
  }
  // reflet doux
  const sh = g.createRadialGradient(w * 0.32, h * 0.22, 0, w * 0.32, h * 0.22, w * 0.9);
  sh.addColorStop(0, 'rgba(190,255,248,0.45)');
  sh.addColorStop(0.5, 'rgba(120,220,210,0.08)');
  sh.addColorStop(1, 'rgba(0,40,40,0.35)');
  g.fillStyle = sh;
  g.fillRect(0, 0, w, h);
  g.restore();

  const u = w / 100;
  const m = 4.2 * u;
  // bordure de strass + perles
  const rr = (inset, fn) => {
    const W = w - 2 * inset;
    const H = h - 2 * inset;
    const R = Math.max(4, rad - inset);
    return roundRectPath(inset, inset, W, H, R);
  };
  strand(g, rr(m), 1.25 * u, 0.12, 'strass');
  strand(g, rr(m + 3.2 * u), 0.75 * u, 0.35, 'ivory');
  // coins
  [
    [m + 9 * u, m + 9 * u],
    [w - m - 9 * u, m + 9 * u],
    [m + 9 * u, h - m - 9 * u],
    [w - m - 9 * u, h - m - 9 * u],
  ].forEach(([x, y]) => jewelFlower(g, x, y, 1.3 * u));
  // médaillon central de perles
  const cx = w / 2;
  const cy = h * (opts.plaqueY || 0.42);
  const rx = w * 0.27;
  const ry = w * 0.32;
  g.fillStyle = 'rgba(250,246,238,0.96)';
  g.beginPath();
  g.ellipse(cx, cy, rx, ry, 0, 0, TAU);
  g.fill();
  const inner = g.createRadialGradient(cx - rx * 0.3, cy - ry * 0.4, 0, cx, cy, ry);
  inner.addColorStop(0, 'rgba(255,255,255,0.9)');
  inner.addColorStop(1, 'rgba(200,225,220,0.4)');
  g.fillStyle = inner;
  g.fill();
  strand(g, (t) => [cx + Math.cos(t * TAU) * (rx + 1.4 * u), cy + Math.sin(t * TAU) * (ry + 1.4 * u)], 1.05 * u, 0.08, 'ivory');
  strand(g, (t) => [cx + Math.cos(t * TAU) * (rx + 3.6 * u), cy + Math.sin(t * TAU) * (ry + 3.6 * u)], 0.7 * u, 0.6, 'strass');
  jewelFlower(g, cx, cy - ry - 3.2 * u, 1.2 * u);
  jewelFlower(g, cx, cy + ry + 3.2 * u, 1.2 * u);
}

function roundRectPath(x, y, W, H, R) {
  const per = 2 * (W + H - 4 * R) + TAU * R;
  const seg = [
    [W - 2 * R, (s) => [x + R + s, y]],
    [(Math.PI * R) / 2, (s) => arc(x + W - R, y + R, -Math.PI / 2 + s / R)],
    [H - 2 * R, (s) => [x + W, y + R + s]],
    [(Math.PI * R) / 2, (s) => arc(x + W - R, y + H - R, s / R)],
    [W - 2 * R, (s) => [x + W - R - s, y + H]],
    [(Math.PI * R) / 2, (s) => arc(x + R, y + H - R, Math.PI / 2 + s / R)],
    [H - 2 * R, (s) => [x, y + H - R - s]],
    [(Math.PI * R) / 2, (s) => arc(x + R, y + R, Math.PI + s / R)],
  ];
  function arc(cx, cy, a) {
    return [cx + Math.cos(a) * R, cy + Math.sin(a) * R];
  }
  return (t) => {
    let s = t * per;
    for (const [len, f] of seg) {
      if (s <= len) return f(s);
      s -= len;
    }
    return [x + R, y];
  };
}

/* ================= Satin ivoire capitonné (intérieur) ================= */
export function drawQuilt(canvas, w, h, opts = {}) {
  const g = setup(canvas, w, h);
  const rad = opts.radius || 22;
  g.save();
  g.beginPath();
  g.roundRect(0, 0, w, h, rad);
  g.clip();
  g.fillStyle = '#efe9df';
  g.fillRect(0, 0, w, h);
  const step = w / 5;
  // losanges bombés
  for (let y = -step; y < h + step; y += step / 2) {
    const row = Math.round(y / (step / 2));
    for (let x = -step; x < w + step; x += step) {
      const cx = x + (row % 2 ? step / 2 : 0);
      const gr = g.createRadialGradient(cx - step * 0.12, y - step * 0.15, step * 0.05, cx, y, step * 0.62);
      gr.addColorStop(0, '#fffdf9');
      gr.addColorStop(0.6, '#f1ebe1');
      gr.addColorStop(1, '#d6ccbd');
      g.fillStyle = gr;
      g.beginPath();
      g.moveTo(cx, y - step / 2);
      g.lineTo(cx + step / 2, y);
      g.lineTo(cx, y + step / 2);
      g.lineTo(cx - step / 2, y);
      g.closePath();
      g.fill();
    }
  }
  // boutons de perle aux intersections
  for (let y = -step / 2; y < h + step; y += step / 2) {
    const row = Math.round(y / (step / 2) + 1);
    for (let x = -step; x < w + step; x += step) {
      const cx = x + (row % 2 ? step / 2 : 0);
      gem(g, cx, y, step * 0.05, 'ivory');
    }
  }
  // ombre intérieure
  const v = g.createRadialGradient(w / 2, h / 2, w * 0.25, w / 2, h / 2, w * 0.8);
  v.addColorStop(0, 'rgba(0,0,0,0)');
  v.addColorStop(1, 'rgba(30,70,66,0.35)');
  g.fillStyle = v;
  g.fillRect(0, 0, w, h);
  g.restore();
}

/* ================= Pétales bijoux (images) ================= */
const SHAPES = [
  'M50 118 C28 112 6 92 4 62 C2 36 12 14 26 12 C32 4 41 8 46 4 C50 1 54 6 58 3 C64 7 70 2 76 11 C90 13 98 36 96 62 C94 92 72 112 50 118Z',
  'M50 118 C30 110 12 90 10 60 C8 34 16 12 30 8 C38 6 44 14 50 18 C56 14 62 6 70 8 C84 12 92 34 90 60 C88 90 70 110 50 118Z',
  'M50 118 C24 114 2 96 2 66 C2 44 8 26 18 20 C22 10 32 12 36 6 C42 10 46 2 52 5 C58 2 62 10 68 6 C74 12 80 10 84 20 C94 26 98 44 98 66 C98 96 76 114 50 118Z',
];
export function petalImages() {
  const svgNS = 'http://www.w3.org/2000/svg';
  const host = document.createElementNS(svgNS, 'svg');
  host.style.cssText = 'position:absolute;width:0;height:0';
  document.body.appendChild(host);
  const out = [];
  const tones = [
    ['#0f6a65', '#2fa39a', '#86d7ce', '#e3faf6'],
    ['#14736d', '#3bb0a6', '#9fe0d8', '#f2fdfb'],
    ['#f1ebe1', '#f8f4ee', '#fffdfa', '#ffffff'], // pétales nacre
  ];
  SHAPES.forEach((d, si) =>
    tones.forEach((tc, ti) => {
      const S = 2.2; // échelle
      const c = document.createElement('canvas');
      c.width = 124 * S;
      c.height = 142 * S;
      const g = c.getContext('2d');
      g.scale(S, S);
      g.translate(12, 10);
      const p = new Path2D(d);
      g.save();
      g.shadowColor = 'rgba(10,50,48,0.35)';
      g.shadowBlur = 8;
      g.shadowOffsetY = 4;
      const gr = g.createRadialGradient(50, 118, 4, 50, 110, 125);
      gr.addColorStop(0, tc[0]);
      gr.addColorStop(0.35, tc[1]);
      gr.addColorStop(0.75, tc[2]);
      gr.addColorStop(1, tc[3]);
      g.fillStyle = gr;
      g.fill(p);
      g.restore();
      // reflet satiné
      const sh = g.createLinearGradient(0, 0, 100, 40);
      sh.addColorStop(0.3, 'rgba(255,255,255,0)');
      sh.addColorStop(0.5, 'rgba(255,255,255,0.5)');
      sh.addColorStop(0.7, 'rgba(255,255,255,0)');
      g.fillStyle = sh;
      g.fill(p);
      // nervures
      g.strokeStyle = ti < 2 ? 'rgba(255,255,255,0.18)' : 'rgba(150,135,110,0.12)';
      g.lineWidth = 0.6;
      ['M50 116 Q49 70 50 22', 'M50 116 Q40 72 26 26', 'M50 116 Q60 72 74 26'].forEach((v) => g.stroke(new Path2D(v)));
      // perles le long du bord
      const el = document.createElementNS(svgNS, 'path');
      el.setAttribute('d', d);
      host.appendChild(el);
      const L = el.getTotalLength();
      const r = 1.6;
      for (let s = L * 0.12; s < L * 0.88; s += r * 2.25) {
        const pt = el.getPointAtLength(s);
        const kind = ti === 2 ? 'aqua' : Math.floor(s / (r * 2.25)) % 7 === 0 ? 'strass' : 'ivory';
        gem(g, pt.x, pt.y + 0.5, kind === 'strass' ? r * 1.15 : r, kind);
      }
      out.push(c.toDataURL());
    })
  );
  host.remove();
  return out; // 9 images
}

/* ================= Cadre perles + strass ================= */
export function drawFrame(canvas, w, h, opts = {}) {
  const g = setup(canvas, w, h);
  const r = opts.r || 2.4;
  const m = opts.margin || 10;
  const R = r * 7;
  g.clearRect(0, 0, w, h);
  // rang de strass
  strand(g, roundRectPath(m, m, w - 2 * m, h - 2 * m, R), r * 0.85, 0.12, 'strass');
  // rang de perles
  const m2 = m + r * 3;
  strand(g, roundRectPath(m2, m2, w - 2 * m2, h - 2 * m2, R * 0.8), r * 0.6, 0.3, 'ivory');
  // filet doré
  if (!opts.noGold) {
    const gl = g.createLinearGradient(0, 0, w, h);
    gl.addColorStop(0, '#d8b97f');
    gl.addColorStop(0.35, '#f1dfb4');
    gl.addColorStop(0.5, '#b8925a');
    gl.addColorStop(0.7, '#ecd6a4');
    gl.addColorStop(1, '#a98450');
    g.strokeStyle = gl;
    g.lineWidth = 1;
    const i1 = m2 + r * 2.6;
    g.beginPath();
    g.roundRect(i1, i1, w - 2 * i1, h - 2 * i1, R * 0.6);
    g.stroke();
  }
  // coins bijoux
  [
    [m, m, 1, 1],
    [w - m, m, -1, 1],
    [m, h - m, 1, -1],
    [w - m, h - m, -1, -1],
  ].forEach(([x, y, dx, dy]) => {
    const k = opts.small ? 0.7 : 1;
    jewelFlower(g, x + dx * r * 2, y + dy * r * 2, r * 1.15 * k);
    if (!opts.small) {
      strand(g, (t) => [x + dx * r * (6 + t * 9), y + dy * r * (6 + t * 9)], r * 0.4, 0.5, 'strass');
      gem(g, x + dx * r * 16.5, y + dy * r * 16.5, r * 0.9, 'aqua');
    }
  });
  if (opts.topFlowers) {
    for (let k = 1; k <= opts.topFlowers; k++) jewelFlower(g, (w / (opts.topFlowers + 1)) * k, m, r * (k === Math.ceil(opts.topFlowers / 2) ? 1.25 : 0.9));
  }
}

/* ================= Drapés perles & strass (haut de l'invitation) ================= */
export function drawSwags(canvas, w, h) {
  const g = setup(canvas, w, h);
  const u = Math.max(1.8, w / 190);
  for (let row = 0; row < 4; row++) {
    const n = 3 + row;
    for (let k = 0; k < n; k++) {
      const x0 = (w / n) * k;
      const x1 = (w / n) * (k + 1);
      const y = 4 + row * u * 2.4;
      const sag = h * (0.22 + row * 0.13);
      strand(g, (t) => [x0 + (x1 - x0) * t, y + Math.sin(t * Math.PI) * sag], u * (1 - row * 0.1), 0.1, row % 2 ? 'strass' : 'ivory', row % 2 ? 'aqua' : null);
    }
  }
  // pampilles
  for (let k = 1; k < 6; k++) {
    const x = (w / 6) * k;
    const y0 = h * 0.42 + Math.sin(k) * 6;
    strand(g, (t) => [x, y0 + t * h * 0.35], u * 0.6, 0.3, 'ivory');
    gem(g, x, y0 + h * 0.35 + u * 2, u * 1.4, 'strassA');
  }
  for (let k = 0; k <= 6; k++) jewelFlower(g, (w / 6) * k, u * 3, u * 0.95);
}

/* ================= Couronnes (compte à rebours, médaillons) ================= */
export function drawRing(canvas, w, h, opts = {}) {
  const g = setup(canvas, w, h);
  const r = opts.r || 3;
  const rx = w / 2 - r * 2;
  const ry = h / 2 - r * 2;
  strand(g, (t) => [w / 2 + Math.cos(t * TAU) * rx, h / 2 + Math.sin(t * TAU) * ry], r, 0.12, 'ivory', opts.alt ? 'strass' : null);
  strand(g, (t) => [w / 2 + Math.cos(t * TAU) * (rx - r * 2.5), h / 2 + Math.sin(t * TAU) * (ry - r * 2.5)], r * 0.48, 0.5, 'strassA');
  if (opts.flowers) {
    jewelFlower(g, w / 2, r * 2, r * 0.7);
    jewelFlower(g, w / 2, h - r * 2, r * 0.7);
  }
}

/* ================= Broche (bijou cliquable) ================= */
export function drawBrooch(canvas, s) {
  const g = setup(canvas, s, s);
  const c = s / 2;
  const u = s / 100;
  for (let ring = 0; ring < 3; ring++) {
    const n = 8 + ring * 6;
    const rad = (12 + ring * 13) * u;
    for (let i = 0; i < n; i++) {
      const a = (i / n) * TAU + ring * 0.2;
      gem(g, c + Math.cos(a) * rad, c + Math.sin(a) * rad, (6.5 - ring * 1.5) * u, ring === 1 ? 'strass' : ring === 2 ? 'ivory' : 'aqua');
    }
  }
  gem(g, c, c, 10 * u, 'strassA');
}
