import * as React from 'react';

import { css, styled } from '@mui/material';

import isNil from 'lodash.isnil';
import { makeFilterProps } from '@valhalla/web.react';
import { useSectionStore } from '../../scope.provider';

const Container = styled(
  'div',
  makeFilterProps(['isVisible']),
)<{ isVisible: boolean }>(
  ({ theme, isVisible }) => css`
    --bg-pos: calc((var(--cs) / 2) + var(--pt-w));
    --bg-color: ${theme.palette.grey[400]};

    opacity: ${isVisible ? 0.5 : 0};
    width: 100%;
    height: 100%;
    transition: all 0.2s;
    transition-timing-function: ease;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    border-right: solid thin var(--bg-color);
    border-bottom: solid thin var(--bg-color);
    background-image: linear-gradient(
        var(--bg-color) var(--pt-w),
        transparent 1px
      ),
      linear-gradient(to right, var(--bg-color) var(--pt-w), transparent 1px);
    background-size: var(--cs) var(--cs);
  `,
);

export const Background: React.FC = () => {
  const store = useSectionStore();
  const isVisible = store.useSelect(
    (state) => !isNil(state.dragging || state.resizing),
  );

  return <Container isVisible={isVisible} />;
};
