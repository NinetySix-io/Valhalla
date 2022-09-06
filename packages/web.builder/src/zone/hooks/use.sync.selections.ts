import type { DroppedElement } from '../../types';
import React from 'react';
import isEmpty from 'lodash.isempty';
import isNil from 'lodash.isnil';
import keyBy from 'lodash.keyby';
import { useStore } from '../../context/scope.provider';

export function useSyncSelections(value: Array<DroppedElement>) {
  const store = useStore();

  React.useEffect(() => {
    const current = store.getState().selections;
    store.actions.selections.replace(
      isEmpty(current)
        ? current
        : keyBy(
            value.filter((item) => !isNil(current[item.id])),
            (item) => item.id,
          ),
    );
  }, [store, value]);
}
