import { EventsEmitter } from '@valhalla/utilities';
import type { PageElement } from '../types';

export function createSectionEmitter() {
  return new EventsEmitter<{
    updateRowsCount: number;
    elementAdded: PageElement;
    elementsUpdated: PageElement[];
    elementsDeleted: PageElement['id'][];
    elementFocus: PageElement;
    elementDragging: PageElement;
  }>();
}
