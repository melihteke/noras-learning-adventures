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

export function picture(p: { emoji?: string; img?: string }, label: string): HTMLElement {
  if (p.img) {
    return el('img', { class: 'pic', src: `${import.meta.env.BASE_URL}img/${p.img}`, alt: label, draggable: 'false' });
  }
  return el('span', { class: 'pic', role: 'img', 'aria-label': label }, p.emoji ?? '❓');
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

/** Restart a CSS animation class on an element. */
export function flash(node: HTMLElement, cls: string): void {
  node.classList.remove(cls);
  void node.offsetWidth;
  node.classList.add(cls);
}

export function celebrate(): void {
  const layer = el('div', { class: 'confetti', 'aria-hidden': 'true' });
  for (let i = 0; i < 32; i++) {
    const s = el('span', {}, pickRandom(['⭐', '🦄', '🌈', '💖', '✨', '🌟', '💜']));
    s.style.left = `${Math.random() * 100}%`;
    s.style.animationDelay = `${Math.random() * 0.8}s`;
    layer.append(s);
  }
  document.body.append(layer);
  setTimeout(() => layer.remove(), 3200);
}

/** A heart floats up from a correctly answered element. */
export function heartPop(from: HTMLElement): void {
  const r = from.getBoundingClientRect();
  const h = el('span', { class: 'heart-pop', 'aria-hidden': 'true' }, '💖');
  h.style.left = `${r.left + r.width / 2}px`;
  h.style.top = `${r.top}px`;
  document.body.append(h);
  setTimeout(() => h.remove(), 1100);
}

/** Rainbow progress bar with a unicorn running towards the star. */
export function rainbowBar(done: number, total: number): HTMLElement {
  const pct = Math.round((done / total) * 100);
  const fill = el('div', { class: 'rbar-fill' });
  fill.style.width = `${pct}%`;
  const uni = el('span', { class: 'rbar-uni' }, '🦄');
  uni.style.left = `${pct}%`;
  return el(
    'div',
    { class: 'rbar', role: 'progressbar', 'aria-valuenow': String(done), 'aria-valuemax': String(total) },
    el('div', { class: 'rbar-track' }, fill),
    uni,
    el('span', { class: 'rbar-goal' }, '⭐'),
  );
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
