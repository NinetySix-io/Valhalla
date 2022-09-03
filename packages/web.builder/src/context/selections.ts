import { isDraggingAtom, useScopeAtomMutate, useScopeAtomValue } from '.';

import { DroppedElement } from '../types';
import { atom } from 'jotai';
import omit from 'lodash.omit';

export type Selections = Record<DroppedElement['id'], DroppedElement>;
export const selectionsAtom = atom({} as Selections);

/**
 * It returns an object with a bunch of properties that tell you whether the element is being selected,
 * whether it's being dragged, and whether it's being dragged as part of a multi-select
 */
export function useSelections(element: DroppedElement) {
  const selections = useScopeAtomValue(selectionsAtom);
  const isDragging = useScopeAtomValue(isDraggingAtom);
  const setSelections = useScopeAtomMutate(selectionsAtom);
  const carries = Object.values(selections);
  const isBeingSelected = carries.some((item) => item.id === element.id);
  const isMultiSelected = carries.length > 1;
  const isMultiDragging = isDragging && isBeingSelected;

  function add(append?: boolean) {
    const next: Selections = { [element.id]: element };
    setSelections((current) =>
      append ? Object.assign({}, current, next) : next,
    );
  }

  function remove() {
    setSelections((current) => omit(current, element.id));
  }

  return {
    add,
    remove,
    isBeingSelected,
    isMultiSelected,
    isMultiDragging,
  };
}
