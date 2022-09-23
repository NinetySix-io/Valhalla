import * as React from 'react';

import { css, styled } from '@mui/material';

import { getGridArea } from '../lib/get.grid.area';
import { makeFilterProps } from '@valhalla/web.react';
import { useSectionStore } from '../../scope.provider';

const Container = styled(
  'div',
  makeFilterProps(['gridArea']),
)<{
  gridArea: string;
}>(
  ({ theme, gridArea }) => css`
    transition: all 0.2s;
    border: solid 3px transparent;
    margin-left: calc(var(--pt-w) * 0.5);
    margin-right: calc(var(--pt-w) / -1);
    margin-bottom: calc(var(--pt-w) * -2);

    ${gridArea
      ? css`
          z-index: 1;
          grid-area: ${gridArea};
          border-color: ${theme.palette.primary.main};
        `
      : css`
          display: none;
        `}
  `,
);

export const SelectionFollower: React.FC = () => {
  const store = useSectionStore();
  const gridArea = store.useSelect(
    (state) => state.dragging && getGridArea(state.dragging),
  );

  return <Container gridArea={gridArea} />;
};
