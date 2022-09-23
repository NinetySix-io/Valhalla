import type { BoardElement } from '@app/components/page.editor/types';
import { Rectangle } from '../lib/rectangle';
import type { SectionState } from '../../store';

/**
 * It returns a function that takes a state and returns true if the state's selections array has more
 * than one element and the state's selections array includes the element's id
 */
export function selectIsMultiSelected(element: BoardElement) {
  return (state: SectionState) =>
    state.selections.length > 1 && state.selections.includes(element.id);
}

/**
 * "If the element is selected, return the drag delta, otherwise return undefined."
 */
export function selectMoveTransform(element: BoardElement) {
  return (state: SectionState) =>
    state.selections.includes(element.id) ? state.dragDelta : undefined;
}

/**
 * If the element is being dragged, and it's not the element being dragged, and it's not already
 * selected, and it's close to the element being dragged, then it should be selected.
 */
export function selectShouldPeakWhenClose(element: BoardElement) {
  return (state: SectionState) =>
    state.dragging &&
    state.dragging.id !== element.id &&
    !state.selections.includes(element.id) &&
    Rectangle.fromBoardElement(state.dragging)
      .expand(1)
      .isTouching(Rectangle.fromBoardElement(element));
}
