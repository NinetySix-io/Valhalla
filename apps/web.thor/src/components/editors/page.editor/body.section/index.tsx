import * as React from 'react';

import type { BoardElement, DroppedElement } from '../types';
import { Container, MenuArea } from './styles';

import { AddSectionBtn } from './add.section.btn';
import { EditorStore } from '../store';
import { ElementFactory } from './element.factory';
import { ElementsBoard } from './elements.board';
import { ElementsMenu } from './elements.menu';
import { ScreenSize } from '../constants';
import type { Section } from '../store/types';
import { SectionMenu } from './section.menu';
import { SectionProvider } from './scope.provider';
import { compareById } from '@app/lib/compare.by.id';
import throttle from 'lodash.throttle';
import uniqueId from 'lodash.uniqueid';

type Props = {
  sectionId: string;
};

export const BodySection: React.FC<Props> = React.memo(({ sectionId }) => {
  const isDragging = EditorStore.useSelect((state) => state.isDragging);
  const isActive = EditorStore.useSelect(
    (state) => state.activeSection === sectionId,
  );
  const isFirstSection = EditorStore.useSelect(
    (state) => state.sections.findIndex(compareById(sectionId)) === 0,
  );
  const section = EditorStore.useSelect((state) =>
    state.sections.find(compareById(sectionId)),
  );
  const isMobile = EditorStore.useSelect(
    (state) => state.size < ScreenSize.DESKTOP,
  );
  const markActive = throttle(() => {
    EditorStore.actions.setActiveSection(sectionId);
  }, 100);

  const shouldDisplayHelpers = !isDragging && isActive;

  function handleHover() {
    if (!isActive) {
      markActive();
    }
  }

  function handleLeave() {
    if (isActive) {
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
        isHover={isActive}
      >
        <ElementsBoard
          onConfigChange={handleConfigChange}
          onElementsUpdated={handleElementsUpdated}
          onElementsDeleted={handleElementsDeleted}
          onElementAdded={handleAddElement}
        >
          <MenuArea isMobile={isMobile}>
            <ElementsMenu
              placement="left-start"
              isVisible={shouldDisplayHelpers}
            />
            <SectionMenu
              placement="right-start"
              isVisible={shouldDisplayHelpers}
            />
          </MenuArea>
          {section.children?.map((element) => (
            <ElementsBoard.Item key={element.id} element={element}>
              <ElementFactory element={element} />
            </ElementsBoard.Item>
          ))}
        </ElementsBoard>
        <AddSectionBtn
          align="top"
          isVisible={shouldDisplayHelpers && !isFirstSection}
        />
        <AddSectionBtn align="bottom" isVisible={shouldDisplayHelpers} />
      </Container>
    </SectionProvider>
  );
});

BodySection.displayName = 'BodySection';
