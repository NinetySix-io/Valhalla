import type { SectionState } from '../../store';
import { getMaxBBox } from '../lib/get.max.bbox';

export function selectIsMultiSelected(state: SectionState) {
  return state.selections.length > 0;
}

export function selectSelectedElements(state: SectionState) {
  return state.selections.map((selectedId) => {
    return state.elements[selectedId];
  });
}

export function selectSelectionBBox(state: SectionState) {
  return selectIsMultiSelected(state)
    ? getMaxBBox(selectSelectedElements(state))
    : undefined;
}
