// Ornements SVG : ruban d'organza, sceau, icônes, séparateurs

// Sceau de cire ivoire avec fleur en relief
export const seal = (id = 's') => `
<svg viewBox="0 0 120 120" aria-hidden="true">
  <defs>
    <radialGradient id="${id}g" cx="38%" cy="32%" r="75%">
      <stop offset="0" stop-color="#fffaf2"/><stop offset="0.55" stop-color="#eee3d2"/><stop offset="1" stop-color="#c9b597"/>
    </radialGradient>
    <filter id="${id}e" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="1.3" result="b"/>
      <feSpecularLighting in="b" surfaceScale="3.2" specularConstant="0.85" specularExponent="16" lighting-color="#fff" result="s">
        <feDistantLight azimuth="225" elevation="42"/>
      </feSpecularLighting>
      <feComposite in="s" in2="SourceAlpha" operator="in" result="s2"/>
      <feComposite in="SourceGraphic" in2="s2" operator="arithmetic" k1="0" k2="1" k3="0.75" k4="0"/>
    </filter>
  </defs>
  <path filter="url(#${id}e)" fill="url(#${id}g)" d="M60 5c10 0 14 5 22 7 8 3 14 3 18 10 4 7 1 12 4 20 3 8 9 12 8 20-1 8-7 11-9 19-2 8 0 13-7 18-6 5-12 3-20 6-8 3-11 8-19 8s-12-6-20-8c-8-3-14-1-19-7-5-6-2-11-5-19S5 67 5 59s7-12 9-20c2-8-1-13 5-18 6-5 12-3 20-6 8-3 13-10 21-10z"/>
  <circle cx="60" cy="60" r="38" fill="none" stroke="#c5b090" stroke-width="1.1"/>
  <circle cx="60" cy="60" r="34" fill="none" stroke="#fff8ec" stroke-width="0.8"/>
  <g filter="url(#${id}e)" fill="#ece1ce" stroke="#b9a483" stroke-width="0.7">
    ${[0, 60, 120, 180, 240, 300].map((a) => `<path transform="rotate(${a} 60 60)" d="M60 58c-7-6-9-15-6-21 2-3 4-4 6-4s4 1 6 4c3 6 1 15-6 21z"/>`).join('')}
    <circle cx="60" cy="60" r="5.5" fill="#e4d6bf"/>
  </g>
</svg>`;

// Ruban d'organza : bandeau (2 moitiés), boucles, pans
const organza = (id) => `
  <linearGradient id="${id}band" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#fff" stop-opacity="0.95"/>
    <stop offset="0.18" stop-color="#fbf6ee" stop-opacity="0.62"/>
    <stop offset="0.5" stop-color="#f4ece0" stop-opacity="0.5"/>
    <stop offset="0.82" stop-color="#fbf6ee" stop-opacity="0.62"/>
    <stop offset="1" stop-color="#fff" stop-opacity="0.95"/>
  </linearGradient>
  <linearGradient id="${id}loop" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#fff" stop-opacity="0.92"/>
    <stop offset="0.45" stop-color="#f1e8db" stop-opacity="0.55"/>
    <stop offset="0.7" stop-color="#fff" stop-opacity="0.85"/>
    <stop offset="1" stop-color="#e8dccb" stop-opacity="0.6"/>
  </linearGradient>
  <pattern id="${id}weave" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
    <rect width="3" height="3" fill="none"/><path d="M0 0H3" stroke="#fff" stroke-opacity="0.35" stroke-width="0.6"/>
  </pattern>
  <filter id="${id}sh" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#6b5235" flood-opacity="0.22"/></filter>`;

export const bandHalf = (side) => `
<svg viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">
  <defs>${organza('b' + side)}</defs>
  <rect width="100" height="40" fill="url(#b${side}band)"/>
  <rect width="100" height="40" fill="url(#b${side}weave)"/>
  <path d="M0 1H100M0 39H100" stroke="#fff" stroke-width="1.2" stroke-opacity="0.9"/>
</svg>`;

export const bow = (id = 'bw') => `
<svg viewBox="-160 -110 320 260" aria-hidden="true">
  <defs>${organza(id)}</defs>
  <g filter="url(#${id}sh)">
    <!-- pans -->
    <path class="tail tail-l" d="M-6 6 C-30 40 -60 90 -96 140 L-62 146 C-40 104 -18 60 6 12Z" fill="url(#${id}loop)" stroke="#fff" stroke-opacity="0.8"/>
    <path class="tail tail-r" d="M6 6 C30 40 62 92 100 136 L68 146 C42 104 18 58 -6 12Z" fill="url(#${id}loop)" stroke="#fff" stroke-opacity="0.8"/>
    <!-- boucles -->
    <path class="loop loop-l" d="M0 0 C-30 -62 -128 -84 -146 -26 C-158 18 -96 40 0 0Z" fill="url(#${id}loop)" stroke="#fff" stroke-opacity="0.9" stroke-width="1.2"/>
    <path class="loop loop-l" d="M0 0 C-26 -38 -96 -52 -112 -20 C-120 4 -76 18 0 0Z" fill="#fff" fill-opacity="0.25"/>
    <path class="loop loop-r" d="M0 0 C30 -62 128 -84 146 -26 C158 18 96 40 0 0Z" fill="url(#${id}loop)" stroke="#fff" stroke-opacity="0.9" stroke-width="1.2"/>
    <path class="loop loop-r" d="M0 0 C26 -38 96 -52 112 -20 C120 4 76 18 0 0Z" fill="#fff" fill-opacity="0.25"/>
    <path d="M-150 -26 C-120 -10 -60 0 0 0 C60 0 120 -10 150 -26" fill="none" stroke="#fff" stroke-opacity="0.5"/>
  </g>
</svg>`;

export const divider = `
<svg class="divider" viewBox="0 0 220 24" aria-hidden="true">
  <g fill="none" stroke="currentColor" stroke-width="0.9" stroke-linecap="round">
    <path d="M14 12 H86 M134 12 H206"/>
    <path d="M86 12 c8 -9 16 -9 20 -2 M134 12 c-8 -9 -16 -9 -20 -2 M86 12 c8 9 16 9 20 2 M134 12 c-8 9 -16 9 -20 2"/>
  </g>
  <circle cx="110" cy="12" r="4.4" fill="url(#gaqua)"/>
  <circle cx="99" cy="12" r="2" fill="url(#gpearl)"/><circle cx="121" cy="12" r="2" fill="url(#gpearl)"/>
  <circle cx="14" cy="12" r="1.8" fill="url(#gpearl)"/><circle cx="206" cy="12" r="1.8" fill="url(#gpearl)"/>
</svg>`;

// Définitions globales (perle SVG)
export const globalDefs = `
<svg width="0" height="0" style="position:absolute">
  <defs>
    <radialGradient id="gpearl" cx="35%" cy="30%" r="70%">
      <stop offset="0" stop-color="#fff"/><stop offset="0.45" stop-color="#f3ebdf"/><stop offset="1" stop-color="#b8a487"/>
    </radialGradient>
    <radialGradient id="gaqua" cx="35%" cy="30%" r="70%">
      <stop offset="0" stop-color="#f2fffd"/><stop offset="0.45" stop-color="#7fd6cd"/><stop offset="1" stop-color="#1f8780"/>
    </radialGradient>
  </defs>
</svg>`;

export const pin = `<svg viewBox="0 0 24 24" width="14" height="14"><path fill="currentColor" d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg>`;
export const mic = `<svg viewBox="0 0 24 24" width="14" height="14"><path fill="currentColor" d="M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.9V21h2v-3.1A7 7 0 0 0 19 11h-2z"/></svg>`;
export const chevron = `<svg viewBox="0 0 24 24" width="22" height="22"><path d="M5 9l7 7 7-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
export const soundOn = `<svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M4 9v6h4l5 5V4L8 9H4zm12.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4zM14 3.2v2.1a7 7 0 0 1 0 13.4v2.1a9 9 0 0 0 0-17.6z"/></svg>`;
export const soundOff = `<svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M4 9v6h4l5 5V4L8 9H4zm16.6 3 2.1-2.1-1.4-1.4-2.1 2.1-2.1-2.1-1.4 1.4 2.1 2.1-2.1 2.1 1.4 1.4 2.1-2.1 2.1 2.1 1.4-1.4z"/></svg>`;

// Icônes dorées du programme
export const icones = {
  bouquet: `<svg viewBox="0 0 40 40"><g fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round">
    <circle cx="20" cy="12" r="4"/><circle cx="13" cy="15" r="3.5"/><circle cx="27" cy="15" r="3.5"/><circle cx="16.5" cy="20" r="3"/><circle cx="23.5" cy="20" r="3"/>
    <path d="M17 23 L20 33 L23 23 M15 28 Q20 26 25 28"/></g></svg>`,
  anneaux: `<svg viewBox="0 0 40 40"><g fill="none" stroke="currentColor" stroke-width="1.5">
    <circle cx="16" cy="23" r="8"/><circle cx="24" cy="23" r="8"/><path d="M21 12l3-4 3 4-3 3z" stroke-width="1"/></g></svg>`,
  musique: `<svg viewBox="0 0 40 40"><g fill="none" stroke="currentColor" stroke-width="1.4"><path d="M16 28V12l12-3v16"/>
    <ellipse cx="13.5" cy="28.5" rx="3.5" ry="2.6" fill="currentColor"/><ellipse cx="25.5" cy="25.5" rx="3.5" ry="2.6" fill="currentColor"/></g></svg>`,
};

export const fleur = `<svg viewBox="0 0 40 40" width="34" height="34" aria-hidden="true">
  ${[0, 60, 120, 180, 240, 300].map((a) => `<ellipse cx="20" cy="11" rx="4.5" ry="7" transform="rotate(${a} 20 20)" fill="url(#gpearl)" stroke="#cbb89b" stroke-width="0.5"/>`).join('')}
  <circle cx="20" cy="20" r="4.5" fill="url(#gaqua)" stroke="#fff" stroke-width=".6"/></svg>`;
