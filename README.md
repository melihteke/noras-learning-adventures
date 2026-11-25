# Nora's Learning Adventures

Audio-first Dutch vocabulary and early-maths games for a groep 1 (NT2) child who can't read yet.
Themes follow the Dutch school year: School & Beroepen, Spot aan (Kinderboekenweek), Herfst, Sinterklaas.

## Games (phase 1)

| Game | What the child does |
| --- | --- |
| 👂 Luister & Kies | Hears "Waar is de egel?" and taps the right picture |
| 🃏 Memory | Turns over cards (each one says its word) and finds pairs |
| 🔢 Tel mee | Taps the objects to count out loud, then picks the number (1–5, up to 10 as she improves) |

Every screen has a 🔊 button that repeats the instruction and a small **?** button with English help for parents.

## Development

```powershell
npm install
npm run dev      # http://localhost:5173
npm run build
```

## Audio (Azure Neural TTS)

All spoken lines come from [src/content/themes.ts](src/content/themes.ts). MP3s are generated once and committed to
`public/audio/`, so the live site needs no API key.

1. Create `.env` (gitignored):
   ```
   AZURE_SPEECH_KEY=...
   AZURE_SPEECH_REGION=swedencentral
   ```
2. `npm run audio` generates only new or changed lines (`-- --force` regenerates everything).

Voice: `nl-NL-FennaNeural` at -10% speed (override with `AZURE_SPEECH_VOICE`). Speech resource: `nora-speech-tts`
(F0 free tier, 500K characters/month) in resource group `rg-nora-learning`.
If an MP3 is missing, the app falls back to the browser's Dutch voice.

## Adding words or themes

Add entries to [src/content/themes.ts](src/content/themes.ts) (`plural` makes a word usable in Tel mee), run
`npm run audio`, then commit and push. GitHub Actions deploys to GitHub Pages.

## Roadmap

- Phase 2: Beginklank (k/g/t), Klanken plakken (t-a-k → tak), Wat hoort bij elkaar (piet ↔ schoorsteen)
- Phase 3: Winter, Kerst, Lente, Pasen, Koningsdag, Zomer; illustrations; sentence building and story order

## Revision History

| Version | Date | Author | Changes |
| --- | --- | --- | --- |
| 0.1.0 | 2026-11-25 | Melih Teke | Initial MVP: Luister & Kies, Memory, Tel mee; 5 themes; Azure TTS audio; parent help |
