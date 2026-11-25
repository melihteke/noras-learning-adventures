/** Days, seasons, months and order-of-events content for the "Tijd" world. */

export interface Day {
  id: string;
  short: string;
  colour: string;
  school: boolean;
}
export const days: Day[] = [
  { id: 'maandag', short: 'ma', colour: '#ff5c5c', school: true },
  { id: 'dinsdag', short: 'di', colour: '#ff922b', school: true },
  { id: 'woensdag', short: 'wo', colour: '#f5b800', school: true },
  { id: 'donderdag', short: 'do', colour: '#45c45a', school: true },
  { id: 'vrijdag', short: 'vr', colour: '#3d9bf0', school: true },
  { id: 'zaterdag', short: 'za', colour: '#9775fa', school: false },
  { id: 'zondag', short: 'zo', colour: '#f06595', school: false },
];

export interface SeasonItem {
  id: string;
  nl: string;
  emoji: string;
}
export interface Season {
  id: 'lente' | 'zomer' | 'herfst' | 'winter';
  nl: string;
  colour: string;
  items: SeasonItem[];
}
const si = (nl: string, emoji: string): SeasonItem => ({
  id: nl.replace(/^(de|het) /, '').normalize('NFD').replace(/[^a-z]/gi, '').toLowerCase(),
  nl,
  emoji,
});
export const seasons: Season[] = [
  { id: 'lente', nl: 'de lente', colour: '#a9e34b', items: [si('de tulp', '🌷'), si('het lammetje', '🐑'), si('de bij', '🐝'), si('de vlinder', '🦋'), si('het kuikentje', '🐣'), si('de bloesem', '🌸')] },
  { id: 'zomer', nl: 'de zomer', colour: '#ffd43b', items: [si('het ijsje', '🍦'), si('de zon', '☀️'), si('het strand', '🏖️'), si('de zonnebril', '🕶️'), si('de watermeloen', '🍉'), si('het badpak', '🩱')] },
  { id: 'herfst', nl: 'de herfst', colour: '#ff922b', items: [si('de paddenstoel', '🍄'), si('het blaadje', '🍂'), si('de pompoen', '🎃'), si('de paraplu', '☂️'), si('de kastanje', '🌰'), si('de egel', '🦔')] },
  { id: 'winter', nl: 'de winter', colour: '#74c0fc', items: [si('de sneeuwpop', '⛄'), si('de sneeuw', '❄️'), si('de slee', '🛷'), si('de sjaal', '🧣'), si('de wanten', '🧤'), si('de kerstboom', '🎄'), si('de schaatsen', '⛸️')] },
];

export interface Month {
  id: string;
  season: Season['id'];
  emoji: string;
  info: string;
}
export const months: Month[] = [
  { id: 'januari', season: 'winter', emoji: '❄️', info: 'Januari. Het is winter en koud.' },
  { id: 'februari', season: 'winter', emoji: '⛄', info: 'Februari. Het is nog winter.' },
  { id: 'maart', season: 'lente', emoji: '🌷', info: 'Maart. De lente begint!' },
  { id: 'april', season: 'lente', emoji: '👑', info: 'April. Dan is het Koningsdag!' },
  { id: 'mei', season: 'lente', emoji: '🌸', info: 'Mei. Alle bloemen bloeien.' },
  { id: 'juni', season: 'zomer', emoji: '☀️', info: 'Juni. De zomer begint!' },
  { id: 'juli', season: 'zomer', emoji: '🏖️', info: 'Juli. Het is zomervakantie!' },
  { id: 'augustus', season: 'zomer', emoji: '🍦', info: 'Augustus. Lekker een ijsje eten.' },
  { id: 'september', season: 'herfst', emoji: '🍎', info: 'September. De herfst begint.' },
  { id: 'oktober', season: 'herfst', emoji: '🍂', info: 'Oktober. De blaadjes vallen van de bomen.' },
  { id: 'november', season: 'herfst', emoji: '🚢', info: 'November. Sinterklaas komt met de stoomboot!' },
  { id: 'december', season: 'winter', emoji: '🎄', info: 'December. Sinterklaas en Kerst!' },
];

/** "Wat komt eerst?" Picture sequences in the right order, with the story told afterwards. */
export interface Sequence {
  id: string;
  steps: { nl: string; emoji: string }[];
  story: string;
}
export const sequences: Sequence[] = [
  { id: 'kip', steps: [{ nl: 'het ei', emoji: '🥚' }, { nl: 'het kuikentje', emoji: '🐣' }, { nl: 'de kip', emoji: '🐔' }], story: 'Eerst is er een ei. Dan komt er een kuikentje uit. En dan wordt het een kip!' },
  { id: 'bloem', steps: [{ nl: 'het plantje', emoji: '🌱' }, { nl: 'de plant', emoji: '🌿' }, { nl: 'de bloem', emoji: '🌻' }], story: 'Eerst een klein plantje. Dan groeit het. En dan is er een mooie bloem!' },
  { id: 'dag', steps: [{ nl: 'de ochtend', emoji: '🌅' }, { nl: 'de middag', emoji: '☀️' }, { nl: 'de nacht', emoji: '🌙' }], story: 'Eerst is het ochtend. Dan is het middag. En dan is het nacht!' },
  { id: 'school', steps: [{ nl: 'wakker worden', emoji: '🛏️' }, { nl: 'ontbijten', emoji: '🥣' }, { nl: 'naar school', emoji: '🏫' }], story: 'Eerst word je wakker. Dan eet je je ontbijt. En dan ga je naar school!' },
  { id: 'aankleden', steps: [{ nl: 'de sokken', emoji: '🧦' }, { nl: 'de schoenen', emoji: '👟' }, { nl: 'naar buiten', emoji: '🌳' }], story: 'Eerst doe je je sokken aan. Dan je schoenen. En dan ga je naar buiten!' },
  { id: 'sneeuwpop', steps: [{ nl: 'de sneeuw', emoji: '❄️' }, { nl: 'de sneeuwpop', emoji: '⛄' }, { nl: 'de zon', emoji: '☀️' }], story: 'Eerst valt er sneeuw. Dan maak je een sneeuwpop. En dan komt de zon en smelt hij!' },
  { id: 'slapen', steps: [{ nl: 'in bad', emoji: '🛁' }, { nl: 'tanden poetsen', emoji: '🪥' }, { nl: 'slapen', emoji: '😴' }], story: 'Eerst ga je in bad. Dan poets je je tanden. En dan ga je lekker slapen!' },
  { id: 'taart', steps: [{ nl: 'de eieren en de melk', emoji: '🥛' }, { nl: 'roeren', emoji: '🥣' }, { nl: 'de taart', emoji: '🎂' }], story: 'Eerst pak je eieren en melk. Dan ga je roeren. En dan heb je een taart!' },
];
