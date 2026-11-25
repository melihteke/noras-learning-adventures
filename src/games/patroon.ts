import { keys } from '../content/lines.ts';
import { colours, shapes, shapeSvg } from '../content/shapes.ts';
import { say, sayAll } from '../audio.ts';
import { el, shuffle, pickRandom, praise, wait, flash, heartPop, rainbowBar } from '../ui.ts';
import type { Game } from './types.ts';

const ROUNDS = 6;

export const patternLevels = [
  { id: 'kleur', units: ['AB'], mode: 'colour', label: 'Colours AB' },
  { id: 'vorm', units: ['AB'], mode: 'shape', label: 'Shapes AB' },
  { id: 'aab', units: ['AAB', 'ABB'], mode: 'mixed', label: 'Patterns AAB / ABB' },
  { id: 'abc', units: ['ABC'], mode: 'mixed', label: 'Patterns ABC' },
] as const;

interface Item {
  id: string;
  svg: string;
  audio: string;
}

const colourItems = (): Item[] => colours.map((c) => ({ id: c.id, svg: shapeSvg('cirkel', c.hex), audio: keys.colour(c.id) }));
const shapeItems = (): Item[] => shapes.map((s) => ({ id: s.id, svg: shapeSvg(s.id, s.colour), audio: keys.shape(s.id) }));

const tile = (it: Item, cls = 'p-item') => {
  const t = el('span', { class: cls });
  t.innerHTML = it.svg;
  return t;
};

/** Mini pattern used as the level tile. */
export function patternTile(id: string): HTMLElement {
  const c = colours;
  const seq: [string, string][] =
    id === 'kleur' ? [['cirkel', c[0].hex], ['cirkel', c[1].hex], ['cirkel', c[0].hex], ['cirkel', c[1].hex]]
    : id === 'vorm' ? [['ster', '#ffcf33'], ['hart', '#f783ac'], ['ster', '#ffcf33'], ['hart', '#f783ac']]
    : id === 'aab' ? [['cirkel', c[3].hex], ['cirkel', c[3].hex], ['vierkant', c[1].hex], ['cirkel', c[3].hex]]
    : [['cirkel', c[0].hex], ['vierkant', c[1].hex], ['driehoek', c[3].hex], ['cirkel', c[0].hex]];
  const row = el('span', { class: 'p-mini' });
  row.innerHTML = seq.map(([s, f]) => shapeSvg(s, f)).join('');
  return row;
}

/** "Wat komt er hierna?" Continue a colour or shape pattern. */
export const patroonGame: Game = ({ stage, subId, alive, answer, finish }) => {
  const level = patternLevels.find((l) => l.id === subId)!;
  let round = 0;
  let target: Item;
  let locked = false;
  let missed = false;

  const ask = () => say('p-patroonVraag');

  function next() {
    if (round >= ROUNDS) return finish();
    round++;
    const pool = level.mode === 'colour' ? colourItems() : level.mode === 'shape' ? shapeItems() : pickRandom([colourItems(), shapeItems()]);
    const unit = pickRandom([...level.units]);
    const letters = [...new Set(unit)];
    const chosen = shuffle(pool).slice(0, letters.length + 1);
    const map = new Map(letters.map((l, i) => [l, chosen[i]]));
    const extra = chosen[letters.length];

    const shown = unit.length * 2 + Math.floor(Math.random() * unit.length);
    const seq = Array.from({ length: shown }, (_, i) => map.get(unit[i % unit.length])!);
    target = map.get(unit[shown % unit.length])!;
    locked = false;
    missed = false;

    const missing = el('span', { class: 'p-item missing' }, '?');
    const options = shuffle([...map.values(), extra]);
    stage.replaceChildren(
      rainbowBar(round - 1, ROUNDS),
      el('div', { class: 'pattern' }, ...seq.map((it) => tile(it)), missing),
      el('div', { class: 'p-options' }, ...options.map((it) => option(it, missing))),
    );
    ask();
  }

  function option(it: Item, missing: HTMLElement) {
    const b = el('button', { class: 'card p-option', 'aria-label': it.id }, tile(it, 'p-big'));
    b.addEventListener('click', async () => {
      if (locked) return;
      if (it.id === target.id) {
        locked = true;
        if (!missed) answer(true);
        b.classList.add('correct');
        missing.innerHTML = it.svg;
        missing.classList.replace('missing', 'solved');
        heartPop(b);
        await say(it.audio);
        await praise();
        if (alive()) next();
      } else {
        if (!missed) answer(false);
        missed = true;
        flash(b, 'wrong');
        await sayAll(it.audio, 'p-opnieuw');
        await wait(100);
      }
    });
    return b;
  }

  say('p-patroonIntro').then(() => alive() && next());
  stage.replaceChildren(el('div', { class: 'big-emoji' }, '🔴🔵'));
  return { replay: ask };
};
