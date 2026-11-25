import { keys } from '../content/lines.ts';
import { seasons, months, type Season, type SeasonItem } from '../content/time.ts';
import { seasonTree } from '../icons.ts';
import { say, sayAll } from '../audio.ts';
import { el, shuffle, praise, wait, flash, heartPop, rainbowBar } from '../ui.ts';
import type { Game } from './types.ts';

function tree(id: string, cls = 'season-tree'): HTMLElement {
  const t = el('span', { class: cls });
  t.innerHTML = seasonTree(id);
  return t;
}

function seasonButton(s: Season, onTap: (b: HTMLButtonElement) => void): HTMLButtonElement {
  const b = el('button', { class: `card season-btn season-${s.id}`, 'aria-label': s.nl }, tree(s.id), el('span', { class: 'tile-label' }, s.nl.replace(/^de /, '')));
  b.addEventListener('click', () => onTap(b));
  return b;
}

/** Explore the four seasons and what belongs to each. */
export const seizoenenGame: Game = ({ stage }) => {
  function overview() {
    stage.replaceChildren(el('div', { class: 'season-grid' }, ...seasons.map((s) => seasonButton(s, () => open(s)))));
  }
  function open(s: Season) {
    stage.replaceChildren(
      el(
        'div',
        { class: `season-detail season-${s.id}` },
        el('button', { class: 'icon-btn abc-back', 'aria-label': 'Alle seizoenen', onclick: overview }, '🔙'),
        el('button', { class: 'season-big', 'aria-label': s.nl, onclick: () => say(keys.season(s.id)) }, tree(s.id), el('span', { class: 'tile-label' }, s.nl.replace(/^de /, ''))),
        el(
          'div',
          { class: 'abc-words' },
          ...s.items.map((it) => {
            const b = el('button', { class: 'card abc-word', 'aria-label': it.nl }, el('span', { class: 'pic' }, it.emoji));
            b.addEventListener('click', () => {
              b.classList.add('seen');
              say(keys.seasonItem(it.id));
            });
            return b;
          }),
        ),
      ),
    );
    say(keys.season(s.id));
  }
  overview();
  say('p-seizoenIntro');
  return { replay: () => say('p-seizoenIntro') };
};

/** "Bij welk seizoen hoort het ijsje?" Link a picture to its season. */
export const welkSeizoenGame: Game = ({ stage, alive, answer, finish }) => {
  const ROUNDS = 8;
  const pool = shuffle(seasons.flatMap((s) => shuffle(s.items).slice(0, 2).map((it) => ({ s, it }))));
  let round = 0;
  let cur: { s: Season; it: SeasonItem };
  let locked = false;
  let missed = false;
  const ask = () => say(keys.seasonQ(cur.it.id));

  function next() {
    if (round >= ROUNDS) return finish();
    cur = pool[round++];
    locked = false;
    missed = false;
    stage.replaceChildren(
      rainbowBar(round - 1, ROUNDS),
      el('button', { class: 'card season-item', 'aria-label': cur.it.nl, onclick: () => say(keys.seasonItem(cur.it.id)) }, el('span', { class: 'pic' }, cur.it.emoji)),
      el('div', { class: 'season-grid row' }, ...seasons.map((s) => seasonButton(s, (b) => choose(s, b)))),
    );
    ask();
  }

  async function choose(s: Season, b: HTMLButtonElement) {
    if (locked) return;
    if (s === cur.s) {
      locked = true;
      if (!missed) answer(true);
      b.classList.add('correct');
      heartPop(b);
      await say(keys.seasonA(cur.it.id));
      await praise();
      if (alive()) next();
    } else {
      if (!missed) answer(false);
      missed = true;
      flash(b, 'wrong');
      await sayAll(keys.season(s.id), 'p-opnieuw');
      await wait(100);
      if (alive() && !locked) ask();
    }
  }

  say('p-gameWelkSeizoen').then(() => alive() && next());
  stage.replaceChildren(el('div', { class: 'big-emoji' }, '🌳'));
  return { replay: () => cur && ask() };
};

/** The year: 12 months coloured by season, each with one thing to remember. Listening only. */
export const jaarGame: Game = ({ stage }) => {
  const grid = el(
    'div',
    { class: 'year' },
    ...months.map((m) => {
      const b = el('button', { class: `month season-${m.season}`, 'aria-label': m.id }, el('span', { class: 'month-emoji' }, m.emoji), el('span', { class: 'month-name' }, m.id));
      b.addEventListener('click', () => {
        grid.querySelectorAll('.month').forEach((x) => x.classList.toggle('lit', x === b));
        say(keys.month(m.id));
      });
      return b;
    }),
  );
  stage.replaceChildren(grid);
  say('p-jaarIntro');
  return { replay: () => say('p-jaarIntro') };
};
