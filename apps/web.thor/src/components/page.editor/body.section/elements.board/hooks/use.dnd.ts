import type {
  BoardElement,
  DroppedElement,
} from '@app/components/page.editor/types';
import type { DragSourceHookSpec, FactoryOrInstance } from 'react-dnd';
import { useDrag, useDrop } from 'react-dnd';

import { useSectionId } from '../../scope.provider';

/**
 * It returns a drop ref that accepts elements with the same section id as the current section
 */
export function useSectionDrop<
  T extends BoardElement,
  E extends DroppedElement<T>,
>() {
  const sectionId = useSectionId();
  const [, dropRef] = useDrop<E>(
    () => ({
      accept: sectionId,
    }),
    [sectionId],
  );

  return dropRef;
}

/**
 * `useSectionDrag` is a wrapper around `useDrag` that adds a `type` to the `DragSourceHookSpec` based
 * on the current section id
 */
export function useSectionDrag<
  DragObject extends DroppedElement,
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
  const sectionId = useSectionId();
  const [collected, drag, preview] = useDrag<
    DragObject,
    DroppedElement,
    CollectedProps
  >(
    {
      type: sectionId,
      item: element,
      ...param,
    },
    [sectionId, element],
  );

  return [drag, collected, preview] as const;
}
