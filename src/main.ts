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
import type { Game, Sub } from './games/types.ts';

type WorldId = 'woorden' | 'letters' | 'rekenen';

const worlds: { id: WorldId; icon: string; nameKey: string; label: string }[] = [
  { id: 'woorden', icon: '💬', nameKey: 'p-worldWoorden', label: 'Words' },
  { id: 'letters', icon: '🔤', nameKey: 'p-worldLetters', label: 'Letters' },
  { id: 'rekenen', icon: '🔢', nameKey: 'p-worldRekenen', label: 'Maths' },
];

interface GameInfo {
  id: string;
  world: WorldId;
  icon: string;
  nameKey: string;
  label: string;
  helpId: HelpId;
  play: Game;
  subs: Sub[];
}

const iconTile = (icon: string) => () => el('span', { class: 'tile-icon' }, icon);
const themeSubs = (ok: (t: (typeof themes)[number]) => boolean): Sub[] =>
  themes.filter(ok).map((t) => ({ id: t.id, label: t.name, tile: iconTile(t.icon) }));
const letterSubs: Sub[] = letterGroups.map((g) => ({
  id: g.id,
  label: `Letters ${g.letters.join(' ')}`,
  tile: () => el('span', { class: 'tile-letters' }, g.letters.join(' ')),
}));
const mathSubs = (op: 'plus' | 'min'): Sub[] =>
  mathLevels
    .filter((l) => l.op === op)
    .map((l) => ({
      id: l.id,
      label: l.label,
      tile: () =>
        el('span', { class: 'tile-math' }, el('b', {}, op === 'plus' ? '+' : '−'), el('small', {}, l.max === 5 ? '🖐️' : '🖐️🖐️')),
    }));

const games: GameInfo[] = [
  { id: 'luister', world: 'woorden', icon: '👂', nameKey: 'p-gameLuister', label: 'Listen & pick', helpId: 'luister', play: luisterGame, subs: themeSubs((t) => t.words.length >= 4) },
  { id: 'memory', world: 'woorden', icon: '🃏', nameKey: 'p-gameMemory', label: 'Memory', helpId: 'memory', play: memoryGame, subs: themeSubs((t) => t.words.length >= 4) },
  { id: 'abc', world: 'letters', icon: '📖', nameKey: 'p-gameAbc', label: 'ABC book', helpId: 'abc', play: abcGame, subs: [{ id: 'all', label: 'All letters', tile: iconTile('📖') }] },
  { id: 'begin', world: 'letters', icon: '👄', nameKey: 'p-gameBegin', label: 'First sound', helpId: 'begin', play: beginklankGame, subs: letterSubs },
  { id: 'letter', world: 'letters', icon: '🔍', nameKey: 'p-gameLetter', label: 'Find the letter', helpId: 'letter', play: letterGame, subs: letterSubs },
  { id: 'tel', world: 'rekenen', icon: '🧮', nameKey: 'p-gameTel', label: 'Count along', helpId: 'tel', play: telGame, subs: themeSubs((t) => countableWords(t).length > 0) },
  { id: 'plus', world: 'rekenen', icon: '➕', nameKey: 'p-gamePlus', label: 'Addition', helpId: 'plus', play: mathGame, subs: mathSubs('plus') },
  { id: 'min', world: 'rekenen', icon: '➖', nameKey: 'p-gameMin', label: 'Subtraction', helpId: 'min', play: mathGame, subs: mathSubs('min') },
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
                el('span', { class: 'tile-icon' }, lastGame.icon),
                lastSub.tile(),
              ),
            ]
          : []),
        el(
          'div',
          { class: 'tiles worlds' },
          ...worlds.map((w) =>
            el('button', { class: `tile world-${w.id}`, 'aria-label': w.label, onclick: () => world(w.id) }, el('span', { class: 'tile-icon' }, w.icon)),
          ),
          el('button', { class: 'tile world-progress', 'aria-label': 'Voortgang', onclick: progressPage }, el('span', { class: 'tile-icon' }, '🌈')),
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
        .map((g) => el('button', { class: `tile game-tile world-${id}`, 'aria-label': g.label, onclick: () => pick(g) }, el('span', { class: 'tile-icon' }, g.icon))),
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
        el('button', { class: `tile theme world-${game.world}`, 'aria-label': s.label, onclick: () => play(game, s) }, s.tile(), stars(game.id, s.id)),
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
        el('td', {}, `${g.icon} ${g.label}`),
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
              el('span', { class: 'suggest-icon' }, '▶️ ', next.game.icon),
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
