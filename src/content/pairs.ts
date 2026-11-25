/** "Wat hoort bij elkaar?" association pairs, grouped like the school themes. */
export interface PairItem {
  id: string;
  /** With article, as spoken: "de paraplu". */
  nl: string;
  emoji?: string;
  img?: string;
}
export interface Pair {
  id: string;
  a: PairItem;
  b: PairItem;
}
export interface PairSet {
  id: string;
  name: string;
  icon: string;
  pairs: Pair[];
}

const item = (nl: string, pic: string): PairItem => ({
  id: nl.replace(/^(de|het) /i, '').normalize('NFD').replace(/[^a-z]/gi, '').toLowerCase(),
  nl,
  ...(pic.endsWith('.svg') ? { img: pic } : { emoji: pic }),
});
const pair = (a: PairItem, b: PairItem): Pair => ({ id: `${a.id}-${b.id}`, a, b });

export const pairSets: PairSet[] = [
  {
    id: 'thuis',
    name: 'Thuis',
    icon: '☂️',
    pairs: [
      pair(item('de regen', '🌧️'), item('de paraplu', '☂️')),
      pair(item('de koe', '🐄'), item('de melk', '🥛')),
      pair(item('de kip', '🐔'), item('het ei', '🥚')),
      pair(item('de hond', '🐕'), item('het bot', '🦴')),
      pair(item('de bij', '🐝'), item('de bloem', '🌻')),
      pair(item('de sleutel', '🔑'), item('het slot', '🔒')),
      pair(item('de voet', '🦶'), item('de sok', '🧦')),
      pair(item('de brief', '✉️'), item('de brievenbus', '📮')),
    ],
  },
  {
    id: 'beroepen',
    name: 'Beroepen',
    icon: '👷',
    pairs: [
      pair(item('de brandweerman', '🧑‍🚒'), item('het vuur', '🔥')),
      pair(item('de dokter', '🧑‍⚕️'), item('de pleister', '🩹')),
      pair(item('de kok', '🧑‍🍳'), item('de pan', '🍳')),
      pair(item('de politieagent', '👮'), item('de politieauto', '🚓')),
      pair(item('de boer', '🧑‍🌾'), item('de trekker', '🚜')),
      pair(item('de juf', '👩‍🏫'), item('het boek', '📖')),
    ],
  },
  {
    id: 'herfst',
    name: 'Herfst',
    icon: '🍂',
    pairs: [
      pair(item('de eekhoorn', '🐿️'), item('de eikel', 'eikel.svg')),
      pair(item('de spin', '🕷️'), item('het spinnenweb', '🕸️')),
      pair(item('de wind', '🌬️'), item('de vlieger', '🪁')),
      pair(item('de uil', '🦉'), item('de maan', '🌙')),
      pair(item('de egel', '🦔'), item('de blaadjes', '🍂')),
    ],
  },
  {
    id: 'sinterklaas',
    name: 'Sinterklaas',
    icon: '🎁',
    pairs: [
      pair(item('Piet', 'piet.svg'), item('de schoorsteen', 'schoorsteen.svg')),
      pair(item('de chocoladeletter', '🍫'), item('de schoen', '👞')),
      pair(item('de stoomboot', '🚢'), item('de zee', '🌊')),
      pair(item('Sinterklaas', 'sinterklaas.svg'), item('het paard', '🐴')),
    ],
  },
];

export const allPairItems = (): PairItem[] => {
  const seen = new Map<string, PairItem>();
  for (const s of pairSets) for (const p of s.pairs) for (const i of [p.a, p.b]) seen.set(i.id, i);
  return [...seen.values()];
};
