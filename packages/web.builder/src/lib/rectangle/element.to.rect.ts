import { DroppedElement } from '../../types';
import { Rectangle } from './types';

/**
 * "Given an element and a cell size, return a rectangle that represents the element's position and
 * size."
 */
export function getRectangleFromElement(
  element: DroppedElement,
  cellSize: number,
): Rectangle {
  const left = element.x * cellSize;
  const top = element.y * cellSize;
  const right = element.xSpan * cellSize + left;
  const bottom = element.ySpan * cellSize + top;
  return {
    left,
    top,
    right,
    bottom,
  };
}
