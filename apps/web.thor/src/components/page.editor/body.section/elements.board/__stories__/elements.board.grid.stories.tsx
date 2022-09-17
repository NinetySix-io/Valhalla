import { css, styled } from '@mui/material';

import { ElementsBoardGrid } from '../grid';
import React from 'react';
import { SectionDecorator } from './decorators/section.decorator';
import { storiesOf } from '@storybook/react';
import { useBoardSize } from '../hooks/use.board.size';
import { useSectionStore } from '../../scope.provider';

const StyledBoard = styled(ElementsBoardGrid)(
  () => css`
    border: solid thin red;
  `,
);

storiesOf('NinetySix/Page Editor', module)
  .addDecorator(SectionDecorator)
  .add('Grid', () => {
    const store = useSectionStore();
    const sizeRef = useBoardSize();
    store.actions.setDragging({
      id: 'element',
      type: '',
      x: 0,
      y: 0,
      xSpan: 0,
      ySpan: 0,
    });

    return <StyledBoard ref={sizeRef} />;
  });
