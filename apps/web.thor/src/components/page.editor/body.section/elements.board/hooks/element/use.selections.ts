import type { DroppedElement } from '@app/components/page.editor/types';
import { useSectionStore } from '../../../scope.provider';

/**
 * Hook to handle selection state
 */
export function useElementSelections(element: DroppedElement) {
  const store = useSectionStore();
  const selections = store.useSelect((state) => state.selections);
  const isDragging = store.useSelect((state) => Boolean(state.dragging));
  const isBeingSelected = selections.some((item) => item === element.id);
  const isMultiSelected = selections.length > 1;
  const isMultiDragging = isDragging && isBeingSelected && isMultiSelected;

  function set() {
    store.actions.setSelection(element.id, true);
  }

  function add() {
    store.actions.setSelection(element.id);
  }

  function remove() {
    store.actions.removeSelection(element.id);
  }

  return {
    set,
    add,
    remove,
    isBeingSelected,
    isMultiSelected,
    isMultiDragging,
  };
}
