import * as React from 'react';

import type { Droppable, DroppedElement } from '../types';

import { DropItem } from '../drop.item';
import { ElementFactory } from '../element.factory';

type Props<T extends Droppable> = {
  element: DroppedElement<T>;
  onChange?: (element: DroppedElement<T>) => void;
};

function Item<T extends Droppable>({ element, onChange }: Props<T>) {
  return (
    <DropItem
      key={element.id}
      element={element}
      onChange={(el) => onChange(el as DroppedElement<T>)}
    >
      <ElementFactory value={element} />
    </DropItem>
  );
}

export const DropZoneItem = React.memo(Item);
