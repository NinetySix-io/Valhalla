import { createStore } from 'tiamut';

export const isDragging = createStore({
  initialState: false,
  actions: {
    update(_, value: boolean) {
      return value;
    },
  },
});
