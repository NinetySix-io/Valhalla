import * as React from 'react';

import type { Droppable, DroppedElement } from '../types';
import { ZoneContext, useZoneId } from '../context';

import type { ConnectableElement } from 'react-dnd';
import { DropGrid } from '../drop.grid';
import { DropZoneItem } from './item';
import { cProps } from '@valhalla/web.react';
import { mergeRefs } from 'react-merge-refs';
import { uniqueId } from '@valhalla/utilities';
import { useAddElement } from '../hooks/events/use.add.element';
import { useBuilderEvents } from '../hooks/events/use.builder.events';
import { useDrop } from 'react-dnd';
import { useDropDimension } from '../hooks/use.dimension';
import { useUpdateElement } from '../hooks/events/use.update.element';

type Props<T extends Droppable> = cProps<{
  rowsCount: number;
  columnsCount: number;
  onAddItem?: (item: Omit<DroppedElement<T>, 'id'>) => void;
  onUpdateItems?: (item: DroppedElement<T>[]) => void;
  onRowExpand?: (rowsCount: number) => void;
  onElementFocus?: (elementId: string | undefined, zoneId: string) => void;
  onDragging?: (isDragging: boolean, zoneId: string) => void;
  value?: Array<DroppedElement>;
}>;

function DropZoneContent<T extends Droppable, E extends DroppedElement<T>>({
  id,
  onElementFocus,
  onDragging,
  onAddItem,
  onUpdateItems,
  onRowExpand,
  value,
  ...props
}: Omit<Props<T>, 'columnsCount' | 'rowsCount'>) {
  const zoneId = useZoneId();
  const dimensionRef = useDropDimension();
  const [, drop] = useDrop<E>(() => ({ accept: zoneId }), [zoneId]);

  useBuilderEvents('elementDragging', (element) =>
    onDragging?.(element.isDragging, zoneId),
  );

  useBuilderEvents('elementFocus', (element) =>
    onElementFocus?.(element.elementId, zoneId),
  );

  useBuilderEvents('gridRowsUpdate', (nextRowsCount) =>
    onRowExpand?.(nextRowsCount),
  );

  useUpdateElement<T>((elements) => {
    onUpdateItems?.(elements);
  });

  useAddElement<T>((element) => {
    onAddItem?.(element);
  });

  return (
    <DropGrid
      {...props}
      id={id}
      ref={mergeRefs<ConnectableElement | HTMLDivElement | undefined>([
        drop,
        dimensionRef,
      ])}
    >
      {value?.map((element) => (
        <DropZoneItem key={element.id} element={element} />
      ))}
    </DropGrid>
  );
}

export function DropZone<T extends Droppable>({
  id,
  columnsCount,
  rowsCount,
  ...props
}: Props<T>) {
  const zoneId = React.useRef(uniqueId('zone')).current;

  return (
    <ZoneContext.Provider
      value={{
        id: id || zoneId,
        columnsCount,
        rowsCount,
      }}
    >
      <DropZoneContent {...props} />
    </ZoneContext.Provider>
  );
}
