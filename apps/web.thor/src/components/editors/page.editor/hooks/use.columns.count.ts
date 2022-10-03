import { EditorStore } from '../store';
import { SCREEN_SIZE_CONFIG } from '../constants';

export function useColumnsCount() {
  const size = EditorStore.useSelect((state) => state.size);
  return SCREEN_SIZE_CONFIG[size].columns;
}

export function getColumnsCount() {
  const size = EditorStore.getState().size;
  return SCREEN_SIZE_CONFIG[size].columns;
}
