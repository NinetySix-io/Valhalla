import * as React from 'react';

import { mergeRefs } from 'react-merge-refs';
import useResizeObserver from 'use-resize-observer';
import { useSectionStore } from '../../scope.provider';

/**
 * It sets a ref on the container element, and uses a resize observer to adjust the cell size when the
 * container is resized
 */
export function useBoardSize() {
  const store = useSectionStore();
  const hasContainer = React.useRef(false);
  const container = store.useSelect((state) => state.container);
  const columnsCount = store.useSelect((state) => state.config.columnsCount);

  const handleAdjustment = React.useCallback(
    (width: number) => {
      const nextCellSize = width / columnsCount;
      if (store.getState().cellSize !== nextCellSize) {
        store.actions.setCellSize(nextCellSize);
      }
    },
    [columnsCount, store],
  );

  const _setContainer = (containerElement: HTMLDivElement) => {
    if (containerElement && !hasContainer.current) {
      hasContainer.current = true;
      store.actions.setContainer(containerElement);
    }
  };

  const { ref: observerRef } = useResizeObserver({
    onResize: (size) => {
      requestAnimationFrame(() => handleAdjustment(size.width));
    },
  });

  React.useEffect(() => {
    if (container) {
      handleAdjustment(container.clientWidth);
    }
  }, [container, handleAdjustment]);

  return mergeRefs([_setContainer, observerRef]);
}
