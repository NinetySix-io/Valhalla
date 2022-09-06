import type { DroppedElement } from '../types';
import { createStore } from 'tiamut';

export const focusedElement = createStore({
  initialState: null as DroppedElement | null,
  actions: {
    clear() {
      return null;
    },
    replace(_, element: DroppedElement) {
      return element;
    },
  },
});
