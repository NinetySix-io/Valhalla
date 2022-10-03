import * as React from 'react';

import type { BoardElement, DroppedElement } from '../types';
import { Container, MenuArea } from './styles';

import { AddSectionBtn } from './add.section.btn';
import { EditorStore } from '../store';
import { ElementFactory } from './element.factory';
import { ElementsBoard } from './elements.board';
import { ElementsMenu } from './elements.menu';
import { Outline } from './outline';
import { ScreenSize } from '../constants';
import type { Section } from '../store/types';
import { SectionMenu } from './section.menu';
import { SectionProvider } from './scope.provider';
import { compareById } from '@app/lib/compare.by.id';
import uniqueId from 'lodash.uniqueid';

type Props = {
  sectionId: string;
};

export const BodySection: React.FC<Props> = React.memo(({ sectionId }) => {
  const sectionIndex = EditorStore.useSelect((state) =>
    state.sections.findIndex(compareById(sectionId)),
  );
  const section = EditorStore.useSelect((state) =>
    state.sections.find(compareById(sectionId)),
  );
  const isMobile = EditorStore.useSelect(
    (state) => state.size < ScreenSize.DESKTOP,
  );

  function handleHover() {
    if (EditorStore.getState().activeSection !== sectionId) {
      EditorStore.actions.setActiveSection(sectionId);
    }
  }

  function handleLeave() {
    if (EditorStore.getState().activeSection) {
      EditorStore.actions.setActiveSection(null);
    }
  }

  function handleConfigChange(nextConfig: Section['config']) {
    EditorStore.actions.updateSectionConfig(sectionId, nextConfig);
  }

  function handleElementsUpdated(elements: Section['children']) {
    EditorStore.actions.replaceElements(sectionId, elements);
  }

  function handleElementsDeleted(elementIds: BoardElement['id'][]) {
    EditorStore.actions.removeElements(sectionId, elementIds);
  }

  function handleAddElement(element: DroppedElement) {
    EditorStore.actions.addElement(sectionId, {
      ...element,
      id: uniqueId('element'),
    });
  }

  return (
    <SectionProvider sectionId={sectionId} config={section.config}>
      <Container
        id={sectionId}
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
      >
        <ElementsBoard.DndContext>
          <MenuArea isMobile={isMobile}>
            <ElementsMenu placement="left" />
            <SectionMenu placement="right" index={sectionIndex} />
          </MenuArea>
          <ElementsBoard
            onConfigChange={handleConfigChange}
            onElementsUpdated={handleElementsUpdated}
            onElementsDeleted={handleElementsDeleted}
            onElementAdded={handleAddElement}
          >
            {section.children.map((element) => (
              <ElementsBoard.Item key={element.id} element={element}>
                <ElementFactory element={element} />
              </ElementsBoard.Item>
            ))}
          </ElementsBoard>
          <Outline />
          <AddSectionBtn align="top" />
          <AddSectionBtn align="bottom" />
        </ElementsBoard.DndContext>
      </Container>
    </SectionProvider>
  );
});

BodySection.displayName = 'BodySection';
