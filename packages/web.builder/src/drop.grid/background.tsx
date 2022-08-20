import * as React from 'react';

import { css, styled } from '@mui/material';
import { gridVisibleAtom, useScopeAtomValue } from '../context';

import { makeFilterProps } from '@valhalla/web.react';

const Container = styled(
  'div',
  makeFilterProps(['isVisible']),
)<{ isVisible: boolean }>(
  ({ theme, isVisible }) => css`
    --bg-pos: (var(--cs) + var(--pt-w));
    --bg-color: ${theme.palette.grey[600]};
    opacity: ${isVisible ? 0.5 : 0};
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    background: radial-gradient(var(--bg-color) var(--pt-w), transparent 3px),
      radial-gradient(var(--bg-color) var(--pt-w), transparent 3px), #fff;
    background-position: calc(var(--bg-pos)) calc(var(--bg-pos));
    background-size: var(--cs) var(--cs);
    transition: ${theme.transitions.create(['all'], {
      duration: theme.transitions.duration.shortest,
    })};
  `,
);

export const Background: React.FC = () => {
  const isVisible = useScopeAtomValue(gridVisibleAtom);
  return <Container isVisible={isVisible} />;
};
