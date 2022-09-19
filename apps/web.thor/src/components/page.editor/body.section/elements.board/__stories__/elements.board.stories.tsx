import { css, styled } from '@mui/material';

import { DndDecorator } from './decorators/dnd.decorator';
import { EditorStore } from '@app/components/page.editor/store';
import { ElementFactory } from '../../element.factory';
import { ElementsBoard } from '../index';
import React from 'react';
import type { Section } from '@app/components/page.editor/store/types';
import { SectionProvider } from '../../scope.provider';
import { SectionsDecorator } from './decorators/sections.decorator';
import { action } from '@storybook/addon-actions';
import { compareById } from '@app/lib/compare.by.id';
import { storiesOf } from '@storybook/react';

const Wrapper = styled('div')(
  ({ theme }) => css`
    outline: solid thin ${theme.palette.grey[500]};
  `,
);

const Board: React.FC<{ section: Section }> = ({ section }) => {
  const elements = EditorStore.useSelect(
    (state) => state.sections.find(compareById(section.id))?.children,
  );

  return (
    <SectionProvider sectionId={section.id} config={section.config}>
      <ElementsBoard
        onConfigChange={(nextConfig) => {
          EditorStore.actions.updateSectionConfig(section.id, nextConfig);
          action('onConfigChange')(section.id, nextConfig);
        }}
        onElementsUpdated={(elements) => {
          EditorStore.actions.replaceElements(section.id, elements);
          action('onElementsUpdated')(section.id, elements);
        }}
        onElementsDeleted={(elementIdList) => {
          EditorStore.actions.removeElements(section.id, elementIdList);
          action('onElementsDeleted')(section.id, elementIdList);
        }}
      >
        {elements?.map((element) => (
          <ElementsBoard.Item key={element.id} element={element}>
            <ElementFactory element={element} />
          </ElementsBoard.Item>
        ))}
      </ElementsBoard>
    </SectionProvider>
  );
};

storiesOf('NinetySix/Page Editor', module)
  .addDecorator(DndDecorator)
  .addDecorator(SectionsDecorator(2))
  .add('Board', () => {
    const section = EditorStore.useSelect((state) => state.sections[0]);
    return <Board section={section} />;
  })
  .add('Board with multiple sections', () => {
    const sections = EditorStore.useSelect((state) => state.sections);
    return (
      <React.Fragment>
        {sections.map((section) => (
          <Wrapper key={section.id}>
            <Board section={section} />
          </Wrapper>
        ))}
      </React.Fragment>
    );
  });
