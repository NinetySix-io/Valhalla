import { isDraggingAtom, useScopeAtomMutate, useScopeAtomValue } from '.';

import { DroppedElement } from '../types';
import { atom } from 'jotai';
import omit from 'lodash.omit';

export type DragCarry = Record<DroppedElement['id'], DroppedElement>;
export const dragCarryAtom = atom({} as DragCarry);

/**
 * It returns an object with two functions, `add` and `remove`, which mutate the `dragCarryAtom` to add
 * or remove the given `element`
 * @param {DroppedElement} element - DroppedElement - The element that is being dragged.
 * @returns An object with two functions, add and remove.
 */
export function useDragCarryMutate(element: DroppedElement) {
  const setDragCarry = useScopeAtomMutate(dragCarryAtom);

  function add(append?: boolean) {
    const next: DragCarry = { [element.id]: element };
    setDragCarry((current) => (append ? Object.assign(current, next) : next));
  }

  function remove() {
    setDragCarry((current) => omit(current, element.id));
  }

  return {
    add,
    remove,
  };
}

export function useDragCarryState(element: DroppedElement) {
  const dragCarry = useScopeAtomValue(dragCarryAtom);
  const isDragging = useScopeAtomValue(isDraggingAtom);
  const carries = Object.values(dragCarry);
  const isBeingCarry = carries.some((item) => item.id === element.id);
  const isMultiCarry = carries.length > 1;
  const isMultiDragging = isDragging && isBeingCarry;

  return {
    isBeingCarry,
    isMultiCarry,
    isMultiDragging,
  };
}
