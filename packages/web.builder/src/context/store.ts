import { cellSize } from './cell.size';
import { containerElement } from './container.element';
import { createCombinedStoresHook } from 'tiamut';
import { draggingElement } from './dragging.element';
import { droppedElements } from './dropped.elements';
import { focusedElement } from './focused.element';
import { isDragging } from './is.dragging';
import { isGridVisible } from './is.grid.visible';
import { isShiftKeyPressed } from './shift.key.pressed';
import { selectionBox } from './selection.box';
import { selections } from './selections';

export function makeStore() {
  const store = createCombinedStoresHook({
    isShiftKeyPressed,
    isDragging,
    selections,
    selectionBox,
    focusedElement,
    droppedElements,
    cellSize,
    isGridVisible,
    draggingElement,
    containerElement,
  });

  return store;
}