import { css, styled } from '@mui/material';

import { EditorStore } from '@app/components/editors/page.editor/store';
import { ElementsBoard } from '../index';
import { ElementsMenu } from '../../elements.menu';
import { Outline } from '../../outline';
import type { PageSection } from '@app/generated/valhalla.gql';
import React from 'react';
import { SectionProvider } from '../../scope.provider';
import { StyleVariables } from '../style.variables';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

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

const Board: React.FC<
  React.PropsWithChildren<{ section: PageSection; index: number }>
> = ({ section, children, index }) => {
  return (
    <Wrapper
      onMouseOver={() => EditorStore.actions.setActiveSection(section.id)}
      onMouseLeave={() => EditorStore.actions.setActiveSection(null)}
    >
      <SectionProvider
        sectionId={section.id}
        config={section.format}
        index={index}
      >
        <StyleVariables />
        <ElementsBoard.DndContext>
          <ElementsBoard
            onConfigChange={(nextConfig) => {
              action('onConfigChange')(section.id, nextConfig);
            }}
            onElementAdded={(element) => {
              action('onElementAdded')(section.id, element);
            }}
            onElementsUpdated={(elements) => {
              action('onElementsUpdated')(section.id, elements);
            }}
            onElementsDeleted={(elementIdList) => {
              action('onElementsDeleted')(section.id, elementIdList);
            }}
          >
            <Outline />
            {children}
            {/* {elements.map((element) => {
              return (
                <ElementsBoard.Item key={element.id} element={element}>
                  <ElementFactory element={element} />
                </ElementsBoard.Item>
              );
            })} */}
          </ElementsBoard>
        </ElementsBoard.DndContext>
      </SectionProvider>
    </Wrapper>
  );
};

storiesOf('NinetySix/Editors/Page Editor/Board', module)
  .add('Default', () => {
    return (
      <Board
        index={1}
        section={{
          id: '',
          format: {
            columnGap: 10,
            rowGap: 10,
            rowsCount: 10,
          },
        }}
      >
        <FixedTop>
          <ElementsMenu placement="left" />
        </FixedTop>
      </Board>
    );
  })
  .add('With Sections', () => {
    return (
      <React.Fragment>
        {/* {sections.map((section) => (
          <Board section={section} key={section.id}>
            <FixedTop>
              <ElementsMenu placement="left" />
            </FixedTop>
          </Board>
        ))} */}
      </React.Fragment>
    );
  });
