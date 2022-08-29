import { dragCarryAtom } from '../../context/drag.carry';
import { focusedElementAtom } from '../../context/focus.element';
import { useEvent } from '@valhalla/web.react/src';
import { useScopeAtomMutate } from '../../context';

/**
 * It listens to the mouseup event on the container, and if the target is the container, it clears the
 * focused element and the drag carry
 */
export function useContainerClick(container: HTMLDivElement) {
  const setFocusedElement = useScopeAtomMutate(focusedElementAtom);
  const setDragCarry = useScopeAtomMutate(dragCarryAtom);

  useEvent(container, 'mouseup', (event) => {
    /**
     * If clicking outside of the element, in this case, the zone,
     * it would lose focus
     */
    const target = event.target as HTMLElement;
    if (container.isSameNode(target)) {
      setFocusedElement(undefined);
      setDragCarry({});
    }
  });
}
