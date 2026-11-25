export interface Word {
  id: string;
  /** Dutch word with article, exactly as spoken: "de egel". */
  nl: string;
  /** Emoji picture. Use `img` instead when no unambiguous emoji exists. */
  emoji?: string;
  /** SVG file name in public/img/. */
  img?: string;
  /** Plural without article; makes the word usable in the counting game. */
  plural?: string;
}

export interface Theme {
  id: string;
  name: string;
  icon: string;
  words: Word[];
}

export const themes: Theme[] = [
  {
    id: 'school',
    name: 'School',
    icon: '🎒',
    words: [
      { id: 'juf', nl: 'de juf', emoji: '👩‍🏫' },
      { id: 'meester', nl: 'de meester', emoji: '👨‍🏫' },
      { id: 'tas', nl: 'de tas', emoji: '🎒', plural: 'tassen' },
      { id: 'jas', nl: 'de jas', emoji: '🧥', plural: 'jassen' },
      { id: 'schoen', nl: 'de schoen', emoji: '👟', plural: 'schoenen' },
      { id: 'schaar', nl: 'de schaar', emoji: '✂️', plural: 'scharen' },
      { id: 'potlood', nl: 'het potlood', emoji: '✏️', plural: 'potloden' },
      { id: 'stoel', nl: 'de stoel', emoji: '🪑', plural: 'stoelen' },
      { id: 'verf', nl: 'de verf', emoji: '🎨' },
      { id: 'kwast', nl: 'de kwast', emoji: '🖌️', plural: 'kwasten' },
      { id: 'boek', nl: 'het boek', emoji: '📖', plural: 'boeken' },
      { id: 'fruit', nl: 'het fruit', emoji: '🍎' },
      { id: 'broodtrommel', nl: 'de broodtrommel', emoji: '🍱' },
      { id: 'puzzel', nl: 'de puzzel', emoji: '🧩', plural: 'puzzels' },
    ],
  },
  {
    id: 'beroepen',
    name: 'Beroepen',
    icon: '👷',
    words: [
      { id: 'brandweerman', nl: 'de brandweerman', emoji: '🧑‍🚒' },
      { id: 'politieagent', nl: 'de politieagent', emoji: '👮' },
      { id: 'dokter', nl: 'de dokter', emoji: '🧑‍⚕️' },
      { id: 'kok', nl: 'de kok', emoji: '🧑‍🍳' },
      { id: 'tandarts', nl: 'de tandarts', emoji: '🦷' },
      { id: 'kapper', nl: 'de kapper', emoji: '💇' },
      { id: 'clown', nl: 'de clown', emoji: '🤡' },
      { id: 'danseres', nl: 'de danseres', emoji: '💃' },
      { id: 'dierenarts', nl: 'de dierenarts', emoji: '🐶🩺' },
      { id: 'timmerman', nl: 'de timmerman', emoji: '🔨' },
      { id: 'schrijver', nl: 'de schrijver', emoji: '✍️' },
      { id: 'boer', nl: 'de boer', emoji: '🧑‍🌾' },
    ],
  },
  {
    id: 'spot-aan',
    name: 'Spot aan',
    icon: '🎭',
    words: [
      { id: 'theater', nl: 'het theater', emoji: '🎭' },
      { id: 'microfoon', nl: 'de microfoon', emoji: '🎤' },
      { id: 'trommel', nl: 'de trommel', emoji: '🥁', plural: 'trommels' },
      { id: 'piano', nl: 'de piano', emoji: '🎹' },
      { id: 'viool', nl: 'de viool', emoji: '🎻', plural: 'violen' },
      { id: 'gitaar', nl: 'de gitaar', emoji: '🎸', plural: 'gitaren' },
      { id: 'trompet', nl: 'de trompet', emoji: '🎺', plural: 'trompetten' },
      { id: 'kaartje', nl: 'het kaartje', emoji: '🎟️', plural: 'kaartjes' },
      { id: 'muziek', nl: 'de muziek', emoji: '🎵' },
      { id: 'goochelaar', nl: 'de goochelaar', emoji: '🎩' },
    ],
  },
  {
    id: 'herfst',
    name: 'Herfst',
    icon: '🍂',
    words: [
      { id: 'blaadje', nl: 'het blaadje', emoji: '🍂', plural: 'blaadjes' },
      { id: 'eekhoorn', nl: 'de eekhoorn', emoji: '🐿️', plural: 'eekhoorns' },
      { id: 'egel', nl: 'de egel', emoji: '🦔', plural: 'egels' },
      { id: 'uil', nl: 'de uil', emoji: '🦉', plural: 'uilen' },
      { id: 'vos', nl: 'de vos', emoji: '🦊', plural: 'vossen' },
      { id: 'konijn', nl: 'het konijn', emoji: '🐰', plural: 'konijnen' },
      { id: 'vogel', nl: 'de vogel', emoji: '🐦', plural: 'vogels' },
      { id: 'paddenstoel', nl: 'de paddenstoel', emoji: '🍄', plural: 'paddenstoelen' },
      { id: 'kastanje', nl: 'de kastanje', emoji: '🌰', plural: 'kastanjes' },
      { id: 'eikel', nl: 'de eikel', img: 'eikel.svg', plural: 'eikels' },
      { id: 'kale-boom', nl: 'de kale boom', img: 'kale-boom.svg' },
      { id: 'regen', nl: 'de regen', emoji: '🌧️' },
      { id: 'wind', nl: 'de wind', emoji: '🌬️' },
      { id: 'spin', nl: 'de spin', emoji: '🕷️', plural: 'spinnen' },
      { id: 'spinnenweb', nl: 'het spinnenweb', emoji: '🕸️' },
      { id: 'pompoen', nl: 'de pompoen', emoji: '🎃', plural: 'pompoenen' },
      { id: 'paraplu', nl: 'de paraplu', emoji: '☂️', plural: "paraplu's" },
    ],
  },
  {
    id: 'sinterklaas',
    name: 'Sinterklaas',
    icon: '🎁',
    words: [
      { id: 'sinterklaas', nl: 'Sinterklaas', img: 'sinterklaas.svg' },
      { id: 'piet', nl: 'Piet', img: 'piet.svg' },
      { id: 'mijter', nl: 'de mijter', img: 'mijter.svg' },
      { id: 'schoorsteen', nl: 'de schoorsteen', img: 'schoorsteen.svg' },
      { id: 'stoomboot', nl: 'de stoomboot', emoji: '🚢' },
      { id: 'paard', nl: 'het paard', emoji: '🐴' },
      { id: 'cadeau', nl: 'het cadeau', emoji: '🎁', plural: 'cadeaus' },
      { id: 'pepernoot', nl: 'de pepernoot', emoji: '🍪', plural: 'pepernoten' },
      { id: 'chocoladeletter', nl: 'de chocoladeletter', emoji: '🍫', plural: 'chocoladeletters' },
      { id: 'schoen', nl: 'de schoen', emoji: '👞', plural: 'schoenen' },
      { id: 'wortel', nl: 'de wortel', emoji: '🥕', plural: 'wortels' },
      { id: 'vlaggetje', nl: 'het vlaggetje', emoji: '🚩', plural: 'vlaggetjes' },
      { id: 'dak', nl: 'het dak', emoji: '🏠' },
    ],
  },
];

export const numbers = ['één', 'twee', 'drie', 'vier', 'vijf', 'zes', 'zeven', 'acht', 'negen', 'tien'];

/** Fixed spoken phrases, keyed by id. */
export const phrases = {
  hallo: 'Hallo Nora! Wat wil je spelen?',
  kiesThema: 'Kies een thema.',
  goed1: 'Goed zo!',
  goed2: 'Super!',
  goed3: 'Knap gedaan!',
  goed4: 'Ja, dat klopt!',
  opnieuw: 'Probeer het nog eens.',
  klaar: 'Hoera! Je hebt het helemaal gedaan!',
  luisterIntro: 'Luister goed en tik op het goede plaatje.',
  memoryIntro: 'Zoek twee dezelfde plaatjes.',
  telIntro: 'Tik op de plaatjes en tel mee.',
  telKies: 'Hoeveel zijn het? Tik op het goede getal.',
  gameLuister: 'Luister en kies',
  gameMemory: 'Memory',
  gameTel: 'Tel mee',
  worldWoorden: 'Woorden',
  worldLetters: 'Letters',
  worldRekenen: 'Rekenen',
  kiesMaar: 'Kies maar!',
  voortgang: 'Kijk eens wat je allemaal al kunt!',
  gameAbc: 'Het A B C',
  gameBegin: 'Beginklank',
  gameLetter: 'Letters zoeken',
  gamePlus: 'Plussommen',
  gameMin: 'Minsommen',
  abcIntro: 'Tik op een letter.',
  abcWoord: 'Tik op een plaatje.',
  beginIntro: 'Luister goed naar het begin van het woord.',
  letterIntro: 'Zoek de goede letter.',
  plusIntro: 'We gaan plussen! Hoeveel zijn het samen?',
  minIntro: 'We gaan minnen! Hoeveel blijven er over?',
  telSamen: 'Tel ze maar samen.',
  sticker: 'Joepie! Je hebt een nieuwe sticker!',
} as const;

export type PhraseId = keyof typeof phrases;
