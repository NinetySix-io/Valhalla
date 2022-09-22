import * as React from 'react';

import { getMaxBBox } from '../lib/get.max.bbox';
import { selectSelectedElements } from './selectors';
import { useCellClamp } from '../hooks/use.cell.clamp';
import { useSectionEmitter } from '../hooks/use.section.emitter';
import { useSectionStore } from '../../scope.provider';

export const OverflowManager: React.FC = () => {
  const cellClamp = useCellClamp(Infinity);
  const store = useSectionStore();
  const emitter = useSectionEmitter();
  const delta = store.useSelect((state) => state.selectionDelta);
  const elements = store.useSelect((state) => state.elements);

  React.useEffect(() => {
    if (!delta) {
      return;
    }

    const rowsCount = store.getState().config?.rowsCount;
    const selectedElements = selectSelectedElements(store.getState());
    const bbox = getMaxBBox(selectedElements);
    const overflow = cellClamp(delta.y, bbox.ySpan);
    const candidate = overflow + bbox.y + bbox.ySpan;
    const nextRowsCount = Math.max(rowsCount, candidate);
    if (nextRowsCount > rowsCount) {
      emitter.client.emit('updateRowsCount', nextRowsCount);
    }
  }, [delta, emitter, cellClamp, store]);

  React.useEffect(() => {
    const rowsCount = store.getState().config?.rowsCount;
    const bbox = getMaxBBox(Object.values(elements));
    const nextRowsCount = bbox.ySpan + bbox.y;
    if (bbox.ySpan + bbox.y > rowsCount) {
      emitter.client.emit('updateRowsCount', nextRowsCount);
    }
  }, [elements, emitter, store]);

  return null;
};
