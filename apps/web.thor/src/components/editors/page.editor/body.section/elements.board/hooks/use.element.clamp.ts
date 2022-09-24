import * as React from 'react';

import type {
  DroppedPosition,
  XYCoord,
} from '@app/components/editors/page.editor/types';
import { useCellClampX, useCellClampY } from './use.cell.clamp';

import { useSectionStore } from '../../scope.provider';

/**
 * A function that takes in an element and a delta
 * and returns a new element with the new position
 */
export function useClampElement() {
  const store = useSectionStore();
  const cellSize = store.useSelect((state) => state.cellSize);
  const clampX = useCellClampX();
  const clampY = useCellClampY();

  return React.useCallback(
    <T extends DroppedPosition>(element: T, delta: XYCoord): T => {
      const offset = cellSize / 2;
      const deltaX = clampX(delta.x - offset, element.xSpan);
      const deltaY = clampY(delta.y - offset, element.ySpan);
      const nextY = element.y + deltaY;
      const nextX = element.x + deltaX;
      return {
        ...element,
        x: Math.max(nextX, 0),
        y: Math.max(nextY, 0),
      };
    },
    [cellSize, clampX, clampY],
  );
}
