import * as React from 'react';

import { css, styled } from '@mui/material';

import { Background } from './background';
import { CenterLine } from './center.line';
import type { cProps } from '@valhalla/web.react';
import { makeFilterProps } from '@valhalla/web.react';
import { useColumnsCount } from '../../../hooks/use.columns.count';
import { useSectionStore } from '../../scope.provider';

const Container = styled(
  'div',
  makeFilterProps([
    'cellSize',
    'rowsCount',
    'columnsCount',
    'patternSize',
    'rowGap',
    'columnGap',
  ]),
)<{
  cellSize: number;
  rowsCount: number;
  columnsCount: number;
  patternSize: number;
  rowGap: number;
  columnGap: number;
}>(
  ({
    cellSize,
    rowsCount,
    columnsCount,
    patternSize,
    rowGap,
    columnGap,
  }) => css`
    --cs: ${cellSize}px;
    --pt-w: ${patternSize}px;
    --r-count: ${rowsCount};
    --c-count: ${columnsCount - 2};
    position: relative;
    display: grid;
    height: calc(var(--cs) * var(--r-count));
    grid-template-rows: repeat(var(--r-count), var(--cs));
    grid-template-columns: 1fr repeat(var(--c-count), var(--cs)) 1fr;
    grid-column-gap: ${columnGap}px;
    grid-row-gap: ${rowGap}px;
  `,
);

export const ElementsBoardGrid = React.forwardRef<
  HTMLDivElement,
  cProps<React.PropsWithChildren>
>(({ children, ...props }, ref) => {
  const store = useSectionStore();
  const cellSize = store.useSelect((state) => state.cellSize);
  const rowsCount = store.useSelect((state) => state.config.rowsCount);
  const columnGap = store.useSelect((state) => state.config.columnGap);
  const rowGap = store.useSelect((state) => state.config.rowGap);
  const columnsCount = useColumnsCount();

  return (
    <Container
      {...props}
      ref={ref}
      rowGap={rowGap}
      columnGap={columnGap}
      cellSize={cellSize}
      columnsCount={columnsCount}
      rowsCount={rowsCount}
      patternSize={1.5}
    >
      <Background />
      <CenterLine />
      {children}
    </Container>
  );
});

ElementsBoardGrid.displayName = 'ElementsBoardGrid';
