import * as React from 'react';

import { DropType, DroppedItem } from '../types';
import { css, styled } from '@mui/material';

import { makeFilterProps } from '@valhalla/web.react';
import { mergeRefs } from 'react-merge-refs';
import { useDrag } from 'react-dnd';
import { useGridArea } from '../hooks/use.grid.area';

const Container = styled(
  'div',
  makeFilterProps(['isDragging', 'label', 'gridArea']),
)<{ isDragging?: boolean; label: string; gridArea: string }>(
  ({ theme, color, isDragging, label, gridArea }) => {
    const mainColor: string = color ?? theme.palette.primary.main;
    const textColor: string = theme.palette.getContrastText(mainColor);
    if (!gridArea) {
      return css`
        display: none;
      `;
    }

    return css`
      position: relative;
      border: solid 3px transparent;
      margin-right: calc(-1 * (var(--pt-w) + 0.5 * var(--pt-w)));
      margin-bottom: calc(-1 * (var(--pt-w) + 0.5 * var(--pt-w)));
      transition: all 0.2s;
      grid-area: ${gridArea};
      z-index: auto;

      &:hover {
        border-color: ${mainColor};
        cursor: grab;

        /* LABEL */
        &:before {
          content: '${label}';
          top: -20px;
          left: -3px;
          height: 18px;
          overflow: hidden;
          height: max-content;
          font-size: ${theme.typography.caption.fontSize};
          padding: 2px ${theme.spacing(1)};
          background-color: ${mainColor};
          border-top-left-radius: 3px;
          border-top-right-radius: 3px;
          font-family: ${theme.typography.fontFamily};
          position: absolute;
          color: ${textColor};
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
      }

      &:active {
        cursor: grabbing;
        border-color: transparent !important;
        box-shadow: ${theme.shadows[3]};

        &:before {
          display: none !important;
        }
      }

      ${isDragging &&
      css`
        display: none;
      `}
    `;
  },
);

type Props = React.PropsWithoutRef<JSX.IntrinsicElements['div']> & {
  dropType: DropType;
  focusColor?: string;
  onFocusChange?: (isActive: boolean) => void;
  children?: React.ReactNode;
  element: DroppedItem;
};

export const DropItem = React.forwardRef<HTMLDivElement, Props>(
  ({ element, focusColor, children, dropType, ...props }, ref) => {
    const container = React.useRef<HTMLDivElement>();
    const gridArea = useGridArea(element);
    const [, setIsFocus] = React.useState(false);
    const [{ isDragging }, drag] = useDrag({
      type: dropType,
      item: element,
      collect(monitor) {
        return {
          isDragging: monitor.isDragging(),
        };
      },
    });

    function handleClick() {
      container.current.focus();
    }

    function handleLoseFocus() {
      setIsFocus(false);
    }

    function handleFocus() {
      setIsFocus(true);
    }

    if (isDragging) {
      return <div ref={drag} />;
    }

    return (
      <Container
        {...props}
        tabIndex={0}
        isDragging={isDragging}
        color={focusColor}
        ref={mergeRefs([ref, drag, container])}
        onClick={handleClick}
        onBlur={handleLoseFocus}
        onFocus={handleFocus}
        label={element.type.toUpperCase()}
        gridArea={gridArea}
      >
        {children}
      </Container>
    );
  },
);

DropItem.displayName = 'DropItem';