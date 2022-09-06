import { createStore } from 'tiamut';

export const isGridVisible = createStore({
  initialState: false,
  actions: {
    update(_, value: boolean) {
      return value;
    },
  },
});
