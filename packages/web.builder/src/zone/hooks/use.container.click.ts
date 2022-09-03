import { focusedElementAtom } from '../../context/focus.element';
import { selectionsAtom } from '../../context/selections';
import { useEvent } from '@valhalla/web.react/src';
import { useScopeAtomMutate } from '../../context';

/**
 * It sets the focused element to undefined and the selections to an empty object when the user clicks
 * outside of the zone
 * @param {HTMLDivElement} container - HTMLDivElement
 */
export function useContainerClick(container: HTMLDivElement) {
  const setFocusedElement = useScopeAtomMutate(focusedElementAtom);
  const setSelections = useScopeAtomMutate(selectionsAtom);

  useEvent(container, 'mouseup', (event) => {
    /**
     * If clicking outside of the element, in this case, the zone,
     * it would lose focus
     */
    const target = event.target as HTMLElement;
    if (container.isSameNode(target)) {
      setFocusedElement(undefined);
      setSelections({});
    }
  });
}
