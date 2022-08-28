import * as React from 'react';

import { useScopeAtomMutate, useScopeAtomValue } from '.';

import { XYCoord } from 'react-dnd';
import { atom } from 'jotai';
import { boxToRect } from '../lib/rectangle/box.to.rect';
import { htmlToRect } from '../lib/rectangle/html.to.rect';
import { isTouching } from '../lib/rectangle/collision';
import { useEvent } from '@valhalla/web.react';

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
    return {
      x: event.clientX,
      y: event.clientY,
    };
  }

  useEvent(window, 'mousedown', (event) => {
    if (isSameRef(event.target)) {
      mutate({
        start: getCoordinates(event),
        end: getCoordinates(event),
      });
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

/**
 * UseDragHighLightBox returns a box object that represents the current drag selection box.
 */
export function useDragHighLightBox() {
  const mouse = useScopeAtomValue(dragSelectHighlightAtom);
  if (!mouse) {
    return null;
  }

  const width = Math.abs(mouse.end.x - mouse.start.x);
  const height = Math.abs(mouse.end.y - mouse.start.y);
  const left = mouse.end.x - mouse.start.x < 0 ? mouse.end.x : mouse.start.x;
  const top = mouse.end.y - mouse.start.y < 0 ? mouse.end.y : mouse.start.y;
  return {
    left,
    top,
    width,
    height,
  };
}

export function useElementDragHighlight(element?: HTMLElement): boolean {
  const box = useDragHighLightBox();
  return box && element
    ? isTouching(boxToRect(box), htmlToRect(element))
    : false;
}
