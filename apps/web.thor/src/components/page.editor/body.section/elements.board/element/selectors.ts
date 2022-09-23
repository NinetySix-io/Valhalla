import type { BoardElement } from '@app/components/page.editor/types';
import type { SectionState } from '../../store';

export function selectIsMultiSelected(element: BoardElement) {
  return (state: SectionState) =>
    state.selections.length > 1 && state.selections.includes(element.id);
}

export function selectMoveTransform(element: BoardElement) {
  return (state: SectionState) =>
    state.selections.includes(element.id) ? state.dragDelta : undefined;
}
