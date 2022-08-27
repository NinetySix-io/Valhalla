import { DroppedPosition } from '../types';
import { isEmpty } from '@valhalla/utilities';

/**
 * It returns the largest rectangle that contains all the elements
 */
export function getMaxBBox(
  elements: DroppedPosition[],
): DroppedPosition | null {
  if (isEmpty(elements)) {
    return null;
  }

  let leftestElement = elements[0];
  let rightestElement = elements[0];
  let highestElement = elements[0];
  let lowestElement = elements[0];

  for (const element of elements) {
    if (element.x < leftestElement.x) {
      leftestElement = element;
    }

    if (element.y < highestElement.y) {
      highestElement = element;
    }

    if (element.x + element.xSpan > rightestElement.x + rightestElement.xSpan) {
      rightestElement = element;
    }

    if (element.y + element.ySpan > lowestElement.y + lowestElement.ySpan) {
      lowestElement = element;
    }
  }

  return {
    x: leftestElement.x,
    y: highestElement.y,
    xSpan: rightestElement.x + rightestElement.xSpan - leftestElement.x,
    ySpan: lowestElement.y + lowestElement.ySpan - highestElement.y,
  };
}
