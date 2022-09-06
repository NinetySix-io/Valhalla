import { useEvent } from '@valhalla/web.react';
import { useStore } from '../../context/scope.provider';

/**
 * It sets the focused element to undefined and the selections to an empty object when the user clicks
 * outside of the zone
 * @param {HTMLDivElement} container - HTMLDivElement
 */
export function useContainerClick(container: HTMLDivElement) {
  const store = useStore();
  // const setFocusedElement = useScopeAtomMutate(focusedElementAtom);
  // const setSelections = useScopeAtomMutate(selectionsAtom);

  useEvent(container, 'mouseup', (event) => {
    /**
     * If clicking outside of the element, in this case, the zone,
     * it would lose focus
     */
    const target = event.target as HTMLElement;
    if (container.isSameNode(target)) {
      store.actions.focusedElement.clear();
      store.actions.selections.clear();
    }
  });
}
