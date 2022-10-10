import type { PageElement } from '../../../types';
import { Rectangle } from '../lib/rectangle';
import type { SectionState } from '../../store';
import { createSectionSelector } from '../../store/selector';

function createElementSelector<T, E extends PageElement>(
  selector: (state: SectionState, element: E) => T,
) {
  return (element: E) =>
    createSectionSelector((state) => selector(state, element));
}

/**
 * It returns a function that takes a state and returns true if the state's selections array has more
 * than one element and the state's selections array includes the element's id
 */
export const selectIsMultiSelected = createElementSelector(
  (state, element) =>
    state.selections.length > 1 && state.selections.includes(element.id),
);

/**
 * "If the element is selected, return the drag delta, otherwise return undefined."
 */
export const selectMoveTransform = createElementSelector((state, element) =>
  state.selections.includes(element.id) ? state.dragDelta : undefined,
);

/**
 * If the element is being dragged, and it's not the element being dragged, and it's not already
 * selected, and it's close to the element being dragged, then it should be selected.
 */
export const selectShouldPeakWhenClose = createElementSelector(
  (state, element) =>
    state.dragging &&
    state.dragging.id !== element.id &&
    !state.selections.includes(element.id) &&
    Rectangle.fromPageElement(state.dragging)
      .expand(1)
      .isTouching(Rectangle.fromPageElement(element)),
);

/**
 * Returns a function that returns true if the element is being resized
 */
export const selectIsResizing = createElementSelector(
  (state, element) => state.resizing && state.resizing === element.id,
);

export const selectIsDragging = createElementSelector(
  (state, element) => state.dragging && state.dragging.id === element.id,
);
