import { keys } from '../content/lines.ts';
import { sequences, type Sequence } from '../content/time.ts';
import { say, sayAll } from '../audio.ts';
import { el, shuffle, praise, wait, flash, heartPop, rainbowBar } from '../ui.ts';
import type { Game } from './types.ts';

/** "Wat komt eerst?" Tap the pictures in the order they happen; then hear the story. */
export const eerstGame: Game = ({ stage, alive, answer, finish }) => {
  const ROUNDS = 5;
  const order = shuffle(sequences).slice(0, ROUNDS);
  let round = 0;
  let seq: Sequence;
  let placed = 0;
  let missed = false;
  let busy = false;
  const ask = () => say(placed === 0 ? 'p-eerstVraag' : 'p-dan');

  function next() {
    if (round >= ROUNDS) return finish();
    seq = order[round++];
    placed = 0;
    missed = false;
    busy = false;
    const slots = seq.steps.map((_, i) => el('span', { class: 'seq-slot' }, el('b', {}, String(i + 1))));
    const options = shuffle(seq.steps.map((st, i) => ({ st, i })));
    stage.replaceChildren(
      rainbowBar(round - 1, ROUNDS),
      el('div', { class: 'seq-slots' }, ...slots),
      el('div', { class: 'cards cards-3' }, ...options.map(({ st, i }) => card(st.emoji, i, slots))),
    );
    ask();
  }

  function card(emoji: string, index: number, slots: HTMLElement[]) {
    const b = el('button', { class: 'card', 'aria-label': seq.steps[index].nl }, el('span', { class: 'pic' }, emoji));
    b.addEventListener('click', async () => {
      if (busy || b.classList.contains('used')) return;
      if (index === placed) {
        b.classList.add('used');
        slots[placed].replaceChildren(el('span', { class: 'pic' }, emoji), el('b', {}, String(placed + 1)));
        slots[placed].classList.add('filled');
        placed++;
        busy = true;
        await say(keys.seqStep(seq.id, index));
        busy = false;
        if (placed < seq.steps.length) {
          if (alive()) ask();
          return;
        }
        busy = true;
        answer(!missed);
        heartPop(slots[slots.length - 1]);
        await say(keys.seqStory(seq.id));
        await praise();
        if (alive()) next();
      } else {
        missed = true;
        flash(b, 'wrong');
        await sayAll(keys.seqStep(seq.id, index), 'p-opnieuw');
        await wait(100);
        if (alive()) ask();
      }
    });
    return b;
  }

  say('p-eerstIntro').then(() => alive() && next());
  stage.replaceChildren(el('div', { class: 'big-emoji' }, '1️⃣2️⃣3️⃣'));
  return { replay: () => seq && ask() };
};
