import { themes, numbers, phrases, type Theme, type Word, type PhraseId } from './themes.ts';

/** Every spoken line maps to a stable key; audio lives at public/audio/<key>.mp3. */
export const keys = {
  word: (t: Theme, w: Word) => `w-${t.id}-${w.id}`,
  where: (t: Theme, w: Word) => `q-${t.id}-${w.id}`,
  howMany: (t: Theme, w: Word) => `c-${t.id}-${w.id}`,
  number: (n: number) => `n-${n}`,
  phrase: (id: PhraseId) => `p-${id}`,
  theme: (t: Theme) => `t-${t.id}`,
};

export function allLines(): { key: string; text: string }[] {
  const lines: { key: string; text: string }[] = [];
  for (const t of themes) {
    lines.push({ key: keys.theme(t), text: t.name });
    for (const w of t.words) {
      lines.push({ key: keys.word(t, w), text: w.nl });
      lines.push({ key: keys.where(t, w), text: `Waar is ${w.nl}?` });
      if (w.plural) lines.push({ key: keys.howMany(t, w), text: `Hoeveel ${w.plural} zie je?` });
    }
  }
  numbers.forEach((text, i) => lines.push({ key: keys.number(i + 1), text }));
  for (const [id, text] of Object.entries(phrases)) lines.push({ key: keys.phrase(id as PhraseId), text });
  return lines;
}

let lineMap: Map<string, string> | undefined;
export function textFor(key: string): string | undefined {
  lineMap ??= new Map(allLines().map((l) => [l.key, l.text]));
  return lineMap.get(key);
}
