import * as React from 'react';

import { css, styled } from '@mui/material';

import { Background } from './background';
import { makeFilterProps } from '@valhalla/web.react';
import { mergeRefs } from 'react-merge-refs';
import { useCellSize } from '../context';

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
  rowsCount: number;
  columnsCount: number;
  color?: React.CSSProperties['color'];
  dotWidth?: number;
};

export const DropGrid = React.forwardRef<HTMLDivElement, Props>(
  (
    { style, rowsCount, columnsCount, children, dotWidth = 3, ...props },
    ref,
  ) => {
    const cellSize = useCellSize();
    const container = React.useRef<HTMLDivElement>();

    return (
      <Container
        {...props}
        style={style}
        rowsCount={rowsCount}
        columnsCount={columnsCount}
        patternSize={dotWidth}
        cellSize={cellSize}
        ref={mergeRefs([container, ref])}
      >
        <Background />
        {children}
      </Container>
    );
  },
);

DropGrid.displayName = 'DropGrid';
