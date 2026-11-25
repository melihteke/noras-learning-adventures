import type { Word } from './content/themes.ts';
import { say } from './audio.ts';

type Attrs = Record<string, string | ((e: Event) => void)>;

export function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attrs: Attrs = {},
  ...children: (Node | string)[]
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (typeof v === 'function') node.addEventListener(k.replace(/^on/, ''), v);
    else node.setAttribute(k, v);
  }
  node.append(...children);
  return node;
}

export function picture(w: Word): HTMLElement {
  if (w.img) {
    return el('img', { class: 'pic', src: `${import.meta.env.BASE_URL}img/${w.img}`, alt: w.nl, draggable: 'false' });
  }
  return el('span', { class: 'pic', role: 'img', 'aria-label': w.nl }, w.emoji ?? '❓');
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

const praiseKeys = ['p-goed1', 'p-goed2', 'p-goed3', 'p-goed4'];
export const praise = () => say(pickRandom(praiseKeys));

export function celebrate(): void {
  const layer = el('div', { class: 'confetti', 'aria-hidden': 'true' });
  for (let i = 0; i < 30; i++) {
    const s = el('span', {}, pickRandom(['⭐', '🎉', '✨', '🌟', '🎈']));
    s.style.left = `${Math.random() * 100}%`;
    s.style.animationDelay = `${Math.random() * 0.8}s`;
    layer.append(s);
  }
  document.body.append(layer);
  setTimeout(() => layer.remove(), 3000);
}

export function showHelp(title: string, html: string): void {
  const close = () => overlay.remove();
  const overlay: HTMLDivElement = el(
    'div',
    { class: 'help-overlay', onclick: (e) => e.target === overlay && close() },
    el(
      'div',
      { class: 'help-box', role: 'dialog', 'aria-label': title, lang: 'en' },
      el('h2', {}, title),
      Object.assign(el('div', { class: 'help-body' }), { innerHTML: html }),
      el('button', { class: 'help-close', onclick: close }, 'Got it'),
    ),
  );
  document.body.append(overlay);
}

const STAR_KEY = 'nora.stars';
export function getStars(): number {
  return Number(localStorage.getItem(STAR_KEY) ?? 0);
}
export function addStar(): number {
  const n = getStars() + 1;
  localStorage.setItem(STAR_KEY, String(n));
  return n;
}
