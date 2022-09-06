import * as React from 'react';

import { css, styled } from '@mui/material';
import { isDown, isLeft, isRight, isUp } from './direction.guide';
import { makeFilterProps, useEvent } from '@valhalla/web.react';

import { DIRECTION } from './directions';
import type { Size } from '../types';
import isNil from 'lodash.isnil';
import { mergeRefs } from 'react-merge-refs';

const Container = styled('div')(
  () => css`
    --pt: 4px;
    --mg: calc(-1 * (var(--pt) / 2));
    --cg: calc(3 * var(--mg));
    --cw: calc(2 * var(--pt));
    height: 100%;
    width: 100%;

    &:hover,
    &:focus {
      > * {
        visibility: visible;
      }
    }
  `,
);

const Corner = styled(
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
    }

    ${direction === DIRECTION.BOTTOM_RIGHT &&
    css`
      cursor: se-resize;
      bottom: var(--cg);
      right: var(--cg);
      border-left: none;
      border-top: none;
    `}

    ${direction === DIRECTION.BOTTOM_LEFT &&
    css`
      cursor: sw-resize;
      bottom: var(--cg);
      left: var(--cg);
      border-right: none;
      border-top: none;
    `}

    ${direction === DIRECTION.TOP_RIGHT &&
    css`
      cursor: ne-resize;
      right: var(--cg);
      top: var(--cg);
      border-left: none;
      border-bottom: none;
    `}


    ${direction === DIRECTION.TOP_LEFT &&
    css`
      cursor: nw-resize;
      left: var(--cg);
      top: var(--cg);
      border-right: none;
      border-bottom: none;
    `}
  `,
);

const HorizontalBar = styled(
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
    visibility: hidden;

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

const VerticalBar = styled(
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
    visibility: visible;

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

type Position = Size & {
  x: number;
  y: number;
};

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  alwaysVisible?: boolean;
  disableResize?: boolean | Array<DIRECTION>;
  children?: React.ReactNode;
  minHeight?: number;
  minWidth?: number;
  maxHeight?: number;
  maxWidth?: number;
  onResizeStart?: (direction: DIRECTION) => void;
  onResizeFinish?: (direction: DIRECTION, value: Size, original: Size) => void;
  onResize?: (direction: DIRECTION, value: Size, original: Size) => void;
};

export const Resizer = React.forwardRef<HTMLDivElement, Props>(
  (
    {
      onResizeFinish,
      onResize,
      onResizeStart,
      disableResize,
      children,
      minHeight = 10,
      minWidth = 10,
      maxWidth,
      maxHeight,
      alwaysVisible,
      style,
      ...props
    },
    ref,
  ) => {
    const container = React.useRef<HTMLDivElement>(null);
    const original = React.useRef<Position>();
    const sizing = React.useRef<Size>();
    const [active, setActive] = React.useState<DIRECTION>();

    function handleResize(clientX: number, clientY: number) {
      const direction = active;
      const { x: oX, y: oY, width: oW, height: oH } = original.current;
      const result: Size = { width: oW, height: oH };

      if (isRight(direction)) {
        result.width = oW + (clientX - oX);
      }

      if (isLeft(direction)) {
        result.width = oX - clientX + oW;
      }

      if (isDown(direction)) {
        result.height = oH + (clientY - oY);
      }

      if (isUp(direction)) {
        result.height = oH - clientY + oY;
      }

      const nextWidth = Math.min(
        Math.max(result.width, minWidth),
        maxWidth ?? Infinity,
      );

      const nextHeight = Math.min(
        Math.max(result.height, minHeight),
        maxHeight ?? Infinity,
      );

      sizing.current = {
        width: nextWidth,
        height: nextHeight,
      };

      onResize?.(direction, sizing.current, original.current);
    }

    function handleMouseMove(event: MouseEvent) {
      if (!isNil(active)) {
        handleResize(event.clientX, event.clientY);
      }
    }

    function markActive(
      direction: DIRECTION,
      event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) {
      event.preventDefault();
      const { clientWidth, clientHeight } = container.current;

      setActive(direction);
      sizing.current = {
        width: clientWidth,
        height: clientHeight,
      };

      original.current = {
        x: event.clientX,
        y: event.clientY,
        width: clientWidth,
        height: clientHeight,
      };

      onResizeStart?.(direction);
    }

    function markInactive() {
      if (sizing.current && onResizeFinish) {
        onResizeFinish(active, sizing.current, original.current);
      }

      original.current = undefined;
      sizing.current = undefined;
      setActive(undefined);
    }

    function getHandler(direction: DIRECTION) {
      const isDisabled =
        disableResize === true ||
        (Array.isArray(disableResize) && disableResize.includes(direction));

      const commonProps: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
      > = {
        key: DIRECTION[direction],
        onMouseDown: (event) => markActive(direction, event),
      };

      if (isDisabled || (Number.isInteger(active) && active !== direction)) {
        return null;
      } else if (
        direction === DIRECTION.TOP ||
        direction === DIRECTION.BOTTOM
      ) {
        return <HorizontalBar {...commonProps} direction={direction} />;
      } else if (
        direction === DIRECTION.LEFT ||
        direction === DIRECTION.RIGHT
      ) {
        return <VerticalBar {...commonProps} direction={direction} />;
      } else {
        return (
          <Corner
            {...commonProps}
            direction={direction}
            isVisible={alwaysVisible || active === direction}
          />
        );
      }
    }

    useEvent(window, 'mouseup', markInactive);
    useEvent(window, 'mousemove', handleMouseMove);

    return (
      <Container {...props} ref={mergeRefs([ref, container])} style={style}>
        {[
          DIRECTION.TOP,
          DIRECTION.BOTTOM,
          DIRECTION.LEFT,
          DIRECTION.RIGHT,
          DIRECTION.TOP_LEFT,
          DIRECTION.TOP_RIGHT,
          DIRECTION.BOTTOM_LEFT,
          DIRECTION.BOTTOM_RIGHT,
        ].map(getHandler)}
        {children}
      </Container>
    );
  },
);

Resizer.displayName = 'Resizer';
