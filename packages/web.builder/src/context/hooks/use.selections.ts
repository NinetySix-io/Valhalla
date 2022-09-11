import type { DroppedElement } from '../../types';
import { useStore } from '../scope.provider';

/**
 * It returns an object with a bunch of properties that tell you whether the element is being selected,
 * whether it's being dragged, and whether it's being dragged as part of a multi-select
 */
export function useSelections(element: DroppedElement) {
  const store = useStore();
  const selections = store.useSelect((state) => state.selections);
  const isDragging = store.useSelect((state) => state.isDragging);
  const selectionList = Object.values(selections);
  const isBeingSelected = selectionList.some((item) => item.id === element.id);
  const isMultiSelected = selectionList.length > 1;
  const isMultiDragging = isDragging && isBeingSelected;

  function add(append?: boolean) {
    store.actions.selections.addElement(element, append);
  }

  function remove() {
    store.actions.selections.removeElement(element.id);
  }

  return {
    add,
    remove,
    isBeingSelected,
    isMultiSelected,
    isMultiDragging,
  };
}
