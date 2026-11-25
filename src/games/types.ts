export interface GameContext {
  stage: HTMLElement;
  /** Selected theme / letter group / level id. */
  subId: string;
  /** False once the player left this game; async steps should stop. */
  alive: () => boolean;
  /** Record an answer (adds a heart when correct). */
  answer: (ok: boolean, letter?: string) => void;
  /** Call when the game is completed. */
  finish: () => void;
}

export interface GameHandle {
  /** Re-speak the current instruction (🔊 button). */
  replay: () => void;
}

export type Game = (ctx: GameContext) => GameHandle;

export interface Sub {
  id: string;
  /** English name for the parent progress page. */
  label: string;
  /** Dutch caption under the tile. */
  caption?: string;
  tile: () => Node;
}
