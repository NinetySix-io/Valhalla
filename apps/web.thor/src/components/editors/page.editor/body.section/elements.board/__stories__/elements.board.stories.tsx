import { css, styled } from '@mui/material';

import { EditorStore } from '@app/components/editors/page.editor/store';
import { ElementFactory } from '../../element.factory';
import { ElementsBoard } from '../index';
import { ElementsMenu } from '../../elements.menu';
import { Outline } from '../../outline';
import React from 'react';
import type { Section } from '@app/components/editors/page.editor/store/types';
import { SectionProvider } from '../../scope.provider';
import { SectionsDecorator } from './decorators/sections.decorator';
import { StyleVariables } from '../style.variables';
import { action } from '@storybook/addon-actions';
import { compareById } from '@app/lib/compare.by.id';
import { storiesOf } from '@storybook/react';
import uniqueId from 'lodash.uniqueid';

const Wrapper = styled('div')(
  () => css`
    display: flex;
    flex-direction: column;
    position: relative;
  `,
);

const FixedTop = styled('div')(
  ({ theme }) => css`
    position: absolute;
    top: ${theme.spacing(1)};
    left: ${theme.spacing(1)};
  `,
);

const Board: React.FC<React.PropsWithChildren<{ section: Section }>> = ({
  section,
  children,
}) => {
  const sectionIndex = EditorStore.useSelect((state) =>
    state.sections.findIndex(compareById(section.id)),
  );
  const elements = EditorStore.getState().sections[sectionIndex].children;

  return (
    <Wrapper
      onMouseOver={() => EditorStore.actions.setActiveSection(section.id)}
      onMouseLeave={() => EditorStore.actions.setActiveSection(null)}
    >
      <SectionProvider
        sectionId={section.id}
        config={section.config}
        index={sectionIndex}
      >
        <StyleVariables />
        <ElementsBoard.DndContext>
          <ElementsBoard
            onConfigChange={(nextConfig) => {
              EditorStore.actions.updateSectionConfig(section.id, nextConfig);
              action('onConfigChange')(section.id, nextConfig);
            }}
            onElementAdded={(element) => {
              EditorStore.actions.addElement(section.id, {
                ...element,
                id: uniqueId(section.id),
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
            <Outline />
            {children}
            {elements.map((element: any) => {
              return (
                <ElementsBoard.Item key={element.id} element={element}>
                  <ElementFactory element={element} />
                </ElementsBoard.Item>
              );
            })}
          </ElementsBoard>
        </ElementsBoard.DndContext>
      </SectionProvider>
    </Wrapper>
  );
};

storiesOf('NinetySix/Editors/Page Editor/Board', module)
  .addDecorator(SectionsDecorator(2, 1))
  .add('Default', () => {
    const section = EditorStore.useSelect((state) => state.sections[0]);
    return (
      <Board section={section}>
        <FixedTop>
          <ElementsMenu placement="left" />
        </FixedTop>
      </Board>
    );
  })
  .add('With Sections', () => {
    const sections = EditorStore.useSelect((state) => state.sections);
    return (
      <React.Fragment>
        {sections.map((section) => (
          <Board section={section} key={section.id}>
            <FixedTop>
              <ElementsMenu placement="left" />
            </FixedTop>
          </Board>
        ))}
      </React.Fragment>
    );
  });
