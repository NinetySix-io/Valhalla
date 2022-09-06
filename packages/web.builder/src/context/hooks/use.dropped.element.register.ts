import * as React from 'react';

import type { DroppedElement } from '../../types';
import { useStore } from '../scope.provider';

export function useDroppedElementRegister(
  element: DroppedElement,
  ref: HTMLElement,
) {
  const store = useStore();
  const previous = React.useRef<DroppedElement>();

  React.useEffect(() => {
    const previousId = previous.current?.id;
    const currentId = element.id;
    const isSameId = previousId === currentId;
    const shouldDelete = previousId && !isSameId;
    if (!isSameId && ref) {
      previous.current = element;
      store.actions.droppedElements.addElement({
        element,
        ref,
      });
    }

    if (shouldDelete) {
      store.actions.droppedElements.removeElement(previousId);
    }
  }, [element, ref, store]);
}
