import { keys } from '../content/lines.ts';
import { say } from '../audio.ts';
import { el, wait } from '../ui.ts';
import type { Game } from './types.ts';

const steps = [
  { step: 1, label: '1 2 3' },
  { step: 5, label: '5 10 15' },
  { step: 10, label: '10 20 30' },
];

/** 1–100 board: tap a number to hear it, or let the app count along in steps of 1, 5 or 10. */
export const honderdGame: Game = ({ stage, alive, finish }) => {
  const cells = new Map<number, HTMLButtonElement>();
  let run = 0;
  let activeBtn: HTMLButtonElement | undefined;

  const board = el('div', { class: 'hundred' });
  for (let n = 1; n <= 100; n++) {
    const b = el('button', { class: `h-cell${n % 10 === 0 ? ' ten' : n % 5 === 0 ? ' five' : ''}`, 'aria-label': String(n) }, String(n));
    b.addEventListener('click', () => {
      stop();
      light(n);
      say(keys.number(n));
    });
    cells.set(n, b);
    board.append(b);
  }

  function clear() {
    cells.forEach((c) => c.classList.remove('lit', 'trail'));
  }
  function light(n: number) {
    cells.forEach((c) => c.classList.remove('lit'));
    cells.get(n)?.classList.add('lit', 'trail');
  }
  function stop() {
    run++;
    activeBtn?.classList.remove('playing');
    activeBtn = undefined;
  }

  async function countBy(step: number, btn: HTMLButtonElement) {
    const wasActive = activeBtn === btn;
    stop();
    clear();
    if (wasActive) return;
    const mine = run;
    activeBtn = btn;
    btn.classList.add('playing');
    for (let n = step; n <= 100; n += step) {
      if (run !== mine || !alive()) return;
      light(n);
      cells.get(n)?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      await say(keys.number(n));
      await wait(step === 1 ? 60 : 250);
    }
    if (run === mine && alive()) {
      await wait(600);
      finish();
    }
  }

  const controls = el(
    'div',
    { class: 'count-controls' },
    ...steps.map(({ step, label }) => {
      const b = el('button', { class: 'step-btn', 'aria-label': `Tel per ${step}` }, el('span', {}, '▶'), ` ${label} …`);
      b.addEventListener('click', () => countBy(step, b));
      return b;
    }),
  );

  stage.replaceChildren(controls, board);
  say('p-honderdIntro');
  return { replay: () => say('p-honderdIntro') };
};
