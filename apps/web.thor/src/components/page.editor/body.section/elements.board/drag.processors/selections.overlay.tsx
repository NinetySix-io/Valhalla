import * as React from 'react';

import { css, styled } from '@mui/material';

import { getGridArea } from '../lib/get.grid.area';
import { getMaxBBox } from '../lib/get.max.bbox';
import { makeFilterProps } from '@valhalla/web.react';
import uniqueId from 'lodash.uniqueid';
import { useSectionDrag } from '../hooks/use.dnd';
import { useSectionStore } from '../../scope.provider';

const DraggableBox = styled(
  'div',
  makeFilterProps(['gridArea']),
)<{ gridArea: string }>(
  ({ theme, gridArea }) => css`
    position: relative;
    grid-area: ${gridArea};
    outline: solid 3px ${theme.palette.primary.main};
    &:hover {
      cursor: grab;
    }
    &:active {
      cursor: grabbing;
    }
  `,
);

const key = uniqueId('drag-overlay');
export const SelectionsOverlay: React.FC & { key: string } = () => {
  const store = useSectionStore();
  const isMultiDrag = store.useSelect((state) => state.selections.length > 1);
  const bbox = store.useSelect((state) =>
    getMaxBBox(
      state.selections.map((selected) => state.elements[selected].getElement()),
    ),
  );

  const [drag, { isDragging }] = useSectionDrag(
    {
      ...bbox,
      id: key,
      type: 'Box',
    },
    {
      collect(monitor) {
        return {
          isDragging: monitor.isDragging(),
        };
      },
    },
  );

  if (!isMultiDrag || isDragging) {
    return null;
  }

  return <DraggableBox ref={drag} gridArea={getGridArea(bbox)} />;
};

SelectionsOverlay.key = key;
