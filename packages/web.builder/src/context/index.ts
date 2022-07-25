import * as React from 'react';

export const DropDimensionCtx = React.createContext<{
  cellSize?: number;
  container?: HTMLDivElement;
}>({});

export function useCellSize() {
  return React.useContext(DropDimensionCtx).cellSize ?? 0;
}

export function useDropContainer() {
  return React.useContext(DropDimensionCtx).container;
}
