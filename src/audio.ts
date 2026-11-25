import { textFor } from './content/lines.ts';

const base = import.meta.env.BASE_URL;
let available = new Set<string>();
let current: HTMLAudioElement | null = null;
let token = 0;

export async function initAudio(): Promise<void> {
  try {
    const res = await fetch(`${base}audio/manifest.json`, { cache: 'no-cache' });
    if (res.ok) available = new Set(await res.json());
  } catch {
    // No generated audio yet; the browser voice is used instead.
  }
}

export function stopSpeaking(): void {
  token++;
  current?.pause();
  current = null;
  speechSynthesis?.cancel();
}

/** Speak a line by key. Resolves when playback ends (or is interrupted). */
export function say(key: string): Promise<void> {
  stopSpeaking();
  const my = token;
  if (available.has(key)) {
    return new Promise((resolve) => {
      const a = new Audio(`${base}audio/${key}.mp3`);
      current = a;
      a.onended = a.onerror = () => resolve();
      a.play().catch(() => resolve());
    });
  }
  return browserSpeak(textFor(key) ?? '', my);
}

/** Speak several lines in a row; stops if something else starts speaking. */
export async function sayAll(...lineKeys: string[]): Promise<void> {
  for (const k of lineKeys) {
    const my = token + 1;
    await say(k);
    if (token !== my) return;
  }
}

function browserSpeak(text: string, my: number): Promise<void> {
  if (!text || !('speechSynthesis' in window)) return Promise.resolve();
  return new Promise((resolve) => {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'nl-NL';
    u.rate = 0.85;
    const voice = speechSynthesis.getVoices().find((v) => v.lang.toLowerCase().startsWith('nl'));
    if (voice) u.voice = voice;
    u.onend = u.onerror = () => resolve();
    if (token === my) speechSynthesis.speak(u);
    else resolve();
  });
}
