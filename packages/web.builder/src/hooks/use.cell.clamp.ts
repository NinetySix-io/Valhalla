import * as React from 'react';

import { cellSizeAtom, useScopeAtomValue, useZoneContext } from '../context';

import { clamp } from '../lib/clamp';
import { getPosition } from '../lib/get.position';

/**
 * It takes a maximum value and returns a function that takes a position and span and returns a clamped
 * position
 * @param {number} max - The maximum value that the position can be.
 * @returns A function that takes a position and span and returns a clamped position.
 */
function useClamp(max: number) {
  const cellSize = useScopeAtomValue(cellSizeAtom);
  return React.useCallback(
    (position: number, span: number) => {
      const floor = 1;
      const ceil = max - span;
      return clamp(getPosition(position, cellSize), [floor, ceil]);
    },
    [max, cellSize],
  );
}

export function useCellClampX() {
  return useClamp(useZoneContext().columnsCount);
}

export function useCellClampY() {
  return useClamp(useZoneContext().rowsCount);
}
