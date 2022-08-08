import * as React from 'react';

import { cProps, makeFilterProps, useEvent } from '@valhalla/web.react';
import { css, styled } from '@mui/material';
import {
  isPointingDown,
  isPointingLeft,
  isPointingRight,
  isPointingUp,
} from './direction.guide';

import { DIRECTION } from './directions';
import { Size } from '../types';
import { isNil } from '@valhalla/utilities';

const Container = styled('div')(
  () => css`
    --pt: 4px;
    --mg: calc(-1 * var(--pt));
    --cg: calc(2 * var(--mg));
    --cw: calc(2 * var(--pt));
    position: relative;
    height: 100%;
    width: 100%;
  `,
);

const Corner = styled(
  'div',
  makeFilterProps(['direction']),
)<{
  direction:
    | DIRECTION.BOTTOM_LEFT
    | DIRECTION.BOTTOM_RIGHT
    | DIRECTION.TOP_LEFT
    | DIRECTION.TOP_RIGHT;
}>(
  ({ theme, direction }) => css`
    height: var(--cw);
    width: var(--cw);
    z-index: 1;
    border: solid 2px ${theme.palette.primary.main};
    position: absolute;
    transition: transform 0.2s;

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
    height: var(--pt);

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

type ResizerType = React.FC<Props> & {
  DIRECTION: typeof DIRECTION;
};

type Position = Size & {
  x: number;
  y: number;
};

type Props = cProps<{
  disabled?: boolean | Array<DIRECTION>;
  children?: React.ReactNode;
  minHeight?: number;
  minWidth?: number;
  maxHeight?: number;
  maxWidth?: number;
  onResizeStart?: (direction: DIRECTION) => void;
  onResizeFinish?: (direction: DIRECTION, value: Size, original: Size) => void;
  onResize?: (direction: DIRECTION, value: Size, original: Size) => void;
}>;

export const Resizer: ResizerType = ({
  onResizeFinish,
  onResize,
  onResizeStart,
  disabled,
  children,
  minHeight = 10,
  minWidth = 10,
  maxWidth,
  maxHeight,
  ...props
}) => {
  const container = React.useRef<HTMLDivElement>(null);
  const original = React.useRef<Position>();
  const active = React.useRef<DIRECTION>();
  const [resizePos, setResizePos] = React.useState<Position>();

  function handleResize(clientX: number, clientY: number) {
    const direction = active.current;
    const { x: oX, y: oY, width: oW, height: oH } = original.current;
    const result: Size = { width: oW, height: oH };

    if (isPointingRight(direction)) {
      result.width = oW + (clientX - oX);
    }

    if (isPointingLeft(direction)) {
      result.width = oX - clientX + oW;
    }

    if (isPointingDown(direction)) {
      result.height = oH + (clientY - oY);
    }

    if (isPointingUp(direction)) {
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

    const nextSize: Size = {
      width: nextWidth,
      height: nextHeight,
    };

    onResize?.(direction, nextSize, original.current);

    setResizePos((current) => ({
      ...current,
      ...nextSize,
    }));
  }

  function handleMouseMove(event: MouseEvent) {
    if (!isNil(active.current)) {
      handleResize(event.clientX, event.clientY);
    }
  }

  function markActive(
    direction: DIRECTION,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) {
    const { clientWidth, clientHeight, offsetTop, offsetLeft } =
      container.current;

    active.current = direction;
    original.current = {
      x: event.clientX,
      y: event.clientY,
      width: clientWidth,
      height: clientHeight,
    };

    onResizeStart?.(direction);
    setResizePos({
      width: clientWidth,
      height: clientHeight,
      y: offsetTop,
      x: offsetLeft,
    });
  }

  function markInactive() {
    if (resizePos && onResizeFinish) {
      const size: Size = {
        width: resizePos.width,
        height: resizePos.height,
      };

      onResizeFinish(active.current, size, original.current);
    }

    original.current = undefined;
    active.current = undefined;
    setResizePos(undefined);
  }

  function getHandler(direction: DIRECTION) {
    const isDisabled =
      disabled === true ||
      (Array.isArray(disabled) && disabled.includes(direction));

    const commonProps: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    > = {
      key: DIRECTION[direction],
      onMouseDown: (event) => markActive(direction, event),
    };

    if (
      isDisabled ||
      (Number.isInteger(active.current) && active.current !== direction)
    ) {
      return null;
    } else if (direction === DIRECTION.TOP || direction === DIRECTION.BOTTOM) {
      return <HorizontalBar {...commonProps} direction={direction} />;
    } else if (direction === DIRECTION.LEFT || direction === DIRECTION.RIGHT) {
      return <VerticalBar {...commonProps} direction={direction} />;
    } else {
      return <Corner {...commonProps} direction={direction} />;
    }
  }

  useEvent(window, 'mouseup', markInactive);
  useEvent(window, 'mousemove', handleMouseMove);

  const resizeStyle: React.CSSProperties = !resizePos
    ? undefined
    : {
        height: resizePos.height,
        width: resizePos.width,
      };

  return (
    <Container
      {...props}
      ref={container}
      style={Object.assign({}, props.style, resizeStyle)}
    >
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
};

Resizer.DIRECTION = DIRECTION;
