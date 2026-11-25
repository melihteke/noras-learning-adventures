// Generates public/audio/<key>.mp3 for every spoken line using Azure Neural TTS.
// Usage: npm run audio            (only new/changed lines)
//        npm run audio -- --force (regenerate everything)
// Needs AZURE_SPEECH_KEY and AZURE_SPEECH_REGION in the environment or in .env (never committed).
import { existsSync, mkdirSync, readFileSync, writeFileSync, readdirSync, unlinkSync } from 'node:fs';
import { join } from 'node:path';
import { allLines } from '../src/content/lines.ts';

const VOICE = process.env.AZURE_SPEECH_VOICE ?? 'nl-NL-FennaNeural';
const RATE = '-10%';
const outDir = join(import.meta.dirname, '..', 'public', 'audio');
const stateFile = join(outDir, 'lines.json');

if (existsSync('.env')) process.loadEnvFile('.env');
const key = process.env.AZURE_SPEECH_KEY;
const region = process.env.AZURE_SPEECH_REGION;
if (!key || !region) {
  console.error('Set AZURE_SPEECH_KEY and AZURE_SPEECH_REGION (e.g. in .env).');
  process.exit(1);
}

const force = process.argv.includes('--force');
mkdirSync(outDir, { recursive: true });
const previous: Record<string, string> = existsSync(stateFile) ? JSON.parse(readFileSync(stateFile, 'utf8')) : {};
const lines = allLines();
const signature = (text: string) => `${VOICE}|${RATE}|${text}`;
const todo = lines.filter((l) => force || previous[l.key] !== signature(l.text) || !existsSync(join(outDir, `${l.key}.mp3`)));

const escapeXml = (s: string) => s.replace(/[<>&'"]/g, (c) => `&#${c.charCodeAt(0)};`);
const letters = (s: string) => s.replace(/\{(\w+)\}/g, '<say-as interpret-as="characters">$1</say-as>');
const ssml = (text: string) =>
  `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="nl-NL">` +
  `<voice name="${VOICE}"><prosody rate="${RATE}">${letters(escapeXml(text))}</prosody></voice></speak>`;

async function synth(text: string, attempt = 1): Promise<Buffer> {
  const res = await fetch(`https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`, {
    method: 'POST',
    headers: {
      'Ocp-Apim-Subscription-Key': key!,
      'Content-Type': 'application/ssml+xml',
      'X-Microsoft-OutputFormat': 'audio-24khz-48kbitrate-mono-mp3',
      'User-Agent': 'noras-learning-adventures',
    },
    body: ssml(text),
  });
  if ((res.status === 429 || res.status >= 500) && attempt < 5) {
    await new Promise((r) => setTimeout(r, 1000 * 2 ** attempt));
    return synth(text, attempt + 1);
  }
  if (!res.ok) throw new Error(`TTS ${res.status}: ${await res.text()}`);
  return Buffer.from(await res.arrayBuffer());
}

console.log(`${lines.length} lines, ${todo.length} to generate with ${VOICE}`);
const state: Record<string, string> = {};
for (const l of lines) if (previous[l.key]) state[l.key] = previous[l.key];

let i = 0;
async function worker() {
  while (i < todo.length) {
    const l = todo[i++];
    writeFileSync(join(outDir, `${l.key}.mp3`), await synth(l.text));
    state[l.key] = signature(l.text);
    console.log(`  ✓ ${l.key}  "${l.text}"`);
  }
}
await Promise.all(Array.from({ length: 4 }, worker));

// Drop audio for lines that no longer exist.
const valid = new Set(lines.map((l) => `${l.key}.mp3`));
for (const f of readdirSync(outDir)) if (f.endsWith('.mp3') && !valid.has(f)) unlinkSync(join(outDir, f));

writeFileSync(stateFile, JSON.stringify(state, null, 1));
writeFileSync(join(outDir, 'manifest.json'), JSON.stringify(lines.map((l) => l.key).filter((k) => state[k])));
console.log('Done. Characters billed this run:', todo.reduce((n, l) => n + l.text.length, 0));
