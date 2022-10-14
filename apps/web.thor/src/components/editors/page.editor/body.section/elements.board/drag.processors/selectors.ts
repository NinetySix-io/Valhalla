import compact from 'lodash.compact';
import { createSectionSelector } from '../../store/selector';
import { getMaxBBox } from '../lib/get.max.bbox';

export const selectIsMultiSelected = createSectionSelector(
  (state) => state.selections.length > 1,
);

export const selectSelectedElements = createSectionSelector((state) =>
  compact(state.selections.map((selected) => state.elements[selected])),
);

export const selectSelectionBBox = createSectionSelector((state) =>
  selectIsMultiSelected(state)
    ? getMaxBBox(selectSelectedElements(state).map((e) => e.desktop))
    : undefined,
);
