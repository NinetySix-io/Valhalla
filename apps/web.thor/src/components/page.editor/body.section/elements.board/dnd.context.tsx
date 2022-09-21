import * as React from 'react';

import type { DragMoveEvent, DragStartEvent } from '@dnd-kit/core';

import { DndContext as DndKitContext } from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { useDragSensors } from './hooks/use.drag.sensors';
import { useSectionStore } from '../scope.provider';

export const DndContext: React.FC<React.PropsWithChildren> = ({ children }) => {
  const store = useSectionStore();
  const sensors = useDragSensors();

  function handleDragStart(event: DragStartEvent) {
    store.actions.setDragging(event.active.id);
  }

  function handleDragMove(event: DragMoveEvent) {
    store.actions.setSelectionDelta(event.delta);
  }

  function handleDragEnd() {
    store.actions.setDragging(null);
    store.actions.setSelectionDelta(null);
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
