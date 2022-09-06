import type { DroppedElement } from '../../types';
import { EventsRegistry } from './registry';

export type BuilderEvents = {
  gridRowsUpdate: number;
  elementAdded: Omit<DroppedElement, 'id'>;
  elementsUpdated: DroppedElement[];
  elementFocus: { elementId: string };
  elementDragging: { isDragging: boolean };
};

export const builderEvents = new EventsRegistry<BuilderEvents>();
