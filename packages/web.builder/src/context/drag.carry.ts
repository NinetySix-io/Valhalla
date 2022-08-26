import { useScopeAtomMutate, useScopeAtomValue } from '.';

import { DroppedElement } from '../types';
import { atom } from 'jotai';

export const dragCarryAtom = atom([] as Array<DroppedElement>);

export function useDragCarryMutate(element: DroppedElement) {
  const setDragCarry = useScopeAtomMutate(dragCarryAtom);

  function add(append?: boolean) {
    if (append) {
      setDragCarry((current) =>
        current.some((item) => item.id === element.id)
          ? current
          : [...current, element],
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
