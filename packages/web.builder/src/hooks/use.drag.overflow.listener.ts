import { builderEvents } from '../lib/events';
import { useCellClamp } from './use.cell.clamp';
import { useColumnsCount } from '../context/scope.provider';
import { useDragMonitorOffset } from './use.drag.monitor';

/**
 * "When the user drags a cell, if the mouse is over the bottom of the grid, then increase the number
 * of rows in the grid."
 *
 * The first thing we do is get the `cellClamp` function from the `useCellClamp` hook. This function
 * takes a number and returns a number. The number it returns is the number of rows that the mouse is
 * over
 */
export function useDragOverflowListener() {
  const cellClamp = useCellClamp(Infinity);
  const rowsCount = useColumnsCount();

  useDragMonitorOffset((monitor) => {
    const offset = monitor.getSourceClientOffset();
    if (offset) {
      const nextRows = cellClamp(offset.y, 0);
      if (nextRows > rowsCount) {
        builderEvents.emit('gridRowsUpdate', nextRows);
      }
    }
  });
}
