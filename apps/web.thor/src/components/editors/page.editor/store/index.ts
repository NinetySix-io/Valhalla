import { createStore, createStoreHook, withImmer } from 'tiamut';

import { ScreenSize } from '../constants';

type State = {
  size: ScreenSize;
  cellSize?: number;
  activeSection?: string;
  isDragging: boolean;
};

const initialState: State = {
  size: ScreenSize.DESKTOP,
  isDragging: false,
};

const store = createStore(
  withImmer({
    initialState,
    actions: {
      setIsDragging(state, isDragging: State['isDragging']) {
        state.isDragging = isDragging;
      },
      setActiveSection(state, active: State['activeSection']) {
        state.activeSection = active;
      },
      setSize(state, size: State['size']) {
        state.size = size;
      },
      setCellSize(state, size: State['cellSize']) {
        state.cellSize = size;
      },
    },
  }),
);

export const EditorStore = {
  ...createStoreHook(store),
  setState: store.setState,
};
