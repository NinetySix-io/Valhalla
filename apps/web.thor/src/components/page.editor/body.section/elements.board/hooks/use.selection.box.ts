import { useEvent, useThrottleCallback } from '@valhalla/web.react';

import { Rectangle } from '../lib/rectangle';
import type { SectionState } from '../../store';
import type { XYCoord } from 'react-dnd';
import { useSectionStore } from '../../scope.provider';

/**
 * Listen to mouse activity and set the state of drag select
 */
export function useSelectionBoxListener<T extends HTMLElement>(container: T) {
  const store = useSectionStore();

  const processHighlightedElements = useThrottleCallback(
    (start: XYCoord, end: XYCoord) => {
      const dragBox = Rectangle.fromCoordinates(start, end);
      const elements = store.getState().elements;
      const next: SectionState['selections'] = [];

      for (const { getElement, getRef } of Object.values(elements)) {
        const element = getElement();
        const elementRef = getRef();

        if (!elementRef) {
          continue;
        } else if (dragBox.isTouching(Rectangle.fromHtmlElement(elementRef))) {
          next.push(element.id);
        }
      }

      store.actions.overwriteSelections(next);
    },
    100,
  );

  function isSameRef(target: EventTarget): target is HTMLElement {
    const element = target as HTMLElement;
    return container.isSameNode(element);
  }

  function getCoordinates(event: MouseEvent): XYCoord {
    return {
      x: event.clientX,
      y: event.clientY,
    };
  }

  useEvent(window, 'mousedown', (event) => {
    if (isSameRef(event.target)) {
      store.actions.startSelectionBox(getCoordinates(event));
    }
  });

  useEvent(window, 'mouseup', () => {
    store.actions.clearSelectionBox();
  });

  useEvent(window, 'mousemove', (event) => {
    const start = store.getState().selectionBox?.start;
    if (start) {
      const end = getCoordinates(event);
      store.actions.setSelectionBoxEnd(end);
      processHighlightedElements(start, end);
    }
  });
}
