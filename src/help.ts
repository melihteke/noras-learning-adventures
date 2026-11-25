/** English instructions for parents, shown behind the "?" button. */
export const help = {
  home: {
    title: 'How to use this app',
    html: `<p>Nora's Dutch vocabulary and early-maths games, built on her groep 1 school themes
      (School, Beroepen, Spot aan, Herfst, Sinterklaas). Everything is spoken in Dutch, so no reading is needed.</p>
      <ul>
        <li>Tap a big game tile, then pick a theme.</li>
        <li>🔊 repeats the instruction. 🏠 goes back home.</li>
        <li>Short sessions (5–10 min) work best. Sit next to her and repeat the words out loud together.</li>
        <li>The stars count finished games, just for motivation.</li>
      </ul>`,
  },
  themes: {
    title: 'Pick a theme',
    html: `<p>Choose the theme the class is working on right now. Repeating the same theme for a
      few days helps the words stick.</p>`,
  },
  luister: {
    title: 'Luister & Kies (Listen & Pick)',
    html: `<p>The app says <em>"Waar is de egel?"</em> ("Where is the hedgehog?").
      Nora taps the matching picture.</p>
      <ul>
        <li>Wrong tap: the app says the name of what she tapped and asks again. No penalty.</li>
        <li>Tip: after a correct answer, ask her to say the word with its article (<em>de</em>/<em>het</em>).</li>
      </ul>`,
  },
  memory: {
    title: 'Memory',
    html: `<p>Turn over two cards to find matching pictures. Each card says its Dutch word when turned over.</p>
      <ul><li>Tip: ask Nora to say the word before she turns over the second card.</li></ul>`,
  },
  tel: {
    title: 'Tel mee (Count along)',
    html: `<p>The app asks <em>"Hoeveel kastanjes zie je?"</em> ("How many chestnuts do you see?").</p>
      <ol>
        <li>Nora taps each picture; the app counts out loud (<em>één, twee, drie…</em>).</li>
        <li>Then she taps the right number at the bottom.</li>
      </ol>
      <p>Numbers start up to 5 and go up to 10 after a few correct answers.</p>`,
  },
};

export type HelpId = keyof typeof help;
