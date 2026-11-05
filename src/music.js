// Lecture de la musique : fichier public/musique.mp3 si présent,
// sinon une petite mélodie de boîte à musique générée en Web Audio.
import { config } from './config.js';

let audio = null;
let synth = null;
let playing = false;

function createSynth() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const master = ctx.createGain();
  master.gain.value = 0.18;
  const delay = ctx.createDelay();
  delay.delayTime.value = 0.32;
  const fb = ctx.createGain();
  fb.gain.value = 0.35;
  delay.connect(fb).connect(delay);
  master.connect(ctx.destination);
  master.connect(delay);
  delay.connect(ctx.destination);

  // Mélodie douce (fréquences en Hz) – rythme en temps
  const N = { C5: 523.25, D5: 587.33, E5: 659.25, G5: 783.99, A5: 880, B4: 493.88, A4: 440, G4: 392, F5: 698.46, C6: 1046.5 };
  const melody = [
    ['E5', 1], ['G5', 1], ['C6', 2], ['B4', 1], ['G5', 1], ['A5', 2],
    ['A4', 1], ['E5', 1], ['G5', 2], ['F5', 1], ['E5', 1], ['D5', 2],
    ['C5', 1], ['E5', 1], ['G5', 2], ['A5', 1], ['G5', 1], ['E5', 2],
    ['D5', 1], ['F5', 1], ['E5', 1], ['D5', 1], ['C5', 4],
  ];
  const beat = 0.42;
  let timer = null;
  let next = 0;
  let idx = 0;

  const note = (f, t, len) => {
    [1, 2.01].forEach((m, k) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = k ? 'sine' : 'triangle';
      o.frequency.value = f * m;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(k ? 0.12 : 0.5, t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0008, t + len * 2.2);
      o.connect(g).connect(master);
      o.start(t);
      o.stop(t + len * 2.4);
    });
  };

  const schedule = () => {
    while (next < ctx.currentTime + 0.6) {
      const [n, d] = melody[idx % melody.length];
      note(N[n], next, d * beat);
      next += d * beat;
      idx++;
    }
  };

  return {
    play() {
      ctx.resume();
      next = ctx.currentTime + 0.1;
      timer = setInterval(schedule, 150);
    },
    pause() {
      clearInterval(timer);
      ctx.suspend();
    },
  };
}

export function initMusic() {
  return new Promise((resolve) => {
    audio = new Audio(config.musique);
    audio.loop = true;
    audio.volume = 0.6;
    audio.addEventListener('canplay', () => resolve(), { once: true });
    audio.addEventListener('error', () => { audio = null; resolve(); }, { once: true });
    setTimeout(resolve, 600);
  });
}

export function play() {
  playing = true;
  if (audio) {
    audio.play().catch(() => {
      audio = null;
      play();
    });
  } else {
    synth = synth || createSynth();
    synth.play();
  }
}

export function pause() {
  playing = false;
  if (audio) audio.pause();
  if (synth) synth.pause();
}

export function toggle() {
  playing ? pause() : play();
  return playing;
}
