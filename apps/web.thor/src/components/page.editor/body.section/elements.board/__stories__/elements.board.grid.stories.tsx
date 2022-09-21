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
    const sizeRef = useBoardSize();
    const store = useSectionStore();
    const section = last(EditorStore.getState().sections);
    store.actions.setDragging('');

    return (
      <SectionProvider sectionId={section.id} config={section.config}>
        <StyledBoard ref={sizeRef} />
      </SectionProvider>
    );
  });
