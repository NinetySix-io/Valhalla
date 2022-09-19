import { useCellClamp } from './use.cell.clamp';
import { useDragMonitorOffset } from './use.drag.monitor';
import { useSectionEmitter } from './use.section.emitter';
import { useSectionStore } from '../../scope.provider';

export function useDragOverflow() {
  const cellClamp = useCellClamp(Infinity);
  const store = useSectionStore();
  const emitter = useSectionEmitter();
  const rowsCount = store.useSelect((state) => state.config.rowsCount);

  useDragMonitorOffset((monitor) => {
    const offset = monitor.getSourceClientOffset();
    if (!offset) {
      return;
    }

    const nextRows = cellClamp(offset.y, 0);
    if (nextRows > rowsCount) {
      emitter.client.emit('updateRowsCount', nextRows);
    }
  });
}
