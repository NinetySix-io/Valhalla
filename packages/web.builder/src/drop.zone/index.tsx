import * as React from 'react';

import { ConnectableElement, DropTargetMonitor, useDrop } from 'react-dnd';
import { DropCandidate, DropType, Droppable, DroppedItem } from '../types';

import { DropGrid } from '../drop.grid';
import { DropZoneItem } from './item';
import { ZoneIdContext } from '../context';
import { cProps } from '@valhalla/web.react';
import { mergeRefs } from 'react-merge-refs';
import { uniqueId } from '@valhalla/utilities';
import { useDropDimension } from '../hooks/use.dimension';

type Props<T extends Droppable> = cProps<{
  accepts: DropType;
  rowsCount: number;
  columnsCount: number;
  onDrop?: (
    item: DropCandidate<T> | DroppedItem<T>,
    monitor: DropTargetMonitor,
  ) => void;
  onAddItem?: (
    item: Omit<DroppedItem<T>, 'id'>,
    monitor: DropTargetMonitor,
  ) => void;
  onUpdateItem?: (item: DroppedItem<T>, monitor: DropTargetMonitor) => void;
  value?: Array<DroppedItem>;
}>;

function DropZoneContent<T extends Droppable>({
  accepts,
  rowsCount,
  columnsCount,
  onDrop,
  onAddItem,
  onUpdateItem,
  value,
  ...props
}: Props<T>) {
  const dimensionRef = useDropDimension(columnsCount);

  const [, drop] = useDrop<DroppedItem<T>>(() => ({
    accept: accepts,
    drop(item, monitor) {
      const offset = monitor.getSourceClientOffset();
      const nextItem = { ...item };
      nextItem.topLeftX = offset.x;
      nextItem.topLeftY = offset.y;

      onDrop?.(nextItem, monitor);
      if ('id' in item) {
        onUpdateItem?.(nextItem, monitor);
      } else {
        onAddItem?.(nextItem, monitor);
      }
    },
  }));

  return (
    <DropGrid
      {...props}
      rowsCount={rowsCount}
      columnsCount={columnsCount}
      ref={mergeRefs<ConnectableElement | HTMLDivElement | undefined>([
        drop,
        dimensionRef,
      ])}
    >
      {value?.map((element) => (
        <DropZoneItem key={element.id} element={element} accepts={accepts} />
      ))}
    </DropGrid>
  );
}

export function DropZone<T extends Droppable>({ id, ...props }: Props<T>) {
  const zoneId = React.useRef(uniqueId('zone')).current;

  return (
    <ZoneIdContext.Provider value={id || zoneId}>
      <DropZoneContent {...props} />
    </ZoneIdContext.Provider>
  );
}
