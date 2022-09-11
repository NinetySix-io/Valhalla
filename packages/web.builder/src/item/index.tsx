import * as React from 'react';

import type { DroppedElement, Size } from '../types';
import { css, styled } from '@mui/material';

import type { DIRECTION } from './directions';
import { Resizer } from './resizer';
import { builderEvents } from '../lib/events';
import { calculateResize } from '../lib/calculate.resize';
import isNil from 'lodash.isnil';
import { makeFilterProps } from '@valhalla/web.react';
import { mergeRefs } from 'react-merge-refs';
import { useDroppedElementRegister } from '../context/hooks/use.dropped.element.register';
import { useElementGridArea } from '../hooks/use.element';
import { useScopeDrag } from '../hooks/use.dnd';
import { useSelections } from '../context/hooks/use.selections';
import { useStore } from '../context/scope.provider';
import { useTemporalCache } from '../hooks/use.cache';

const Container = styled(
  Resizer,
  makeFilterProps([
    'label',
    'gridArea',
    'isFocus',
    'color',
    'isDragging',
    'isMultiSelected',
  ]),
)<{
  label: string;
  gridArea: string;
  isFocus: boolean;
  color: string;
  isDragging: boolean;
  isMultiSelected: boolean;
}>(
  ({ theme, color, label, gridArea, isFocus, isDragging, isMultiSelected }) => {
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
      ${isMultiSelected &&
      css`
        outline: none;
      `}

      ${isDragging &&
      css`
        outline-color: transparent !important;
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
  },
);

type Props = {
  onFocus?: () => void;
  focusColor?: string;
  onFocusChange?: (isActive: boolean) => void;
  children?: React.ReactNode;
  element: DroppedElement;
};

export const DropItem = React.forwardRef<HTMLDivElement, Props>(
  ({ element, focusColor, children, onFocus, ...props }, ref) => {
    const store = useStore();
    const container = React.useRef<HTMLDivElement>();
    const cellSize = store.useSelect((state) => state.cellSize);
    const [isResizing, setIsResizing] = React.useState(false);
    const [cacheElement, setElement] = useTemporalCache(element);
    const gridArea = useElementGridArea(cacheElement);
    const selection = useSelections(element);
    const isFocus = store.useSelect(
      (state) => state.focusedElement?.id === element.id,
    );

    useDroppedElementRegister(element, container.current);

    React.useEffect(() => {
      if (isFocus && onFocus) {
        onFocus();
      }
    }, [onFocus, isFocus]);

    // TODO: probably optimize this because it will
    // rerender when it doesn't need to.
    // It should really only rerender when it
    // is focused or when it lost focus
    const showOutline = isFocus || isResizing || selection.isBeingSelected;

    async function handleMouseDown() {
      const isShiftKeyDown = store.getState().isShiftKeyPressed;
      const hasFocus = !isNil(store.getState().focusedElement);

      if (!isShiftKeyDown || !hasFocus) {
        store.actions.focusedElement.replace(element);
      }

      if (!selection.isBeingSelected) {
        selection.add(isShiftKeyDown);
      }
    }

    function handleMouseUp() {
      if (!selection.isMultiSelected && !isFocus) {
        selection.remove();
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
      store.actions.isGridVisible.update(true);
    }

    function handleResizeEnd(direction: DIRECTION, nextSize: Size) {
      setIsResizing(false);
      store.actions.isGridVisible.update(false);
      builderEvents.emit('elementsUpdated', [
        calculateResize({
          cellSize,
          direction,
          element,
          nextSize,
        }),
      ]);
    }

    const [drag, { isDragging, hasItem }, preview] = useScopeDrag(element, {
      end() {
        store.actions.focusedElement.replace(element);
      },
      collect(monitor) {
        return {
          isDragging: monitor.isDragging(),
          hasItem: monitor.getItem()?.id === element.id,
        };
      },
    });

    if (isDragging || selection.isMultiDragging) {
      return null;
    }

    return (
      <Container
        {...props}
        tabIndex={0}
        color={focusColor}
        ref={mergeRefs([
          ref,
          container,
          preview,
          isResizing ? undefined : drag,
        ])}
        alwaysVisible={showOutline}
        isDragging={hasItem && !selection.isMultiSelected}
        disableResize={hasItem || selection.isMultiSelected}
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
        isMultiSelected={selection.isMultiSelected}
      >
        {children}
      </Container>
    );
  },
);
