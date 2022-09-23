/**
 * "Given a number and a range, return true if the number is in the range, false otherwise."
 */
export function isInRange(value: number, range: [number, number]): boolean {
  return value >= range[0] && value <= range[1];
}
