import * as React from 'react';

import type { DroppedElement, DroppedPosition } from '../types';

import { useStore } from '../context/scope.provider';

/**
 * It takes a DroppedElement and returns a string that represents the grid area that the element should
 * be placed in
 * @param {DroppedElement} element - DroppedElement
 * @returns A string of the grid area of the element.
 */
export function getGridArea(element: DroppedPosition) {
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
  const store = useStore();
  const container = store.useSelect((state) => state.containerElement);
  const cellSize = store.useSelect((state) => state.cellSize);
  const [gridArea, setGridArea] = React.useState<string>();

  React.useEffect(() => {
    if (!container || !element) {
      return;
    }

    setGridArea(getGridArea(element));
  }, [element, cellSize, container]);

  return gridArea;
}
