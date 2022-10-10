import {
  SectionProvider,
  useSectionId,
  useSectionStore,
} from '../../scope.provider';
import { css, styled } from '@mui/material';

import { ElementsBoardGrid } from '../grid';
import { SectionsDecorator } from './decorators/sections.decorator';
import { StyleVariables } from '../style.variables';
import { storiesOf } from '@storybook/react';
import { useBoardSize } from '../hooks/use.board.size';

const StyledBoard = styled(ElementsBoardGrid)(() => css``);

storiesOf('NinetySix/Editors/Page Editor', module)
  .addDecorator((Story) => {
    return (
      <SectionProvider
        sectionId={''}
        config={{ columnGap: 10, rowGap: 10, rowsCount: 10 }}
        index={0}
      >
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
      width: 0,
      height: 0,
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
