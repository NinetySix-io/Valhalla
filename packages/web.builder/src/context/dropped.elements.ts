import * as React from 'react';

import { DroppedElement } from '../types';
import { atom } from 'jotai';
import { useScopeAtomMutate } from '.';

export const droppedElementsAtom = atom(
  {} as Record<
    string,
    {
      element: DroppedElement;
      ref: HTMLElement;
    }
  >,
);

export function useDroppedElementRegister(
  element: DroppedElement,
  ref: HTMLElement,
) {
  const previous = React.useRef<DroppedElement>();
  const setElements = useScopeAtomMutate(droppedElementsAtom);

  React.useEffect(() => {
    const previousId = previous.current?.id;
    const currentId = element.id;
    const isSameId = previousId === currentId;

    setElements((current) => {
      const next = { ...current, [currentId]: { element, ref } };
      if (previousId && !isSameId) {
        delete next[previousId];
      }

      return next;
    });

    previous.current = element;
  }, [element, ref, setElements]);
}
