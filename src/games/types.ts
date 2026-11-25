import type { Theme } from '../content/themes.ts';

export interface GameContext {
  stage: HTMLElement;
  theme: Theme;
  /** False once the player left this game; async steps should stop. */
  alive: () => boolean;
  /** Call when the game is completed. */
  finish: () => void;
}

export interface GameHandle {
  /** Re-speak the current instruction (🔊 button). */
  replay: () => void;
}

export type Game = (ctx: GameContext) => GameHandle;
