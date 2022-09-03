import * as React from 'react';

import { Selections, selectionsAtom } from './selections';
import { useEvent, useThrottleCallback } from '@valhalla/web.react';
import { useScopeAtomMutate, useScopeAtomValueFetch } from './index';

import { Rectangle } from '../lib/rectangle';
import { XYCoord } from 'react-dnd';
import { atom } from 'jotai';
import { droppedElementsAtom } from './dropped.elements';

/**
 * This atom records the context in which the user mousedown and start dragging
 * until mouse up to highlight
 */
export const selectionBoxAtom = atom(
  null as {
    start: XYCoord;
    end?: XYCoord;
  },
);

/**
 * Listen to mouse activity and set the state of drag select
 */
export function useSelectionBoxFocus() {
  const ref = React.useRef<HTMLDivElement>();
  const mutate = useScopeAtomMutate(selectionBoxAtom);
  const getDroppedElements = useScopeAtomValueFetch(droppedElementsAtom);
  const setSelections = useScopeAtomMutate(selectionsAtom);

  const processHighlightedElements = useThrottleCallback(
    async (start: XYCoord, end: XYCoord) => {
      const dragBox = Rectangle.fromCoordinates(start, end);
      const elements = await getDroppedElements();
      const next: Selections = {};
      for (const value of Object.values(elements)) {
        if (!value.ref) {
          continue;
        } else if (dragBox.isTouching(Rectangle.fromHtmlElement(value.ref))) {
          next[value.element.id] = value.element;
        }
      }

      setSelections(next);
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
        return {
          start,
          end,
        };
      }

      return current;
    });
  });

  return ref;
}
