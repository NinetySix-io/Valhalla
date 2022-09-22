import * as React from 'react';

import type { DroppedElement, DroppedPosition, MenuElement } from '../../types';
import {
  useDeleteKeyListener,
  useShiftKeyListener,
} from './hooks/use.keys.listener';

import { DndContext } from './dnd.context';
import { DropCollector } from './drag.processors/drop.collector';
import { ElementsBoardGrid } from './grid';
import { ElementsBoardItem } from './element';
import { OverflowManager } from './drag.processors/overflow.manager';
import type { Section } from '../../store/types';
import { SelectionBox } from './drag.processors/selection.box';
import { SelectionFollower } from './drag.processors/selection.follower';
import { SelectionsOverlay } from './drag.processors/selections.overlay';
import { mergeRefs } from 'react-merge-refs';
import { useBoardSize } from './hooks/use.board.size';
import { useEmitter } from './hooks/use.emitter';
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
  const emitter = useEmitter(store.useSelect((state) => state.emitter));

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
    <DndContext>
      <ElementsBoardGrid ref={mergeRefs([ref, sizeRef])}>
        {children}
        <DropCollector />
        <OverflowManager />
        <SelectionFollower />
        <SelectionsOverlay />
        <SelectionBox />
      </ElementsBoardGrid>
    </DndContext>
  );
};

ElementsBoard.Item = ElementsBoardItem;
