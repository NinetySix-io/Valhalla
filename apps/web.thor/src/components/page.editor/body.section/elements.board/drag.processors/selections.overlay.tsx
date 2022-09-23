import * as React from 'react';

import { css, styled } from '@mui/material';
import { selectIsMultiSelected, selectSelectionBBox } from './selectors';

import type { XYCoord } from '@app/components/page.editor/types';
import { getGridArea } from '../lib/get.grid.area';
import { makeFilterProps } from '@valhalla/web.react';
import uniqueId from 'lodash.uniqueid';
import { useDraggable } from '@dnd-kit/core';
import { useSectionStore } from '../../scope.provider';

const DraggableBox = styled(
  'div',
  makeFilterProps(['gridArea', 'transform']),
)<{ gridArea: string; transform?: XYCoord }>(
  ({ theme, gridArea, transform }) => css`
    position: relative;
    grid-area: ${gridArea};

    &:hover {
      cursor: grab;
    }
    &:active {
      cursor: grabbing;
    }

    ${transform
      ? css`
          transform: translate(${transform.x}px, ${transform.y}px);
          box-shadow: ${theme.shadows[10]};

          > * {
            opacity: 0.5;
          }
        `
      : css`
          outline: solid 3px ${theme.palette.primary.main};
        `}
  `,
);

const key = uniqueId('drag-overlay');
export const SelectionsOverlay: React.FC & { key: string } = () => {
  const store = useSectionStore();
  const isMultiDrag = store.useSelect(selectIsMultiSelected);
  const bbox = store.useSelect(selectSelectionBBox);
  const transform = store.useSelect((state) => state.dragDelta);
  const draggable = useDraggable({ id: key, data: bbox });

  if (!isMultiDrag || !bbox) {
    return null;
  }

  return (
    <DraggableBox
      ref={draggable.setNodeRef}
      gridArea={getGridArea(bbox)}
      transform={transform}
      {...draggable.listeners}
      {...draggable.attributes}
    />
  );
};

SelectionsOverlay.key = key;
