import * as React from 'react';

import type { DroppedElement, DroppedPosition } from '../types';
import { cellSizeAtom, containerAtom, useScopeAtomValue } from '../context';

/**
 * It takes a DroppedElement and returns a string that represents the grid area that the element should
 * be placed in
 * @param {DroppedElement} element - DroppedElement
 * @returns A string of the grid area of the element.
 */
export function getElementGridArea(element: DroppedPosition) {
  return (
    [element.y, element.x, element.y + element.ySpan, element.x + element.xSpan]
      // grid starts at index 1, not 0
      .map((pos) => pos + 1)
      .join(' / ')
  );
}

/**
 * It takes a grid area element and returns a string that can be used as the `grid-area` CSS property
 */
export function useElementGridArea(element: DroppedElement) {
  const container = useScopeAtomValue(containerAtom);
  const cellSize = useScopeAtomValue(cellSizeAtom);
  const [gridArea, setGridArea] = React.useState<string>();

  React.useEffect(() => {
    if (!container || !element) {
      return;
    }

    setGridArea(getElementGridArea(element));
  }, [element, cellSize, container]);

  return gridArea;
}
