import type { AddedElement, DroppedElement } from '../../types';

import { EventsRegistry } from './registry';

export type BuilderEvents = {
  gridRowsUpdate: number;
  elementAdded: AddedElement;
  elementsUpdated: DroppedElement[];
  elementFocus: { elementId: string };
  elementDragging: { isDragging: boolean };
};

export const builderEvents = new EventsRegistry<BuilderEvents>();
