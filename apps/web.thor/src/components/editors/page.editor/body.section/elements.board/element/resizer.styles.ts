import { css, styled } from '@mui/material';

import { DIRECTION } from '../lib/directions';
import { makeFilterProps } from '@valhalla/web.react';

export const Container = styled('div')(
  () => css`
    --pt: 4px;
    --mg: calc(-1 * (var(--pt)));
    --cg: calc(var(--mg) * (1 / 2));
    --cw: calc(2 * var(--pt));

    &:hover,
    &:focus {
      > * {
        visibility: visible;
      }
    }
  `,
);

export const VerticalBar = styled(
  'div',
  makeFilterProps(['direction']),
)<{
  direction: DIRECTION.LEFT | DIRECTION.RIGHT;
}>(
  ({ direction }) => css`
    position: absolute;
    user-select: none;
    display: flex;
    top: var(--mg);
    bottom: var(--mg);
    flex-direction: column;
    justify-content: center;
    width: var(--pt);

    ${direction === DIRECTION.LEFT &&
    css`
      left: var(--mg);
      cursor: w-resize;
    `}
    ${direction === DIRECTION.RIGHT &&
    css`
      right: var(--mg);
      cursor: e-resize;
    `}
  `,
);

export const HorizontalBar = styled(
  'div',
  makeFilterProps(['direction']),
)<{ direction: DIRECTION.TOP | DIRECTION.BOTTOM }>(
  ({ direction }) => css`
    position: absolute;
    left: var(--mg);
    right: var(--mg);
    display: flex;
    flex-direction: row;
    justify-content: center;
    user-select: none;
    height: var(--cw);

    ${direction === DIRECTION.TOP &&
    css`
      top: var(--mg);
      cursor: n-resize;
    `}

    ${direction === DIRECTION.BOTTOM &&
    css`
      bottom: var(--mg);
      cursor: s-resize;
    `}
  `,
);

export const Corner = styled(
  'div',
  makeFilterProps(['direction', 'isVisible']),
)<{
  isVisible?: boolean;
  direction:
    | DIRECTION.BOTTOM_LEFT
    | DIRECTION.BOTTOM_RIGHT
    | DIRECTION.TOP_LEFT
    | DIRECTION.TOP_RIGHT;
}>(
  ({ theme, direction, isVisible }) => css`
    --br: 3px;
    height: var(--cw);
    width: var(--cw);
    z-index: 1;
    visibility: ${isVisible ? 'visible' : 'hidden'};
    border: solid 2px ${theme.palette.primary.main};
    position: absolute;
    transition: ${theme.transitions.create(['transform'], {
      duration: theme.transitions.duration.shortest,
    })};

    &:active,
    &:hover {
      transform: scale(3);
      border-radius: 0;
    }

    ${direction === DIRECTION.BOTTOM_RIGHT &&
    css`
      cursor: se-resize;
      bottom: var(--cg);
      right: var(--cg);
      border-left: none;
      border-top: none;
      border-bottom-right-radius: var(--br);
    `}

    ${direction === DIRECTION.BOTTOM_LEFT &&
    css`
      cursor: sw-resize;
      bottom: var(--cg);
      left: var(--cg);
      border-right: none;
      border-top: none;
      border-bottom-left-radius: var(--br);
    `}

    ${direction === DIRECTION.TOP_RIGHT &&
    css`
      cursor: ne-resize;
      right: var(--cg);
      top: var(--cg);
      border-left: none;
      border-bottom: none;
      border-top-right-radius: var(--br);
    `}

    ${direction === DIRECTION.TOP_LEFT &&
    css`
      cursor: nw-resize;
      left: var(--cg);
      top: var(--cg);
      border-right: none;
      border-bottom: none;
      border-top-left-radius: var(--br);
    `}
  `,
);
