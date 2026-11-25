import { keys } from '../content/lines.ts';
import { alphabet, letterGroups, letterOf, soundsAlike, type AbcWord } from '../content/alphabet.ts';
import { say, sayAll } from '../audio.ts';
import { el, picture, shuffle, pickRandom, praise, wait, flash, heartPop, rainbowBar } from '../ui.ts';
import type { Game } from './types.ts';

const ROUNDS = 8;

/** Rounds spread evenly over the group's letters, shuffled. */
export function letterRounds(groupId: string, rounds: number): string[] {
  const letters = letterGroups.find((g) => g.id === groupId)!.letters;
  return shuffle(Array.from({ length: rounds }, (_, i) => letters[i % letters.length]));
}

/** "Welk plaatje begint met de k?" Pick the picture whose word starts with the letter. */
export const beginklankGame: Game = ({ stage, subId, alive, answer, finish }) => {
  const order = letterRounds(subId, ROUNDS);
  const used = new Set<string>();
  let round = 0;
  let streak = 0;
  let target = '';
  let locked = false;
  let missed = false;

  const ask = () => say(keys.beginsWith(target));

  function next() {
    if (round >= ROUNDS) return finish();
    target = order[round++];
    const options = letterOf(target).words.filter((w) => !used.has(w.id));
    const right = pickRandom(options.length ? options : letterOf(target).words);
    used.add(right.id);

    const n = streak >= 3 ? 4 : 3;
    const otherLetters = shuffle(alphabet.filter((l) => !l.rare && !soundsAlike(l.letter, target))).slice(0, n - 1);
    const wrong = otherLetters.map((l) => pickRandom(l.words.filter((w) => (w.emoji ?? w.img) !== (right.emoji ?? right.img))));
    const choices = shuffle([right, ...wrong]);

    stage.replaceChildren(
      rainbowBar(round - 1, ROUNDS),
      el('button', { class: 'letter-badge', 'aria-label': target, onclick: ask }, target),
      el('div', { class: `cards cards-${n}` }, ...choices.map((w) => card(w, w === right))),
    );
    locked = false;
    missed = false;
    ask();
  }

  function card(w: AbcWord, isRight: boolean) {
    const b = el('button', { class: 'card', 'aria-label': w.word }, picture(w, w.word));
    b.addEventListener('click', async () => {
      if (locked) return;
      if (isRight) {
        locked = true;
        streak++;
        if (!missed) answer(true, target);
        b.classList.add('correct');
        heartPop(b);
        await say(keys.letterWord(w));
        await praise();
        if (alive()) next();
      } else {
        streak = 0;
        if (!missed) answer(false, target);
        missed = true;
        flash(b, 'wrong');
        // "m van maan": shows which sound this picture starts with instead.
        await sayAll(keys.letterWord(w), 'p-opnieuw');
        await wait(150);
        if (alive() && !locked) ask();
      }
    });
    return b;
  }

  sayAll('p-beginIntro').then(() => alive() && next());
  stage.replaceChildren(el('div', { class: 'big-emoji' }, '👂'));
  return { replay: () => target && ask() };
};
