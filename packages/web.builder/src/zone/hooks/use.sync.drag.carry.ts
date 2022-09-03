import { DroppedElement } from '../../types';
import React from 'react';
import { dragCarryAtom } from '../../context/drag.carry';
import isEmpty from 'lodash.isempty';
import isNil from 'lodash.isnil';
import keyBy from 'lodash.keyby';
import { useScopeAtomMutate } from '../../context';

/**
 * "It sets the drag carry atom to the value of the passed in array, but only if the drag carry atom is
 * empty."
 *
 * The drag carry atom is a map of the elements that are currently being dragged. The value passed in
 * is an array of the elements that are currently being dragged
 */
export function useSyncDragCarry(value: Array<DroppedElement>) {
  const setDragCarry = useScopeAtomMutate(dragCarryAtom);

  React.useEffect(() => {
    setDragCarry((current) =>
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
