import * as React from 'react';

import type {
  DroppedPosition,
  XYCoord,
} from '@app/components/page.editor/types';
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
      const x = element.x + deltaX;
      const y = element.y + deltaY;
      return {
        ...element,
        x,
        y,
      };
    },
    [cellSize, clampX, clampY],
  );
}
