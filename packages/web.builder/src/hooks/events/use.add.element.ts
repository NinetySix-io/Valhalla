import { Droppable, DroppedElement } from '../../types';

import { useBuilderEvents } from './use.builder.events';

export function useAddElement<T extends Droppable>(
  cb: (element: Omit<DroppedElement<T>, 'id'>) => void,
) {
  useBuilderEvents('elementAdded', (element) => {
    cb(element as Omit<DroppedElement<T>, 'id'>);
  });
}
