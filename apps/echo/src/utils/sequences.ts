import type { Sequence, Step } from "../types";

/** Given an positive integer, return a value between [`min`, `max`). */
function randomRange(min: number, max: number): number {
  const delta = max - min;
  return Math.floor(Math.random() * delta + min);
}

/**
 * Create a new sequence of keys to press.
 *
 * @param length Length of sequence
 * @param numKeys Number of available keys
 * @param stepKeys Max keys to press at once in a step (0, `numKeys`]
 */
export function createSequence(
  length: number,
  numKeys: number,
  stepKeys: number
): Sequence {
  const sequence: Sequence = [];

  for (let i = 0; i < length; i++) {
    const step: Step = [];
    const stepLength = randomRange(1, stepKeys);
    for (let k = 0; k < stepLength; k++) {
      step[k] = randomRange(0, numKeys);
    }
    sequence.push(step);
  }

  return sequence;
}
