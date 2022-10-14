import * as React from 'react';

import type {
  PageElement,
  XYCoord,
} from '@app/components/editors/page.editor/types';
import { useCellClampX, useCellClampY } from './use.cell.clamp';

/**
 * A function that takes in an element and a delta
 * and returns a new element with the new position
 */
export function useClampElement() {
  const clampX = useCellClampX();
  const clampY = useCellClampY();

  return React.useCallback(
    <T extends Pick<PageElement, 'desktop'>>(element: T, delta: XYCoord): T => {
      if (!element) {
        return element;
      }

      //TODO: Adjust
      const size = element.desktop;
      const deltaX = clampX(delta.x, size.width);
      const deltaY = clampY(delta.y, size.height);
      const nextY = size.y + deltaY;
      const nextX = size.x + deltaX;

      return {
        ...element,
        desktop: {
          ...element.desktop,
          x: Math.max(nextX, 0),
          y: Math.max(nextY, 0),
        },
      };
    },
    [clampX, clampY],
  );
}
