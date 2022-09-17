import type { DroppedElement, Size } from '../../../types';
import { isLeft, isUp } from './directions';

import type { DIRECTION } from './directions';
import { getClampPosition } from './get.clamp.position';

type Param = {
  cellSize: number;
  direction: DIRECTION;
  element: DroppedElement;
  nextSize: Size;
};

/**
 * It takes a direction, a cell size, an element, and a next size, and returns a new element with the
 * new size and position
 */
export function calculateResize({
  direction,
  cellSize,
  element,
  nextSize,
}: Param): DroppedElement {
  const nextElement = { ...element };
  const nextXSpan = getClampPosition(nextSize.width, cellSize);
  const nextYSpan = getClampPosition(nextSize.height, cellSize);

  if (isLeft(direction)) {
    nextElement.x = Math.max(1, element.x - (nextXSpan - element.xSpan));
  }

  if (isUp(direction)) {
    nextElement.y = Math.max(1, element.y - (nextYSpan - element.ySpan));
  }

  nextElement.xSpan = nextXSpan;
  nextElement.ySpan = nextYSpan;

  return nextElement;
}
