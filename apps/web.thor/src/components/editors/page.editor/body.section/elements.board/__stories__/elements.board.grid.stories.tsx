import {
  SectionProvider,
  useSectionId,
  useSectionStore,
} from '../../scope.provider';
import { css, styled } from '@mui/material';

import { EditorStore } from '@app/components/editors/page.editor/store';
import { ElementsBoardGrid } from '../grid';
import React from 'react';
import { SectionsDecorator } from './decorators/sections.decorator';
import { StyleVariables } from '../style.variables';
import { last } from '@valhalla/utilities';
import { storiesOf } from '@storybook/react';
import { useBoardSize } from '../hooks/use.board.size';

const StyledBoard = styled(ElementsBoardGrid)(() => css``);

storiesOf('NinetySix/Editors/Page Editor', module)
  .addDecorator((Story) => {
    const section = last(EditorStore.getState().sections);
    return (
      <SectionProvider sectionId={section.id} config={section.config} index={0}>
        <Story />
      </SectionProvider>
    );
  })
  .addDecorator(SectionsDecorator(1))
  .add('Grid', () => {
    const sectionId = useSectionId();
    const store = useSectionStore();
    const sizeRef = useBoardSize();
    store.actions.setDragging({
      id: '',
      type: '',
      xSpan: 0,
      ySpan: 0,
      x: 0,
      y: 0,
    });

    return (
      <div className={`section-${sectionId}`}>
        <StyledBoard ref={sizeRef}>
          <StyleVariables />
        </StyledBoard>
      </div>
    );
  });
