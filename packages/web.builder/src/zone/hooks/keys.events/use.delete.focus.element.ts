import { KeyCode, useOneOfKeyPressed } from '@valhalla/web.react/src';
import { Selections, selectionsAtom } from '../../../context/selections';

import isEmpty from 'lodash.isempty';
import { useScopeAtomValue } from '../../../context';

/**
 * "It calls a callback when the user presses the delete key and there are elements selected."
 */
export function useDeleteFocusElement(
  callback: (elements: Selections) => void,
) {
  const selections = useScopeAtomValue(selectionsAtom);
  useOneOfKeyPressed([KeyCode.Delete, KeyCode.Backspace], {
    onKeyDown() {
      if (!isEmpty(selections) && callback) {
        callback(selections);
      }
    },
  });
}
