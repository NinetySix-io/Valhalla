import {
  DragSourceHookSpec,
  FactoryOrInstance,
  useDrag,
  useDrop,
} from 'react-dnd';
import { Droppable, DroppedElement } from '../types';

import React from 'react';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { useZoneId } from '.';

export function useScopeDrop<
  T extends Droppable,
  E extends DroppedElement<T>,
>() {
  const zoneId = useZoneId();
  return useDrop<E>(() => ({ accept: zoneId }), [zoneId]);
}

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

  React.useEffect(() => {
    preview(getEmptyImage());
  }, [preview]);

  return [drag, collected] as const;
}
