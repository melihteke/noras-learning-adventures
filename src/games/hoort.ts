import { keys } from '../content/lines.ts';
import { pairSets, type Pair, type PairItem } from '../content/pairs.ts';
import { say, sayAll } from '../audio.ts';
import { el, picture, shuffle, praise, wait, flash, heartPop, rainbowBar } from '../ui.ts';
import type { Game } from './types.ts';

/** "Wat hoort bij de regen?" Pick the picture that belongs with the shown one. */
export const hoortGame: Game = ({ stage, subId, alive, answer, finish }) => {
  const set = pairSets.find((s) => s.id === subId)!;
  const order = shuffle(set.pairs).slice(0, 6);
  let round = 0;
  let current: Pair;
  let locked = false;
  let missed = false;

  const ask = () => say(keys.pairQ(current));

  function next() {
    if (round >= order.length) return finish();
    current = order[round++];
    const others = shuffle(set.pairs.filter((p) => p !== current)).slice(0, 2).map((p) => p.b);
    locked = false;
    missed = false;
    const slot = el('div', { class: 'pair-slot' }, '?');
    stage.replaceChildren(
      rainbowBar(round - 1, order.length),
      el(
        'div',
        { class: 'pair-row' },
        el('button', { class: 'card pair-main', 'aria-label': current.a.nl, onclick: () => say(keys.pairItem(current.a)) }, picture(current.a, current.a.nl)),
        el('span', { class: 'pair-link' }, '🔗'),
        slot,
      ),
      el('div', { class: 'cards cards-3' }, ...shuffle([current.b, ...others]).map((it) => option(it, slot))),
    );
    ask();
  }

  function option(it: PairItem, slot: HTMLElement) {
    const b = el('button', { class: 'card', 'aria-label': it.nl }, picture(it, it.nl));
    b.addEventListener('click', async () => {
      if (locked) return;
      if (it.id === current.b.id) {
        locked = true;
        if (!missed) answer(true);
        b.classList.add('correct');
        slot.replaceChildren(picture(it, it.nl));
        slot.classList.add('solved');
        heartPop(b);
        await say(keys.pairA(current));
        await praise();
        if (alive()) next();
      } else {
        if (!missed) answer(false);
        missed = true;
        flash(b, 'wrong');
        await sayAll(keys.pairItem(it), 'p-opnieuw');
        await wait(100);
        if (alive() && !locked) ask();
      }
    });
    return b;
  }

  say('p-hoortIntro').then(() => alive() && next());
  stage.replaceChildren(el('div', { class: 'big-emoji' }, '🔗'));
  return { replay: () => current && ask() };
};
