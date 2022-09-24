import * as React from 'react';

import { css, styled } from '@mui/material';

import type { Rectangle } from '../lib/rectangle';
import { makeFilterProps } from '@valhalla/web.react';
import { useSectionStore } from '../../scope.provider';

const Box = styled(
  'div',
  makeFilterProps(['rectangle']),
)<{ rectangle: Rectangle }>(
  ({ theme, rectangle }) => css`
    left: ${rectangle.left}px;
    top: ${rectangle.top}px;
    width: ${rectangle.right - rectangle.left}px;
    height: ${rectangle.bottom - rectangle.top}px;
    position: fixed;
    outline: solid 3px ${theme.palette.primary.main};
  `,
);

const Container = styled('div')(
  () => css`
    position: absolute;
    z-index: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  `,
);

export const SelectionBox: React.FC = () => {
  const store = useSectionStore();
  const minSize = store.useSelect((state) => state.minSelectionSize);
  const rect = store.useSelect((state) => state.selectionBox);

  if (!rect || (rect.width < minSize && rect.height < minSize)) {
    return null;
  }

  return (
    <Container>
      <Box rectangle={rect} />
    </Container>
  );
};
