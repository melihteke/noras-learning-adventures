import { keys } from '../content/lines.ts';
import { alphabet, letterOf } from '../content/alphabet.ts';
import { say, sayAll } from '../audio.ts';
import { el, picture, shuffle, pickRandom, praise, wait, flash, heartPop, rainbowBar } from '../ui.ts';
import { letterRounds } from './beginklank.ts';
import type { Game } from './types.ts';

const ROUNDS = 8;
/** Letters that look alike (mirror images); kept apart so recognition is fair at this age. */
const lookAlike = [['b', 'd', 'p', 'q'], ['n', 'u'], ['m', 'w']];
const looksLike = (a: string, b: string) => lookAlike.some((s) => s.includes(a) && s.includes(b));

/** "Waar is de letter k?" Tap the right letter. */
export const letterGame: Game = ({ stage, subId, alive, answer, finish }) => {
  const order = letterRounds(subId, ROUNDS);
  let round = 0;
  let target = '';
  let locked = false;
  let missed = false;

  const ask = () => say(keys.findLetter(target));

  function next() {
    if (round >= ROUNDS) return finish();
    target = order[round++];
    const others = shuffle(alphabet.filter((l) => !l.rare && l.letter !== target && !looksLike(l.letter, target)))
      .slice(0, 2)
      .map((l) => l.letter);
    stage.replaceChildren(
      rainbowBar(round - 1, ROUNDS),
      el('div', { class: 'letters' }, ...shuffle([target, ...others]).map((x) => button(x))),
    );
    locked = false;
    missed = false;
    ask();
  }

  function button(x: string) {
    const b = el('button', { class: 'letter-btn', 'aria-label': x }, el('span', {}, x));
    b.addEventListener('click', async () => {
      if (locked) return;
      if (x === target) {
        locked = true;
        if (!missed) answer(true, target);
        const w = pickRandom(letterOf(x).words);
        b.classList.add('correct');
        b.append(el('span', { class: 'letter-pic' }, picture(w, w.word)));
        heartPop(b);
        await say(keys.letterWord(w));
        await praise();
        if (alive()) next();
      } else {
        if (!missed) answer(false, target);
        missed = true;
        flash(b, 'wrong');
        await sayAll(keys.letter(x), 'p-opnieuw');
        await wait(150);
        if (alive() && !locked) ask();
      }
    });
    return b;
  }

  sayAll('p-letterIntro').then(() => alive() && next());
  stage.replaceChildren(el('div', { class: 'big-emoji' }, '🔤'));
  return { replay: () => target && ask() };
};
