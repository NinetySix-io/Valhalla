import * as React from 'react';

import { useSectionId, useSectionStore } from '../scope.provider';

import { useColumnsCount } from '../../hooks/use.columns.count';

export const StyleVariables: React.FC = () => {
  const store = useSectionStore();
  const sectionId = useSectionId();
  const cellSize = store.useSelect((state) => state.cellSize);
  const rowsCount = store.useSelect((state) => state.config.rowsCount);
  const columnGap = store.useSelect((state) => state.config.columnGap);
  const rowGap = store.useSelect((state) => state.config.rowGap);
  const columnsCount = useColumnsCount();

  return (
    <style>{`.section-${sectionId} {
      --cs: ${cellSize}px;
      --pt-w: ${1.5}px;
      --r-count: ${rowsCount};
      --c-count: ${columnsCount - 2};
      --r-gap: ${rowGap}px;
      --c-gap: ${columnGap}px;
    }`}</style>
  );
};
