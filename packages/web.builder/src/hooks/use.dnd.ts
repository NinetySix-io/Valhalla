import type { DragSourceHookSpec, FactoryOrInstance } from 'react-dnd';
import type { Droppable, DroppedElement } from '../types';
import { useDrag, useDrop } from 'react-dnd';

import { useZoneId } from '../context/scope.provider';

/**
 * `useScopeDrop` is a hook that returns a `useDrop` hook that accepts only elements that have the same
 * zone id as the current zone
 * @returns A function that takes a callback and returns a function that takes an array of elements.
 */
export function useScopeDrop<
  T extends Droppable,
  E extends DroppedElement<T>,
>() {
  const zoneId = useZoneId();
  return useDrop<E>(() => ({ accept: zoneId }), [zoneId]);
}

/**
 * It's a wrapper around `useDrag` that automatically sets the `type` to the current zone ID
 * @param {DragObject} element - The element that is being dragged.
 * @param param - FactoryOrInstance<
 * @returns [drag, collected] as const;
 */
export function useScopeDrag<
  T extends Droppable,
  DragObject extends DroppedElement<T> = DroppedElement<T>,
  DropResult = unknown,
  CollectedProps = unknown,
>(
  element: DragObject,
  param: FactoryOrInstance<
    Omit<
      DragSourceHookSpec<DragObject, DropResult, CollectedProps>,
      'type' | 'element'
    >
  >,
) {
  const zoneId = useZoneId();
  const [collected, drag, preview] = useDrag<
    DragObject,
    DroppedElement,
    CollectedProps
  >(
    {
      type: zoneId,
      item: element,
      ...param,
    },
    [zoneId, element],
  );

  return [drag, collected, preview] as const;
}
