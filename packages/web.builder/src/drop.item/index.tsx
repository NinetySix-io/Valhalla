import * as React from 'react';

import type { DroppedElement, Size } from '../types';
import {
  cellSizeAtom,
  focusedElementAtom,
  gridVisibleAtom,
  useScopeAtomMutate,
  useScopeAtomValue,
  useZoneId,
} from '../context';
import { css, styled } from '@mui/material';

import { DIRECTION } from './directions';
import { Resizer } from './resizer';
import { builderEvents } from '../lib/events';
import { calculateResize } from '../lib/calculate.resize';
import clsx from 'clsx';
import { makeFilterProps } from '@valhalla/web.react';
import { mergeRefs } from 'react-merge-refs';
import { useDrag } from 'react-dnd';
import { useElementGridArea } from '../hooks/use.element';
import { useTemporalCache } from '../hooks/use.cache';

const Container = styled(
  Resizer,
  makeFilterProps(['label', 'gridArea', 'isFocus', 'color', 'isDragging']),
)<{
  label: string;
  gridArea: string;
  isFocus: boolean;
  color: string;
  isDragging: boolean;
}>(({ theme, color, label, gridArea, isFocus, isDragging }) => {
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
    grid-area: ${gridArea};
    z-index: auto;

    ${isDragging &&
    css`
      border-color: ${theme.palette.grey[500]} !important;
    `}

    ${isFocus
      ? css`
          border-color: ${mainColor};

          &:hover {
            cursor: auto;
          }
        `
      : css`
          &:hover {
            cursor: grab;
            border-color: ${mainColor};

            /* LABEL */
            ${!isDragging &&
            css`
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
            `}
          }
        `}
  `;
});

type Props = Omit<
  React.PropsWithoutRef<JSX.IntrinsicElements['div']>,
  'onChange'
> & {
  focusColor?: string;
  onFocusChange?: (isActive: boolean) => void;
  children?: React.ReactNode;
  element: DroppedElement;
};

export const DropItem = React.forwardRef<HTMLDivElement, Props>(
  ({ element, focusColor, children, ...props }, ref) => {
    const container = React.useRef<HTMLDivElement>();
    const draggingRef = React.useRef(false);
    const zoneId = useZoneId();
    const cellSize = useScopeAtomValue(cellSizeAtom);
    const setFocus = useScopeAtomMutate(focusedElementAtom);
    const setGridVisible = useScopeAtomMutate(gridVisibleAtom);
    const [isFocus, setIsFocus] = React.useState(false);
    const [isResizing, setIsResizing] = React.useState(false);
    const [cacheElement, setElement] = useTemporalCache(element);
    const gridArea = useElementGridArea(cacheElement);
    const showOutline = isFocus || isResizing;

    function handleLoseFocus() {
      setFocus(null);
      setIsFocus(false);
    }

    function handleFocus() {
      setIsFocus(true);
      setFocus(element.id);
    }

    function handleResize(direction: DIRECTION, nextSize: Size) {
      setElement(
        calculateResize({
          cellSize,
          direction,
          element,
          nextSize,
        }),
      );
    }

    function handleResizeStart() {
      setIsResizing(true);
      setGridVisible(true);
    }

    function handleResizeEnd(direction: DIRECTION, nextSize: Size) {
      setIsResizing(false);
      setGridVisible(false);
      builderEvents.emit(
        'itemUpdate',
        calculateResize({
          cellSize,
          direction,
          element,
          nextSize,
        }),
      );
    }

    const [{ isDragging, hasItem }, drag, preview] = useDrag(
      {
        type: zoneId,
        item: element,
        end() {
          handleFocus();
        },
        collect(monitor) {
          return {
            isDragging: monitor.isDragging(),
            hasItem: monitor.getItem()?.id === element.id,
          };
        },
      },
      [zoneId, element],
    );

    React.useEffect(() => {
      setGridVisible(isDragging);
      if (draggingRef.current && !isDragging && container.current) {
        container.current.focus();
      }

      draggingRef.current = isDragging;
    }, [isDragging, setGridVisible]);

    if (isDragging) {
      return null;
    }

    return (
      <Container
        {...props}
        className={clsx(props.className)}
        tabIndex={0}
        color={focusColor}
        ref={mergeRefs([
          ref,
          container,
          preview,
          isResizing ? undefined : drag,
        ])}
        isDragging={hasItem}
        disableResize={hasItem}
        onMouseUp={handleFocus}
        onBlur={handleLoseFocus}
        label={element.type.toUpperCase()}
        gridArea={gridArea}
        isFocus={showOutline}
        minWidth={cellSize}
        minHeight={cellSize}
        onResize={handleResize}
        onResizeStart={handleResizeStart}
        onResizeFinish={handleResizeEnd}
      >
        {children}
      </Container>
    );
  },
);

DropItem.displayName = 'DropItem';
