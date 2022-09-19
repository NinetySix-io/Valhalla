import * as React from 'react';

import type { DroppedElement, Size } from '@app/components/page.editor/types';
import { css, styled } from '@mui/material';
import { makeFilterProps, useTemporal } from '@valhalla/web.react';

import type { DIRECTION } from '../lib/directions';
import { Resizer } from './resizer';
import { calculateResize } from '../lib/calculate.resize';
import isNil from 'lodash.isnil';
import { mergeRefs } from 'react-merge-refs';
import { useElementGridArea } from '../hooks/element/use.grid.area';
import { useElementRegistry } from '../hooks/element/use.registry';
import { useElementSelections } from '../hooks/element/use.selections';
import { useSectionDrag } from '../hooks/use.dnd';
import { useSectionEmitter } from '../hooks/use.section.emitter';
import { useSectionStore } from '../../scope.provider';

const Container = styled(
  Resizer,
  makeFilterProps([
    'label',
    'gridArea',
    'isFocus',
    'isDragging',
    'isMultiSelected',
  ]),
)<{
  label: string;
  gridArea: string;
  isFocus: boolean;
  isDragging: boolean;
  isMultiSelected: boolean;
}>(({ theme, label, gridArea, isFocus, isDragging, isMultiSelected }) => {
  const mainColor: string = theme.palette.primary.main;
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
});

type Props = React.PropsWithChildren<{
  onFocus?: () => void;
  focusColor?: string;
  onFocusChange?: (isActive: boolean) => void;
  element: DroppedElement;
}>;

export const ElementsBoardItem = React.forwardRef<HTMLDivElement, Props>(
  ({ element: _element, focusColor, children, onFocus, ...props }, ref) => {
    const container = React.useRef<HTMLDivElement>();
    const store = useSectionStore();
    const cellSize = store.useSelect((state) => state.cellSize);
    const [isResizing, setIsResizing] = React.useState(false);
    const [element, setElement] = useTemporal(_element);
    const registryRef = useElementRegistry(element);
    const gridArea = useElementGridArea(element);
    const selection = useElementSelections(element);
    const emitter = useSectionEmitter();
    const isFocus = store.useSelect(
      (state) => state.focused?.id === element.id,
    );

    React.useEffect(() => {
      if (isFocus && onFocus) {
        onFocus();
      }
    }, [onFocus, isFocus]);

    const [drag, { isDragging, hasItem }, preview] = useSectionDrag(element, {
      end() {
        store.actions.setFocus(element);
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

    // TODO: probably optimize this because it will
    // rerender when it doesn't need to.
    // It should really only rerender when it
    // is focused or when it lost focus
    const showOutline = isFocus || isResizing || selection.isBeingSelected;

    function handleMouseDown() {
      const { isHoldingDownShiftKey, focused } = store.getState();
      const hasFocus = !isNil(focused);

      if (!isHoldingDownShiftKey || !hasFocus) {
        store.actions.setFocus(element);
      }

      if (!selection.isBeingSelected) {
        if (isHoldingDownShiftKey) {
          selection.add();
        } else {
          selection.set();
        }
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
    }

    function handleResizeEnd(direction: DIRECTION, nextSize: Size) {
      setIsResizing(false);
      emitter.client.emit('elementsUpdated', [
        calculateResize({
          cellSize,
          direction,
          element,
          nextSize,
        }),
      ]);
    }

    return (
      <Container
        {...props}
        tabIndex={0}
        color={focusColor}
        ref={mergeRefs([
          ref,
          registryRef,
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

ElementsBoardItem.displayName = 'ElementsBoardItem';
