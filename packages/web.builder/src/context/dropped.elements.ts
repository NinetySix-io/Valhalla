import { createStore, withImmer } from 'tiamut';

import type { DroppedElement } from '../types';

export type DroppedElementWithRef = {
  element: DroppedElement;
  ref: HTMLElement;
};

export const droppedElements = createStore(
  withImmer({
    initialState: {} as Record<string, DroppedElementWithRef>,
    actions: {
      addElement(state, item: DroppedElementWithRef) {
        state[item.element.id] = item;
      },
      removeElement(state, elementId: string) {
        delete state[elementId];
      },
    },
  }),
);
