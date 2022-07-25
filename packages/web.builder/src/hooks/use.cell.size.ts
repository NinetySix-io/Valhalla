import * as React from 'react';

import { mergeRefs } from 'react-merge-refs';
import { useDebounce } from '@valhalla/web.react/src';
import useResizeObserver from 'use-resize-observer';

export function useDropDimension(columnsCount: number) {
  const container = React.useRef<HTMLDivElement>();
  const [cellSize, setCellSize] = useDebounce(0, 500);

  const handleAdjustment = React.useCallback(
    (width: number) => {
      React.startTransition(() => {
        setCellSize(width / columnsCount);
      });
    },
    [columnsCount, setCellSize],
  );

  React.useEffect(() => {
    if (container.current) {
      handleAdjustment(container.current.clientWidth);
    }
  }, [handleAdjustment]);

  const { ref: observerRef } = useResizeObserver({
    onResize: (size) => {
      handleAdjustment(size.width);
    },
  });

  return {
    ref: mergeRefs([container, observerRef]),
    container: container.current,
    cellSize,
  };
}
