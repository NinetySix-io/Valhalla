import { useEmitter } from './use.emitter';
import { useSectionStore } from '../../scope.provider';

/**
 * Return scoped emitter
 */
export function useSectionEmitter() {
  const store = useSectionStore();
  const emitter = store.useSelect((state) => state.emitter);
  return useEmitter(emitter);
}
