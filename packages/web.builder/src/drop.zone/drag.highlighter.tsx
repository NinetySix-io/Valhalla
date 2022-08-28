import * as React from 'react';

import { css, styled } from '@mui/material';

import { useDragHighLightBox } from '../context/drag.select';

const Box = styled('div')(
  ({ theme }) => css`
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
  const box = useDragHighLightBox();
  if (!box) {
    return null;
  }

  return (
    <Container>
      <Box style={box} />
    </Container>
  );
};
