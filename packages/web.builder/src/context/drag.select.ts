import * as React from 'react';

import { XYCoord } from 'react-dnd';
import { atom } from 'jotai';
import { useEvent } from '@valhalla/web.react/src';
import { useScopeAtomMutate } from '.';

/**
 * This atom records the context in which the user mousedown and start dragging
 * until mouse up to highlight
 */
export const dragSelectHighlightAtom = atom(
  null as {
    start: XYCoord;
    end: XYCoord;
  },
);

/**
 * Listen to mouse activity and set the state of drag select
 */
export function useDragSelectHighlight() {
  const ref = React.useRef<HTMLDivElement>();
  const mutate = useScopeAtomMutate(dragSelectHighlightAtom);

  function isSameRef(target: EventTarget): target is HTMLElement {
    const element = target as HTMLElement;
    return ref.current.isSameNode(element);
  }

  function getCoordinates(event: MouseEvent): XYCoord {
    return { x: event.clientX, y: event.clientY };
  }

  useEvent(window, 'mousedown', (event) => {
    if (isSameRef(event.target)) {
      const coordinates = getCoordinates(event);
      mutate({ start: coordinates, end: coordinates });
    }
  });

  useEvent(window, 'mouseup', () => {
    mutate(null);
  });

  useEvent(window, 'mousemove', (event) => {
    mutate((current) =>
      !current
        ? null
        : {
            ...current,
            end: getCoordinates(event),
          },
    );
  });

  return ref;
}
