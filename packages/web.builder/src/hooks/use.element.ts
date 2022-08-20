import * as React from 'react';

import { cellSizeAtom, containerAtom, useScopeAtomValue } from '../context';

import type { DroppedElement } from '../types';

export type GridAreaElement = Pick<
  DroppedElement,
  'x' | 'y' | 'xSpan' | 'ySpan'
>;

/**
 * It takes a grid area element and returns a string that can be used as the `grid-area` CSS property
 * @param {GridAreaElement} element - The element that we want to calculate the grid area for.
 * @returns A string that represents the grid area.
 */
export function useElementGridArea(element: GridAreaElement) {
  const container = useScopeAtomValue(containerAtom);
  const cellSize = useScopeAtomValue(cellSizeAtom);
  const [gridArea, setGridArea] = React.useState<string>();

  React.useEffect(() => {
    if (!container || !element) {
      return;
    }

    setGridArea(
      [
        element.y,
        element.x,
        element.y + element.ySpan,
        element.x + element.xSpan,
      ]
        // grid starts at index 1, not 0
        .map((pos) => pos + 1)
        .join(' / '),
    );
  }, [element, cellSize, container]);

  return gridArea;
}
