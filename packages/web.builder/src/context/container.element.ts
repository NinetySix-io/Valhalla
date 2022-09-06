import { createStore } from 'tiamut';

export const containerElement = createStore({
  initialState: null as HTMLDivElement | null,
  actions: {
    replace(_, element: HTMLDivElement) {
      return element;
    },
  },
});
