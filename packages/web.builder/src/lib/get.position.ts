import { clampCell } from './clamp';

/**
 * Take size value and cellSize then clamp it into position
 *
 * @param value width or height
 * @param cellSize
 */
export function getPosition(value: number, cellSize: number): number {
  if (!value) {
    return 1;
  }

  const clampedValue = clampCell(value, cellSize);
  const norm = clampedValue / cellSize;
  return Math.round(norm) || 1;
}
