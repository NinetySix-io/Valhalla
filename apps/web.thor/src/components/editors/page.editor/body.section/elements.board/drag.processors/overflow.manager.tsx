import * as React from 'react';

import { getMaxBBox } from '../lib/get.max.bbox';
import { useSectionEmitter } from '../hooks/use.section.emitter';
import { useSectionStore } from '../../scope.provider';

export const OverflowManager: React.FC = () => {
  const store = useSectionStore();
  const emitter = useSectionEmitter();
  const dragging = store.useSelect((state) => state.dragging);
  const elements = store.useSelect((state) => state.elements);
  const original = React.useRef<number>();

  React.useEffect(() => {
    if (dragging && !original.current) {
      original.current = store.getState().config.rowsCount;
    } else if (!dragging) {
      const root = store.getState();
      if (original.current && original.current !== root.config.rowsCount) {
        emitter.client.emit('updateRowsCount', root.config.rowsCount);
      }

      original.current = null;
    }
  }, [dragging, store, emitter]);

  /**
   * Readjust board rows on active dragging
   */
  React.useEffect(() => {
    if (!dragging) {
      return;
    }

    const elementBottomY = dragging.y + dragging.ySpan;
    if (elementBottomY > original.current) {
      store.actions.setConfig({
        ...store.getState().config,
        rowsCount: elementBottomY,
      });
    }
  }, [dragging, emitter, store]);

  /**
   * Readjust board rows on board updates
   */
  React.useEffect(() => {
    const rowsCount = store.getState().config?.rowsCount;
    const bbox = getMaxBBox(Object.values(elements));
    const minRowsCount = bbox.ySpan + bbox.y;
    if (minRowsCount > rowsCount) {
      // there is something strange here
      setTimeout(() => {
        emitter.client.emit('updateRowsCount', minRowsCount);
      }, 100);
    }
  }, [elements, emitter.client, store]);

  return null;
};
