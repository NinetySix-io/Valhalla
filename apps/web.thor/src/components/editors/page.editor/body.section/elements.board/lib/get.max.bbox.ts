import type { Position } from '../../../types';
import isEmpty from 'lodash.isempty';
import isNil from 'lodash.isnil';

/**
 * It returns the largest rectangle that contains all the elements
 */
export function getMaxBBox(elements: Position[]): Position {
  if (isEmpty(elements) || elements.some((element) => isNil(element))) {
    return {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    };
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

    /* Checking if the element is the rightest element. */
    if (element.x + element.width > rightestElement.x + rightestElement.width) {
      rightestElement = element;
    }

    /* Checking if the element is the lowest element. */
    if (element.y + element.height > lowestElement.y + lowestElement.height) {
      lowestElement = element;
    }
  }

  return {
    x: leftestElement.x,
    y: highestElement.y,
    width: rightestElement.x + rightestElement.width - leftestElement.x,
    height: lowestElement.y + lowestElement.height - highestElement.y,
  };
}
