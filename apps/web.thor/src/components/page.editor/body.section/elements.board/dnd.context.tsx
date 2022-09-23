import * as React from 'react';

import type { BoardElement, WithId } from '../../types';
import type { DragMoveEvent, DragStartEvent } from '@dnd-kit/core';

import { DndContext as DndKitContext } from '@dnd-kit/core';
import { EditorStore } from '../../store';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { useDragSensors } from './hooks/use.drag.sensors';
import { useSectionStore } from '../scope.provider';

export const DndContext: React.FC<React.PropsWithChildren> = ({ children }) => {
  const store = useSectionStore();
  const sensors = useDragSensors();

  function handleDragStart(event: DragStartEvent) {
    const elementId = event.active.id as WithId['id'];
    const element = event.active.data.current as BoardElement;
    EditorStore.actions.setIsDragging(true);
    store.actions.setDragging({
      id: elementId,
      x: 0,
      y: 0,
      ...element,
    });
  }

  function handleDragMove(event: DragMoveEvent) {
    store.actions.setDragDelta(event.delta);
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
