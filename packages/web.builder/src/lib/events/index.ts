import { DroppedElement } from '../../types';
import { EventsRegistry } from './registry';

export type BuilderEvents = {
  itemUpdate: DroppedElement | Omit<DroppedElement, 'id'>;
  gridRowsUpdate: number;
  elementFocus: { elementId: string };
  elementDragging: { isDragging: boolean };
};

export const builderEvents = new EventsRegistry<BuilderEvents>();
