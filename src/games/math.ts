import { keys } from '../content/lines.ts';
import { say, sayAll } from '../audio.ts';
import { el, shuffle, pickRandom, praise, wait, flash, heartPop, rainbowBar } from '../ui.ts';
import { numberOptions } from './tel.ts';
import type { Game } from './types.ts';

const ROUNDS = 6;
const things = ['🦄', '⭐', '💖', '🍎', '🎈', '🧁', '🍓', '🦋', '🌸', '🐣', '🍭', '🐞', '🌰', '🍄'];

export const mathLevels = [
  { id: 'plus5', op: 'plus', max: 5, label: 'Addition up to 5' },
  { id: 'plus10', op: 'plus', max: 10, label: 'Addition up to 10' },
  { id: 'min5', op: 'min', max: 5, label: 'Subtraction up to 5' },
  { id: 'min10', op: 'min', max: 10, label: 'Subtraction up to 10' },
] as const;

/** Random sums for one session; no repeats when possible. */
function makeSums(op: 'plus' | 'min', max: number): [number, number][] {
  const all: [number, number][] = [];
  if (op === 'plus') for (let a = 1; a < max; a++) for (let b = 1; a + b <= max; b++) all.push([a, b]);
  else for (let a = 2; a <= max; a++) for (let b = 1; b < a; b++) all.push([a, b]);
  const picked = shuffle(all);
  return Array.from({ length: ROUNDS }, (_, i) => picked[i % picked.length]);
}

export const mathGame: Game = ({ stage, subId, alive, answer, finish }) => {
  const level = mathLevels.find((l) => l.id === subId)!;
  const plus = level.op === 'plus';
  const sums = makeSums(level.op, level.max);
  let round = 0;
  let a = 0;
  let b = 0;
  let locked = false;
  let missed = false;

  const ask = () => say(plus ? keys.plusQ(a, b) : keys.minQ(a, b));
  const result = () => (plus ? a + b : a - b);

  function next() {
    if (round >= ROUNDS) return finish();
    [a, b] = sums[round++];
    locked = false;
    missed = false;
    const thing = pickRandom(things);
    let counted = 0;

    const item = (gone = false) => {
      const it = el('button', { class: `count-item small${gone ? ' to-go' : ''}`, 'aria-label': thing }, thing);
      it.addEventListener('click', () => {
        if (it.classList.contains('counted') || it.classList.contains('gone') || locked) return;
        counted++;
        it.classList.add('counted');
        it.dataset.n = String(counted);
        say(keys.number(counted));
      });
      return it;
    };

    const answerBox = el('span', { class: 'sum-answer' }, '?');
    let scene: HTMLElement;
    if (plus) {
      scene = el(
        'div',
        { class: 'sum-scene' },
        el('div', { class: 'group g1' }, ...Array.from({ length: a }, () => item())),
        el('span', { class: 'op' }, '+'),
        el('div', { class: 'group g2' }, ...Array.from({ length: b }, () => item())),
      );
    } else {
      scene = el(
        'div',
        { class: 'sum-scene' },
        el('div', { class: 'group g1' }, ...Array.from({ length: a }, (_, i) => item(i >= a - b))),
      );
      // Let the child see all items first, then some float away.
      setTimeout(() => scene.querySelectorAll('.to-go').forEach((n) => n.classList.add('gone')), 1600);
    }

    stage.replaceChildren(
      rainbowBar(round - 1, ROUNDS),
      scene,
      el('div', { class: 'sum-line' }, `${a} ${plus ? '+' : '−'} ${b} = `, answerBox),
      el('div', { class: 'numbers' }, ...numberOptions(result(), level.max).map((n) => numberButton(n, answerBox))),
    );
    ask();
  }

  function numberButton(n: number, answerBox: HTMLElement) {
    const btn = el('button', { class: 'num', 'aria-label': String(n) }, String(n));
    btn.addEventListener('click', async () => {
      if (locked) return;
      if (n === result()) {
        locked = true;
        if (!missed) answer(true);
        btn.classList.add('correct');
        answerBox.textContent = String(n);
        answerBox.classList.add('solved');
        heartPop(btn);
        await say(plus ? keys.plusA(a, b) : keys.minA(a, b));
        await praise();
        if (alive()) next();
      } else {
        if (!missed) answer(false);
        missed = true;
        flash(btn, 'wrong');
        await sayAll(keys.number(n), 'p-opnieuw');
        await wait(100);
        if (alive() && !locked) ask();
      }
    });
    return btn;
  }

  sayAll(plus ? 'p-plusIntro' : 'p-minIntro').then(() => alive() && next());
  stage.replaceChildren(el('div', { class: 'big-emoji' }, plus ? '➕' : '➖'));
  return { replay: () => a && ask() };
};
