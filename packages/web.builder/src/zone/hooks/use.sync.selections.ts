import React from 'react';
import type { Selections } from '../../context/selections';
import isEmpty from 'lodash.isempty';
import isNil from 'lodash.isnil';
import { useStore } from '../../context/scope.provider';

export function useSyncSelections() {
  const store = useStore();
  const elements = store.useSelect((state) => state.droppedElements);

  React.useEffect(() => {
    const current = store.getState().selections;
    if (!isEmpty(current)) {
      // Remove invalid selections
      const nextSelections: Selections = {};
      for (const key of Object.keys(current)) {
        if (!isNil(elements[key])) {
          nextSelections[key] = elements[key].element;
        }
      }

      store.actions.selections.replace(nextSelections);
    }
  }, [store, elements]);
}
