/** Learning progress, stored locally on the device. */
export interface Stat {
  plays: number;
  done: number;
  correct: number;
  wrong: number;
  last: number;
}
export interface LetterStat {
  seen: number;
  correct: number;
  wrong: number;
}
interface Progress {
  v: 1;
  stars: number;
  hearts: number;
  last?: { game: string; sub: string };
  stats: Record<string, Stat>;
  letters: Record<string, LetterStat>;
}

const KEY = 'nora.progress.v1';
let data: Progress = load();

function load(): Progress {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // Corrupt data: start fresh.
  }
  return { v: 1, stars: Number(localStorage.getItem('nora.stars') ?? 0), hearts: 0, stats: {}, letters: {} };
}
const save = () => localStorage.setItem(KEY, JSON.stringify(data));

const statKey = (game: string, sub: string) => `${game}:${sub}`;
function stat(game: string, sub: string): Stat {
  return (data.stats[statKey(game, sub)] ??= { plays: 0, done: 0, correct: 0, wrong: 0, last: 0 });
}
function letter(x: string): LetterStat {
  return (data.letters[x] ??= { seen: 0, correct: 0, wrong: 0 });
}

export const progress = {
  get stars() {
    return data.stars;
  },
  get hearts() {
    return data.hearts;
  },
  get last() {
    return data.last;
  },
  stat: (game: string, sub: string): Stat | undefined => data.stats[statKey(game, sub)],
  letter: (x: string): LetterStat | undefined => data.letters[x],

  start(game: string, sub: string) {
    const s = stat(game, sub);
    s.plays++;
    s.last = Date.now();
    data.last = { game, sub };
    save();
  },
  answer(game: string, sub: string, ok: boolean, letterX?: string) {
    const s = stat(game, sub);
    if (ok) {
      s.correct++;
      data.hearts++;
    } else s.wrong++;
    if (letterX) {
      const l = letter(letterX);
      if (ok) l.correct++;
      else l.wrong++;
    }
    save();
  },
  /** Returns the sticker unlocked by this star, if any. */
  finish(game: string, sub: string): Sticker | undefined {
    stat(game, sub).done++;
    data.stars++;
    save();
    return stickers.find((s) => s.stars === data.stars);
  },
  seeLetter(x: string) {
    letter(x).seen++;
    save();
  },
  reset() {
    data = { v: 1, stars: 0, hearts: 0, stats: {}, letters: {} };
    save();
  },
};

/** 0 = not started, 1 = explored, 2 = practising, 3 = learned. */
export function letterLevel(x: string): 0 | 1 | 2 | 3 {
  const l = data.letters[x];
  if (!l) return 0;
  const total = l.correct + l.wrong;
  if (l.correct >= 5 && l.correct / total >= 0.8) return 3;
  if (total > 0) return 2;
  return l.seen > 0 ? 1 : 0;
}

export interface Sticker {
  stars: number;
  emoji: string;
}
export const stickers: Sticker[] = [
  { stars: 1, emoji: '🦄' },
  { stars: 3, emoji: '🌈' },
  { stars: 5, emoji: '💖' },
  { stars: 8, emoji: '🧚' },
  { stars: 11, emoji: '🦋' },
  { stars: 15, emoji: '👑' },
  { stars: 20, emoji: '🎠' },
  { stars: 25, emoji: '🍭' },
  { stars: 30, emoji: '🌸' },
  { stars: 40, emoji: '🧁' },
  { stars: 50, emoji: '🏰' },
  { stars: 65, emoji: '🐉' },
  { stars: 80, emoji: '🪐' },
  { stars: 100, emoji: '🌟' },
];
