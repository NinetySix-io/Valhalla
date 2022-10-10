import type { PageElement, Size } from '../../../types';
import { isLeft, isUp } from './directions';

import type { DIRECTION } from './directions';
import { getClampPosition } from './get.clamp.position';
import produce from 'immer';

type Param = {
  cellSize: number;
  direction: DIRECTION;
  element: PageElement;
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
}: Param): PageElement {
  return produce(element, (draft) => {
    const nWidth = getClampPosition(nextSize.width, cellSize);
    const nHeight = getClampPosition(nextSize.height, cellSize);

    if (isLeft(direction)) {
      draft.desktop.x = Math.max(
        0,
        element.desktop.x - (nWidth - element.desktop.width),
      );
    }

    if (isUp(direction)) {
      draft.desktop.y = Math.max(
        0,
        element.desktop.y - (nHeight - element.desktop.height),
      );
    }

    draft.desktop.width = nWidth;
    draft.desktop.height = nHeight;
  });
}
