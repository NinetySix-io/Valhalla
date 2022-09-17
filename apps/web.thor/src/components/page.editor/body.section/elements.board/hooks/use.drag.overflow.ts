import { Emitter } from '../emitter';
import { useCellClamp } from './use.cell.clamp';
import { useDragMonitorOffset } from './use.drag.monitor';
import { useSectionStore } from '../../scope.provider';

export function useDragOverflow() {
  const cellClamp = useCellClamp(Infinity);
  const store = useSectionStore();
  const rowsCount = store.useSelect((state) => state.config.rowsCount);

  useDragMonitorOffset((monitor) => {
    const offset = monitor.getSourceClientOffset();
    if (!offset) {
      return;
    }

    const nextRows = cellClamp(offset.y, 0);
    if (nextRows > rowsCount) {
      Emitter.emit('updateRowsCount', nextRows);
    }
  });
}
