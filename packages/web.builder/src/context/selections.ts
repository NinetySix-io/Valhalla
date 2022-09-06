import type { DroppedElement } from '../types';
import { createStore } from 'tiamut';
import omit from 'lodash.omit';

export type Selections = Record<DroppedElement['id'], DroppedElement>;

export const selections = createStore({
  initialState: {} as Selections,
  actions: {
    clear() {
      return {};
    },
    addElement(state, element: DroppedElement, append?: boolean) {
      const next: Selections = { [element.id]: element };
      return append ? Object.assign({}, state, next) : next;
    },
    removeElement(state, elementId: string) {
      return omit(state, elementId);
    },
    replace(_, nextSelections: Selections) {
      return nextSelections;
    },
  },
});
