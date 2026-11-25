/** English instructions for parents, shown behind the "?" button. */
export const help = {
  home: {
    title: 'How to use this app',
    html: `<p>Dutch vocabulary, letters and early maths for groep 1, built on the school themes.
      Everything is spoken in Dutch, so Nora doesn't need to read.</p>
      <ul>
        <li><b>💬 Woorden</b>: theme vocabulary (Listen &amp; pick, Memory).</li>
        <li><b>🔤 Letters</b>: ABC book, first sounds, finding letters.</li>
        <li><b>🔢 Rekenen</b>: counting, addition and subtraction up to 10.</li>
        <li><b>▶️ big button</b>: continues the last game she played.</li>
        <li><b>🌈</b>: progress page (what she has done, accuracy, letters learned, stickers).</li>
        <li>💖 = correct answers, ⭐ = finished games. Stars unlock stickers.</li>
        <li>🔊 repeats the instruction. Short sessions (5–10 min) work best; sit with her and repeat words together.</li>
      </ul>`,
  },
  world: {
    title: 'Choose a game',
    html: `<p>Tap a game. Each game has a "?" button with its own instructions.</p>`,
  },
  pick: {
    title: 'Choose a theme or level',
    html: `<p>Pick the theme the class is working on, a letter group or a maths level.
      The small stars under a tile show how many times she finished it (up to 3).
      Not sure what's next? The 🌈 progress page shows a suggestion.</p>`,
  },
  luister: {
    title: 'Luister & Kies (Listen & Pick)',
    html: `<p>The app says <em>"Waar is de egel?"</em> ("Where is the hedgehog?"). Nora taps the matching picture.</p>
      <ul>
        <li>Wrong tap: the app names what she tapped and asks again. No penalty.</li>
        <li>Tip: ask her to repeat the word with its article (<em>de</em>/<em>het</em>).</li>
      </ul>`,
  },
  memory: {
    title: 'Memory',
    html: `<p>Turn over two cards to find matching pictures. Each card says its Dutch word.</p>
      <ul><li>Tip: ask Nora to say the word before turning over the second card.</li></ul>`,
  },
  tel: {
    title: 'Tel mee (Count along)',
    html: `<p>The app asks <em>"Hoeveel kastanjes zie je?"</em> ("How many chestnuts do you see?").</p>
      <ol><li>Nora taps each picture; the app counts out loud (<em>één, twee, drie…</em>).</li>
      <li>Then she taps the right number.</li></ol>
      <p>Starts with up to 5 items and goes up to 10 as she gets better.</p>`,
  },
  abc: {
    title: 'Het ABC (Alphabet book)',
    html: `<p>Tap a letter to hear it with example words: <em>"k van kat"</em> ("k as in cat").
      Tap the pictures to hear more words. 🔠 goes back to all letters.</p>
      <p>Letter colours: grey = not opened yet, yellow = explored, purple = practising, green = learned.</p>
      <p>Note: the app says the letter <em>name</em> (e.g. "kaa"). At school, groep 1 often uses the letter
      <em>sound</em> (a short "k"). When you play together, say the short sound too.</p>`,
  },
  begin: {
    title: 'Beginklank (First sound)',
    html: `<p>The app asks <em>"Welk plaatje begint met de k?"</em> ("Which picture starts with k?").
      The letter is shown at the top; tap it to hear the question again.</p>
      <ul>
        <li>Wrong tap: the app says which letter that picture starts with (<em>"m van maan"</em>).</li>
        <li>Start with <b>k g t</b>: the teacher practised these sounds in class.</li>
        <li>Tip: stretch the first sound together: "kkkk-at".</li>
      </ul>`,
  },
  letter: {
    title: 'Letters zoeken (Find the letter)',
    html: `<p>The app asks <em>"Waar is de letter k?"</em> ("Where is the letter k?"). Nora taps the right letter
      and sees a picture that starts with it.</p>
      <p>Letters that look alike (b/d/p, n/u, m/w) are never shown together yet.</p>`,
  },
  plus: {
    title: 'Plussommen (Addition)',
    html: `<p>Two groups of pictures are shown with the sum (e.g. <b>2 + 3 = ?</b>). The app asks
      <em>"Hoeveel is twee plus drie?"</em> ("How much is two plus three?").</p>
      <ul>
        <li>She can tap every picture to count them all; the app counts out loud.</li>
        <li>Then she taps the answer. 🖐️ = up to 5, 🖐️🖐️ = up to 10.</li>
        <li>Tip: use real objects or fingers too.</li>
      </ul>`,
  },
  min: {
    title: 'Minsommen (Subtraction)',
    html: `<p>Pictures appear, then some float away (e.g. <b>5 − 2 = ?</b>). The app asks
      <em>"Hoeveel is vijf min twee?"</em> ("How much is five minus two?").</p>
      <ul>
        <li>She counts the pictures that are left (the faded ones are gone) and taps the answer.</li>
        <li>🖐️ = up to 5, 🖐️🖐️ = up to 10.</li>
      </ul>`,
  },
  progress: {
    title: 'Progress',
    html: `<p>This page shows where Nora is:</p>
      <ul>
        <li><b>Suggested next</b>: the first game/level she hasn't finished yet.</li>
        <li><b>Table</b>: times finished, first-try accuracy and when she last played it.</li>
        <li><b>Letters</b>: grey = not opened, yellow = explored, purple = practising, green = learned
          (5+ correct, 80%+ accuracy).</li>
        <li><b>Stickers</b>: unlocked with stars (finished games).</li>
      </ul>
      <p>Progress is stored on this device/browser only.</p>`,
  },
};

export type HelpId = keyof typeof help;
