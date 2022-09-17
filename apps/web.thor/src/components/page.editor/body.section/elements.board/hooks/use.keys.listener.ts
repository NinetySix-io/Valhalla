import { KeyCode, useOneOfKeyPressed } from '@valhalla/web.react';

import type { DroppedElement } from '@app/components/page.editor/types';
import { Emitter } from '../emitter';
import { useSectionStore } from '../../scope.provider';

/**
 * It listens for the shift key to be pressed and released, and updates the store accordingly
 */
export function useShiftKeyListener() {
  const store = useSectionStore();

  useOneOfKeyPressed([KeyCode.Shift, KeyCode.Command], (status) =>
    store.actions.setHoldingDownShiftKey(status === 'keydown'),
  );
}

/**
 * It listens for the delete key to be pressed, and if it is, it deletes all selected elements
 */
export function useDeleteKeyListener() {
  const store = useSectionStore();

  useOneOfKeyPressed([KeyCode.Delete, KeyCode.Backspace], (status) => {
    if (status !== 'keydown') {
      return;
    }

    const { selections, elements } = store.getState();
    const deleted: DroppedElement['id'][] = [];

    for (const elementId of Object.keys(elements)) {
      if (selections.includes(elementId)) {
        deleted.push(elementId);
      }
    }

    Emitter.emit('elementsDeleted', deleted);
  });
}
