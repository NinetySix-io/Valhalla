import { useScopeAtomMutate, useScopeAtomValue } from '.';

import { DroppedElement } from '../types';
import { atom } from 'jotai';
import { uniqBy } from '@valhalla/utilities';

export const dragCarryAtom = atom([] as Array<DroppedElement>);

/**
 * It returns an object with two functions, `add` and `remove`, which mutate the `dragCarryAtom` to add
 * or remove the given `element`
 * @param {DroppedElement} element - DroppedElement - The element that is being dragged.
 * @returns An object with two functions, add and remove.
 */
export function useDragCarryMutate(element: DroppedElement) {
  const setDragCarry = useScopeAtomMutate(dragCarryAtom);

  function add(append?: boolean) {
    if (append) {
      setDragCarry((current) =>
        uniqBy([...current, element], (element) => element.id),
      );
    } else {
      setDragCarry([element]);
    }
  }

  function remove() {
    setDragCarry((current) => current.filter((item) => item.id !== element.id));
  }

  return {
    add,
    remove,
  };
}

export function useDragCarryState(element: DroppedElement) {
  const dragCarry = useScopeAtomValue(dragCarryAtom);
  const isBeingCarry = dragCarry.some((item) => item.id === element.id);
  const isMultiCarry = dragCarry.length > 1;

  return {
    isBeingCarry,
    isMultiCarry,
  };
}
