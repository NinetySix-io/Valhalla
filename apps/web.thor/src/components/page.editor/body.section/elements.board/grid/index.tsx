import * as React from 'react';

import { css, styled } from '@mui/material';

import { Background } from './background';
import type { cProps } from '@valhalla/web.react';
import { makeFilterProps } from '@valhalla/web.react';
import { useSectionStore } from '../../scope.provider';

const Container = styled(
  'div',
  makeFilterProps(['cellSize', 'rowsCount', 'columnsCount', 'patternSize']),
)<{
  cellSize: number;
  rowsCount: number;
  columnsCount: number;
  patternSize: number;
}>(
  ({ cellSize, rowsCount, columnsCount, patternSize }) => css`
    --cs: ${cellSize}px;
    --pt-w: ${patternSize}px;
    --r-count: ${rowsCount};
    --c-count: ${columnsCount};
    position: relative;
    display: grid;
    height: calc(var(--cs) * var(--r-count));
    grid-template-rows: repeat(var(--r-count), var(--cs));
    grid-template-columns: repeat(var(--c-count), var(--cs));
  `,
);

export const ElementsBoardGrid = React.forwardRef<
  HTMLDivElement,
  cProps<React.PropsWithChildren>
>(({ children, ...props }, ref) => {
  const store = useSectionStore();
  const cellSize = store.useSelect((state) => state.cellSize);
  const config = store.useSelect((state) => state.config);

  return (
    <Container
      {...props}
      ref={ref}
      cellSize={cellSize}
      columnsCount={config?.columnsCount}
      rowsCount={config?.rowsCount}
      patternSize={1.5}
    >
      <Background />
      {children}
    </Container>
  );
});

ElementsBoardGrid.displayName = 'ElementsBoardGrid';
