import { createStore } from 'tiamut';

export const cellSize = createStore({
  initialState: 0,
  actions: {
    replace(_, value: number) {
      return value;
    },
  },
});
