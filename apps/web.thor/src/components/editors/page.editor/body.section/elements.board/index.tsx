import * as React from 'react';

import {
  useDeleteKeyListener,
  useShiftKeyListener,
} from './hooks/use.keys.listener';
import { useSectionId, useSectionStore } from '../scope.provider';

import { DndContext } from './dnd.context';
import { DropCollector } from './drag.processors/drop.collector';
import { ElementsBoardGrid } from './grid';
import { ElementsBoardItem } from './element';
import { OverflowManager } from './drag.processors/overflow.manager';
import type { PageElement } from '../../types';
import type { PageSectionSchema } from '@app/generated/valhalla.gql';
import { SelectionBox } from './drag.processors/selection.box';
import { SelectionFollower } from './drag.processors/selection.follower';
import { SelectionsCollector } from './drag.processors/selections.collector';
import { SelectionsOverlay } from './drag.processors/selections.overlay';
import { StyleVariables } from './style.variables';
import clsx from 'clsx';
import { mergeRefs } from 'react-merge-refs';
import { useBoardSize } from './hooks/use.board.size';
import { useDroppable } from '@dnd-kit/core';
import { useSectionEmitter } from './hooks/use.section.emitter';
import { useSelectionBoxListener } from './hooks/use.selection.box';
import { useTargetedClick } from '@valhalla/web.react';

type Props = React.PropsWithChildren<{
  className?: string;
  onConfigChange?: (config: PageSectionSchema['format']) => void;
  onElementAdded?: (element: PageElement) => void;
  onElementsUpdated?: (elements: PageElement[]) => void;
  onElementsDeleted?: (elementIdList: PageElement['id'][]) => void;
}>;

type TElementsBoard = React.FC<Props> & {
  Item: typeof ElementsBoardItem;
  DndContext: typeof DndContext;
};

export const ElementsBoard: TElementsBoard = ({
  className,
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
    <ElementsBoardGrid
      ref={mergeRefs([ref, sizeRef, droppable.setNodeRef])}
      className={clsx(className, `section-${sectionId}`)}
    >
      <StyleVariables />
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
