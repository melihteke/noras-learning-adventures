# Nora's Learning Adventures

Audio-first Dutch vocabulary, letters and early-maths games for a groep 1 (NT2) child who can't read yet.
Themes follow the Dutch school year: School & Beroepen, Spot aan (Kinderboekenweek), Herfst, Sinterklaas, Winter, plus Gevoelens (feelings).

## Worlds and games

| World | Game | What the child does |
| --- | --- | --- |
| Woorden (picture cards) | Luister en kies | Hears "Waar is de egel?" and taps the right picture |
| | Memory | Turns over cards (each one says its word) and finds pairs |
| Letters (ABC blocks) | Het ABC | Taps a letter, hears "k van kat", explores 2–9 example words per letter |
| | Beginklank | "Welk plaatje begint met de k?": picks the picture with that first sound |
| | Letters zoeken | "Waar is de letter k?": taps the right letter |
| Tellen (abacus) | Tel mee | Taps objects to count out loud, then picks the number (1–5, up to 10) |
| | Honderdveld | 1–100 chart: tap to hear a number, or count along in 1s, 5s or 10s |
| | Wat komt erna? | `10, 20, 30, ?`: next number up to 10 / 20 / 100, in 5s, in 10s |
| Rekenen (+ − =) | Plussommen | Two groups of pictures, `2 + 3 = ?` (up to 5 / up to 10) |
| | Minsommen | Pictures float away, `5 − 2 = ?` (up to 5 / up to 10) |
| | Vergelijken | Biggest/smallest, most/fewest, first/last in the row |
| Tijd (calendar) | De week | 7 colour-coded day cards (ma–zo): 5 school days 🎒 + weekend 🏠; sing-along |
| | School of thuis? | Hears a day, taps 🏫 school or 🏠 home |
| | Welke dag komt erna? | "Welke dag komt na dinsdag?" |
| | De seizoenen | Four season trees; tap to see what belongs to each season |
| | Welk seizoen? | "Bij welk seizoen hoort de sneeuwpop?": links a picture to its season |
| | Het jaar | 12 months coloured by season, one fact each (listening only, no quiz) |
| Puzzelen (puzzle) | Patronen | Continues colour/shape patterns (AB, AAB/ABB, ABC) and hears the colour or shape name |
| | Wat hoort bij elkaar? | "Wat hoort bij de regen?": picks the matching picture (Thuis, Beroepen, Herfst, Sinterklaas) |
| | Wat komt eerst? | Puts 3 pictures in order (egg → chick → chicken), then hears the "eerst… dan… en dan…" story |

World and game tiles use flat SVG icons ([src/icons.ts](src/icons.ts)) with a Dutch caption and a small English caption.
Letter games are grouped as k g t (practised in class first), a b d e, f h j l, m n o p, r s v w and c i u z.
Easily confused sounds (c/k/s, f/v, s/z) and look-alike letters (b/d/p, n/u, m/w) never appear together.

## Progress and rewards

- 💖 hearts for correct answers, ⭐ stars for finished games. Stars unlock stickers (🦄 🌈 💖 🧚 …).
- A rainbow progress bar with a unicorn shows how far a game has got.
- **▶️ Continue** on the home screen resumes the last game and level.
- **🌈 Progress page** (for parents, in English): suggested next game, per game/level times finished,
  first-try accuracy and last played, letter mastery grid and the sticker book.
- Progress is stored in `localStorage` on the device (key `nora.progress.v1`).

Every screen has a 🔊 button that repeats the instruction and a small **?** button with English help for parents.

## Development

```powershell
npm install
npm run dev      # http://localhost:5173
npm run build
```

## Audio (Azure Neural TTS)

All spoken lines are built in [src/content/lines.ts](src/content/lines.ts) from
[themes.ts](src/content/themes.ts) and [alphabet.ts](src/content/alphabet.ts), plus every addition and
subtraction sum up to 10, all numbers 0–100, association pairs ([pairs.ts](src/content/pairs.ts)) and colours/shapes ([shapes.ts](src/content/shapes.ts)). MP3s are generated once and committed to `public/audio/`, so the live site needs no API key.
In a line, `{k}` is spoken as a letter name (SSML `say-as characters`).

1. Create `.env` (gitignored):
   ```
   AZURE_SPEECH_KEY=...
   AZURE_SPEECH_REGION=swedencentral
   ```
2. `npm run audio` generates only new or changed lines (`-- --force` regenerates everything) and removes unused files.

Voice: `nl-NL-FennaNeural` at -10% speed (override with `AZURE_SPEECH_VOICE`). Speech resource: `nora-speech-tts`
(F0 free tier, 500K characters/month) in resource group `rg-nora-learning`.
If an MP3 is missing, the app falls back to the browser's Dutch voice.

## Adding words, letters or themes

Edit [themes.ts](src/content/themes.ts) (`plural` makes a word usable in Tel mee) or
[alphabet.ts](src/content/alphabet.ts), run `npm run audio`, then commit and push. GitHub Actions deploys to GitHub Pages.

## Roadmap

- Klanken plakken (t-a-k → tak, auditory synthesis) with real phoneme audio
- Winter, Kerst, Lente, Pasen, Koningsdag, Zomer themes; sentence building and story order

## Revision History

| Version | Date | Author | Changes |
| --- | --- | --- | --- |
| 0.4.0 | 2026-11-25 | Melih Teke | Tijd world (week, school or home, next day, seasons, which season, months); Wat komt eerst? sequencing; Vergelijken (big/small, more/fewer, first/last); Winter and Gevoelens themes |
| 0.3.0 | 2026-11-25 | Melih Teke | Tellen world (hundred chart, counting in 1s/5s/10s to 100, next number); Puzzelen world (patterns, what goes together); SVG icons with captions instead of emoji |
| 0.2.0 | 2026-11-25 | Melih Teke | Home illustration (Nora + unicorn); Letters world (ABC, Beginklank, Letters zoeken); Plus/Min sums up to 10; progress page, continue button, hearts, stickers; unicorn/rainbow design |
| 0.1.0 | 2026-11-25 | Melih Teke | Initial MVP: Luister & Kies, Memory, Tel mee; 5 themes; Azure TTS audio; parent help |
