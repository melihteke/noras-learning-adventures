/** English instructions for parents, shown behind the "?" button. */
export const help = {
  home: {
    title: 'How to use this app',
    html: `<p>Dutch vocabulary, letters and early maths for groep 1, built on the school themes.
      Everything is spoken in Dutch, so Nora doesn't need to read.</p>
      <ul>
        <li><b>Woorden</b> (picture cards): theme vocabulary (Listen &amp; pick, Memory).</li>
        <li><b>Letters</b> (ABC blocks): ABC book, first sounds, finding letters.</li>
        <li><b>Tellen</b> (abacus): counting objects, the 1–100 chart, counting in 1s, 5s and 10s.</li>
        <li><b>Rekenen</b> (+ − =): addition and subtraction up to 10.</li>
        <li><b>Puzzelen</b> (puzzle piece): patterns and "what goes together".</li>
        <li><b>Voortgang</b> (trophy): progress page (what she has done, accuracy, letters learned, stickers).</li>
        <li><b>▶️ rainbow button</b>: continues the last game she played.</li>
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
  honderd: {
    title: 'Honderdveld (Hundred chart)',
    html: `<p>The numbers 1 to 100. Tap any number to hear it in Dutch.</p>
      <ul>
        <li><b>▶ 1 2 3</b>: the app counts from 1 to 100 and lights up each number. Count along together!</li>
        <li><b>▶ 5 10 15</b>: counting in 5s (the yellow squares).</li>
        <li><b>▶ 10 20 30</b>: counting in 10s (the last column).</li>
        <li>Tap the same button again to stop. Finishing a count earns a star.</li>
      </ul>`,
  },
  erna: {
    title: 'Welk getal komt erna? (What comes next?)',
    html: `<p>Three numbers of a counting row are shown and read out (e.g. <b>10, 20, 30, ?</b>).
      Nora taps the number that comes next.</p>
      <ul>
        <li>Levels: up to 10, up to 20, up to 100, counting in 5s, counting in 10s.</li>
        <li>The small "+1 / +5 / +10" between the numbers shows the size of each jump.</li>
        <li>Tip: count the row out loud together first.</li>
      </ul>`,
  },
  patroon: {
    title: 'Patronen (Patterns)',
    html: `<p>A row of colours or shapes repeats (e.g. red, blue, red, blue, ?). Nora taps what comes next.</p>
      <ul>
        <li>Levels: colours AB, shapes AB, AAB/ABB, ABC.</li>
        <li>After a correct answer the app says the colour (<em>rood, blauw…</em>) or shape
          (<em>de cirkel, het vierkant, de driehoek, de ster, het hart</em>), which are words from the school list.</li>
        <li>Tip: say the pattern out loud together, e.g. "rood, blauw, rood, blauw…".</li>
      </ul>`,
  },
  hoort: {
    title: 'Wat hoort bij elkaar? (What goes together?)',
    html: `<p>One picture is shown, for example rain. The app asks <em>"Wat hoort bij de regen?"</em>
      ("What goes with the rain?"). Nora picks the matching picture (the umbrella).</p>
      <ul>
        <li>Sets: Thuis (home), Beroepen (jobs), Herfst (autumn), Sinterklaas. The Sinterklaas pairs are the same
          ones the teacher used in class (Piet ↔ chimney, chocolate letter ↔ shoe, steamboat ↔ sea).</li>
        <li>Tip: ask "why?" ("Waarom?"). The teacher noted that explaining the link is still hard for the children.</li>
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
