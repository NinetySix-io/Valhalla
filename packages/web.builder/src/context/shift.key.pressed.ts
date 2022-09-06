import { KeyCode, useOneOfKeyPressed } from '@valhalla/web.react';

import { createStore } from 'tiamut';

export const isShiftKeyPressed = createStore({
  initialState: false,
  actions: {},
});

/**
 * It listens to the Shift key and updates the `shiftKeyPressedAtom` accordingly
 */
export function useListenToShiftKey() {
  useOneOfKeyPressed([KeyCode.Shift, KeyCode.Command], {
    onKeyDown() {
      isShiftKeyPressed.setState(true);
    },
    onKeyUp() {
      isShiftKeyPressed.setState(false);
    },
  });
}
