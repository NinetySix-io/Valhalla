import type { DroppedElement } from '../types';
import { createStore } from 'tiamut';

export const focusedElement = createStore({
  initialState: undefined as DroppedElement | undefined,
  actions: {
    clear() {
      return null;
    },
    replace(_, element: DroppedElement) {
      return element;
    },
  },
});
