import { EditorStore } from '../../store';
import { useSectionId } from '../scope.provider';

export function useHelperDisplay() {
  const sectionId = useSectionId();
  const isVisible = EditorStore.useSelect(
    (state) => !state.isDragging && state.activeSection === sectionId,
  );

  return isVisible;
}
