import * as React from 'react';

import type { DroppedElement, DroppedPosition, MenuElement } from '../../types';
import {
  useDeleteKeyListener,
  useShiftKeyListener,
} from './hooks/use.keys.listener';

import { DragProcessors } from './drag.processors';
import { ElementsBoardGrid } from './grid';
import { ElementsBoardItem } from './element';
import type { Section } from '../../store/types';
import { mergeRefs } from 'react-merge-refs';
import { useBoardSize } from './hooks/use.board.size';
import { useDragOverflow } from './hooks/use.drag.overflow';
import { useSectionDrop } from './hooks/use.dnd';
import { useSectionEmitter } from './hooks/use.section.emitter';
import { useSectionStore } from '../scope.provider';
import { useSelectionBoxListener } from './hooks/use.selection.box';
import { useTargetedClick } from '@valhalla/web.react';

type Props = React.PropsWithChildren<{
  onConfigChange?: (config: Section['config']) => void;
  onElementAdded?: (element: MenuElement & DroppedPosition) => void;
  onElementsUpdated?: (elements: DroppedElement[]) => void;
  onElementsDeleted?: (elementIdList: DroppedElement['id'][]) => void;
}>;

type TElementsBoard = React.FC<Props> & {
  Item: typeof ElementsBoardItem;
};

export const ElementsBoard: TElementsBoard = ({
  onConfigChange,
  onElementAdded,
  onElementsUpdated,
  onElementsDeleted,
  children,
}) => {
  const store = useSectionStore();
  const ref = React.useRef<HTMLDivElement>();
  const sizeRef = useBoardSize();
  const dndDropRef = useSectionDrop();
  const emitter = useSectionEmitter();

  useShiftKeyListener();
  useDeleteKeyListener();
  useDragOverflow();
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
    <ElementsBoardGrid ref={mergeRefs([ref, sizeRef, dndDropRef])}>
      <DragProcessors />
      {children}
    </ElementsBoardGrid>
  );
};

ElementsBoard.Item = ElementsBoardItem;
