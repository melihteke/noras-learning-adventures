import './style.css';
import { themes } from './content/themes.ts';
import { alphabet, letterGroups } from './content/alphabet.ts';
import { initAudio, say, sayAll, stopSpeaking } from './audio.ts';
import { progress, letterLevel, stickers } from './progress.ts';
import { el, showHelp, celebrate } from './ui.ts';
import { help, type HelpId } from './help.ts';
import { luisterGame } from './games/luister.ts';
import { memoryGame } from './games/memory.ts';
import { telGame, countableWords } from './games/tel.ts';
import { abcGame } from './games/abc.ts';
import { beginklankGame } from './games/beginklank.ts';
import { letterGame } from './games/letterzoek.ts';
import { mathGame, mathLevels } from './games/math.ts';
import { honderdGame } from './games/honderd.ts';
import { ernaGame, ernaLevels } from './games/erna.ts';
import { patroonGame, patternLevels, patternTile } from './games/patroon.ts';
import { hoortGame } from './games/hoort.ts';
import { pairSets } from './content/pairs.ts';
import { allIcons as icons, type IconId } from './icons.ts';
import { weekGame, schoolThuisGame, dagErnaGame } from './games/week.ts';
import { seizoenenGame, welkSeizoenGame, jaarGame } from './games/seizoen.ts';
import { eerstGame } from './games/eerst.ts';
import { vergelijkGame, compareLevels } from './games/vergelijk.ts';
import type { Game, Sub } from './games/types.ts';

type WorldId = 'woorden' | 'letters' | 'tellen' | 'rekenen' | 'tijd' | 'puzzelen';

const worlds: { id: WorldId; nl: string; nameKey: string; label: string }[] = [
  { id: 'woorden', nl: 'Woorden', nameKey: 'p-worldWoorden', label: 'Words' },
  { id: 'letters', nl: 'Letters', nameKey: 'p-worldLetters', label: 'Letters' },
  { id: 'tellen', nl: 'Tellen', nameKey: 'p-worldTellen', label: 'Counting' },
  { id: 'rekenen', nl: 'Rekenen', nameKey: 'p-worldRekenen', label: 'Sums' },
  { id: 'tijd', nl: 'Tijd', nameKey: 'p-worldTijd', label: 'Days & seasons' },
  { id: 'puzzelen', nl: 'Puzzelen', nameKey: 'p-worldPuzzelen', label: 'Puzzles' },
];

interface GameInfo {
  id: string;
  world: WorldId;
  icon: IconId;
  nl: string;
  nameKey: string;
  label: string;
  helpId: HelpId;
  play: Game;
  subs: Sub[];
}

/** Tile content: icon (SVG id or emoji), Dutch caption and small English caption. */
function tileContent(icon: IconId | Node, nl?: string, en?: string): Node[] {
  let pic: Node = icon as Node;
  if (typeof icon === 'string') {
    const span = el('span', { class: 'tile-svg' });
    span.innerHTML = icons[icon];
    pic = span;
  }
  return [pic, ...(nl ? [el('span', { class: 'tile-label' }, nl)] : []), ...(en ? [el('span', { class: 'tile-en' }, en)] : [])];
}

const emojiTile = (icon: string) => () => el('span', { class: 'tile-icon' }, icon);
const textTile = (text: string) => () => el('span', { class: 'tile-letters' }, text);
const themeSubs = (ok: (t: (typeof themes)[number]) => boolean): Sub[] =>
  themes.filter(ok).map((t) => ({ id: t.id, label: t.name, caption: t.name, tile: emojiTile(t.icon) }));
const letterSubs: Sub[] = letterGroups.map((g) => ({ id: g.id, label: `Letters ${g.letters.join(' ')}`, tile: textTile(g.letters.join(' ')) }));
const mathSubs = (op: 'plus' | 'min'): Sub[] =>
  mathLevels
    .filter((l) => l.op === op)
    .map((l) => ({ id: l.id, label: l.label, caption: `tot ${l.max}`, tile: textTile(op === 'plus' ? '1 + 2' : '3 − 1') }));
const ernaSubs: Sub[] = ernaLevels.map((l) => ({ id: l.id, label: l.label, caption: l.step === 1 ? `tot ${l.max}` : `per ${l.step}`, tile: textTile(l.tile) }));
const patternSubs: Sub[] = patternLevels.map((l) => ({
  id: l.id,
  label: l.label,
  caption: { kleur: 'Kleuren', vorm: 'Vormen', aab: 'A A B', abc: 'A B C' }[l.id],
  tile: () => patternTile(l.id),
}));
const pairSubs: Sub[] = pairSets.map((s) => ({ id: s.id, label: s.name, caption: s.name, tile: emojiTile(s.icon) }));
const compareSubs: Sub[] = compareLevels.map((l) => ({ id: l.id, label: l.label, caption: l.caption, tile: emojiTile(l.tile) }));
const single = (label: string): Sub[] => [{ id: 'all', label, tile: () => el('span') }];

const games: GameInfo[] = [
  { id: 'luister', world: 'woorden', icon: 'luister', nl: 'Luister en kies', nameKey: 'p-gameLuister', label: 'Listen & pick', helpId: 'luister', play: luisterGame, subs: themeSubs((t) => t.words.length >= 4) },
  { id: 'memory', world: 'woorden', icon: 'memory', nl: 'Memory', nameKey: 'p-gameMemory', label: 'Memory', helpId: 'memory', play: memoryGame, subs: themeSubs((t) => t.words.length >= 4) },
  { id: 'abc', world: 'letters', icon: 'abc', nl: 'Het ABC', nameKey: 'p-gameAbc', label: 'ABC book', helpId: 'abc', play: abcGame, subs: single('All letters') },
  { id: 'begin', world: 'letters', icon: 'begin', nl: 'Beginklank', nameKey: 'p-gameBegin', label: 'First sound', helpId: 'begin', play: beginklankGame, subs: letterSubs },
  { id: 'letter', world: 'letters', icon: 'letter', nl: 'Letters zoeken', nameKey: 'p-gameLetter', label: 'Find the letter', helpId: 'letter', play: letterGame, subs: letterSubs },
  { id: 'tel', world: 'tellen', icon: 'tel', nl: 'Tel mee', nameKey: 'p-gameTel', label: 'Count objects', helpId: 'tel', play: telGame, subs: themeSubs((t) => countableWords(t).length > 0) },
  { id: 'honderd', world: 'tellen', icon: 'honderd', nl: 'Honderdveld', nameKey: 'p-gameHonderd', label: 'Hundred chart', helpId: 'honderd', play: honderdGame, subs: single('1–100') },
  { id: 'erna', world: 'tellen', icon: 'erna', nl: 'Wat komt erna?', nameKey: 'p-gameErna', label: 'Next number', helpId: 'erna', play: ernaGame, subs: ernaSubs },
  { id: 'plus', world: 'rekenen', icon: 'plus', nl: 'Plussommen', nameKey: 'p-gamePlus', label: 'Addition', helpId: 'plus', play: mathGame, subs: mathSubs('plus') },
  { id: 'min', world: 'rekenen', icon: 'min', nl: 'Minsommen', nameKey: 'p-gameMin', label: 'Subtraction', helpId: 'min', play: mathGame, subs: mathSubs('min') },
  { id: 'vergelijk', world: 'rekenen', icon: 'vergelijk', nl: 'Vergelijken', nameKey: 'p-gameVergelijk', label: 'Compare', helpId: 'vergelijk', play: vergelijkGame, subs: compareSubs },
  { id: 'week', world: 'tijd', icon: 'week', nl: 'De week', nameKey: 'p-gameWeek', label: 'The week', helpId: 'week', play: weekGame, subs: single('7 days') },
  { id: 'schoolthuis', world: 'tijd', icon: 'schoolthuis', nl: 'School of thuis?', nameKey: 'p-gameSchoolThuis', label: 'School or home?', helpId: 'schoolthuis', play: schoolThuisGame, subs: single('School days / weekend') },
  { id: 'dagerna', world: 'tijd', icon: 'dagerna', nl: 'Welke dag komt erna?', nameKey: 'p-gameDagErna', label: 'Next day', helpId: 'dagerna', play: dagErnaGame, subs: single('Days of the week') },
  { id: 'seizoenen', world: 'tijd', icon: 'seizoenen', nl: 'De seizoenen', nameKey: 'p-gameSeizoenen', label: 'The seasons', helpId: 'seizoenen', play: seizoenenGame, subs: single('4 seasons') },
  { id: 'welkseizoen', world: 'tijd', icon: 'welkseizoen', nl: 'Welk seizoen?', nameKey: 'p-gameWelkSeizoen', label: 'Which season?', helpId: 'welkseizoen', play: welkSeizoenGame, subs: single('Season puzzles') },
  { id: 'jaar', world: 'tijd', icon: 'jaar', nl: 'Het jaar', nameKey: 'p-gameJaar', label: 'The months', helpId: 'jaar', play: jaarGame, subs: single('12 months') },
  { id: 'patroon', world: 'puzzelen', icon: 'patroon', nl: 'Patronen', nameKey: 'p-gamePatroon', label: 'Patterns', helpId: 'patroon', play: patroonGame, subs: patternSubs },
  { id: 'hoort', world: 'puzzelen', icon: 'hoort', nl: 'Wat hoort bij elkaar?', nameKey: 'p-gameHoort', label: 'What goes together', helpId: 'hoort', play: hoortGame, subs: pairSubs },
  { id: 'eerst', world: 'puzzelen', icon: 'eerst', nl: 'Wat komt eerst?', nameKey: 'p-gameEerst', label: 'What comes first?', helpId: 'eerst', play: eerstGame, subs: single('Order of events') },
];
const app = document.getElementById('app')!;
let session = 0;
let counters: HTMLElement | undefined;

function counterText() {
  return `⭐ ${progress.stars}  💖 ${progress.hearts}`;
}

function shell(helpId: HelpId, onSpeaker: () => void, back: (() => void) | null, ...content: Node[]) {
  session++;
  stopSpeaking();
  counters = el('span', { class: 'counters' }, counterText());
  const nav = back
    ? [
        el('button', { class: 'icon-btn', 'aria-label': 'Home', onclick: home }, '🏠'),
        ...(back !== home ? [el('button', { class: 'icon-btn', 'aria-label': 'Terug', onclick: back }, '⬅️')] : []),
      ]
    : [];
  const bar = el(
    'header',
    { class: 'bar' },
    ...nav,
    counters,
    el('button', { class: 'icon-btn speaker', 'aria-label': 'Speak again', onclick: onSpeaker }, '🔊'),
    el('button', { class: 'icon-btn help-btn', 'aria-label': 'Parent help (English)', onclick: () => showHelp(help[helpId].title, help[helpId].html) }, '?'),
  );
  app.replaceChildren(bar, ...content);
}

function stars(gameId: string, subId: string) {
  const done = progress.stat(gameId, subId)?.done ?? 0;
  return el('span', { class: 'tile-stars' }, done ? '⭐'.repeat(Math.min(done, 3)) : '');
}

function home() {
  const greet = () => say('p-hallo');
  const last = progress.last;
  const lastGame = last && games.find((g) => g.id === last.game);
  const lastSub = lastGame?.subs.find((s) => s.id === last!.sub);
  shell(
    'home',
    greet,
    null,
    el(
      'main',
      { class: 'home' },
      el(
        'div',
        { class: 'hero' },
        el('img', { src: `${import.meta.env.BASE_URL}img/nora-unicorn.webp`, alt: 'Nora en haar eenhoorn', draggable: 'false' }),
        el('h1', { class: 'title' }, ...[...'Nora'].map((c) => el('span', {}, c))),
      ),
      el(
        'div',
        { class: 'home-actions' },
        ...(lastGame && lastSub
          ? [
              el(
                'button',
                { class: 'continue', 'aria-label': 'Verder spelen', onclick: () => play(lastGame, lastSub) },
                el('span', {}, '▶️'),
                ...tileContent(lastGame.icon),
                ...(lastGame.subs.length > 1 ? [lastSub.tile()] : []),
              ),
            ]
          : []),
        el(
          'div',
          { class: 'tiles worlds' },
          ...worlds.map((w) =>
            el('button', { class: `tile world-${w.id}`, 'aria-label': w.label, onclick: () => world(w.id) }, ...tileContent(w.id, w.nl, w.label)),
          ),
          el('button', { class: 'tile world-progress', 'aria-label': 'Voortgang', onclick: progressPage }, ...tileContent('voortgang', 'Voortgang', 'Progress')),
        ),
      ),
    ),
  );
  greet();
}

function world(id: WorldId) {
  const w = worlds.find((x) => x.id === id)!;
  const prompt = () => sayAll(w.nameKey, 'p-kiesMaar');
  shell(
    'world',
    prompt,
    home,
    el(
      'main',
      { class: `tiles world-bg-${id}` },
      ...games
        .filter((g) => g.world === id)
        .map((g) => el('button', { class: `tile game-tile world-${id}`, 'aria-label': g.label, onclick: () => pick(g) }, ...tileContent(g.icon, g.nl, g.label))),
    ),
  );
  prompt();
}

function pick(game: GameInfo) {
  if (game.subs.length === 1) return play(game, game.subs[0]);
  const prompt = () => sayAll(game.nameKey, 'p-kiesMaar');
  shell(
    'pick',
    prompt,
    () => world(game.world),
    el(
      'main',
      { class: 'tiles themes' },
      ...game.subs.map((s) =>
        el('button', { class: `tile theme world-${game.world}`, 'aria-label': s.label, onclick: () => play(game, s) }, s.tile(), ...(s.caption ? [el('span', { class: 'tile-label' }, s.caption)] : []), stars(game.id, s.id)),
      ),
    ),
  );
  prompt();
}

function play(game: GameInfo, sub: Sub) {
  let handle = { replay: () => {} };
  const stage = el('main', { class: 'stage' });
  const back = () => (game.subs.length === 1 ? world(game.world) : pick(game));
  shell(game.helpId, () => handle.replay(), back, stage);
  const mine = session;
  const alive = () => session === mine;
  progress.start(game.id, sub.id);
  handle = game.play({
    stage,
    subId: sub.id,
    alive,
    answer: (ok, letter) => {
      progress.answer(game.id, sub.id, ok, letter);
      if (counters) counters.textContent = counterText();
    },
    finish: () => {
      if (!alive()) return;
      const sticker = progress.finish(game.id, sub.id);
      if (counters) counters.textContent = counterText();
      celebrate();
      sayAll('p-klaar', ...(sticker ? ['p-sticker'] : []));
      stage.replaceChildren(
        el(
          'div',
          { class: 'finish' },
          sticker ? el('div', { class: 'new-sticker' }, sticker.emoji) : el('div', { class: 'big-emoji' }, '🏆'),
          el('div', { class: 'finish-buttons' },
            el('button', { class: 'tile again', 'aria-label': 'Nog een keer', onclick: () => play(game, sub) }, '🔁'),
            el('button', { class: 'tile again', 'aria-label': 'Terug', onclick: back }, '⬅️'),
            el('button', { class: 'tile again', 'aria-label': 'Home', onclick: home }, '🏠'),
          ),
        ),
      );
    },
  });
}

function formatDate(ms: number): string {
  if (!ms) return '—';
  const days = Math.floor((Date.now() - ms) / 86_400_000);
  if (days === 0) return 'today';
  if (days === 1) return 'yesterday';
  return new Date(ms).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

function suggestion(): { game: GameInfo; sub: Sub } | undefined {
  for (const g of games) {
    if (g.id === 'abc') continue;
    for (const s of g.subs) if (!(progress.stat(g.id, s.id)?.done)) return { game: g, sub: s };
  }
  return undefined;
}

function progressPage() {
  const next = suggestion();
  const rows = games.flatMap((g) =>
    g.subs.map((s) => {
      const st = progress.stat(g.id, s.id);
      const total = (st?.correct ?? 0) + (st?.wrong ?? 0);
      const acc = total ? `${Math.round(((st?.correct ?? 0) / total) * 100)}%` : '—';
      return el(
        'tr',
        { class: st?.plays ? '' : 'not-started' },
        el('td', {}, g.label),
        el('td', {}, s.label),
        el('td', {}, st?.done ? '⭐'.repeat(Math.min(st.done, 3)) + (st.done > 3 ? ` ×${st.done}` : '') : st?.plays ? 'started' : '—'),
        el('td', {}, acc),
        el('td', {}, formatDate(st?.last ?? 0)),
      );
    }),
  );

  shell(
    'progress',
    () => say('p-voortgang'),
    home,
    el(
      'main',
      { class: 'progress-page', lang: 'en' },
      el('div', { class: 'totals' }, el('span', {}, `⭐ ${progress.stars}`), el('span', {}, `💖 ${progress.hearts}`)),
      ...(next
        ? [
            el(
              'button',
              { class: 'suggest', onclick: () => play(next.game, next.sub) },
              el('span', { class: 'suggest-icon' }, '▶️', ...tileContent(next.game.icon)),
              el('span', {}, `Suggested next: ${next.game.label}: ${next.sub.label}`),
            ),
          ]
        : []),
      el('h2', {}, 'Stickers'),
      el(
        'div',
        { class: 'sticker-book' },
        ...stickers.map((s) =>
          progress.stars >= s.stars
            ? el('span', { class: 'sticker' }, s.emoji)
            : el('span', { class: 'sticker locked' }, el('span', {}, '🔒'), el('small', {}, `${s.stars}⭐`)),
        ),
      ),
      el('h2', {}, 'Letters'),
      el('div', { class: 'abc-grid mini' }, ...alphabet.map((l) => el('span', { class: `abc-tile lvl-${letterLevel(l.letter)}` }, l.letter))),
      el(
        'p',
        { class: 'legend' },
        el('span', { class: 'dot lvl-0' }), ' not opened ',
        el('span', { class: 'dot lvl-1' }), ' explored ',
        el('span', { class: 'dot lvl-2' }), ' practising ',
        el('span', { class: 'dot lvl-3' }), ' learned',
      ),
      el('h2', {}, 'Games'),
      el(
        'table',
        { class: 'progress-table' },
        el('thead', {}, el('tr', {}, ...['Game', 'Theme / level', 'Finished', 'Correct (1st try)', 'Last played'].map((h) => el('th', {}, h)))),
        el('tbody', {}, ...rows),
      ),
      el(
        'button',
        {
          class: 'reset',
          onclick: () => {
            if (confirm('Reset all progress, stars and stickers on this device?')) {
              progress.reset();
              progressPage();
            }
          },
        },
        'Reset progress',
      ),
    ),
  );
  say('p-voortgang');
}

function sky() {
  const layer = el('div', { class: 'sky', 'aria-hidden': 'true' });
  const items = ['⭐', '💖', '✨', '☁️', '🌟', '💜', '⭐', '💗', '✨', '☁️'];
  items.forEach((e, i) => {
    const s = el('span', {}, e);
    s.style.left = `${(i * 97) % 100}%`;
    s.style.top = `${(i * 53) % 90}%`;
    s.style.animationDelay = `${i * 0.7}s`;
    layer.append(s);
  });
  document.body.prepend(layer);
}

// Browsers block audio until the first user gesture, so start with a big play button.
function start() {
  sky();
  app.replaceChildren(
    el(
      'div',
      { class: 'start-screen' },
      el('img', { class: 'start-hero', src: `${import.meta.env.BASE_URL}img/nora-unicorn.webp`, alt: '', draggable: 'false' }),
      el(
        'button',
        {
          class: 'start',
          'aria-label': 'Start',
          onclick: async () => {
            await initAudio();
            home();
          },
        },
        '▶️',
      ),
    ),
  );
}

start();
