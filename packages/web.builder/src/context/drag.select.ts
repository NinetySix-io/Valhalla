import * as React from 'react';

import { DragCarry, dragCarryAtom } from './drag.carry';
import { useEvent, useThrottleCallback } from '@valhalla/web.react';
import { useScopeAtomMutate, useScopeAtomValueFetch } from './index';

import { XYCoord } from 'react-dnd';
import { atom } from 'jotai';
import { dragToRect } from '../lib/rectangle/drag.to.rect';
import { droppedElementsAtom } from './dropped.elements';
import { htmlToRect } from '../lib/rectangle/html.to.rect';
import { isTouching } from '../lib/rectangle/collision';

/**
 * This atom records the context in which the user mousedown and start dragging
 * until mouse up to highlight
 */
export const dragSelectHighlightAtom = atom(
  null as {
    start: XYCoord;
    end?: XYCoord;
  },
);

/**
 * Listen to mouse activity and set the state of drag select
 */
export function useDragSelectHighlight() {
  const ref = React.useRef<HTMLDivElement>();
  const mutate = useScopeAtomMutate(dragSelectHighlightAtom);
  const getDroppedElements = useScopeAtomValueFetch(droppedElementsAtom);
  const setDragCarry = useScopeAtomMutate(dragCarryAtom);

  const processHighlightedElements = useThrottleCallback(
    async (start: XYCoord, end: XYCoord) => {
      const dragBox = dragToRect(start, end);
      const elements = await getDroppedElements();
      const nextCarry: DragCarry = {};
      for (const value of Object.values(elements)) {
        if (isTouching(dragBox, htmlToRect(value.ref))) {
          nextCarry[value.element.id] = value.element;
        }
      }

      setDragCarry(nextCarry);
    },
    100,
  );

  function isSameRef(target: EventTarget): target is HTMLElement {
    const element = target as HTMLElement;
    return ref.current.isSameNode(element);
  }

  function getCoordinates(event: MouseEvent): XYCoord {
    return {
      x: event.clientX,
      y: event.clientY,
    };
  }

  useEvent(window, 'mousedown', (event) => {
    if (isSameRef(event.target)) {
      mutate({
        start: getCoordinates(event),
      });
    }
  });

  useEvent(window, 'mouseup', async () => {
    mutate(null);
  });

  useEvent(window, 'mousemove', (event) => {
    mutate((current) => {
      if (current) {
        const start = current.start;
        const end = getCoordinates(event);
        processHighlightedElements(start, end);
        return { start, end };
      }

      return current;
    });
  });

  return ref;
}
