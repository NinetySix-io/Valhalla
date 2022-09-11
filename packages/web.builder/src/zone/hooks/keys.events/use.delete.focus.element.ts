import { KeyCode, useOneOfKeyPressed } from '@valhalla/web.react';

import type { DroppedElement } from '../../../types';
import { useStore } from '../../../context/scope.provider';

/**
 * It deletes the selected elements from the store
 */
export function useDeleteFocusElement(
  onDelete?: (next: DroppedElement[], deleted: DroppedElement[]) => void,
) {
  const store = useStore();

  useOneOfKeyPressed([KeyCode.Delete, KeyCode.Backspace], {
    onKeyDown() {
      if (!onDelete) {
        return;
      }

      const selections = store.getState().selections;
      const onDeck = store.getState().droppedElements;
      const next: DroppedElement[] = [];
      const deleted: DroppedElement[] = [];
      for (const elementId of Object.keys(onDeck)) {
        if (selections[elementId]) {
          deleted.push(selections[elementId]);
        } else {
          next.push(onDeck[elementId].element);
        }
      }

      onDelete(next, deleted);
    },
  });
}
