import type { BoardElement, DroppedElement } from '../types';

import { EventsEmitter } from '@valhalla/utilities';

export function createSectionEmitter() {
  return new EventsEmitter<{
    updateRowsCount: number;
    elementAdded: DroppedElement;
    elementsUpdated: DroppedElement[];
    elementsDeleted: DroppedElement['id'][];
    elementFocus: BoardElement;
    elementDragging: DroppedElement;
  }>();
}
