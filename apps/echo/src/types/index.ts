export interface DifficultyModifiers {
  /** Light up each key in a separate colour? */
  colours: boolean;
  /** Maximum number of keys to light at once. */
  multi: number;
  /** How quickly the sequence plays. */
  speed: number;
}

export type Step = number[];

export type Sequence = Step[];
