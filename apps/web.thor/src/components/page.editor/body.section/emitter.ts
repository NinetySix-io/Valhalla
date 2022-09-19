import type {
  BoardElement,
  DroppedElement,
  DroppedPosition,
  MenuElement,
} from '../types';

import { EventsEmitter } from '@valhalla/utilities';

export function createSectionEmitter() {
  return new EventsEmitter<{
    updateRowsCount: number;
    elementAdded: MenuElement & DroppedPosition;
    elementsUpdated: DroppedElement[];
    elementsDeleted: DroppedElement['id'][];
    elementFocus: BoardElement;
    elementDragging: MenuElement;
  }>();
}
