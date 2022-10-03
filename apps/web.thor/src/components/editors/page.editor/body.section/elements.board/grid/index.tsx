import * as React from 'react';

import { css, styled } from '@mui/material';

import { Background } from './background';
import { CenterLine } from './center.line';
import type { cProps } from '@valhalla/web.react';
import { makeFilterProps } from '@valhalla/web.react';

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
)(
  () => css`
    position: relative;
    display: grid;
    grid-template-rows: repeat(var(--r-count), var(--cs));
    grid-template-columns: 1fr repeat(var(--c-count), var(--cs)) 1fr;
    grid-column-gap: var(--c-gap);
    grid-row-gap: var(--r-gap);
    padding: 20px 0;
  `,
);

export const ElementsBoardGrid = React.forwardRef<
  HTMLDivElement,
  cProps<React.PropsWithChildren>
>(({ children, ...props }, ref) => {
  return (
    <Container {...props} ref={ref}>
      <Background />
      <CenterLine />
      {children}
    </Container>
  );
});

ElementsBoardGrid.displayName = 'ElementsBoardGrid';
