import * as React from 'react';

import type { AddedElement, DroppedElement } from '../types';
import { ScopeProvider, useZoneId } from '../context/scope.provider';

import type { ConnectableElement } from 'react-dnd';
import { DragLayer } from './drag.layer';
import { DragShadow } from './shadow';
import { DropGrid } from '../grid';
import type { DropItem } from '../item';
import { MultiDragOverlay } from './multi.drag.overlay';
import { Resizer } from '../item/resizer';
import { SelectionBox } from './selection.box';
import { mergeRefs } from 'react-merge-refs';
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

type Props = {
  zoneId?: string;
  rowsCount: number;
  columnsCount: number;
  onAddItem?: (element: AddedElement) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUpdateItems?: (nextElements: DroppedElement<any>[]) => void;
  onRowExpand?: (rowsCount: number) => void;
  onElementFocus?: (elementId: string | undefined, zoneId: string) => void;
  onDragging?: (isDragging: boolean, zoneId: string) => void;
  children?: Array<React.ReactElement<React.ComponentProps<typeof DropItem>>>;
};

function DropZoneContent({
  onElementFocus,
  onDragging,
  onAddItem,
  onUpdateItems,
  onRowExpand,
  children,
}: Omit<Props, 'zoneId' | 'columnsCount' | 'rowsCount'>) {
  const zoneId = useZoneId();
  const container = React.useRef<HTMLDivElement>();
  const dimensionRef = useDropDimension();
  const selectionBoxRef = useSelectionBoxFocus();
  const [, drop] = useScopeDrop();

  useDragOverflowListener();
  useListenToShiftKey();
  useSyncSelections();
  useContainerClick(container.current);
  useDeleteFocusElement(onUpdateItems);
  useAddElement(onAddItem);

  useBuilderEvents('elementDragging', (element) =>
    onDragging?.(element.isDragging, zoneId),
  );

  useBuilderEvents('elementFocus', (element) =>
    onElementFocus?.(element.elementId, zoneId),
  );

  useBuilderEvents('gridRowsUpdate', (nextRowsCount) =>
    onRowExpand?.(nextRowsCount),
  );

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
      <MultiDragOverlay />
      <SelectionBox />
      {children}
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
