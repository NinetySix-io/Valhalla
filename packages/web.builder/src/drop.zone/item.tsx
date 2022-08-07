import * as React from 'react';

import { DropType, Droppable, DroppedItem } from '../types';

import { DropItem } from '../drop.item';
import { ElementFactory } from '../element.factory';

type Props<T extends Droppable> = {
  element: DroppedItem<T>;
  accepts: DropType;
};

function Item<T extends Droppable>({ element, accepts }: Props<T>) {
  return (
    <DropItem key={element.id} dropType={accepts} element={element}>
      <ElementFactory value={element} />
    </DropItem>
  );
}

export const DropZoneItem = React.memo(Item);
