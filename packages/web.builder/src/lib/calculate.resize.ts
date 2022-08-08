import { DroppedElement, Size } from '../types';
import { isPointingLeft, isPointingUp } from '../drop.item/direction.guide';

import { DIRECTION } from '../drop.item/directions';
import { getPosition } from './get.position';

type Param = {
  cellSize: number;
  direction: DIRECTION;
  element: DroppedElement;
  nextSize: Size;
};

export function calculateResize({
  direction,
  cellSize,
  element,
  nextSize,
}: Param): DroppedElement {
  const nextElement = { ...element };
  const nextXSpan = getPosition(nextSize.width, cellSize);
  const nextYSpan = getPosition(nextSize.height, cellSize);

  if (isPointingLeft(direction)) {
    nextElement.x = Math.max(1, element.x - (nextXSpan - element.xSpan));
  }

  if (isPointingUp(direction)) {
    nextElement.y = Math.max(1, element.y - (nextYSpan - element.ySpan));
  }

  nextElement.xSpan = nextXSpan;
  nextElement.ySpan = nextYSpan;

  return nextElement;
}
