import * as React from 'react';

import { useEvent, useThrottleCallback } from '@valhalla/web.react';

import { Rectangle } from '../lib/rectangle';
import type { SectionState } from '../../store';
import type { XYCoord } from '@app/components/editors/page.editor/types';
import { useSectionStore } from '../../scope.provider';

/**
 * Listen to mouse activity and set the state of drag select
 */
export function useSelectionBoxListener<T extends HTMLElement>(container: T) {
  const store = useSectionStore();
  const startPos = React.useRef<XYCoord>();

  const processHighlightedElements = useThrottleCallback((rect: Rectangle) => {
    const elements = Object.values(store.getState().elements);
    const next: SectionState['selections'] = [];

    for (const element of elements) {
      if (rect.isTouching(Rectangle.fromHtmlElement(element.ref))) {
        next.push(element.id);
      }
    }

    store.actions.overwriteSelections(next);
  }, 100);

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
      startPos.current = getCoordinates(event);
      store.getState().focused && store.actions.removeFocus();
    }
  });

  useEvent(window, 'mouseup', () => {
    store.actions.setSelectionBox(null);
    startPos.current = null;
  });

  useEvent(window, 'mousemove', (event) => {
    const start = startPos.current;
    if (!start) {
      return;
    }

    const end = getCoordinates(event);
    const rectangle = Rectangle.fromCoordinates(start, end);
    store.actions.setSelectionBox(rectangle);
    processHighlightedElements(rectangle);
  });
}
