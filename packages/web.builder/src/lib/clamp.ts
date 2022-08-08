/**
 * Given a cell size and a value, return the value rounded to the nearest multiple of the cell size.
 */
export function clamp(value: number, cellSize: number): number {
  const factor = value / cellSize;
  return Math.round(factor) * cellSize;
}
