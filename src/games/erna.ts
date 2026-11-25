import { keys } from '../content/lines.ts';
import { say, sayAll } from '../audio.ts';
import { el, shuffle, praise, wait, flash, heartPop, rainbowBar } from '../ui.ts';
import type { Game } from './types.ts';

const ROUNDS = 6;

export const ernaLevels = [
  { id: 'tot10', step: 1, max: 10, tile: '1 2 3', label: 'Next number up to 10' },
  { id: 'tot20', step: 1, max: 20, tile: '… 20', label: 'Next number up to 20' },
  { id: 'tot100', step: 1, max: 100, tile: '… 100', label: 'Next number up to 100' },
  { id: 'per5', step: 5, max: 100, tile: '5 10 15', label: 'Counting in 5s' },
  { id: 'per10', step: 10, max: 100, tile: '10 20 30', label: 'Counting in 10s' },
] as const;

/** Shows three numbers of a counting sequence; the child picks the next one. */
export const ernaGame: Game = ({ stage, subId, alive, answer, finish }) => {
  const level = ernaLevels.find((l) => l.id === subId)!;
  const { step, max } = level;
  let round = 0;
  let seq: number[] = [];
  let target = 0;
  let locked = false;
  let missed = false;

  const ask = () => sayAll(...seq.map((n) => keys.number(n)), 'p-ernaVraag');

  function next() {
    if (round >= ROUNDS) return finish();
    round++;
    const lastStart = max - 3 * step;
    const start = Math.floor(Math.random() * (Math.floor(lastStart / step) + 1)) * step;
    seq = [start, start + step, start + 2 * step];
    target = start + 3 * step;
    locked = false;
    missed = false;

    const candidates = [target + step, target - step, target + 1, target - 1, target + 10, target + 2]
      .filter((n) => n >= 0 && n <= 100 && n !== target);
    const options = [target, ...shuffle([...new Set(candidates)]).slice(0, 2)].sort((a, b) => a - b);
    const answerBox = el('span', { class: 'track-box missing' }, '?');

    stage.replaceChildren(
      rainbowBar(round - 1, ROUNDS),
      el(
        'div',
        { class: 'track' },
        ...seq.flatMap((n) => [el('span', { class: 'track-box' }, String(n)), el('span', { class: 'track-jump' }, `+${step}`)]),
        answerBox,
      ),
      el('div', { class: 'numbers' }, ...options.map((n) => numberButton(n, answerBox))),
    );
    ask();
  }

  function numberButton(n: number, answerBox: HTMLElement) {
    const b = el('button', { class: 'num', 'aria-label': String(n) }, String(n));
    b.addEventListener('click', async () => {
      if (locked) return;
      if (n === target) {
        locked = true;
        if (!missed) answer(true);
        b.classList.add('correct');
        answerBox.textContent = String(n);
        answerBox.classList.replace('missing', 'solved');
        heartPop(b);
        await sayAll(...[...seq, target].map((x) => keys.number(x)));
        await praise();
        if (alive()) next();
      } else {
        if (!missed) answer(false);
        missed = true;
        flash(b, 'wrong');
        await sayAll(keys.number(n), 'p-opnieuw');
        await wait(100);
        if (alive() && !locked) ask();
      }
    });
    return b;
  }

  say('p-gameErna').then(() => alive() && next());
  stage.replaceChildren(el('div', { class: 'big-emoji' }, '🔢'));
  return { replay: () => seq.length && ask() };
};
