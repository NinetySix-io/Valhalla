/**
 * Given a cell size and a value, return the value rounded to the nearest multiple of the cell size.
 */
export function clampCell(value: number, cellSize: number): number {
  const factor = value / cellSize;
  return Math.ceil(factor) * cellSize;
}

/**
 * Clamp within range
 */
export function clamp(value: number, range: [number, number]) {
  const [floor, ceil] = range;
  if (value < floor) {
    return floor;
  } else if (value > ceil) {
    return ceil;
  }

  return value;
}
