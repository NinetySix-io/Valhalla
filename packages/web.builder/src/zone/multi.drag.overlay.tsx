import * as React from 'react';

import { css, styled } from '@mui/material';

import { getGridArea } from '../hooks/use.element';
import { getMaxBBox } from '../lib/get.max.bbox';
import { makeFilterProps } from '@valhalla/web.react/src';
import size from 'lodash.size';
import uniqueId from 'lodash.uniqueid';
import { useScopeDrag } from '../hooks/use.dnd';
import { useStore } from '../context/scope.provider';

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
export const MultiDragOverlay: React.FC & { key: string } = () => {
  const store = useStore();
  const isMultiDrag = store.useSelect((state) => size(state.selections) > 1);
  const bbox = store.useSelect((state) =>
    getMaxBBox(Object.values(state.selections)),
  );

  const [drag, { isDragging }] = useScopeDrag(
    {
      ...bbox,
      id: key,
      type: 'box',
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

MultiDragOverlay.key = key;
