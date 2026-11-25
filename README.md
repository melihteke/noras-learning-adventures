# Nora's Learning Adventures

Audio-first Dutch vocabulary, letters and early-maths games for a groep 1 (NT2) child who can't read yet.
Themes follow the Dutch school year: School & Beroepen, Spot aan (Kinderboekenweek), Herfst, Sinterklaas.

## Worlds and games

| World | Game | What the child does |
| --- | --- | --- |
| 💬 Woorden | 👂 Luister & Kies | Hears "Waar is de egel?" and taps the right picture |
| | 🃏 Memory | Turns over cards (each one says its word) and finds pairs |
| 🔤 Letters | 📖 Het ABC | Taps a letter, hears "k van kat", explores 2–9 example words per letter |
| | 👄 Beginklank | "Welk plaatje begint met de k?": picks the picture with that first sound |
| | 🔍 Letters zoeken | "Waar is de letter k?": taps the right letter |
| 🔢 Rekenen | 🧮 Tel mee | Taps objects to count out loud, then picks the number (1–5, up to 10) |
| | ➕ Plussommen | Two groups of pictures, `2 + 3 = ?` (up to 5 / up to 10) |
| | ➖ Minsommen | Pictures float away, `5 − 2 = ?` (up to 5 / up to 10) |

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
subtraction sum up to 10. MP3s are generated once and committed to `public/audio/`, so the live site needs no API key.
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
- Wat hoort bij elkaar (piet ↔ schoorsteen)
- Winter, Kerst, Lente, Pasen, Koningsdag, Zomer themes; sentence building and story order

## Revision History

| Version | Date | Author | Changes |
| --- | --- | --- | --- |
| 0.2.0 | 2026-11-25 | Melih Teke | Home illustration (Nora + unicorn); Letters world (ABC, Beginklank, Letters zoeken); Plus/Min sums up to 10; progress page, continue button, hearts, stickers; unicorn/rainbow design |
| 0.1.0 | 2026-11-25 | Melih Teke | Initial MVP: Luister & Kies, Memory, Tel mee; 5 themes; Azure TTS audio; parent help |
