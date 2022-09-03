import * as React from 'react';

import { css, styled } from '@mui/material';
import { gridVisibleAtom, useScopeAtomValue } from '../context';

import { makeFilterProps } from '@valhalla/web.react';

const Container = styled(
  'div',
  makeFilterProps(['isVisible']),
)<{ isVisible: boolean }>(
  ({ theme, isVisible }) => css`
    --bg-pos: calc((var(--cs) / 2) + var(--pt-w));
    --bg-color: ${theme.palette.grey[400]};
    opacity: ${isVisible ? 0.5 : 0};
    width: calc(100% - var(--cs) - var(--pt-w) / 2);
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

const Divider = styled(
  'div',
  makeFilterProps(['isVisible']),
)<{ isVisible: boolean }>(
  ({ theme, isVisible }) => css`
    opacity: ${isVisible ? 0.4 : 0};
    position: absolute;
    z-index: -1;
    border: dashed 1px ${theme.palette.primary.main};
    left: calc(50% + (var(--pt-w) / 3));
    height: 100%;
    top: 0px;
    bottom: 0px;
  `,
);

export const Background: React.FC = () => {
  const isVisible = useScopeAtomValue(gridVisibleAtom);
  return (
    <React.Fragment>
      <Container isVisible={isVisible} />
      <Divider isVisible={isVisible} />
    </React.Fragment>
  );
};
