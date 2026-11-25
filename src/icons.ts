/** Flat, self-explanatory SVG icons for worlds and games (viewBox 0 0 100 100). */
const svg = (body: string) =>
  `<svg viewBox="0 0 100 100" class="icon" xmlns="http://www.w3.org/2000/svg" font-family="'Segoe UI', Arial, sans-serif" font-weight="800" text-anchor="middle">${body}</svg>`;

const apple = (x: number, y: number, s = 1) =>
  `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 -14c-9-6-22 0-20 14 2 13 11 20 20 16 9 4 18-3 20-16 2-14-11-20-20-14z" fill="#ff5c5c"/><path d="M0 -14c0-6 2-9 5-11" stroke="#6d4c41" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M2 -16c4-7 11-7 13-5-3 5-9 6-13 5z" fill="#45c45a"/></g>`;

const card = (x: number, y: number, w: number, h: number, fill: string, stroke: string, rot = 0) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="9" fill="${fill}" stroke="${stroke}" stroke-width="4" transform="rotate(${rot} ${x + w / 2} ${y + h / 2})"/>`;

const block = (x: number, y: number, fill: string, ch: string) =>
  `<rect x="${x}" y="${y}" width="38" height="38" rx="7" fill="${fill}"/><rect x="${x + 4}" y="${y + 4}" width="30" height="30" rx="5" fill="none" stroke="#fff8" stroke-width="2"/><text x="${x + 19}" y="${y + 30}" font-size="28" fill="#fff">${ch}</text>`;

const heart = (x: number, y: number, s: number, fill = '#f783ac') =>
  `<path transform="translate(${x} ${y}) scale(${s})" d="M0 12S-14 3-14-6a7 7 0 0 1 14-2 7 7 0 0 1 14 2c0 9-14 18-14 18z" fill="${fill}"/>`;

const cat = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-16 -6l-2-16 12 8M16 -6l2-16-12 8" fill="#ffa94d"/><circle r="17" fill="#ffa94d"/><circle cx="-6" cy="-3" r="2.5" fill="#4a3a5a"/><circle cx="6" cy="-3" r="2.5" fill="#4a3a5a"/><path d="M-4 5q4 4 8 0" stroke="#4a3a5a" stroke-width="2" fill="none"/></g>`;

const balloon = (x: number, y: number, fill: string) =>
  `<g transform="translate(${x} ${y})"><ellipse rx="10" ry="12" fill="${fill}"/><path d="M0 12q-3 8 1 16" stroke="#888" stroke-width="1.5" fill="none"/></g>`;

const umbrella = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-20 0a20 18 0 0 1 40 0q-5-4-10 0-5-4-10 0-5-4-10 0-5-4-10 0z" fill="#9775fa"/><path d="M0 0v18q0 5-5 5t-5-5" stroke="#4a3a5a" stroke-width="3" fill="none" stroke-linecap="round"/></g>`;

const cloudRain = (x: number, y: number) =>
  `<g transform="translate(${x} ${y})"><path d="M-16 4a9 9 0 0 1 2-17 12 12 0 0 1 22-3 9 9 0 0 1 8 20z" fill="#9fb3c8"/><path d="M-8 10l-3 8M2 10l-3 8M12 10l-3 8" stroke="#3d9bf0" stroke-width="3" stroke-linecap="round"/></g>`;

function grid100(): string {
  const rows = ['#ff5c5c', '#ff922b', '#ffcf33', '#45c45a', '#3d9bf0', '#9775fa', '#f783ac', '#ff5c5c', '#ff922b', '#ffcf33'];
  let out = `<rect x="8" y="8" width="84" height="84" rx="8" fill="#fff" stroke="#e6d6f2" stroke-width="3"/>`;
  for (let r = 0; r < 10; r++)
    for (let c = 0; c < 10; c++)
      out += `<rect x="${13 + c * 7.5}" y="${13 + r * 7.5}" width="6" height="6" rx="1.5" fill="${c === 9 ? rows[r] : rows[r] + '66'}"/>`;
  return out;
}

export const icons = {
  // Worlds
  woorden: svg(
    card(10, 20, 44, 58, '#fff', '#f783ac', -10) + apple(32, 52, 0.9) +
      card(46, 16, 44, 58, '#fff', '#9775fa', 9) + cat(68, 48),
  ),
  letters: svg(block(10, 54, '#ff5c5c', 'A') + block(52, 54, '#3d9bf0', 'B') + block(31, 12, '#ffb300', 'C')),
  tellen: svg(
    `<rect x="10" y="12" width="80" height="76" rx="8" fill="none" stroke="#a1887f" stroke-width="6"/>` +
      [30, 50, 70]
        .map(
          (y, i) =>
            `<line x1="13" y1="${y}" x2="87" y2="${y}" stroke="#bcaaa4" stroke-width="3"/>` +
            [0, 1, 2, 3, 4]
              .map((k) => `<circle cx="${22 + k * 11 + (k > 2 - i ? 18 : 0)}" cy="${y}" r="7" fill="${['#ff5c5c', '#3d9bf0', '#45c45a'][i]}"/>`)
              .join(''),
        )
        .join(''),
  ),
  rekenen: svg(
    `<rect x="8" y="8" width="40" height="40" rx="10" fill="#f783ac"/><text x="28" y="40" font-size="38" fill="#fff">+</text>` +
      `<rect x="52" y="8" width="40" height="40" rx="10" fill="#3d9bf0"/><text x="72" y="40" font-size="38" fill="#fff">−</text>` +
      `<rect x="8" y="52" width="40" height="40" rx="10" fill="#45c45a"/><text x="28" y="84" font-size="38" fill="#fff">=</text>` +
      `<rect x="52" y="52" width="40" height="40" rx="10" fill="#ffb300"/><text x="72" y="84" font-size="32" fill="#fff">3</text>`,
  ),
  puzzelen: svg(
    `<path d="M8 30H20a8 8 0 1 1 16 0H46V43a8 8 0 1 1 0 16V80H8Z" fill="#9775fa"/>` +
      `<path d="M52 30H92V80H52V59a8 8 0 1 0 0-16Z" fill="#ffb300"/>`,
  ),
  voortgang: svg(
    `<path d="M30 14h40v22a20 20 0 0 1-40 0z" fill="#ffcf33"/><path d="M30 20H16a14 14 0 0 0 16 18M70 20h14a14 14 0 0 1-16 18" stroke="#ffb300" stroke-width="5" fill="none"/>` +
      `<rect x="44" y="54" width="12" height="14" fill="#ffb300"/><rect x="30" y="68" width="40" height="12" rx="4" fill="#ff922b"/>` +
      `<path d="M50 20l3.5 7 7.5 1-5.5 5 1.5 7.5L50 37l-7 3.5 1.5-7.5-5.5-5 7.5-1z" fill="#fff"/>`,
  ),

  // Games
  luister: svg(
    `<path d="M10 40h12l16-14v48L22 60H10z" fill="#9775fa"/><path d="M46 36q8 14 0 28M54 28q14 22 0 44" stroke="#9775fa" stroke-width="5" fill="none" stroke-linecap="round"/>` +
      card(62, 30, 32, 42, '#fff', '#f783ac') + apple(78, 53, 0.6),
  ),
  memory: svg(
    card(10, 10, 36, 36, '#fff', '#f783ac') + heart(28, 26, 1.1) +
      card(54, 10, 36, 36, '#c58cff', '#c58cff') + `<text x="72" y="36" font-size="20" fill="#fff">?</text>` +
      card(10, 54, 36, 36, '#c58cff', '#c58cff') + `<text x="28" y="80" font-size="20" fill="#fff">?</text>` +
      card(54, 54, 36, 36, '#fff', '#f783ac') + heart(72, 70, 1.1),
  ),
  abc: svg(
    `<path d="M50 24C38 16 22 16 10 20v58c12-4 28-4 40 4 12-8 28-8 40-4V20c-12-4-28-4-40 4z" fill="#fff" stroke="#9775fa" stroke-width="4"/><path d="M50 24v58" stroke="#9775fa" stroke-width="3"/>` +
      `<text x="30" y="62" font-size="30" fill="#ff5c5c">A</text><text x="70" y="62" font-size="30" fill="#3d9bf0">a</text>`,
  ),
  begin: svg(
    `<circle cx="27" cy="50" r="20" fill="#c58cff"/><text x="27" y="61" font-size="32" fill="#fff">k</text>` +
      `<path d="M50 50h12m-6-6 6 6-6 6" stroke="#4a3a5a" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` +
      cat(80, 54),
  ),
  letter: svg(
    `<text x="40" y="66" font-size="46" fill="#3d9bf0">a</text><circle cx="40" cy="48" r="26" fill="#ffffff55" stroke="#4a3a5a" stroke-width="6"/>` +
      `<path d="M59 67l20 20" stroke="#4a3a5a" stroke-width="9" stroke-linecap="round"/>`,
  ),
  tel: svg(
    [20, 50, 80].map((x, i) => apple(x, 44, 0.75) + `<text x="${x}" y="84" font-size="20" fill="#4a3a5a">${i + 1}</text>`).join(''),
  ),
  honderd: svg(grid100()),
  erna: svg(
    [['1', 8], ['2', 30], ['3', 52]].map(([t, x]) => `<rect x="${x}" y="44" width="20" height="24" rx="5" fill="#fff" stroke="#9775fa" stroke-width="3"/><text x="${Number(x) + 10}" y="63" font-size="17" fill="#4a3a5a">${t}</text>`).join('') +
      `<rect x="74" y="44" width="20" height="24" rx="5" fill="#ffe3f1" stroke="#f783ac" stroke-width="3"/><text x="84" y="63" font-size="17" fill="#f783ac">?</text>` +
      `<path d="M18 40q11-16 22 0M40 40q11-16 22 0M62 40q11-16 22 0" stroke="#45c45a" stroke-width="3" fill="none" stroke-dasharray="4 3"/>`,
  ),
  plus: svg(
    `<circle cx="18" cy="40" r="8" fill="#f783ac"/><circle cx="18" cy="60" r="8" fill="#f783ac"/><text x="42" y="62" font-size="34" fill="#9775fa">+</text>` +
      `<circle cx="62" cy="50" r="8" fill="#3d9bf0"/><text x="82" y="62" font-size="30" fill="#4a3a5a">=</text>`,
  ),
  min: svg(
    balloon(22, 52, '#ff5c5c') + balloon(46, 52, '#3d9bf0') +
      `<g opacity=".45" transform="translate(0 -18)">${balloon(74, 40, '#45c45a')}</g><path d="M70 66l10 10m0-10-10 10" stroke="#ff5c5c" stroke-width="4" stroke-linecap="round"/>`,
  ),
  patroon: svg(
    `<circle cx="14" cy="50" r="10" fill="#ff5c5c"/><rect x="28" y="40" width="20" height="20" rx="3" fill="#3d9bf0"/><circle cx="62" cy="50" r="10" fill="#ff5c5c"/>` +
      `<rect x="76" y="38" width="20" height="24" rx="5" fill="#ffe3f1" stroke="#f783ac" stroke-width="3" stroke-dasharray="4 3"/><text x="86" y="57" font-size="16" fill="#f783ac">?</text>`,
  ),
  hoort: svg(
    card(6, 24, 38, 52, '#fff', '#3d9bf0') + cloudRain(25, 46) +
      card(56, 24, 38, 52, '#fff', '#9775fa') + umbrella(75, 46) +
      `<path d="M44 50h12" stroke="#45c45a" stroke-width="5" stroke-linecap="round"/>` + heart(50, 34, 0.6, '#45c45a'),
  ),
};


/** A tree in four states: blossom, full summer green, autumn leaves, bare with snow. */
export function seasonTree(season: string): string {
  const trunk = `<path d="M46 92V58l-8-8M54 92V56l9-9M50 70V52" stroke="#8d6e63" stroke-width="7" fill="none" stroke-linecap="round"/>`;
  const ground = (c: string) => `<ellipse cx="50" cy="92" rx="38" ry="6" fill="${c}"/>`;
  const crown = (c: string) => `<circle cx="50" cy="38" r="26" fill="${c}"/><circle cx="32" cy="46" r="16" fill="${c}"/><circle cx="68" cy="46" r="16" fill="${c}"/>`;
  const dots = (pts: [number, number][], c: string, r = 4) => pts.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/>`).join('');
  switch (season) {
    case 'lente':
      return svg(ground('#8ce99a') + trunk + crown('#b2f2bb') + dots([[38, 30], [55, 24], [64, 40], [44, 46], [28, 48], [72, 52], [52, 36]], '#f783ac', 5) +
        `<circle cx="20" cy="86" r="4" fill="#ffd43b"/><circle cx="82" cy="86" r="4" fill="#f783ac"/>`);
    case 'zomer':
      return svg(`<circle cx="84" cy="14" r="10" fill="#ffd43b"/>` + ground('#69db7c') + trunk + crown('#2f9e44') + dots([[40, 36], [60, 46]], '#ff5c5c', 4));
    case 'herfst':
      return svg(ground('#e8590c88') + trunk + crown('#ff922b') + dots([[40, 30], [60, 40], [30, 50]], '#e8590c', 6) +
        `<ellipse cx="20" cy="70" rx="5" ry="3" fill="#f08c00" transform="rotate(30 20 70)"/><ellipse cx="82" cy="78" rx="5" ry="3" fill="#e8590c" transform="rotate(-20 82 78)"/><ellipse cx="74" cy="64" rx="4" ry="2.5" fill="#fab005"/>`);
    default:
      return svg(ground('#fff') + `<ellipse cx="50" cy="92" rx="38" ry="6" fill="none" stroke="#a5d8ff" stroke-width="2"/>` +
        `<path d="M50 92V40M50 62L32 44M50 54l18-18M32 44l-6-10M32 44l-12 2M68 36l4-12M68 36l12 0M50 40l-6-14M50 40l8-14" stroke="#8d6e63" stroke-width="5" fill="none" stroke-linecap="round"/>` +
        `<path d="M28 42q4-4 8 0M64 34q4-4 8 0M44 28q5-5 10 0" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round"/>` +
        dots([[16, 18], [30, 12], [80, 20], [88, 46], [12, 56], [70, 8], [86, 70]], '#a5d8ff', 3));
  }
}

const dayColours = ['#ff5c5c', '#ff922b', '#f5b800', '#45c45a', '#3d9bf0', '#9775fa', '#f06595'];
const schoolHouse = (x: number, y: number, s = 1) =>
  `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-22 -4L0 -22 22 -4z" fill="#ff5c5c"/><rect x="-18" y="-4" width="36" height="26" fill="#ffe8cc"/><rect x="-5" y="8" width="10" height="14" fill="#8d6e63"/><rect x="-14" y="0" width="7" height="7" fill="#74c0fc"/><rect x="7" y="0" width="7" height="7" fill="#74c0fc"/><path d="M0 -22v-10h10v5H2" fill="#3d9bf0" stroke="#3d9bf0" stroke-width="1.5"/></g>`;
const house = (x: number, y: number, s = 1) =>
  `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-20 -2L0 -20 20 -2z" fill="#9775fa"/><rect x="-15" y="-2" width="30" height="24" fill="#fff3bf"/><rect x="-4" y="9" width="9" height="13" fill="#f06595"/>${heart(-9, 4, 0.35, '#f06595')}</g>`;

export const timeIcons = {
  tijd: svg(
    `<rect x="10" y="16" width="80" height="74" rx="10" fill="#fff" stroke="#e6d6f2" stroke-width="3"/><path d="M10 26a10 10 0 0 1 10-10h60a10 10 0 0 1 10 10v10H10z" fill="#ff5c5c"/>` +
      `<rect x="28" y="8" width="7" height="16" rx="3" fill="#4a3a5a"/><rect x="65" y="8" width="7" height="16" rx="3" fill="#4a3a5a"/>` +
      dayColours.map((c, i) => `<rect x="${16 + (i % 4) * 18}" y="${44 + Math.floor(i / 4) * 20}" width="14" height="14" rx="3" fill="${c}"/>`).join(''),
  ),
  week: svg(
    dayColours.map((c, i) => `<rect x="${6 + i * 12.5 + (i > 4 ? 4 : 0)}" y="36" width="10" height="28" rx="3" fill="${c}"/>`).join('') +
      `<rect x="6" y="70" width="60" height="6" rx="3" fill="#3d9bf0"/><rect x="73" y="70" width="23" height="6" rx="3" fill="#f06595"/>` +
      schoolHouse(36, 22, 0.55) + house(84, 22, 0.55),
  ),
  schoolthuis: svg(schoolHouse(28, 56, 1) + `<text x="50" y="62" font-size="16" fill="#9a8aa8">/</text>` + house(74, 56, 1)),
  dagerna: svg(
    `<rect x="6" y="28" width="34" height="44" rx="8" fill="#ff5c5c"/><text x="23" y="58" font-size="20" fill="#fff">ma</text>` +
      `<path d="M44 50h10m-5-5 5 5-5 5" stroke="#4a3a5a" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` +
      `<rect x="60" y="28" width="34" height="44" rx="8" fill="#ffe8cc" stroke="#ff922b" stroke-width="3" stroke-dasharray="5 3"/><text x="77" y="58" font-size="22" fill="#ff922b">?</text>`,
  ),
  seizoenen: svg(
    `<path d="M50 50V8A42 42 0 0 1 92 50z" fill="#d3f9d8"/><path d="M50 50h42A42 42 0 0 1 50 92z" fill="#fff3bf"/><path d="M50 50v42A42 42 0 0 1 8 50z" fill="#ffe8cc"/><path d="M50 50H8A42 42 0 0 1 50 8z" fill="#d0ebff"/>` +
      `<circle cx="70" cy="30" r="7" fill="#f783ac"/><circle cx="70" cy="30" r="3" fill="#ffd43b"/>` +
      `<circle cx="70" cy="70" r="8" fill="#ffd43b"/>` +
      `<ellipse cx="30" cy="70" rx="8" ry="5" fill="#ff922b" transform="rotate(-30 30 70)"/>` +
      `<path d="M30 22v16M22 30h16M24 24l12 12M36 24 24 36" stroke="#3d9bf0" stroke-width="3" stroke-linecap="round"/>`,
  ),
  welkseizoen: svg(
    `<circle cx="24" cy="66" r="14" fill="#fff" stroke="#a5d8ff" stroke-width="3"/><circle cx="24" cy="42" r="10" fill="#fff" stroke="#a5d8ff" stroke-width="3"/><path d="M20 40h1M27 40h1" stroke="#4a3a5a" stroke-width="3" stroke-linecap="round"/><path d="M24 44l6 2-6 1z" fill="#ff922b"/>` +
      `<path d="M44 52h10m-5-5 5 5-5 5" stroke="#4a3a5a" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` +
      `<g transform="translate(46 4) scale(.5)">${seasonTree('winter').replace(/^<svg[^>]*>|<\/svg>$/g, '')}</g>`,
  ),
  jaar: svg(
    `<rect x="10" y="16" width="80" height="74" rx="10" fill="#fff" stroke="#e6d6f2" stroke-width="3"/><path d="M10 26a10 10 0 0 1 10-10h60a10 10 0 0 1 10 10v10H10z" fill="#9775fa"/>` +
      `<rect x="28" y="8" width="7" height="16" rx="3" fill="#4a3a5a"/><rect x="65" y="8" width="7" height="16" rx="3" fill="#4a3a5a"/>` +
      `<text x="50" y="78" font-size="38" fill="#9775fa">12</text>`,
  ),
  eerst: svg(
    [['🥚', 6, '1'], ['🐣', 37, '2'], ['🐔', 68, '3']]
      .map(([e, x, n]) => `<rect x="${x}" y="26" width="27" height="34" rx="6" fill="#fff" stroke="#e6d6f2" stroke-width="2"/><text x="${Number(x) + 13.5}" y="51" font-size="18">${e}</text><circle cx="${Number(x) + 13.5}" cy="74" r="9" fill="#9775fa"/><text x="${Number(x) + 13.5}" y="80" font-size="14" fill="#fff">${n}</text>`)
      .join(''),
  ),
  vergelijk: svg(
    `<circle cx="34" cy="56" r="26" fill="#3d9bf0"/><circle cx="78" cy="70" r="12" fill="#3d9bf0"/>` +
      `<path d="M24 22l10-10 10 10M34 12v20" stroke="#45c45a" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
  ),
};

export const allIcons = { ...icons, ...timeIcons };
export type IconId = keyof typeof allIcons;
