import * as React from 'react';

import { css, styled } from '@mui/material';

import { Background } from './background';
import { makeFilterProps } from '@valhalla/web.react';
import { useScope } from '../context/scope.provider';

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
    height: calc(var(--cs) * ${rowsCount});
    position: relative;
    display: grid;
    grid-template-rows: repeat(${rowsCount}, var(--cs));
    grid-template-columns: repeat(${columnsCount}, var(--cs));
  `,
);

type Props = React.PropsWithoutRef<JSX.IntrinsicElements['div']> & {
  color?: React.CSSProperties['color'];
  dotWidth?: number;
};

export const DropGrid = React.forwardRef<HTMLDivElement, Props>(
  ({ style, children, dotWidth = 1, ...props }, ref) => {
    const scope = useScope();
    const store = scope.store;
    const cellSize = store.useSelect((state) => state.cellSize);

    return (
      <Container
        {...props}
        style={style}
        rowsCount={scope.rowsCount}
        columnsCount={scope.columnsCount}
        patternSize={dotWidth}
        cellSize={cellSize}
        ref={ref}
      >
        <Background />
        {children}
      </Container>
    );
  },
);

DropGrid.displayName = 'DropGrid';
