import type {
  BoardElement,
  DroppedElement,
  DroppedPosition,
  MenuElement,
} from '../../types';

import { EventsEmitter } from '@valhalla/utilities';

type Events = {
  updateRowsCount: number;
  elementAdded: MenuElement & DroppedPosition;
  elementsUpdated: DroppedElement[];
  elementsDeleted: DroppedElement['id'][];
  elementFocus: BoardElement;
  elementDragging: MenuElement;
};

export const Emitter = new EventsEmitter<Events>();
