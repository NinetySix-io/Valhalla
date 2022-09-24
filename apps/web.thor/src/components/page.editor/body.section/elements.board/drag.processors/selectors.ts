import { createSectionSelector } from '../../store/selector';
import { getMaxBBox } from '../lib/get.max.bbox';

export const selectIsMultiSelected = createSectionSelector(
  (state) => state.selections.length > 1,
);

export const selectSelectedElements = createSectionSelector((state) =>
  state.selections.map((selected) => state.elements[selected]),
);

export const selectSelectionBBox = createSectionSelector((state) =>
  selectIsMultiSelected(state)
    ? getMaxBBox(selectSelectedElements(state))
    : undefined,
);
