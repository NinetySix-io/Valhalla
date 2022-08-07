import * as React from 'react';

import { cellSizeAtom, containerAtom, useScopeAtomValue } from '../context';

import { DroppedItem } from '../types';

export type GridAreaElement = Pick<
  DroppedItem,
  'topLeftX' | 'topLeftY' | 'widthPct' | 'heightPct'
>;

/**
 * It takes a number and a percentage, and returns the value of the percentage of the number
 * @param {number} target - The total size of the scrollable element
 * @param {number} pct - The percentage of the target value you want to get.
 * @returns The percentage of the target.
 */
function getValueFromPct(target: number, pct: number) {
  return (pct / 100) * target;
}

/**
 * It takes two arrays of two numbers each, and returns a string that can be used as a CSS grid-area
 * value
 * @param start - [number, number]
 * @param end - [number, number]
 * @returns A string that represents the grid area.
 */
function getGridAreaStr(start: [number, number], end: [number, number]) {
  return [start[1], start[0], end[1], end[0]].join(' / ');
}

/**
 * It takes a grid area element and returns a string that can be used as the `grid-area` CSS property
 * @param {GridAreaElement} element - The element that we want to calculate the grid area for.
 * @returns A string that represents the grid area.
 */
export function useGridArea(element: GridAreaElement) {
  const container = useScopeAtomValue(containerAtom);
  const cellSize = useScopeAtomValue(cellSizeAtom);
  const [gridArea, setGridArea] = React.useState<string>();

  React.useEffect(() => {
    if (!container || !element) {
      return;
    }

    const spanX = getValueFromPct(container.clientWidth, element.widthPct);
    const spanY = getValueFromPct(container.clientHeight, element.heightPct);
    const xStart = Math.ceil(element.topLeftX / cellSize) || 1;
    const yStart = Math.ceil(element.topLeftY / cellSize) || 1;
    const xEnd = xStart + Math.floor(spanX / cellSize);
    const yEnd = yStart + Math.floor(spanY / cellSize);
    setGridArea(getGridAreaStr([xStart, yStart], [xEnd, yEnd]));
  }, [element, cellSize, container]);

  return gridArea;
}
