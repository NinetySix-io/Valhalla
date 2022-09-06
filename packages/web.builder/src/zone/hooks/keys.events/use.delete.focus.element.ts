import { KeyCode, useOneOfKeyPressed } from '@valhalla/web.react';

import type { Selections } from '../../../context/selections';
import isEmpty from 'lodash.isempty';
import { useStore } from '../../../context/scope.provider';

/**
 * "It calls a callback when the user presses the delete key and there are elements selected."
 */
export function useDeleteFocusElement(
  callback: (elements: Selections) => void,
) {
  const store = useStore();

  useOneOfKeyPressed([KeyCode.Delete, KeyCode.Backspace], {
    onKeyDown() {
      if (!isEmpty(store.getState().selections) && callback) {
        callback(store.getState().selections);
      }
    },
  });
}
