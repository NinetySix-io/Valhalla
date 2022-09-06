import * as React from 'react';

import {
  useColumnsCount,
  useRowsCount,
  useStore,
} from '../context/scope.provider';

import { clamp } from '../lib/clamp';
import { getPosition } from '../lib/get.position';

/**
 * It takes a maximum value and returns a function that takes a position and span and returns a clamped
 * position
 */
export function useCellClamp(max: number) {
  const store = useStore();
  const cellSize = store.useSelect((state) => state.cellSize);

  return React.useCallback(
    (position: number, span: number) => {
      const floor = 0;
      const ceil = max - span;
      return clamp(getPosition(position, cellSize), [floor, ceil]);
    },
    [max, cellSize],
  );
}

export function useCellClampX() {
  const columnsCount = useColumnsCount();
  return useCellClamp(columnsCount);
}

export function useCellClampY() {
  const rowsCount = useRowsCount();
  return useCellClamp(rowsCount);
}
