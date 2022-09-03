import * as React from 'react';

import { css, styled } from '@mui/material';

import { Rectangle } from '../lib/rectangle/types';
import { dragSelectHighlightAtom } from '../context/drag.select';
import { dragToRect } from '../lib/rectangle/drag.to.rect';
import { makeFilterProps } from '@valhalla/web.react/src';
import { useScopeAtomValue } from '../context';

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

export const DragHighlighter: React.FC = () => {
  const mouse = useScopeAtomValue(dragSelectHighlightAtom);

  if (!mouse?.end) {
    return null;
  }

  return (
    <Container>
      <Box rectangle={dragToRect(mouse.start, mouse.end)} />
    </Container>
  );
};
