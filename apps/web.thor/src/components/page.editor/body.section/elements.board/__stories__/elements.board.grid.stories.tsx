import { SectionProvider, useSectionStore } from '../../scope.provider';
import { css, styled } from '@mui/material';

import { EditorStore } from '@app/components/page.editor/store';
import { ElementsBoardGrid } from '../grid';
import React from 'react';
import { SectionsDecorator } from './decorators/sections.decorator';
import { last } from '@valhalla/utilities';
import { storiesOf } from '@storybook/react';
import { useBoardSize } from '../hooks/use.board.size';

const StyledBoard = styled(ElementsBoardGrid)(
  () => css`
    border: solid thin red;
  `,
);

storiesOf('NinetySix/Page Editor', module)
  .addDecorator(SectionsDecorator(1))
  .add('Grid', () => {
    const section = last(EditorStore.getState().sections);
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

    return (
      <SectionProvider sectionId={section.id} config={section.config}>
        <StyledBoard ref={sizeRef} />
      </SectionProvider>
    );
  });
