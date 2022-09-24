import * as React from 'react';

import { css, styled } from '@mui/material';
import { selectIsMultiSelected, selectSelectionBBox } from './selectors';

import type { XYCoord } from '@app/components/editors/page.editor/types';
import { getGridArea } from '../lib/get.grid.area';
import isNil from 'lodash.isnil';
import { makeFilterProps } from '@valhalla/web.react';
import { useDraggable } from '@dnd-kit/core';
import { useSectionStore } from '../../scope.provider';

const DraggableBox = styled(
  'div',
  makeFilterProps(['gridArea', 'transform', 'isDragging']),
)<{ gridArea: string; transform?: XYCoord; isDragging: boolean }>(
  ({ theme, gridArea, transform, isDragging }) => css`
    position: relative;
    grid-area: ${gridArea};

    ${transform
      ? css`
          transform: translate(${transform.x}px, ${transform.y}px);
          box-shadow: ${theme.shadows[10]};

          > * {
            opacity: 0.5;
          }
        `
      : !isDragging &&
        css`
          outline: solid 3px ${theme.palette.primary.main};
        `}
  `,
);

export const SelectionsOverlay: React.FC = () => {
  const store = useSectionStore();
  const isMultiDrag = store.useSelect(selectIsMultiSelected);
  const bbox = store.useSelect(selectSelectionBBox);
  const transform = store.useSelect((state) => state.dragDelta);
  const isDragging = store.useSelect((state) => !isNil(state.dragging));
  const draggable = useDraggable({
    id: 'multi-elements',
    data: bbox,
  });

  if (!isMultiDrag && !bbox) {
    return null;
  }

  return (
    <DraggableBox
      ref={draggable.setNodeRef}
      gridArea={getGridArea(bbox)}
      transform={transform}
      isDragging={isDragging}
      {...draggable.listeners}
      {...draggable.attributes}
    />
  );
};
