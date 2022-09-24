import { clampCell } from './clamp';

/**
 * Take size value and cellSize then clamp it into position
 */
export function getClampPosition(value: number, cellSize: number): number {
  const clampedValue = clampCell(value, cellSize);
  const norm = clampedValue / cellSize;
  return Math.round(norm);
}
