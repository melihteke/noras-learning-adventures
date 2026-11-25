import { keys } from '../content/lines.ts';
import type { Word } from '../content/themes.ts';
import { say } from '../audio.ts';
import { el, picture, shuffle, praise, wait } from '../ui.ts';
import type { Game } from './types.ts';

const PAIRS = 4;

export const memoryGame: Game = ({ stage, theme, alive, finish }) => {
  const unique = theme.words.filter((w, i, all) => all.findIndex((o) => (o.emoji ?? o.img) === (w.emoji ?? w.img)) === i);
  const words = shuffle(unique).slice(0, PAIRS);
  const deck = shuffle([...words, ...words]);
  let open: { btn: HTMLButtonElement; w: Word }[] = [];
  let found = 0;
  let busy = false;

  const grid = el('div', { class: 'memory' });
  for (const w of deck) {
    const btn = el(
      'button',
      { class: 'mcard', 'aria-label': 'kaart' },
      el('span', { class: 'back' }, '⭐'),
      el('span', { class: 'front' }, picture(w)),
    );
    btn.addEventListener('click', async () => {
      if (busy || btn.classList.contains('flipped')) return;
      btn.classList.add('flipped');
      open.push({ btn, w });
      say(keys.word(theme, w));
      if (open.length < 2) return;

      busy = true;
      const [a, b] = open;
      open = [];
      await wait(900);
      if (!alive()) return;
      if (a.w.id === b.w.id) {
        a.btn.classList.add('matched');
        b.btn.classList.add('matched');
        found++;
        await praise();
        if (found === PAIRS && alive()) finish();
      } else {
        await wait(400);
        a.btn.classList.remove('flipped');
        b.btn.classList.remove('flipped');
      }
      busy = false;
    });
    grid.append(btn);
  }

  stage.replaceChildren(grid);
  say('p-memoryIntro');
  return { replay: () => say('p-memoryIntro') };
};
