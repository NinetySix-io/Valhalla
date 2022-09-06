import * as React from 'react';

import { useColumnsCount, useStore } from '../context/scope.provider';

import { mergeRefs } from 'react-merge-refs';
import useResizeObserver from 'use-resize-observer';

/**
 * It sets the container element, and then uses a resize observer to adjust the cell size when the
 * container is resized
 */
export function useDropDimension() {
  const hasContainer = React.useRef(false);
  const store = useStore();
  const columnsCount = useColumnsCount();
  const container = store.useSelect((state) => state.containerElement);

  const handleAdjustment = React.useCallback(
    (width: number) => {
      const nextCellSize = width / columnsCount;
      if (store.getState().cellSize !== nextCellSize) {
        store.actions.cellSize.replace(nextCellSize);
      }
    },
    [columnsCount, store],
  );

  const _setContainer = (containerElement: HTMLDivElement) => {
    if (containerElement && !hasContainer.current) {
      hasContainer.current = true;
      store.actions.containerElement.replace(containerElement);
    }
  };

  const { ref: observerRef } = useResizeObserver({
    onResize: (size) => {
      handleAdjustment(size.width);
    },
  });

  React.useEffect(() => {
    if (container) {
      handleAdjustment(container.clientWidth);
    }
  }, [container, handleAdjustment]);

  return mergeRefs([_setContainer, observerRef]);
}
