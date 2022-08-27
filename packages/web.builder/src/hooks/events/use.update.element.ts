import { DroppedElement } from '../../types';
import { builderEvents } from '../../lib/events';
import { useSubscription } from '../use.subscription';

export function useUpdateElement(cb: (element: DroppedElement[]) => void) {
  useSubscription(
    () =>
      builderEvents.addListener('elementsUpdated', (elements) => {
        cb(elements);
      }),
    [cb],
  );
}
