import * as React from 'react';

import type {
  DroppedElement,
  DroppedPosition,
  MenuElement,
} from '../../../types';
import { css, styled } from '@mui/material';
import { useCellClampX, useCellClampY } from '../hooks/use.cell.clamp';
import { useSectionId, useSectionStore } from '../../scope.provider';

import { SelectionsOverlay } from './selections.overlay';
import { getGridArea } from '../lib/get.grid.area';
import { makeFilterProps } from '@valhalla/web.react';
import { useDragMonitorOffset } from '../hooks/use.drag.monitor';
import { useSectionEmitter } from '../hooks/use.section.emitter';

const Container = styled(
  'div',
  makeFilterProps(['gridArea', 'isVisible']),
)<{
  gridArea: string;
  isVisible: boolean;
}>(
  ({ theme, isVisible, gridArea }) => css`
    transition: all 0.2s;
    border: solid 3px transparent;
    margin-left: calc(var(--pt-w) * 0.5);
    margin-right: calc(var(--pt-w) / -1);
    margin-bottom: calc(var(--pt-w) * -2);
    ${isVisible && gridArea
      ? css`
          z-index: -1;
          grid-area: ${gridArea};
          border-color: ${theme.palette.primary.main};
        `
      : css`
          display: none;
        `}
  `,
);

export const DragShadow: React.FC = () => {
  const store = useSectionStore();
  const sectionId = useSectionId();
  const clampX = useCellClampX();
  const clampY = useCellClampY();
  const [isVisible, setIsVisible] = React.useState(false);
  const [element, setElement] = React.useState<DroppedElement>();
  const cellSize = store.useSelect((state) => state.cellSize);
  const cache = React.useRef<DroppedElement[]>([]);
  const emitter = useSectionEmitter();

  useDragMonitorOffset((monitor) => {
    if (monitor.getItemType() !== sectionId) {
      return;
    }

    const nextOffset = monitor.getSourceClientOffset();
    const draggingElement: DroppedElement = monitor.getItem();
    const isMultiDrag =
      draggingElement?.id === SelectionsOverlay.key ||
      element?.id === SelectionsOverlay.key;

    if (!nextOffset || !draggingElement) {
      setIsVisible(false);

      // There can only be one added at a time
      if (!isMultiDrag && element && !element.id) {
        emitter.client.emit(
          'elementAdded',
          element as MenuElement & DroppedPosition,
        );
      } else if (cache.current.length > 0) {
        emitter.client.emit('elementsUpdated', cache.current);
      }

      cache.current = [];
      setElement(undefined);
    } else {
      // drag preview seems to capture the outline
      // setting the timeout is a hacky fix
      // TODO: find a better solution
      setTimeout(() => {
        setIsVisible(true);
      }, 50);

      // offset so it will be centered
      const offset = cellSize / 2;
      const nextX = clampX(nextOffset.x - offset, draggingElement.xSpan);
      const nextY = clampY(nextOffset.y - offset, draggingElement.ySpan);
      const nextElement = { ...draggingElement, x: nextX, y: nextY };
      setElement(nextElement);

      if (!isMultiDrag) {
        cache.current = [nextElement];
      } else {
        const diffX = nextX - draggingElement.x;
        const diffY = nextY - draggingElement.y;
        const { selections, elements } = store.getState();
        cache.current = selections
          .map((selectedId) => elements[selectedId].getElement())
          .map((element): DroppedElement => {
            return {
              ...element,
              x: element.x + diffX,
              y: element.y + diffY,
            };
          });
      }
    }
  });

  if (!element) {
    return null;
  }

  return <Container isVisible={isVisible} gridArea={getGridArea(element)} />;
};
