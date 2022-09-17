import { useEvent } from './react.hooks';

/**
 * It will call the `onClick` function if the user clicks on the `element` specifically
 */
export function useTargetedClick<E extends HTMLElement>(
  element: E,
  onClick: (e: MouseEvent) => void,
) {
  useEvent(element, 'mouseup', (event) => {
    const target = event.target as HTMLElement;
    if (element.isSameNode(target)) {
      onClick?.(event);
    }
  });
}
