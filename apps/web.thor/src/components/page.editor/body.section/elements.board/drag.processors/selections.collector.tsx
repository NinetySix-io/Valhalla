import * as React from 'react';

import isNil from 'lodash.isnil';
import { useSectionStore } from '../../scope.provider';

export const SelectionsCollector: React.FC = () => {
  const store = useSectionStore();
  const elements = store.useSelect((state) => state.elements);

  React.useEffect(() => {
    const selections = store.getState().selections;
    const nextSelections = selections.filter(
      (selectedId) => !isNil(elements[selectedId]),
    );

    if (selections.length !== nextSelections.length) {
      store.actions.overwriteSelections(nextSelections);
    }
  }, [elements, store]);

  return null;
};
