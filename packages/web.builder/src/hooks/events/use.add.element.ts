import type { AddedElement } from '../../types';
import { useBuilderEvents } from './use.builder.events';

/**
 * UseAddElement is a React hook that listens for elementAdded events and calls a callback function
 * with the element that was added.
 */
export function useAddElement(onAdd: (element: AddedElement) => void) {
  useBuilderEvents('elementAdded', (element) => {
    onAdd?.(element);
  });
}
