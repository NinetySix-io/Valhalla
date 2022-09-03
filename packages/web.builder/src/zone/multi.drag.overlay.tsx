import * as React from 'react';

import { css, styled } from '@mui/material';

import { getGridArea } from '../hooks/use.element';
import { getMaxBBox } from '../lib/get.max.bbox';
import { makeFilterProps } from '@valhalla/web.react/src';
import { selectionsAtom } from '../context/selections';
import uniqueId from 'lodash.uniqueid';
import { useScopeAtomValue } from '../context';
import { useScopeDrag } from '../context/dnd';

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
  const selections = useScopeAtomValue(selectionsAtom);
  const list = Object.values(selections);
  const isMultiDrag = list.length > 1;
  const bbox = getMaxBBox(list);

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
