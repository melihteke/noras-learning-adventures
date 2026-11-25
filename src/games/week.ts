import { keys } from '../content/lines.ts';
import { days, type Day } from '../content/time.ts';
import { say, sayAll } from '../audio.ts';
import { el, shuffle, praise, wait, flash, heartPop, rainbowBar } from '../ui.ts';
import type { Game } from './types.ts';

/** Day card: own colour, short name (ma, di…), dots for its place in the week, school bag or house. */
export function dayCard(d: Day, cls = ''): HTMLElement {
  const i = days.indexOf(d);
  const card = el(
    'span',
    { class: `day-card ${cls}` },
    el('b', {}, d.short),
    el('span', { class: 'day-dots' }, '●'.repeat(i + 1)),
    el('span', { class: 'day-icon' }, d.school ? '🎒' : '🏠'),
  );
  card.style.setProperty('--day', d.colour);
  return card;
}

/** The whole week: tap a day, or play the week song. */
export const weekGame: Game = ({ stage, alive, finish }) => {
  let run = 0;
  const cards = days.map((d) => {
    const b = el('button', { class: 'day-btn', 'aria-label': d.id }, dayCard(d));
    b.addEventListener('click', () => {
      run++;
      light(b);
      sayAll(keys.day(d.id), keys.dayInfo(d.id));
    });
    return b;
  });
  const light = (b?: HTMLElement) => cards.forEach((c) => c.classList.toggle('lit', c === b));

  async function sing(btn: HTMLButtonElement) {
    const mine = ++run;
    btn.classList.add('playing');
    for (const [i, d] of days.entries()) {
      if (run !== mine || !alive()) return btn.classList.remove('playing');
      light(cards[i]);
      await say(keys.day(d.id));
      await wait(200);
    }
    btn.classList.remove('playing');
    light();
    if (run === mine && alive()) finish();
  }

  const play = el('button', { class: 'step-btn', 'aria-label': 'Zing de week' }, '▶ ma di wo do vr za zo');
  play.addEventListener('click', () => sing(play));

  stage.replaceChildren(
    play,
    el(
      'div',
      { class: 'week' },
      el('div', { class: 'week-group school' }, el('div', { class: 'week-cards' }, ...cards.slice(0, 5)), el('div', { class: 'week-label' }, '🏫 school')),
      el('div', { class: 'week-group weekend' }, el('div', { class: 'week-cards' }, ...cards.slice(5)), el('div', { class: 'week-label' }, '🏠 weekend')),
    ),
  );
  say('p-weekIntro');
  return { replay: () => say('p-weekIntro') };
};

/** Hear a day; tap school or home. */
export const schoolThuisGame: Game = ({ stage, alive, answer, finish }) => {
  const order = shuffle(days);
  let round = 0;
  let day: Day;
  let locked = false;
  let missed = false;
  const ask = () => sayAll(keys.day(day.id), 'p-schoolThuisVraag');

  function next() {
    if (round >= order.length) return finish();
    day = order[round++];
    locked = false;
    missed = false;
    stage.replaceChildren(
      rainbowBar(round - 1, order.length),
      el('button', { class: 'day-btn big', 'aria-label': day.id, onclick: ask }, dayCard(day, 'hide-icon')),
      el('div', { class: 'choice-row' }, choice(true), choice(false)),
    );
    ask();
  }

  function choice(school: boolean) {
    const b = el('button', { class: 'card choice', 'aria-label': school ? 'school' : 'thuis' }, el('span', { class: 'choice-emoji' }, school ? '🏫' : '🏠'), el('span', { class: 'tile-label' }, school ? 'school' : 'thuis'));
    b.addEventListener('click', async () => {
      if (locked) return;
      if (school === day.school) {
        locked = true;
        if (!missed) answer(true);
        b.classList.add('correct');
        stage.querySelector('.day-card')?.classList.remove('hide-icon');
        heartPop(b);
        await say(keys.dayInfo(day.id));
        await praise();
        if (alive()) next();
      } else {
        if (!missed) answer(false);
        missed = true;
        flash(b, 'wrong');
        await say('p-opnieuw');
        await wait(100);
        if (alive() && !locked) ask();
      }
    });
    return b;
  }

  say('p-gameSchoolThuis').then(() => alive() && next());
  stage.replaceChildren(el('div', { class: 'big-emoji' }, '🏫'));
  return { replay: () => day && ask() };
};

/** "Welke dag komt na dinsdag?" */
export const dagErnaGame: Game = ({ stage, alive, answer, finish }) => {
  const ROUNDS = 6;
  const order = shuffle(days).slice(0, ROUNDS);
  let round = 0;
  let day: Day;
  let target: Day;
  let locked = false;
  let missed = false;
  const ask = () => say(keys.dayNextQ(day.id));

  function next() {
    if (round >= ROUNDS) return finish();
    day = order[round++];
    target = days[(days.indexOf(day) + 1) % 7];
    locked = false;
    missed = false;
    const others = shuffle(days.filter((d) => d !== target && d !== day)).slice(0, 2);
    const slot = el('span', { class: 'day-slot' }, '?');
    stage.replaceChildren(
      rainbowBar(round - 1, ROUNDS),
      el('div', { class: 'day-seq' }, el('button', { class: 'day-btn', 'aria-label': day.id, onclick: () => say(keys.day(day.id)) }, dayCard(day)), el('span', { class: 'op' }, '→'), slot),
      el('div', { class: 'choice-row' }, ...shuffle([target, ...others]).map((d) => option(d, slot))),
    );
    ask();
  }

  function option(d: Day, slot: HTMLElement) {
    const b = el('button', { class: 'day-btn', 'aria-label': d.id }, dayCard(d));
    b.addEventListener('click', async () => {
      if (locked) return;
      if (d === target) {
        locked = true;
        if (!missed) answer(true);
        b.classList.add('correct');
        slot.replaceChildren(dayCard(d));
        slot.classList.add('solved');
        heartPop(b);
        await say(keys.dayNextA(day.id));
        await praise();
        if (alive()) next();
      } else {
        if (!missed) answer(false);
        missed = true;
        flash(b, 'wrong');
        await sayAll(keys.day(d.id), 'p-opnieuw');
        await wait(100);
        if (alive() && !locked) ask();
      }
    });
    return b;
  }

  say('p-gameDagErna').then(() => alive() && next());
  stage.replaceChildren(el('div', { class: 'big-emoji' }, '📅'));
  return { replay: () => day && ask() };
};

