import * as React from 'react';

import type { XYCoord } from '@app/components/page.editor/types';
import isEmpty from 'lodash.isempty';
import { useClampElement } from '../hooks/use.element.clamp';
import { useSectionEmitter } from '../hooks/use.section.emitter';
import { useSectionStore } from '../../scope.provider';

export const DropCollector: React.FC = () => {
  const store = useSectionStore();
  const cacheDelta = React.useRef<XYCoord>();
  const emitter = useSectionEmitter();
  const selectionDelta = store.useSelect((state) => state.selectionDelta);
  const clampElement = useClampElement();

  /**
   * Updating the elements in the store.
   */
  React.useEffect(() => {
    if (!selectionDelta && cacheDelta.current) {
      const state = store.getState();
      const selections = state.selections;
      const elements = state.elements;

      if (!isEmpty(selections)) {
        const nextElements = Object.values(elements).map((element) =>
          selections.includes(element.id)
            ? clampElement(element, cacheDelta.current)
            : element,
        );

        emitter.client.emit('elementsUpdated', nextElements);
      }
    }

    cacheDelta.current = selectionDelta;
  }, [clampElement, emitter.client, selectionDelta, store]);

  return null;
};
