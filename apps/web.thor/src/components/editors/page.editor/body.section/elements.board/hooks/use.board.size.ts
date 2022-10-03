import * as React from 'react';

import { ScreenSize } from '../../../constants';
import { mergeRefs } from 'react-merge-refs';
import { useColumnsCount } from '../../../hooks/use.columns.count';
import useResizeObserver from '@react-hook/resize-observer';
import { useSectionStore } from '../../scope.provider';

/**
 * It sets a ref on the container element, and uses a resize observer to adjust the cell size when the
 * container is resized
 */
export function useBoardSize() {
  const store = useSectionStore();
  const hasContainer = React.useRef(false);
  const container = store.useSelect((state) => state.container);
  const columnsCount = useColumnsCount();

  const handleAdjustment = React.useCallback(
    (width: number) => {
      if (width === 0) {
        return;
      }

      const root = store.getState();
      const cellSize = root.cellSize;
      const columnGap = root.config.columnGap;
      const gridWidth = Math.min(width, ScreenSize.DESKTOP);
      const nextCellSize = gridWidth / columnsCount - columnGap;
      if (cellSize !== nextCellSize) {
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

  useResizeObserver(container, (entry) =>
    handleAdjustment(entry.target.clientWidth),
  );

  React.useEffect(() => {
    if (container) {
      handleAdjustment(container.clientWidth);
    }
  }, [container, handleAdjustment]);

  return mergeRefs([_setContainer]);
}
