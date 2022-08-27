import * as React from 'react';

import { cellSizeAtom, useScopeAtomValue, useZoneContext } from '../context';

import { clamp } from '../lib/clamp';
import { getPosition } from '../lib/get.position';

/**
 * It takes a maximum value and returns a function that takes a position and span and returns a clamped
 * position
 */
export function useCellClamp(max: number) {
  const cellSize = useScopeAtomValue(cellSizeAtom);
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
  return useCellClamp(useZoneContext().columnsCount);
}

export function useCellClampY() {
  return useCellClamp(useZoneContext().rowsCount);
}
