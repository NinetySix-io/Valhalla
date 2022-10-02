import * as React from 'react';

import type {
  DroppedElement,
  Position,
} from '@app/components/editors/page.editor/types';
import {
  selectIsDragging,
  selectIsMultiSelected,
  selectIsResizing,
  selectMoveTransform,
  selectShouldPeakWhenClose,
} from './selectors';

import { Container } from './styles';
import type { DIRECTION } from '../lib/directions';
import { ElementsBoardItemMenu } from './menu';
import { PropsProvider } from '@app/components/props.provider';
import { calculateResize } from '../lib/calculate.resize';
import isNil from 'lodash.isnil';
import { mergeRefs } from 'react-merge-refs';
import { useDraggable } from '@dnd-kit/core';
import { useElementGridArea } from '../hooks/element/use.grid.area';
import { useElementRegistry } from '../hooks/element/use.registry';
import { useSectionEmitter } from '../hooks/use.section.emitter';
import { useSectionStore } from '../../scope.provider';
import { useSelectionHandle } from './use.selection.handle';
import { useTemporal } from '@valhalla/web.react';

type Props = {
  onFocus?: () => void;
  onFocusChange?: (isActive: boolean) => void;
  element: DroppedElement;
  children: JSX.Element;
};

export const ElementsBoardItem = React.forwardRef<HTMLDivElement, Props>(
  ({ element: _element, children, ...props }, ref) => {
    const container = React.useRef<HTMLDivElement>();
    const store = useSectionStore();
    const isEditingText = store.useSelect((state) => state.isEditingText);
    const isFocus = store.useSelect((state) => state.focused === _element.id);
    const cellSize = store.useSelect((state) => state.cellSize);
    const hasDragging = store.useSelect((state) => !isNil(state.dragging));
    const isDragging = store.useSelect(selectIsDragging(_element));
    const transform = store.useSelect(selectMoveTransform(_element));
    const isMultiSelected = store.useSelect(selectIsMultiSelected(_element));
    const shouldPeak = store.useSelect(selectShouldPeakWhenClose(_element));
    const isResizing = store.useSelect(selectIsResizing(_element));
    const selectionHandle = useSelectionHandle(_element);
    const [element, setElement] = useTemporal(_element);
    const registryRef = useElementRegistry(element);
    const gridArea = useElementGridArea(element);
    const emitter = useSectionEmitter();

    const draggable = useDraggable({
      id: _element.id,
      data: _element,
      disabled: isMultiSelected || isResizing || isEditingText,
    });

    function handleResize(direction: DIRECTION, nextSize: Position) {
      const nextElement = calculateResize({
        cellSize,
        direction,
        element,
        nextSize,
      });

      setElement(nextElement);
    }

    function handleResizeStart() {
      store.actions.setResizing(element.id);
    }

    function handleResizeEnd() {
      store.actions.setResizing(null);
      store.actions.setFocus(element.id);
      emitter.client.emit('elementsUpdated', [element]);
    }

    function handleChildrenUpdate(nextElement: DroppedElement) {
      emitter.client.emit('elementsUpdated', [nextElement]);
    }

    return (
      <Container
        {...props}
        {...draggable.listeners}
        {...draggable.attributes}
        transformShadow={isDragging}
        transform={transform}
        ref={mergeRefs([
          ref,
          registryRef,
          container,
          selectionHandle,
          draggable.setNodeRef,
        ])}
        shouldPeak={shouldPeak}
        alwaysVisible={isFocus || isResizing}
        isDragging={isDragging || hasDragging}
        disableResize={isDragging || isMultiSelected || hasDragging}
        gridArea={gridArea}
        isFocus={(isFocus || isResizing) && !hasDragging}
        minWidth={cellSize}
        minHeight={cellSize}
        onResize={handleResize}
        onResizeStart={handleResizeStart}
        onResizeFinish={handleResizeEnd}
        isMultiSelected={isMultiSelected}
        isEditingText={isEditingText}
      >
        <ElementsBoardItemMenu
          label={element.type}
          parent={container.current}
          isVisible={!isFocus}
        />
        <PropsProvider
          props={{
            isFocus,
            onChange: handleChildrenUpdate,
          }}
        >
          {children}
        </PropsProvider>
      </Container>
    );
  },
);
