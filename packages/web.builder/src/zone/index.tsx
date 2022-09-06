import * as React from 'react';

import { ScopeProvider, useZoneId } from '../context/scope.provider';

import type { ConnectableElement } from 'react-dnd';
import { DragLayer } from './drag.layer';
import { DragShadow } from './shadow';
import { DropGrid } from '../grid';
import { DropZoneItem } from './item';
import type { DroppedElement } from '../types';
import { MultiDragOverlay } from './multi.drag.overlay';
import { Resizer } from '../item/resizer';
import { SelectionBox } from './selection.box';
import type { cProps } from '@valhalla/web.react';
import isNil from 'lodash.isnil';
import { mergeRefs } from 'react-merge-refs';
import uniqueBy from 'lodash.uniqby';
import { useAddElement } from '../hooks/events/use.add.element';
import { useBuilderEvents } from '../hooks/events/use.builder.events';
import { useContainerClick } from './hooks/use.container.click';
import { useDeleteFocusElement } from './hooks/keys.events/use.delete.focus.element';
import { useDragOverflowListener } from '../hooks/use.drag.overflow.listener';
import { useDropDimension } from '../hooks/use.dimension';
import { useListenToShiftKey } from '../context/shift.key.pressed';
import { useScopeDrop } from '../hooks/use.dnd';
import { useSelectionBoxFocus } from '../context/hooks/use.selection.box.focus';
import { useSyncSelections } from './hooks/use.sync.selections';
import { useUpdateElement } from '../hooks/events/use.update.element';

type Props = cProps<{
  zoneId: string;
  rowsCount: number;
  columnsCount: number;
  onAddItem?: (item: Omit<DroppedElement, 'id'>) => void;
  onUpdateItems?: (item: DroppedElement[]) => void;
  onRowExpand?: (rowsCount: number) => void;
  onElementFocus?: (elementId: string | undefined, zoneId: string) => void;
  onDragging?: (isDragging: boolean, zoneId: string) => void;
  value?: Array<DroppedElement>;
}>;

function DropZoneContent({
  onElementFocus,
  onDragging,
  onAddItem,
  onUpdateItems,
  onRowExpand,
  value,
}: Omit<Props, 'zoneId' | 'columnsCount' | 'rowsCount'>) {
  const zoneId = useZoneId();
  const container = React.useRef<HTMLDivElement>();
  const dimensionRef = useDropDimension();
  const selectionBoxRef = useSelectionBoxFocus();
  const [, drop] = useScopeDrop();

  useDragOverflowListener();
  useListenToShiftKey();
  useContainerClick(container.current);
  useSyncSelections(value);

  useBuilderEvents('elementDragging', (element) =>
    onDragging?.(element.isDragging, zoneId),
  );

  useBuilderEvents('elementFocus', (element) =>
    onElementFocus?.(element.elementId, zoneId),
  );

  useBuilderEvents('gridRowsUpdate', (nextRowsCount) =>
    onRowExpand?.(nextRowsCount),
  );

  //TODO: Fix this
  useDeleteFocusElement((elements) => {
    onUpdateItems(value.filter((item) => isNil(elements[item.id])));
  });

  useUpdateElement((elements) => {
    onUpdateItems?.(uniqueBy(elements.concat(value), (element) => element.id));
  });

  useAddElement((element) => {
    onAddItem?.(element);
  });

  return (
    <DropGrid
      id={zoneId}
      ref={mergeRefs<ConnectableElement | HTMLDivElement | undefined>([
        drop,
        dimensionRef,
        selectionBoxRef,
        container,
      ])}
    >
      <DragShadow />
      <DragLayer />
      <Resizer />
      {value?.map((element) => (
        <DropZoneItem key={element.id} element={element} />
      ))}
      <MultiDragOverlay />
      <SelectionBox />
    </DropGrid>
  );
}

export function DropZone({ zoneId: id, ...props }: Props) {
  const randId = React.useId();
  const zoneId = id ?? randId;

  return (
    <ScopeProvider zoneId={zoneId} {...props}>
      <DropZoneContent {...props} />
    </ScopeProvider>
  );
}
