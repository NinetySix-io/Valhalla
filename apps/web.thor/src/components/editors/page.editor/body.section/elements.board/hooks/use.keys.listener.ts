import { KeyCode, useOneOfKeyPressed } from '@valhalla/web.react';

import type { PageElement } from '../../../types';
import { useSectionEmitter } from './use.section.emitter';
import { useSectionStore } from '../../scope.provider';

/**
 * It listens for the shift key to be pressed and released, and updates the store accordingly
 */
export function useShiftKeyListener() {
  const store = useSectionStore();
  const container = store.useSelect((state) => state.container);

  useOneOfKeyPressed(container, [KeyCode.Shift, KeyCode.Command], (status) =>
    store.actions.setHoldingDownShiftKey(status === 'keydown'),
  );
}

/**
 * It listens for the delete key to be pressed, and if it is, it deletes all selected elements
 */
export function useDeleteKeyListener() {
  const store = useSectionStore();
  const emitter = useSectionEmitter();
  const container = store.useSelect((state) => state.container);

  useOneOfKeyPressed(
    container,
    [KeyCode.Delete, KeyCode.Backspace],
    (status) => {
      if (status !== 'keydown') {
        return;
      }

      const { selections, elements, isEditingText } = store.getState();
      const deleted: PageElement['id'][] = [];
      if (isEditingText) {
        return;
      }

      for (const elementId of Object.keys(elements)) {
        if (selections.includes(elementId)) {
          deleted.push(elementId);
        }
      }

      emitter.client.emit('elementsDeleted', deleted);
    },
  );
}
