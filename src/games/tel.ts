import { keys } from '../content/lines.ts';
import { themes, type Theme, type Word } from '../content/themes.ts';
import { say, sayAll } from '../audio.ts';
import { el, picture, shuffle, praise, pickRandom, flash, heartPop, rainbowBar } from '../ui.ts';
import type { Game } from './types.ts';

const ROUNDS = 5;
const LEVEL_KEY = 'nora.countMax';

export const countableWords = (t: Theme): Word[] => t.words.filter((w) => w.plural);

export const telGame: Game = ({ stage, subId, alive, answer, finish }) => {
  const theme = themes.find((t) => t.id === subId)!;
  const words = countableWords(theme);
  let max = Number(localStorage.getItem(LEVEL_KEY) ?? 5);
  let round = 0;
  let streak = 0;
  let target: Word;
  let amount = 0;
  let locked = false;
  let missed = false;

  const ask = () => say(keys.howMany(theme, target));

  function next() {
    if (round >= ROUNDS) return finish();
    round++;
    target = pickRandom(words);
    amount = 1 + Math.floor(Math.random() * max);
    locked = false;
    missed = false;
    let counted = 0;

    const items = Array.from({ length: amount }, () => {
      const b = el('button', { class: 'count-item', 'aria-label': target.nl }, picture(target, target.nl));
      b.addEventListener('click', () => {
        if (b.classList.contains('counted') || locked) return;
        counted++;
        b.classList.add('counted');
        b.dataset.n = String(counted);
        if (counted === amount) sayAll(keys.number(counted), 'p-telKies');
        else say(keys.number(counted));
      });
      return b;
    });

    stage.replaceChildren(
      rainbowBar(round - 1, ROUNDS),
      el('div', { class: 'count-field' }, ...items),
      el('div', { class: 'numbers' }, ...numberOptions(amount, max).map((n) => numberButton(n))),
    );
    ask();
  }

  function numberButton(n: number) {
    const b = el('button', { class: 'num', 'aria-label': String(n) }, String(n));
    b.addEventListener('click', async () => {
      if (locked) return;
      if (n === amount) {
        locked = true;
        if (!missed) answer(true);
        b.classList.add('correct');
        heartPop(b);
        streak++;
        if (streak >= 3 && max < 10) {
          max = Math.min(10, max + 1);
          localStorage.setItem(LEVEL_KEY, String(max));
          streak = 0;
        }
        await say(keys.number(n));
        await praise();
        if (alive()) next();
      } else {
        streak = 0;
        if (!missed) answer(false);
        missed = true;
        flash(b, 'wrong');
        await sayAll(keys.number(n), 'p-opnieuw');
      }
    });
    return b;
  }

  sayAll('p-telIntro').then(() => alive() && next());
  stage.replaceChildren(el('div', { class: 'big-emoji' }, '🔢'));
  return { replay: () => target && ask() };
};

/** The answer plus two nearby numbers (so the child has to actually count), sorted. */
export function numberOptions(answer: number, max: number): number[] {
  const pool = shuffle(Array.from({ length: Math.max(max, 3) }, (_, i) => i + 1).filter((n) => n !== answer));
  pool.sort((a, b) => Math.abs(a - answer) - Math.abs(b - answer));
  return [answer, ...pool.slice(0, 2)].sort((a, b) => a - b);
}
