import './style.css';
import { themes, type Theme } from './content/themes.ts';
import { initAudio, say, stopSpeaking } from './audio.ts';
import { el, showHelp, getStars, addStar, celebrate } from './ui.ts';
import { help, type HelpId } from './help.ts';
import { luisterGame } from './games/luister.ts';
import { memoryGame } from './games/memory.ts';
import { telGame, countableWords } from './games/tel.ts';
import type { Game } from './games/types.ts';

interface GameInfo {
  id: 'luister' | 'memory' | 'tel';
  icon: string;
  nameKey: string;
  introKey: string;
  play: Game;
  supports: (t: Theme) => boolean;
}

const games: GameInfo[] = [
  { id: 'luister', icon: '👂', nameKey: 'p-gameLuister', introKey: 'p-luisterIntro', play: luisterGame, supports: (t) => t.words.length >= 4 },
  { id: 'memory', icon: '🃏', nameKey: 'p-gameMemory', introKey: 'p-memoryIntro', play: memoryGame, supports: (t) => t.words.length >= 4 },
  { id: 'tel', icon: '🔢', nameKey: 'p-gameTel', introKey: 'p-telIntro', play: telGame, supports: (t) => countableWords(t).length >= 1 },
];

const app = document.getElementById('app')!;
let session = 0;

function shell(helpId: HelpId, onSpeaker: () => void, showHome: boolean, ...content: Node[]) {
  session++;
  stopSpeaking();
  const bar = el(
    'header',
    { class: 'bar' },
    showHome ? el('button', { class: 'icon-btn', 'aria-label': 'Home', onclick: home }, '🏠') : el('span', { class: 'stars' }, `⭐ ${getStars()}`),
    el('button', { class: 'icon-btn speaker', 'aria-label': 'Speak again', onclick: onSpeaker }, '🔊'),
    el('button', { class: 'icon-btn help-btn', 'aria-label': 'Parent help (English)', onclick: () => showHelp(help[helpId].title, help[helpId].html) }, '?'),
  );
  app.replaceChildren(bar, ...content);
}

function home() {
  const greet = () => say('p-hallo');
  shell(
    'home',
    greet,
    false,
    el('h1', { class: 'title' }, 'Nora'),
    el(
      'main',
      { class: 'tiles' },
      ...games.map((g) =>
        el('button', { class: `tile tile-${g.id}`, 'aria-label': g.id, onclick: () => pickTheme(g) }, el('span', { class: 'tile-icon' }, g.icon)),
      ),
    ),
  );
  greet();
}

function pickTheme(game: GameInfo) {
  const prompt = () => say('p-kiesThema');
  shell(
    'themes',
    prompt,
    true,
    el(
      'main',
      { class: 'tiles themes' },
      ...themes.filter(game.supports).map((t) =>
        el(
          'button',
          {
            class: 'tile theme',
            'aria-label': t.name,
            onclick: () => play(game, t),
          },
          el('span', { class: 'tile-icon' }, t.icon),
        ),
      ),
    ),
  );
  say(game.nameKey).then(() => prompt());
}

function play(game: GameInfo, theme: Theme) {
  let handle = { replay: () => {} };
  const stage = el('main', { class: 'stage' });
  shell(game.id, () => handle.replay(), true, stage);
  const mine = session;
  const alive = () => session === mine;
  handle = game.play({
    stage,
    theme,
    alive,
    finish: () => {
      if (!alive()) return;
      addStar();
      celebrate();
      say('p-klaar');
      stage.replaceChildren(
        el(
          'div',
          { class: 'finish' },
          el('div', { class: 'big-emoji' }, '🏆'),
          el('button', { class: 'tile again', 'aria-label': 'Nog een keer', onclick: () => play(game, theme) }, '🔁'),
          el('button', { class: 'tile again', 'aria-label': 'Home', onclick: home }, '🏠'),
        ),
      );
    },
  });
}

// Browsers block audio until the first user gesture, so start with a big play button.
function start() {
  app.replaceChildren(
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
  );
}

start();
