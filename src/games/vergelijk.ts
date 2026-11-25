import { say } from '../audio.ts';
import { el, shuffle, pickRandom, praise, wait, flash, heartPop, rainbowBar } from '../ui.ts';
import type { Game } from './types.ts';

const ROUNDS = 6;
const things = ['🐘', '🦄', '🍎', '⭐', '🐻', '🎈', '🐟', '🌸', '🚗', '🧁'];
const animals = ['🐶', '🐱', '🐰', '🐻', '🦊', '🐸', '🐷', '🐮', '🐼', '🐵'];

export const compareLevels = [
  { id: 'groot', qs: ['grootste', 'kleinste'], tile: '🐘🐭', caption: 'groot · klein', label: 'Biggest / smallest' },
  { id: 'meer', qs: ['meeste', 'minste'], tile: '🍎🍎🍎 🍎', caption: 'meer · minder', label: 'Most / fewest' },
  { id: 'rij', qs: ['eerste', 'laatste'], tile: '🏫🐶🐱🐰', caption: 'eerste · laatste', label: 'First / last in the row' },
] as const;

/** Kleuter maths concepts: biggest/smallest, most/fewest, first/last in a row. */
export const vergelijkGame: Game = ({ stage, subId, alive, answer, finish }) => {
  const level = compareLevels.find((l) => l.id === subId)!;
  let round = 0;
  let q = '';
  let locked = false;
  let missed = false;
  const ask = () => say(`p-${q}`);

  function next() {
    if (round >= ROUNDS) return finish();
    round++;
    q = pickRandom([...level.qs]);
    locked = false;
    missed = false;
    let options: { node: HTMLElement; value: number }[];

    if (level.id === 'groot') {
      const t = pickRandom(things);
      options = shuffle([0.45, 0.75, 1.15]).map((size) => {
        const s = el('span', { class: 'pic' }, t);
        s.style.fontSize = `${size}em`;
        return { node: s, value: size };
      });
    } else if (level.id === 'meer') {
      const t = pickRandom(things);
      const counts = shuffle([1, 2, 3, 4, 5, 6, 7, 8]).reduce<number[]>((acc, n) => (acc.length < 3 && acc.every((a) => Math.abs(a - n) >= 2) ? [...acc, n] : acc), []);
      options = counts.map((n) => ({ node: el('span', { class: 'many' }, ...Array.from({ length: n }, () => el('span', {}, t))), value: n }));
    } else {
      const row = shuffle(animals).slice(0, 4);
      options = row.map((a, i) => ({ node: el('span', { class: 'pic' }, a), value: i }));
    }

    const best = q === 'grootste' || q === 'meeste' ? Math.max(...options.map((o) => o.value))
      : q === 'kleinste' || q === 'minste' || q === 'eerste' ? Math.min(...options.map((o) => o.value))
      : Math.max(...options.map((o) => o.value));

    const buttons = options.map((o) => button(o.node, o.value === best));
    stage.replaceChildren(
      rainbowBar(round - 1, ROUNDS),
      level.id === 'rij'
        ? el('div', { class: 'queue' }, el('span', { class: 'queue-door' }, '🏫'), el('span', { class: 'queue-arrow' }, '◀'), ...buttons)
        : el('div', { class: `cards cards-3 compare-${level.id}` }, ...buttons),
    );
    ask();
  }

  function button(content: HTMLElement, right: boolean) {
    const b = el('button', { class: 'card compare-card' }, content);
    b.addEventListener('click', async () => {
      if (locked) return;
      if (right) {
        locked = true;
        if (!missed) answer(true);
        b.classList.add('correct');
        heartPop(b);
        await praise();
        if (alive()) next();
      } else {
        if (!missed) answer(false);
        missed = true;
        flash(b, 'wrong');
        await say('p-opnieuw');
        await wait(100);
        if (alive() && !locked) ask();
      }
    });
    return b;
  }

  say('p-gameVergelijk').then(() => alive() && next());
  stage.replaceChildren(el('div', { class: 'big-emoji' }, '⚖️'));
  return { replay: () => q && ask() };
};
