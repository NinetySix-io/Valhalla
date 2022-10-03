import * as React from 'react';

import { clamp } from '../lib/clamp';
import { getClampPosition } from '../lib/get.clamp.position';
import { useColumnsCount } from '../../../hooks/use.columns.count';
import { useSectionStore } from '../../scope.provider';

/**
 * `cellClamp` clamps a position to a cell size
 * @param params - {
 * @returns A function that takes in a position and returns a clamped position.
 */
export function cellClamp(params: {
  position: number;
  span: number;
  cellSize: number;
  max: number;
}) {
  const ceil = params.max - params.span;
  const pos = getClampPosition(params.position, params.cellSize);
  return clamp(pos, [pos, ceil]);
}

/**
 * It takes a maximum value and returns a function that takes a position and span and returns a clamped
 * position
 */
export function useCellClamp(max: number, offset = 0) {
  const store = useSectionStore();
  const cellSize = store.useSelect((state) => state.cellSize);

  return React.useCallback(
    (position: number, span: number) => {
      return cellClamp({
        max,
        span,
        position,
        cellSize: cellSize + offset,
      });
    },
    [max, cellSize, offset],
  );
}

export function useCellClampX() {
  const store = useSectionStore();
  const columnsCount = useColumnsCount();
  const columnGap = store.useSelect((state) => state.config.columnGap);
  return useCellClamp(columnsCount, columnGap);
}

export function useCellClampY() {
  const store = useSectionStore();
  const rowsCount = store.useSelect((state) => state.config.rowsCount);
  const rowGap = store.useSelect((state) => state.config.rowGap);
  return useCellClamp(rowsCount, rowGap);
}
