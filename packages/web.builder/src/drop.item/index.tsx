import * as React from 'react';

import type { DroppedElement, Size } from '../types';
import {
  cellSizeAtom,
  gridVisibleAtom,
  useScopeAtomMutate,
  useScopeAtomValue,
} from '../context';
import { css, styled } from '@mui/material';
import { useDragCarryMutate, useDragCarryState } from '../context/drag.carry';

import { DIRECTION } from './directions';
import { Resizer } from './resizer';
import { builderEvents } from '../lib/events';
import { calculateResize } from '../lib/calculate.resize';
import { focusedElementAtom } from '../context/focus.element';
import { isNil } from '@valhalla/utilities';
import { makeFilterProps } from '@valhalla/web.react';
import { mergeRefs } from 'react-merge-refs';
import { useElementGridArea } from '../hooks/use.element';
import { useScopeDrag } from '../context/dnd';
import { useShiftKeyStateFetch } from '../context/shift.key.pressed';
import { useTemporalCache } from '../hooks/use.cache';

const Container = styled(
  Resizer,
  makeFilterProps([
    'label',
    'gridArea',
    'isFocus',
    'color',
    'isDragging',
    'isMultiCarry',
  ]),
)<{
  label: string;
  gridArea: string;
  isFocus: boolean;
  color: string;
  isDragging: boolean;
  isMultiCarry: boolean;
}>(({ theme, color, label, gridArea, isFocus, isDragging, isMultiCarry }) => {
  const mainColor: string = color ?? theme.palette.primary.main;
  const textColor: string = theme.palette.getContrastText(mainColor);

  if (!gridArea) {
    return css`
      display: none;
    `;
  }

  return css`
    position: relative;
    outline: solid 3px transparent;
    grid-area: ${gridArea};
    z-index: auto;
    ${isMultiCarry &&
    css`
      outline: none;
    `}

    ${isFocus
      ? css`
          outline-color: ${mainColor};

          &:hover {
            cursor: auto;
          }
        `
      : css`
          &:hover {
            cursor: grab;
            outline-color: ${mainColor};

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
    const cellSize = useScopeAtomValue(cellSizeAtom);
    const setGridVisible = useScopeAtomMutate(gridVisibleAtom);
    const focusedElement = useScopeAtomValue(focusedElementAtom);
    const setFocusedElement = useScopeAtomMutate(focusedElementAtom);
    const [isResizing, setIsResizing] = React.useState(false);
    const [cacheElement, setElement] = useTemporalCache(element);
    const gridArea = useElementGridArea(cacheElement);
    const getIsShiftKeyDown = useShiftKeyStateFetch();
    const dragCarryMutate = useDragCarryMutate(element);
    const { isBeingCarry, isMultiCarry } = useDragCarryState(element);
    // TODO: probably optimize this because it will
    // rerender when it doesn't need to.
    // It should really only rerender when it
    // is focused or when it lost focus
    const isFocus = focusedElement?.id === element.id;
    const hasFocus = !isNil(focusedElement);
    const showOutline = isFocus || isResizing || isBeingCarry;

    async function handleMouseDown() {
      const isShiftKeyDown = await getIsShiftKeyDown();
      if (!isShiftKeyDown || !hasFocus) {
        setFocusedElement(element);
      }

      if (!isBeingCarry) {
        dragCarryMutate.add(isShiftKeyDown);
      }
    }

    function handleMouseUp() {
      if (!isMultiCarry && !isFocus) {
        dragCarryMutate.remove();
      }
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
      builderEvents.emit('elementsUpdated', [
        calculateResize({
          cellSize,
          direction,
          element,
          nextSize,
        }),
      ]);
    }

    const [drag, { isDragging, hasItem }] = useScopeDrag(element, {
      end() {
        focus();
      },
      collect(monitor) {
        return {
          isDragging: monitor.isDragging(),
          hasItem: monitor.getItem()?.id === element.id,
        };
      },
    });

    if (isDragging) {
      return null;
    }

    return (
      <Container
        {...props}
        tabIndex={0}
        color={focusColor}
        ref={mergeRefs([ref, container, isResizing ? undefined : drag])}
        isDragging={hasItem && !isMultiCarry}
        disableResize={hasItem || isMultiCarry}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        label={element.type.toUpperCase()}
        gridArea={gridArea}
        isFocus={showOutline}
        minWidth={cellSize}
        minHeight={cellSize}
        onResize={handleResize}
        onResizeStart={handleResizeStart}
        onResizeFinish={handleResizeEnd}
        isMultiCarry={isMultiCarry}
      >
        {children}
      </Container>
    );
  },
);

DropItem.displayName = 'DropItem';
