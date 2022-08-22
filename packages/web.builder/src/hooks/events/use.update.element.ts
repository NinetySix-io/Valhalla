import { Droppable, DroppedElement } from '../../types';

import { builderEvents } from '../../lib/events';
import { useSubscription } from '../use.subscription';

export function useUpdateElement<T extends Droppable>(
  cb: (element: DroppedElement<T>[]) => void,
) {
  useSubscription(() =>
    builderEvents.addListener('elementsUpdated', (elements) => {
      cb(elements as DroppedElement<T>[]);
    }),
  );
}
