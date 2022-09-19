import * as React from 'react';

import { css, styled } from '@mui/material';
import {
  useActiveElement,
  useActiveSectionId,
  useIsDragging,
} from '../context';

import { AddSectionBtn } from './add.section.btn';
import { EditorStore } from '../store';
import { ElementFactory } from './element.factory';
import { ElementsBoard } from './elements.board';
import { ElementsMenu } from './elements.menu';
import { ScreenSize } from '../constants';
import { SectionMenu } from './section.menu';
import { SectionProvider } from './scope.provider';
import { compareById } from '@app/lib/compare.by.id';
import { makeFilterProps } from '@valhalla/web.react';
import throttle from 'lodash.throttle';

const Container = styled(
  'section',
  makeFilterProps(['isHover']),
)<{
  isHover: boolean;
}>(
  ({ theme, isHover }) => css`
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    transition: all 0.2s;
    border: solid 2px transparent;
    margin-top: -2px;

    ${isHover &&
    css`
      border-color: ${theme.palette.primary.main};
    `}
  `,
);

const MenuArea = styled(
  'div',
  makeFilterProps(['isMobile']),
)<{
  isMobile: boolean;
}>(
  ({ theme, isMobile }) => css`
    position: absolute;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    top: 0;

    ${isMobile
      ? css`
          left: -${theme.spacing(2)};
          right: -${theme.spacing(2)};
        `
      : css`
          left: 0;
          right: 0;
          padding: ${theme.spacing(2)};
        `}

    > * {
      width: 5px;
      height: 5px;
    }
  `,
);

type Props = {
  sectionId: string;
};

export const BodySection: React.FC<Props> = React.memo(({ sectionId }) => {
  const activeSection = useActiveSectionId();
  const active = useActiveElement();
  const isActive = !active && activeSection === sectionId;
  const isDragging = useIsDragging();
  const shouldDisplayHelpers = !isDragging && isActive;
  const isFirstSection = EditorStore.useSelect(
    (state) => state.sections.findIndex(compareById(sectionId)) === 0,
  );
  const sectionElements = EditorStore.useSelect(
    (state) => state.sections.find(compareById(sectionId)).children,
  );
  const isMobile = EditorStore.useSelect(
    (state) => state.size < ScreenSize.DESKTOP,
  );
  const config = EditorStore.useSelect(
    (state) => state.sections.find(compareById(sectionId)).config,
  );

  const markActive = throttle(() => {
    EditorStore.actions.setActiveSection(sectionId);
  }, 100);

  const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.preventDefault();
    const target = event.target as HTMLElement;
    if (!target) {
      return;
    }

    if (target.id === sectionId || target.parentElement.id === sectionId) {
      EditorStore.actions.setActiveElement(null);
      markActive();
    }
  };

  const handleHover = () => {
    if (!active) {
      markActive();
    }
  };

  function handleLeave() {
    if (isActive) {
      EditorStore.actions.setActiveSection(null);
    }
  }

  return (
    <SectionProvider sectionId={sectionId} config={config}>
      <Container
        id={sectionId}
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
        onClick={handleClick}
        isHover={isActive}
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
        <ElementsBoard
          onConfigChange={(nextConfig) =>
            EditorStore.actions.updateSectionConfig(sectionId, nextConfig)
          }
          onElementsUpdated={(elements) =>
            EditorStore.actions.replaceElements(sectionId, elements)
          }
          onElementsDeleted={(elementIdList) =>
            EditorStore.actions.removeElements(sectionId, elementIdList)
          }
          onElementAdded={(element) =>
            EditorStore.actions.addElement(sectionId, {
              ...element,
              //TODO: server side
              id: new Date().valueOf().toString(),
            })
          }
        >
          {sectionElements?.map((element) => (
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
