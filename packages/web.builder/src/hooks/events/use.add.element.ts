import { DroppedElement } from '../../types';
import { useBuilderEvents } from './use.builder.events';

export function useAddElement(
  cb: (element: Omit<DroppedElement, 'id'>) => void,
) {
  useBuilderEvents('elementAdded', (element) => {
    cb(element);
  });
}
