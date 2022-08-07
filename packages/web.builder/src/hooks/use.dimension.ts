import * as React from 'react';

import { cellSizeAtom, containerAtom, useScopeAtomMutate } from '../context';

import { mergeRefs } from 'react-merge-refs';
import useResizeObserver from 'use-resize-observer';

export function useDropDimension(columnsCount: number) {
  const hasContainer = React.useRef(false);
  const _setContainer = useScopeAtomMutate(containerAtom);
  const setCellSize = useScopeAtomMutate(cellSizeAtom);

  const handleAdjustment = (width: number) => {
    React.startTransition(() => {
      setCellSize(width / columnsCount);
    });
  };

  const setContainer = (containerElement: HTMLDivElement) => {
    if (containerElement && !hasContainer.current) {
      hasContainer.current = true;
      _setContainer(containerElement);
      handleAdjustment(containerElement.clientWidth);
    }
  };

  const { ref: observerRef } = useResizeObserver({
    onResize: (size) => {
      handleAdjustment(size.width);
    },
  });

  return mergeRefs([setContainer, observerRef]);
}
