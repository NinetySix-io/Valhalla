import { useCellClamp } from './use.cell.clamp';
import { useSectionEmitter } from './use.section.emitter';
import { useSectionStore } from '../../scope.provider';

export function useDragOverflow() {
  const cellClamp = useCellClamp(Infinity);
  const store = useSectionStore();
  const emitter = useSectionEmitter();
  const rowsCount = store.useSelect((state) => state.config.rowsCount);
}
