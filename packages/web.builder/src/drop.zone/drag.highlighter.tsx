import * as React from 'react';

import { css, styled } from '@mui/material';

import { dragSelectHighlightAtom } from '../context/drag.select';
import { useScopeAtomValue } from '../context';

const Container = styled('div')(
  ({ theme }) => css`
    position: fixed;
    outline: solid 3px ${theme.palette.primary.main};
  `,
);

export const DragHighlighter: React.FC = () => {
  const mouse = useScopeAtomValue(dragSelectHighlightAtom);
  if (!mouse) {
    return null;
  }

  const style: React.CSSProperties = {};
  const width = Math.abs(mouse.end.x - mouse.start.x);
  const height = Math.abs(mouse.end.y - mouse.start.y);
  style.left = mouse.end.x - mouse.start.x < 0 ? mouse.end.x : mouse.start.x;
  style.top = mouse.end.y - mouse.start.y < 0 ? mouse.end.y : mouse.start.y;
  style.height = height;
  style.width = width;

  return <Container style={style} />;
};
