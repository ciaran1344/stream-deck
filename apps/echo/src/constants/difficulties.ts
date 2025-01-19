import { DifficultyModifiers } from "../types";

export enum Difficulty {
  Custom = -1,
  Easy,
  Normal,
  Hard,
  Extreme,
}

export const DEFAULT_DIFFICULTY = Difficulty.Normal;

export const DIFFICULTY_MODIFIERS: Record<
  Exclude<Difficulty, Difficulty.Custom>,
  DifficultyModifiers
> = {
  [Difficulty.Easy]: {
    colours: true,
    multi: 1,
    speed: 0.5,
  },
  [Difficulty.Normal]: {
    colours: true,
    multi: 1,
    speed: 1,
  },
  [Difficulty.Hard]: {
    colours: true,
    multi: 2,
    speed: 1.5,
  },
  [Difficulty.Extreme]: {
    colours: false,
    multi: 3,
    speed: 2,
  },
};
