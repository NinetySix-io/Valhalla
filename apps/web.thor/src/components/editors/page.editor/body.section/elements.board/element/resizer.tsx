import * as React from 'react';

import {
  Container,
  Corner,
  HorizontalBar,
  VerticalBar,
} from './resizer.styles';
import {
  DIRECTION,
  isDown,
  isLeft,
  isRight,
  isStrictHorizontal,
  isStrictVertical,
  isUp,
} from '../lib/directions';
import type { Position, Size } from '../../../types';

import isNil from 'lodash.isnil';
import { mergeRefs } from 'react-merge-refs';
import { useEvent } from '@valhalla/web.react';

type Props = React.PropsWithChildren<
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > & {
    alwaysVisible?: boolean;
    disableResize?: boolean | Array<DIRECTION>;
    minHeight?: number;
    minWidth?: number;
    maxHeight?: number;
    maxWidth?: number;
    onResizeStart?: (direction: DIRECTION) => void;
    onResizeFinish?: (
      direction: DIRECTION,
      value: Size,
      original: Size,
    ) => void;
    onResize?: (
      direction: DIRECTION,
      value: Position,
      original: Position,
    ) => void;
  }
>;

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
    const sizing = React.useRef<Position>();
    const [active, setActive] = React.useState<DIRECTION>();

    function handleResize(clientX: number, clientY: number) {
      const direction = active;
      const { x: oX, y: oY, width: oW, height: oH } = original.current;
      const result: Size = { width: oW, height: oH };

      if (isRight(direction)) {
        result.width = oW + clientX - oX;
      }

      if (isLeft(direction)) {
        result.width = oX - clientX + oW;
      }

      if (isDown(direction)) {
        result.height = oH + clientY - oY;
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
        x: clientX,
        y: clientY,
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
      const { clientX, clientY } = event;
      sizing.current = {
        width: clientWidth,
        height: clientHeight,
        x: clientX,
        y: clientY,
      };
      original.current = {
        x: clientX,
        y: clientY,
        ...sizing.current,
      };
      setActive(direction);
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
      const isInactive = Number.isInteger(active) && active !== direction;
      const isDisabled =
        disableResize === true ||
        (Array.isArray(disableResize) && disableResize.includes(direction));

      if (isDisabled || isInactive) {
        return null;
      }

      const commonProps: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
      > = {
        key: DIRECTION[direction],
        onMouseDown: (event) => markActive(direction, event),
      };

      if (isStrictVertical(direction)) {
        return <HorizontalBar {...commonProps} direction={direction} />;
      } else if (isStrictHorizontal(direction)) {
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
      <Container {...props} ref={mergeRefs([container, ref])} style={style}>
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
