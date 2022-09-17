import * as React from 'react';

import { clamp } from '../lib/clamp';
import { getClampPosition } from '../lib/get.clamp.position';
import { useSectionStore } from '../../scope.provider';

/**
 * It takes a maximum value and returns a function that takes a position and span and returns a clamped
 * position
 */
export function useCellClamp(max: number) {
  const store = useSectionStore();
  const cellSize = store.useSelect((state) => state.cellSize);

  return React.useCallback(
    (position: number, span: number) => {
      const floor = 0;
      const ceil = max - span;
      return clamp(getClampPosition(position, cellSize), [floor, ceil]);
    },
    [max, cellSize],
  );
}

export function useCellClampX() {
  const store = useSectionStore();
  const columnsCount = store.useSelect((state) => state.config.columnsCount);
  return useCellClamp(columnsCount);
}

export function useCellClampY() {
  const store = useSectionStore();
  const rowsCount = store.useSelect((state) => state.config.rowsCount);
  return useCellClamp(rowsCount);
}
