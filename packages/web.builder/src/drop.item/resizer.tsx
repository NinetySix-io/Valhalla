import * as React from 'react';

import {
  cProps,
  makeFilterProps,
  useEvent,
  useThrottleCallback,
} from '@valhalla/web.react';
import { css, styled } from '@mui/material';

import { isNil } from '@valhalla/utilities';

enum DIRECTION {
  TOP,
  BOTTOM,
  LEFT,
  RIGHT,
  TOP_LEFT,
  TOP_RIGHT,
  BOTTOM_LEFT,
  BOTTOM_RIGHT,
}

type Props = cProps<{
  disabled?: boolean | Array<DIRECTION>;
  children?: React.ReactNode;
  minHeight?: number;
  minWidth?: number;
  onResize?: (value: Location) => void;
}>;

type ResizerType = React.FC<Props> & {
  DIRECTION: typeof DIRECTION;
};

const Container = styled('div')(
  () => css`
    --pt: 4px;
    --mg: calc(-1.5 * var(--pt));
    position: relative;
  `,
);

const Marker = styled(
  'div',
  makeFilterProps(['cursor', 'top', 'bottom', 'left', 'right', 'absolute']),
)<{
  cursor: React.CSSProperties['cursor'];
  top?: number;
  bottom?: number;
  right?: number;
  left?: number;
  absolute?: boolean;
}>(
  ({ theme, cursor, top, bottom, left, right, absolute }) => css`
    min-width: var(--pt);
    min-height: var(--pt);
    max-width: var(--pt);
    max-height: var(--pt);
    z-index: 1;
    border-radius: 50%;
    border: solid 3px ${theme.palette.primary.main};
    cursor: ${cursor};

    ${absolute &&
    css`
      position: absolute;
    `}

    ${!isNil(top) &&
    css`
      top: ${top};
    `}

    ${!isNil(bottom) &&
    css`
      bottom: ${bottom};
    `}

    ${!isNil(left) &&
    css`
      left: ${left};
    `}

    ${!isNil(right) &&
    css`
      right: ${right};
    `}
  `,
);

const HorizontalHandler = styled(
  'div',
  makeFilterProps(['direction']),
)<{ direction: DIRECTION.TOP | DIRECTION.BOTTOM }>(
  ({ direction }) => css`
    position: absolute;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    user-select: none;

    ${direction === DIRECTION.TOP &&
    css`
      top: var(--mg);
    `}

    ${direction === DIRECTION.BOTTOM &&
    css`
      bottom: var(--mg);
    `}
  `,
);

const VerticalHandler = styled(
  'div',
  makeFilterProps(['direction']),
)<{
  direction: DIRECTION.LEFT | DIRECTION.RIGHT;
}>(
  ({ direction }) => css`
    position: absolute;
    user-select: none;
    top: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;

    ${direction === DIRECTION.LEFT &&
    css`
      left: var(--mg);
    `}

    ${direction === DIRECTION.RIGHT &&
    css`
      right: var(--mg);
    `}
  `,
);

type Location = {
  top: number;
  left: number;
  width: number;
  height: number;
};

type TempStyle = Location & {
  position?: React.CSSProperties['position'];
};

export const Resizer: ResizerType = ({
  disabled,
  children,
  minHeight = 0,
  minWidth = 0,
  onResize,
  ...props
}) => {
  const container = React.useRef<HTMLDivElement>(null);
  const active = React.useRef<DIRECTION>();
  const [tempStyle, setTempStyle] = React.useState<TempStyle>();
  const handleResize = useThrottleCallback(
    (clientX: number, clientY: number) => {
      if (!tempStyle) {
        return;
      }

      setTempStyle((current) => {
        if (!current) {
          return current;
        }

        const direction = active.current;
        const nextStyle = { ...current };

        if (
          direction === DIRECTION.RIGHT ||
          direction === DIRECTION.TOP_RIGHT ||
          direction === DIRECTION.BOTTOM_RIGHT
        ) {
          const diff = current.left + current.width - clientX;
          const nextWidth = current.width - diff;
          nextStyle.width = nextWidth;
        }

        if (
          direction === DIRECTION.LEFT ||
          direction === DIRECTION.TOP_LEFT ||
          direction === DIRECTION.BOTTOM_LEFT
        ) {
          const nextWidth = Math.max(
            current.left - clientX + current.width,
            minWidth,
          );

          const nextLeft =
            nextWidth === minWidth ? current.left + current.width : clientX;

          nextStyle.width = nextWidth;
          nextStyle.left = nextLeft;
        }

        if (
          direction === DIRECTION.BOTTOM ||
          direction === DIRECTION.BOTTOM_LEFT ||
          direction === DIRECTION.BOTTOM_RIGHT
        ) {
          const diff = current.top + current.height - clientY;
          const nextHeight = current.height - diff;

          nextStyle.height = nextHeight;
        }

        if (
          direction === DIRECTION.TOP ||
          direction === DIRECTION.TOP_LEFT ||
          direction === DIRECTION.TOP_RIGHT
        ) {
          const nextHeight = Math.max(
            current.height - clientY + current.top,
            minHeight,
          );

          const nextTop =
            nextHeight === minHeight ? current.top + current.height : clientY;

          nextStyle.height = nextHeight;
          nextStyle.top = nextTop;
        }

        return nextStyle;
      });
    },
    100,
  );

  function handleMouseMove(event: MouseEvent) {
    if (!isNil(active.current)) {
      handleResize(event.clientX, event.clientY);
    }
  }

  function handleTouchMove(event: TouchEvent) {
    if (!isNil(active.current)) {
      handleResize(event.touches[0].clientX, event.touches[0].clientY);
    }
  }

  function markActive(direction: DIRECTION) {
    if (!container.current) {
      return;
    }

    active.current = direction;

    setTempStyle({
      position: 'fixed',
      top: container.current.offsetTop,
      left: container.current.offsetLeft,
      width: container.current.clientWidth,
      height: container.current.clientHeight,
    });
  }

  function markInactive() {
    active.current = undefined;
    tempStyle && onResize?.(tempStyle);
    setTempStyle(undefined);
  }

  useEvent(window, 'mouseup', markInactive);
  useEvent(window, 'mousemove', handleMouseMove);
  useEvent(window, 'touchend', markInactive);
  useEvent(window, 'touchmove', handleTouchMove);

  function getHandler(direction: DIRECTION) {
    const isDisabled =
      disabled === true ||
      (Array.isArray(disabled) && disabled.includes(direction));

    const commonProps: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    > = {
      key: DIRECTION[direction],
      onMouseDown: () => markActive(direction),
      onTouchStart: () => markActive(direction),
    };

    if (isDisabled) {
      return null;
    } else if (direction === DIRECTION.TOP) {
      return (
        <HorizontalHandler direction={DIRECTION.TOP} {...commonProps}>
          <Marker cursor="n-resize" />
        </HorizontalHandler>
      );
    } else if (direction === DIRECTION.BOTTOM) {
      return (
        <HorizontalHandler direction={DIRECTION.BOTTOM} {...commonProps}>
          <Marker cursor="s-resize" />
        </HorizontalHandler>
      );
    } else if (direction === DIRECTION.LEFT) {
      return (
        <VerticalHandler direction={DIRECTION.LEFT} {...commonProps}>
          <Marker cursor="w-resize" />
        </VerticalHandler>
      );
    } else if (direction === DIRECTION.RIGHT) {
      return (
        <VerticalHandler direction={DIRECTION.RIGHT} {...commonProps}>
          <Marker cursor="e-resize" />
        </VerticalHandler>
      );
    } else if (direction === DIRECTION.TOP_LEFT) {
      return (
        <Marker {...commonProps} absolute cursor="nw-resize" top={0} left={0} />
      );
    } else if (direction === DIRECTION.TOP_RIGHT) {
      return (
        <Marker
          {...commonProps}
          absolute
          cursor="ne-resize"
          top={0}
          right={0}
        />
      );
    } else if (direction === DIRECTION.BOTTOM_LEFT) {
      return (
        <Marker
          {...commonProps}
          absolute
          cursor="sw-resize"
          bottom={0}
          left={0}
        />
      );
    } else if (direction === DIRECTION.BOTTOM_RIGHT) {
      return (
        <Marker
          {...commonProps}
          absolute
          cursor="se-resize"
          bottom={0}
          right={0}
        />
      );
    }

    return null;
  }

  return (
    <Container {...props} style={tempStyle ?? props.style} ref={container}>
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
