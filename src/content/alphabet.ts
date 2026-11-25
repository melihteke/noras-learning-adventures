/**
 * ABC words. Words are bare (no article) so the first sound is the letter sound.
 * Teacher's theme words are used where possible (k/g/t: kaartje, gitaar, goochelaar, theater, trommel, trompet...).
 */
export interface AbcWord {
  id: string;
  word: string;
  emoji?: string;
  img?: string;
}

export interface Letter {
  letter: string;
  words: AbcWord[];
  /** Too few/odd example words for the initial-sound games; shown in the ABC book only. */
  rare?: boolean;
}

const w = (letter: string, word: string, pic: string): AbcWord => ({
  id: `${letter}-${word.normalize('NFD').replace(/[^a-z]/gi, '').toLowerCase()}`,
  word,
  ...(pic.endsWith('.svg') ? { img: pic } : { emoji: pic }),
});

export const alphabet: Letter[] = [
  { letter: 'a', words: [w('a', 'aap', '🐒'), w('a', 'appel', '🍎'), w('a', 'auto', '🚗'), w('a', 'ananas', '🍍'), w('a', 'anker', '⚓'), w('a', 'aardbei', '🍓')] },
  { letter: 'b', words: [w('b', 'bal', '⚽'), w('b', 'boom', '🌳'), w('b', 'banaan', '🍌'), w('b', 'boot', '⛵'), w('b', 'beer', '🐻'), w('b', 'bloem', '🌸'), w('b', 'brood', '🍞')] },
  { letter: 'c', words: [w('c', 'cadeau', '🎁'), w('c', 'clown', '🤡'), w('c', 'cactus', '🌵'), w('c', 'citroen', '🍋')] },
  { letter: 'd', words: [w('d', 'dolfijn', '🐬'), w('d', 'deur', '🚪'), w('d', 'dino', '🦕'), w('d', 'dokter', '🧑‍⚕️'), w('d', 'duif', '🕊️'), w('d', 'danseres', '💃')] },
  { letter: 'e', words: [w('e', 'eenhoorn', '🦄'), w('e', 'eend', '🦆'), w('e', 'egel', '🦔'), w('e', 'eekhoorn', '🐿️'), w('e', 'emmer', '🪣')] },
  { letter: 'f', words: [w('f', 'fiets', '🚲'), w('f', 'fee', '🧚'), w('f', 'feest', '🎉'), w('f', 'frietjes', '🍟'), w('f', 'flamingo', '🦩')] },
  { letter: 'g', words: [w('g', 'gitaar', '🎸'), w('g', 'giraf', '🦒'), w('g', 'geit', '🐐'), w('g', 'goochelaar', '🎩'), w('g', 'glas', '🥛')] },
  { letter: 'h', words: [w('h', 'huis', '🏠'), w('h', 'hond', '🐶'), w('h', 'hart', '❤️'), w('h', 'hoed', '👒'), w('h', 'hamer', '🔨'), w('h', 'haan', '🐓'), w('h', 'honing', '🍯')] },
  { letter: 'i', words: [w('i', 'inktvis', '🐙'), w('i', 'insect', '🐜')] },
  { letter: 'j', words: [w('j', 'jas', '🧥'), w('j', 'jurk', '👗'), w('j', 'jongen', '👦'), w('j', 'jojo', '🪀'), w('j', 'juf', '👩‍🏫')] },
  { letter: 'k', words: [w('k', 'kat', '🐱'), w('k', 'koe', '🐮'), w('k', 'kip', '🐔'), w('k', 'kastanje', '🌰'), w('k', 'kaartje', '🎟️'), w('k', 'kaas', '🧀'), w('k', 'kroon', '👑'), w('k', 'kers', '🍒'), w('k', 'kikker', '🐸')] },
  { letter: 'l', words: [w('l', 'leeuw', '🦁'), w('l', 'lamp', '💡'), w('l', 'lepel', '🥄'), w('l', 'lolly', '🍭'), w('l', 'lieveheersbeestje', '🐞')] },
  { letter: 'm', words: [w('m', 'maan', '🌙'), w('m', 'muis', '🐭'), w('m', 'microfoon', '🎤'), w('m', 'mijter', 'mijter.svg'), w('m', 'muziek', '🎵'), w('m', 'meester', '👨‍🏫')] },
  { letter: 'n', words: [w('n', 'neus', '👃'), w('n', 'nijlpaard', '🦛'), w('n', 'neushoorn', '🦏'), w('n', 'nacht', '🌃')] },
  { letter: 'o', words: [w('o', 'olifant', '🐘'), w('o', 'oor', '👂'), w('o', 'oma', '👵'), w('o', 'opa', '👴'), w('o', 'oog', '👁️')] },
  { letter: 'p', words: [w('p', 'paard', '🐴'), w('p', 'piano', '🎹'), w('p', 'paddenstoel', '🍄'), w('p', 'potlood', '✏️'), w('p', 'pompoen', '🎃'), w('p', 'pinguïn', '🐧'), w('p', 'pizza', '🍕'), w('p', 'Piet', 'piet.svg')] },
  { letter: 'q', rare: true, words: [w('q', 'quiz', '❓')] },
  { letter: 'r', words: [w('r', 'regenboog', '🌈'), w('r', 'raket', '🚀'), w('r', 'regen', '🌧️'), w('r', 'ring', '💍'), w('r', 'rups', '🐛'), w('r', 'robot', '🤖'), w('r', 'roos', '🌹')] },
  { letter: 's', words: [w('s', 'ster', '⭐'), w('s', 'slang', '🐍'), w('s', 'sok', '🧦'), w('s', 'spin', '🕷️'), w('s', 'stoel', '🪑'), w('s', 'slak', '🐌'), w('s', 'sneeuwpop', '⛄'), w('s', 'Sinterklaas', 'sinterklaas.svg')] },
  { letter: 't', words: [w('t', 'tas', '🎒'), w('t', 'trommel', '🥁'), w('t', 'trompet', '🎺'), w('t', 'theater', '🎭'), w('t', 'taart', '🎂'), w('t', 'tijger', '🐯'), w('t', 'tomaat', '🍅'), w('t', 'trein', '🚂'), w('t', 'tent', '⛺')] },
  { letter: 'u', words: [w('u', 'uil', '🦉'), w('u', 'ui', '🧅'), w('u', 'ufo', '🛸')] },
  { letter: 'v', words: [w('v', 'vos', '🦊'), w('v', 'vis', '🐟'), w('v', 'vogel', '🐦'), w('v', 'vlinder', '🦋'), w('v', 'vliegtuig', '✈️'), w('v', 'viool', '🎻'), w('v', 'vuur', '🔥')] },
  { letter: 'w', words: [w('w', 'wolk', '☁️'), w('w', 'wortel', '🥕'), w('w', 'walvis', '🐳'), w('w', 'wind', '🌬️'), w('w', 'worm', '🪱')] },
  { letter: 'x', rare: true, words: [w('x', 'xylofoon', 'xylofoon.svg')] },
  { letter: 'y', rare: true, words: [w('y', 'yoga', '🧘')] },
  { letter: 'z', words: [w('z', 'zon', '☀️'), w('z', 'zee', '🌊'), w('z', 'zebra', '🦓'), w('z', 'zwaan', '🦢')] },
];

/** Letters practised together in the initial-sound and letter-finding games. k/g/t first: that's what the class did. */
export const letterGroups = [
  { id: 'kgt', letters: ['k', 'g', 't'] },
  { id: 'abde', letters: ['a', 'b', 'd', 'e'] },
  { id: 'fhjl', letters: ['f', 'h', 'j', 'l'] },
  { id: 'mnop', letters: ['m', 'n', 'o', 'p'] },
  { id: 'rsvw', letters: ['r', 's', 'v', 'w'] },
  { id: 'ciuz', letters: ['c', 'i', 'u', 'z'] },
];

/** Letters whose first sounds are easily confused; never offered as distractors for each other. */
const confusable = [['c', 'k', 's'], ['f', 'v'], ['s', 'z'], ['g', 'ch']];
export function soundsAlike(a: string, b: string): boolean {
  return a === b || confusable.some((set) => set.includes(a) && set.includes(b));
}

export const letterOf = (x: string): Letter => alphabet.find((l) => l.letter === x)!;
