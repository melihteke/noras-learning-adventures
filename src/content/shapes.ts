/** Colours and shapes used in the pattern game. The teacher's school word list includes "Kleuren" and "Vormen". */
export const colours = [
  { id: 'rood', nl: 'rood', hex: '#ff5c5c' },
  { id: 'blauw', nl: 'blauw', hex: '#3d9bf0' },
  { id: 'geel', nl: 'geel', hex: '#ffcf33' },
  { id: 'groen', nl: 'groen', hex: '#45c45a' },
  { id: 'oranje', nl: 'oranje', hex: '#ff922b' },
  { id: 'paars', nl: 'paars', hex: '#9775fa' },
  { id: 'roze', nl: 'roze', hex: '#f783ac' },
];

export const shapes = [
  { id: 'cirkel', nl: 'de cirkel', colour: '#ff5c5c' },
  { id: 'vierkant', nl: 'het vierkant', colour: '#3d9bf0' },
  { id: 'driehoek', nl: 'de driehoek', colour: '#45c45a' },
  { id: 'ster', nl: 'de ster', colour: '#ffcf33' },
  { id: 'hart', nl: 'het hart', colour: '#f783ac' },
];

const paths: Record<string, string> = {
  cirkel: '<circle cx="50" cy="50" r="40"/>',
  vierkant: '<rect x="12" y="12" width="76" height="76" rx="8"/>',
  driehoek: '<path d="M50 8 L92 88 H8 Z" stroke-linejoin="round"/>',
  ster: '<path d="M50 6l12.4 27.6 30 3.2-22.5 20.2 6.4 29.6L50 71.4 23.7 86.6l6.4-29.6L7.6 36.8l30-3.2z"/>',
  hart: '<path d="M50 88S8 62 8 34a21 21 0 0 1 42-6 21 21 0 0 1 42 6c0 28-42 54-42 54z"/>',
};

export function shapeSvg(shape: string, fill: string): string {
  return `<svg viewBox="0 0 100 100" class="shape" fill="${fill}" stroke="#0002" stroke-width="3">${paths[shape]}</svg>`;
}
