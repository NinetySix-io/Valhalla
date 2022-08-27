import * as React from 'react';

import {
  cellSizeAtom,
  containerAtom,
  useScopeAtom,
  useScopeAtomMutate,
  useZoneContext,
} from '../context';

import { mergeRefs } from 'react-merge-refs';
import useResizeObserver from 'use-resize-observer';

/**
 * It sets the container element, and then uses a resize observer to adjust the cell size when the
 * container is resized
 */
export function useDropDimension() {
  const hasContainer = React.useRef(false);
  const columnsCount = useZoneContext().columnsCount;
  const [container, setContainer] = useScopeAtom(containerAtom);
  const setCellSize = useScopeAtomMutate(cellSizeAtom);

  const handleAdjustment = React.useCallback(
    (width: number) => {
      React.startTransition(() => {
        setCellSize(width / columnsCount);
      });
    },
    [columnsCount, setCellSize],
  );

  const _setContainer = (containerElement: HTMLDivElement) => {
    if (containerElement && !hasContainer.current) {
      hasContainer.current = true;
      setContainer(containerElement);
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
