import * as React from 'react';

import type {
  DroppedElement,
  Size,
  XYCoord,
} from '@app/components/page.editor/types';
import { css, styled } from '@mui/material';
import { makeFilterProps, useTemporal } from '@valhalla/web.react';
import { selectIsMultiSelected, selectMoveTransform } from './selectors';

import type { DIRECTION } from '../lib/directions';
import { Resizer } from './resizer';
import { calculateResize } from '../lib/calculate.resize';
import isNil from 'lodash.isnil';
import { mergeRefs } from 'react-merge-refs';
import { useDraggable } from '@dnd-kit/core';
import { useElementGridArea } from '../hooks/element/use.grid.area';
import { useElementRegistry } from '../hooks/element/use.registry';
import { useSectionEmitter } from '../hooks/use.section.emitter';
import { useSectionStore } from '../../scope.provider';
import { useSelectionHandle } from './use.selection.handle';

const Container = styled(
  Resizer,
  makeFilterProps([
    'transform',
    'label',
    'gridArea',
    'isFocus',
    'isDragging',
    'isMultiSelected',
    'transformShadow',
  ]),
)<{
  transform?: XYCoord;
  label: string;
  gridArea: string;
  isFocus: boolean;
  isDragging: boolean;
  isMultiSelected: boolean;
  transformShadow: boolean;
}>(
  ({
    theme,
    label,
    gridArea,
    isFocus,
    isDragging,
    isMultiSelected,
    transform,
    transformShadow,
  }) => {
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

      ${transform &&
      css`
        transform: translate(${transform.x}px, ${transform.y}px);

        > * {
          opacity: 0.5;
        }

        ${transformShadow &&
        css`
          box-shadow: ${theme.shadows[10]};
        `}
      `}

      ${isMultiSelected &&
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

              /* LABEL */
              ${!isDragging &&
              css`
                outline-color: ${mainColor};

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

type Props = React.PropsWithChildren<{
  onFocus?: () => void;
  onFocusChange?: (isActive: boolean) => void;
  element: DroppedElement;
}>;

export const ElementsBoardItem = React.forwardRef<HTMLDivElement, Props>(
  ({ element: _element, children, ...props }, ref) => {
    const container = React.useRef<HTMLDivElement>();
    const store = useSectionStore();
    const isFocus = store.useSelect((state) => state.focused === _element.id);
    const cellSize = store.useSelect((state) => state.cellSize);
    const hasDragging = store.useSelect((state) => !isNil(state.dragging));
    const transform = store.useSelect(selectMoveTransform(_element));
    const isMultiSelected = store.useSelect(selectIsMultiSelected(_element));
    const selectionHandle = useSelectionHandle(_element);
    const [isResizing, setIsResizing] = React.useState(false);
    const [element, setElement] = useTemporal(_element);
    const registryRef = useElementRegistry(element);
    const gridArea = useElementGridArea(element);
    const emitter = useSectionEmitter();
    const dragState = useDraggable({
      id: element.id,
      data: element,
      disabled: isMultiSelected || isResizing || hasDragging,
    });

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

    function handleResizeEnd() {
      setIsResizing(false);
      emitter.client.emit('elementsUpdated', [element]);
    }

    return (
      <Container
        {...props}
        transformShadow={dragState.isDragging}
        transform={transform}
        ref={mergeRefs([
          ref,
          registryRef,
          container,
          selectionHandle,
          dragState.setNodeRef,
        ])}
        alwaysVisible={isFocus || isResizing}
        isDragging={dragState.isDragging || hasDragging}
        disableResize={dragState.isDragging || isMultiSelected || hasDragging}
        label={element.type?.toUpperCase()}
        gridArea={gridArea}
        isFocus={(isFocus || isResizing) && !hasDragging}
        minWidth={cellSize}
        minHeight={cellSize}
        onResize={handleResize}
        onResizeStart={handleResizeStart}
        onResizeFinish={handleResizeEnd}
        isMultiSelected={isMultiSelected}
        {...dragState.listeners}
        {...dragState.attributes}
      >
        {children}
      </Container>
    );
  },
);
