import * as React from 'react';

import { useEvent, useThrottleCallback } from '@valhalla/web.react/src';

import { Rectangle } from '../../lib/rectangle';
import type { Selections } from '../selections';
import type { XYCoord } from 'react-dnd';
import { useStore } from '../scope.provider';

/**
 * Listen to mouse activity and set the state of drag select
 */
export function useSelectionBoxFocus() {
  const store = useStore();
  const ref = React.useRef<HTMLDivElement>();

  const processHighlightedElements = useThrottleCallback(
    (start: XYCoord, end: XYCoord) => {
      const dragBox = Rectangle.fromCoordinates(start, end);
      const elements = store.getState().droppedElements;
      const next: Selections = {};

      for (const value of Object.values(elements)) {
        if (!value.ref) {
          continue;
        } else if (dragBox.isTouching(Rectangle.fromHtmlElement(value.ref))) {
          next[value.element.id] = value.element;
        }
      }

      store.actions.selections.replace(next);
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
      store.actions.selectionBox.init(getCoordinates(event));
    }
  });

  useEvent(window, 'mouseup', () => {
    store.actions.selectionBox.clear();
  });

  useEvent(window, 'mousemove', (event) => {
    const start = store.getState().selectionBox?.start;
    if (start) {
      const end = getCoordinates(event);
      store.actions.selectionBox.setEnd(end);
      processHighlightedElements(start, end);
    }
  });

  return ref;
}
