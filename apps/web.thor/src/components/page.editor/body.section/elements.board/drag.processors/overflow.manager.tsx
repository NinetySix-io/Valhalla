import * as React from 'react';

import { getMaxBBox } from '../lib/get.max.bbox';
import { useSectionEmitter } from '../hooks/use.section.emitter';
import { useSectionStore } from '../../scope.provider';

export const OverflowManager: React.FC = () => {
  const store = useSectionStore();
  const emitter = useSectionEmitter();
  const dragging = store.useSelect((state) => state.dragging);
  const elements = store.useSelect((state) => state.elements);

  /**
   * Readjust board rows on active dragging
   */
  React.useEffect(() => {
    if (!dragging) {
      return;
    }

    const rowsCount = store.getState().config?.rowsCount;
    const elementBottomY = dragging.y + dragging.ySpan;
    if (elementBottomY > rowsCount) {
      emitter.client.emit('updateRowsCount', elementBottomY);
    }
  }, [store, dragging, emitter]);

  /**
   * Readjust board rows on board updates
   */
  React.useEffect(() => {
    const rowsCount = store.getState().config?.rowsCount;
    const bbox = getMaxBBox(Object.values(elements));
    const minRowsCount = bbox.ySpan + bbox.y;
    if (minRowsCount > rowsCount) {
      emitter.client.emit('updateRowsCount', minRowsCount);
    }
  }, [elements, emitter, store]);

  return null;
};
