import { keys } from '../content/lines.ts';
import { alphabet, type Letter } from '../content/alphabet.ts';
import { say, sayAll } from '../audio.ts';
import { progress, letterLevel } from '../progress.ts';
import { el, picture } from '../ui.ts';
import type { Game } from './types.ts';

/** ABC book: tap a letter, hear "k van kat", tap the pictures. Exploration only, no score. */
export const abcGame: Game = ({ stage }) => {
  let current: Letter | undefined;

  function grid() {
    current = undefined;
    stage.replaceChildren(
      el(
        'div',
        { class: 'abc-grid' },
        ...alphabet.map((l) =>
          el(
            'button',
            { class: `abc-tile lvl-${letterLevel(l.letter)}`, 'aria-label': l.letter, onclick: () => open(l) },
            l.letter,
          ),
        ),
      ),
    );
  }

  function open(l: Letter) {
    current = l;
    progress.seeLetter(l.letter);
    stage.replaceChildren(
      el(
        'div',
        { class: 'abc-detail' },
        el('button', { class: 'icon-btn abc-back', 'aria-label': 'Alle letters', onclick: grid }, '🔠'),
        el(
          'button',
          { class: 'abc-big', 'aria-label': l.letter, onclick: () => say(keys.letter(l.letter)) },
          `${l.letter.toUpperCase()}${l.letter}`,
        ),
        el(
          'div',
          { class: 'abc-words' },
          ...l.words.map((w) => {
            const b = el('button', { class: 'card abc-word', 'aria-label': w.word }, picture(w, w.word));
            b.addEventListener('click', () => {
              b.classList.add('seen');
              say(keys.letterWord(w));
            });
            return b;
          }),
        ),
      ),
    );
    sayAll(keys.letter(l.letter), keys.letterWord(l.words[0]));
  }

  grid();
  say('p-abcIntro');
  return { replay: () => (current ? say(keys.letter(current.letter)) : say('p-abcIntro')) };
};
