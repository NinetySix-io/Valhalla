import type { DroppedPosition } from '@app/components/page.editor/types';

/**
 * It takes a DroppedElement and returns a string that represents the grid area that the element should
 * be placed in
 */
export function getGridArea(element: DroppedPosition) {
  return (
    [element.y, element.x, element.y + element.ySpan, element.x + element.xSpan]
      // grid starts at index 1, not 0
      .map((pos) => pos + 1)
      .join(' / ')
  );
}
