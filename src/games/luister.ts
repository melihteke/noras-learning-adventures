import { keys } from '../content/lines.ts';
import { themes, type Word } from '../content/themes.ts';
import { say, sayAll } from '../audio.ts';
import { el, picture, shuffle, praise, wait, flash, heartPop, rainbowBar } from '../ui.ts';
import type { Game } from './types.ts';

const ROUNDS = 8;

export const luisterGame: Game = ({ stage, subId, alive, answer, finish }) => {
  const theme = themes.find((t) => t.id === subId)!;
  const order = shuffle(theme.words);
  let round = 0;
  let streak = 0;
  let target: Word;
  let locked = false;
  let missed = false;

  const ask = () => say(keys.where(theme, target));

  function next() {
    if (round >= ROUNDS) return finish();
    target = order[round % order.length];
    round++;
    const n = streak >= 3 ? 4 : 3;
    const others = shuffle(
      theme.words.filter((w) => w.id !== target.id && (w.emoji ?? w.img) !== (target.emoji ?? target.img)),
    ).slice(0, n - 1);
    const choices = shuffle([target, ...others]);

    stage.replaceChildren(
      rainbowBar(round - 1, ROUNDS),
      el('div', { class: `cards cards-${n}` }, ...choices.map((w) => card(w))),
    );
    locked = false;
    missed = false;
    ask();
  }

  function card(w: Word) {
    const b = el('button', { class: 'card', 'aria-label': w.nl }, picture(w, w.nl));
    b.addEventListener('click', async () => {
      if (locked) return;
      if (w.id === target.id) {
        locked = true;
        streak++;
        if (!missed) answer(true);
        b.classList.add('correct');
        heartPop(b);
        await say(keys.word(theme, w));
        await praise();
        if (alive()) next();
      } else {
        streak = 0;
        if (!missed) answer(false);
        missed = true;
        flash(b, 'wrong');
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
