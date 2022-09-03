import { DroppedElement } from '../../types';
import React from 'react';
import isEmpty from 'lodash.isempty';
import isNil from 'lodash.isnil';
import keyBy from 'lodash.keyby';
import { selectionsAtom } from '../../context/selections';
import { useScopeAtomMutate } from '../../context';

export function useSyncSelections(value: Array<DroppedElement>) {
  const setSelections = useScopeAtomMutate(selectionsAtom);

  React.useEffect(() => {
    setSelections((current) =>
      isEmpty(current)
        ? current
        : keyBy(
            value.filter((item) => !isNil(current[item.id])),
            (item) => item.id,
          ),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
}
