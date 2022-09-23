import * as React from 'react';

import type { DragMoveEvent, DragStartEvent } from '@dnd-kit/core';

import type { BoardElement } from '../../types';
import { DndContext as DndKitContext } from '@dnd-kit/core';
import { EditorStore } from '../../store';
import { isMenuItem } from '../../lib/is.menu.item';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { useClampElement } from './hooks/use.element.clamp';
import { useDragSensors } from './hooks/use.drag.sensors';
import { useSectionStore } from '../scope.provider';

export const DndContext: React.FC<React.PropsWithChildren> = ({ children }) => {
  const store = useSectionStore();
  const sensors = useDragSensors();
  const clampElement = useClampElement();

  function getElementFromEvent(event: Pick<DragStartEvent, 'active'>) {
    return event.active.data.current as BoardElement;
  }

  function handleDragStart(event: DragStartEvent) {
    const element = getElementFromEvent(event);
    EditorStore.actions.setIsDragging(true);
    store.actions.setDragging(element);
    if (isMenuItem(element.id)) {
      store.actions.clearSelections();
    }
  }

  function handleDragMove(event: DragMoveEvent) {
    store.actions.setDragDelta(event.delta);
    store.actions.setDragging(
      clampElement(getElementFromEvent(event), event.delta),
    );
  }

  function handleDragEnd() {
    store.actions.setDragging(null);
    store.actions.setDragDelta(null);
    EditorStore.actions.setIsDragging(false);
  }

  return (
    <DndKitContext
      sensors={sensors}
      modifiers={[restrictToWindowEdges]}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragMove={handleDragMove}
    >
      {children}
    </DndKitContext>
  );
};
