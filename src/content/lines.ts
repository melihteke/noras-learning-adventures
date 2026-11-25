import { themes, phrases, type Theme, type Word, type PhraseId } from './themes.ts';
import { alphabet, type AbcWord } from './alphabet.ts';
import { pairSets, allPairItems, type Pair, type PairItem } from './pairs.ts';
import { colours, shapes } from './shapes.ts';

/**
 * Every spoken line maps to a stable key; audio lives at public/audio/<key>.mp3.
 * `{x}` in a line marks a letter that must be spoken as a letter name (SSML say-as).
 */
export const keys = {
  word: (t: Theme, w: Word) => `w-${t.id}-${w.id}`,
  where: (t: Theme, w: Word) => `q-${t.id}-${w.id}`,
  howMany: (t: Theme, w: Word) => `c-${t.id}-${w.id}`,
  number: (n: number) => `n-${n}`,
  phrase: (id: PhraseId) => `p-${id}`,
  theme: (t: Theme) => `t-${t.id}`,
  letter: (x: string) => `al-${x}`,
  letterWord: (w: AbcWord) => `alw-${w.id}`,
  abcWord: (w: AbcWord) => `aw-${w.id}`,
  beginsWith: (x: string) => `alq-${x}`,
  findLetter: (x: string) => `alf-${x}`,
  plusQ: (a: number, b: number) => `mp-${a}-${b}`,
  plusA: (a: number, b: number) => `mpa-${a}-${b}`,
  minQ: (a: number, b: number) => `mm-${a}-${b}`,
  minA: (a: number, b: number) => `mma-${a}-${b}`,
  pairQ: (p: Pair) => `hq-${p.id}`,
  pairA: (p: Pair) => `ha-${p.id}`,
  pairItem: (i: PairItem) => `hw-${i.id}`,
  colour: (id: string) => `kl-${id}`,
  shape: (id: string) => `vm-${id}`,
};

export const MATH_MAX = 10;
const cap = (s: string) => s[0].toUpperCase() + s.slice(1);

const units = ['nul', 'één', 'twee', 'drie', 'vier', 'vijf', 'zes', 'zeven', 'acht', 'negen', 'tien',
  'elf', 'twaalf', 'dertien', 'veertien', 'vijftien', 'zestien', 'zeventien', 'achttien', 'negentien'];
const tens = ['', '', 'twintig', 'dertig', 'veertig', 'vijftig', 'zestig', 'zeventig', 'tachtig', 'negentig'];

/** Dutch number word, 0–100: 21 = "eenentwintig", 22 = "tweeëntwintig". */
export function numberWord(n: number): string {
  if (n < 20) return units[n];
  if (n === 100) return 'honderd';
  const t = Math.floor(n / 10);
  const u = n % 10;
  if (!u) return tens[t];
  const unit = u === 1 ? 'een' : units[u];
  return `${unit}${unit.endsWith('e') ? 'ën' : 'en'}${tens[t]}`;
}
const num = numberWord;

export function allLines(): { key: string; text: string }[] {
  const lines: { key: string; text: string }[] = [];
  const add = (key: string, text: string) => lines.push({ key, text });
  for (const t of themes) {
    add(keys.theme(t), t.name);
    for (const w of t.words) {
      add(keys.word(t, w), w.nl);
      add(keys.where(t, w), `Waar is ${w.nl}?`);
      if (w.plural) add(keys.howMany(t, w), `Hoeveel ${w.plural} zie je?`);
    }
  }
  for (let n = 0; n <= 100; n++) add(keys.number(n), numberWord(n));
  for (const [id, text] of Object.entries(phrases)) add(keys.phrase(id as PhraseId), text);

  for (const l of alphabet) {
    const x = `{${l.letter}}`;
    add(keys.letter(l.letter), x);
    add(keys.beginsWith(l.letter), `Welk plaatje begint met de ${x}?`);
    add(keys.findLetter(l.letter), `Waar is de letter ${x}?`);
    for (const w of l.words) {
      add(keys.abcWord(w), w.word);
      add(keys.letterWord(w), `${x} van ${w.word}`);
    }
  }

  for (let a = 1; a < MATH_MAX; a++) {
    for (let b = 1; a + b <= MATH_MAX; b++) {
      add(keys.plusQ(a, b), `Hoeveel is ${num(a)} plus ${num(b)}?`);
      add(keys.plusA(a, b), `${cap(num(a))} plus ${num(b)} is ${num(a + b)}!`);
    }
  }
  for (let a = 2; a <= MATH_MAX; a++) {
    for (let b = 1; b < a; b++) {
      add(keys.minQ(a, b), `Hoeveel is ${num(a)} min ${num(b)}?`);
      add(keys.minA(a, b), `${cap(num(a))} min ${num(b)} is ${num(a - b)}!`);
    }
  }

  for (const s of pairSets) {
    add(`ps-${s.id}`, s.name);
    for (const p of s.pairs) {
      add(keys.pairQ(p), `Wat hoort bij ${p.a.nl}?`);
      add(keys.pairA(p), `${cap(p.a.nl)} hoort bij ${p.b.nl}.`);
    }
  }
  for (const i of allPairItems()) add(keys.pairItem(i), i.nl);
  for (const c of colours) add(keys.colour(c.id), c.nl);
  for (const s of shapes) add(keys.shape(s.id), s.nl);
  return lines;
}

/** Plain text for the browser-voice fallback. */
export const plainText = (text: string) => text.replace(/\{(\w+)\}/g, '$1');

let lineMap: Map<string, string> | undefined;
export function textFor(key: string): string | undefined {
  lineMap ??= new Map(allLines().map((l) => [l.key, plainText(l.text)]));
  return lineMap.get(key);
}
