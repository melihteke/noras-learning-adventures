import { keys } from '../content/lines.ts';
import type { Word } from '../content/themes.ts';
import { say, sayAll } from '../audio.ts';
import { el, picture, shuffle, praise, wait } from '../ui.ts';
import type { Game } from './types.ts';

const ROUNDS = 8;

export const luisterGame: Game = ({ stage, theme, alive, finish }) => {
  const order = shuffle(theme.words);
  let round = 0;
  let streak = 0;
  let target: Word;
  let locked = false;

  const ask = () => say(keys.where(theme, target));

  function next() {
    if (round >= ROUNDS) return finish();
    target = order[round % order.length];
    round++;
    const n = streak >= 3 ? 4 : 3;
    const others = shuffle(theme.words.filter((w) => w.id !== target.id && (w.emoji ?? w.img) !== (target.emoji ?? target.img))).slice(0, n - 1);
    const choices = shuffle([target, ...others]);

    stage.replaceChildren(
      el('div', { class: 'progress' }, '●'.repeat(round - 1) + '○'.repeat(ROUNDS - round + 1)),
      el('div', { class: `cards cards-${n}` }, ...choices.map((w) => card(w))),
    );
    locked = false;
    ask();
  }

  function card(w: Word) {
    const b = el('button', { class: 'card', 'aria-label': w.nl }, picture(w));
    b.addEventListener('click', async () => {
      if (locked) return;
      if (w.id === target.id) {
        locked = true;
        streak++;
        b.classList.add('correct');
        await say(keys.word(theme, w));
        await praise();
        if (alive()) next();
      } else {
        streak = 0;
        b.classList.remove('wrong');
        void b.offsetWidth;
        b.classList.add('wrong');
        // Naming the tapped picture still teaches a word.
        await sayAll(keys.word(theme, w), 'p-opnieuw');
        await wait(150);
        if (alive() && !locked) ask();
      }
    });
    return b;
  }

  sayAll('p-luisterIntro').then(() => alive() && next());
  stage.replaceChildren(el('div', { class: 'big-emoji' }, '👂'));
  return { replay: () => target && ask() };
};
