import type { DroppedElement } from '../types';
import { createStore } from 'tiamut';

export const draggingElement = createStore({
  initialState: null as DroppedElement | null,
  actions: {},
});
