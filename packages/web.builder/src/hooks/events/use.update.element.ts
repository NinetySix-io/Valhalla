import type { DroppedElement } from '../../types';
import { builderEvents } from '../../lib/events';
import { useSubscription } from '../use.subscription';

/**
 * UseUpdateElement is a React hook that subscribes to the elementsUpdated event and calls the callback
 * function with the updated elements.
 */
export function useUpdateElement(cb: (element: DroppedElement[]) => void) {
  useSubscription(
    () =>
      builderEvents.addListener('elementsUpdated', (elements) => {
        cb(elements);
      }),
    [cb],
  );
}
