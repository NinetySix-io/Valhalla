import * as React from 'react';

import {
  useDeleteKeyListener,
  useShiftKeyListener,
} from './hooks/use.keys.listener';
import { useSectionId, useSectionStore } from '../scope.provider';

import { DndContext } from './dnd.context';
import { DropCollector } from './drag.processors/drop.collector';
import type { DroppedElement } from '../../types';
import { ElementsBoardGrid } from './grid';
import { ElementsBoardItem } from './element';
import { OverflowManager } from './drag.processors/overflow.manager';
import type { Section } from '../../store/types';
import { SelectionBox } from './drag.processors/selection.box';
import { SelectionFollower } from './drag.processors/selection.follower';
import { SelectionsCollector } from './drag.processors/selections.collector';
import { SelectionsOverlay } from './drag.processors/selections.overlay';
import { mergeRefs } from 'react-merge-refs';
import { useBoardSize } from './hooks/use.board.size';
import { useDroppable } from '@dnd-kit/core';
import { useSectionEmitter } from './hooks/use.section.emitter';
import { useSelectionBoxListener } from './hooks/use.selection.box';
import { useTargetedClick } from '@valhalla/web.react';

type Props = React.PropsWithChildren<{
  onConfigChange?: (config: Section['config']) => void;
  onElementAdded?: (element: DroppedElement) => void;
  onElementsUpdated?: (elements: DroppedElement[]) => void;
  onElementsDeleted?: (elementIdList: DroppedElement['id'][]) => void;
}>;

type TElementsBoard = React.FC<Props> & {
  Item: typeof ElementsBoardItem;
  DndContext: typeof DndContext;
};

export const ElementsBoard: TElementsBoard = ({
  onConfigChange,
  onElementAdded,
  onElementsUpdated,
  onElementsDeleted,
  children,
}) => {
  const sectionId = useSectionId();
  const store = useSectionStore();
  const ref = React.useRef<HTMLDivElement>();
  const sizeRef = useBoardSize();
  const emitter = useSectionEmitter();
  const droppable = useDroppable({ id: sectionId });

  useShiftKeyListener();
  useDeleteKeyListener();
  useSelectionBoxListener(ref.current);
  useTargetedClick(ref.current, () => {
    store.actions.removeFocus();
    store.actions.clearSelections();
  });

  emitter.useEvent('elementAdded', onElementAdded);
  emitter.useEvent('elementsUpdated', onElementsUpdated);
  emitter.useEvent('elementsDeleted', onElementsDeleted);
  emitter.useEvent('updateRowsCount', (rowsCount) => {
    onConfigChange?.({
      ...store.getState().config,
      rowsCount,
    });
  });

  return (
    <ElementsBoardGrid ref={mergeRefs([ref, sizeRef, droppable.setNodeRef])}>
      {children}
      <DropCollector />
      <OverflowManager />
      <SelectionFollower />
      <SelectionsOverlay />
      <SelectionBox />
      <SelectionsCollector />
    </ElementsBoardGrid>
  );
};

ElementsBoard.Item = ElementsBoardItem;
ElementsBoard.DndContext = DndContext;
