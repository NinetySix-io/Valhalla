import { css, styled } from '@mui/material';

import { EditorStore } from '@app/components/page.editor/store';
import { ElementFactory } from '../../element.factory';
import { ElementsBoard } from '../index';
import { ElementsMenu } from '../../elements.menu';
import React from 'react';
import type { Section } from '@app/components/page.editor/store/types';
import { SectionProvider } from '../../scope.provider';
import { SectionsDecorator } from './decorators/sections.decorator';
import { action } from '@storybook/addon-actions';
import { compareById } from '@app/lib/compare.by.id';
import { storiesOf } from '@storybook/react';

const Wrapper = styled('div')(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    position: relative;
    outline: solid thin ${theme.palette.grey[200]};
  `,
);

const FixedTop = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
`;

const Board: React.FC<React.PropsWithChildren<{ section: Section }>> = ({
  section,
  children,
}) => {
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
        onElementAdded={(element) => {
          EditorStore.actions.addElement(section.id, {
            ...element,
            id: new Date().valueOf().toString(),
          });

          action('onElementAdded')(section.id, element);
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
        {children}
        {elements?.map((element) => (
          <ElementsBoard.Item key={element.id} element={element}>
            <ElementFactory element={element} />
          </ElementsBoard.Item>
        ))}
      </ElementsBoard>
    </SectionProvider>
  );
};

storiesOf('NinetySix/Page Editor/Board', module)
  .addDecorator(SectionsDecorator(2))
  .add('Default', () => {
    const section = EditorStore.useSelect((state) => state.sections[0]);
    return (
      <Wrapper>
        <Board section={section} />
      </Wrapper>
    );
  })
  .add('With Sections', () => {
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
  })
  .add('With Drop Menu', () => {
    const section = EditorStore.useSelect((state) => state.sections[0]);

    return (
      <Wrapper>
        <Board section={section}>
          <FixedTop className="fixed-top">
            <ElementsMenu placement="left-start" isVisible />
          </FixedTop>
        </Board>
      </Wrapper>
    );
  });
