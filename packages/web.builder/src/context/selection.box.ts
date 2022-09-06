import type { XYCoord } from 'react-dnd';
import { createStore } from 'tiamut';

export type SelectionBox = {
  start: XYCoord;
  end?: XYCoord;
};

/**
 * This store records the context in which the user mousedown and start dragging
 * until mouse up to highlight
 */
export const selectionBox = createStore({
  initialState: null as SelectionBox | null,
  actions: {
    init(_, start: XYCoord) {
      return {
        start,
      };
    },
    setEnd(state, end: XYCoord) {
      return {
        ...state,
        end,
      };
    },
    clear() {
      return null;
    },
  },
});
