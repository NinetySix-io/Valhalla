import * as React from 'react';

import { ScreenSize, SiteEditorSlice } from '@app/redux/slices/editor';
import {
  SectionIdContext,
  useActiveDrop,
  useActiveSection,
  useIsDragging,
} from '../context';
import { css, styled } from '@mui/material';

import { AddSectionBtn } from './add.section.btn';
import { DropZone } from './drop.zone';
import { ElementsMenu } from './elements.menu';
import { SectionMenu } from './section.menu';
import { cProps } from '@valhalla/react';
import { makeFilter } from '@app/lib/make.filter';
import { throttle } from '@valhalla/utilities';
import { useDispatch } from 'react-redux';
import { useReduxSelector } from '@app/redux/hooks';

const Container = styled('section', {
  shouldForwardProp: makeFilter(['isHover']),
})<{ isHover: boolean }>(
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

const MenuArea = styled('div', {
  shouldForwardProp: makeFilter(['isMobile']),
})<{ isMobile: boolean }>(
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
      /* background-color: red; */
    }
  `,
);

type Props = cProps<{
  sectionId: string;
}>;

export const BodySectionItem: React.FC<Props> = ({ sectionId }) => {
  const dispatch = useDispatch();
  const activeSection = useActiveSection();
  const activeDrop = useActiveDrop();
  const isActive = !activeDrop && activeSection === sectionId;
  const isDragging = useIsDragging();
  const isMobile = useReduxSelector(
    (state) => state.SiteEditor.size < ScreenSize.DESKTOP,
  );

  const markActive = throttle(() => {
    if (!isDragging) {
      dispatch(SiteEditorSlice.actions.setActiveSection(sectionId));
    }
  }, 100);

  const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.preventDefault();
    const target = event.target as HTMLElement;
    if (!target) {
      return;
    }

    if (target.id === sectionId || target.parentElement.id === sectionId) {
      dispatch(SiteEditorSlice.actions.setActiveDrop(null));
      markActive();
    }
  };

  const handleHover = () => {
    if (!activeDrop) {
      markActive();
    }
  };

  function handleLeave() {
    if (isActive) {
      dispatch(SiteEditorSlice.actions.setActiveSection(null));
    }
  }

  return (
    <SectionIdContext.Provider value={sectionId}>
      <Container
        id={sectionId}
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
        onClick={handleClick}
        isHover={isActive}
      >
        <AddSectionBtn align="top" isVisible={isActive} />
        <AddSectionBtn align="bottom" isVisible={isActive} />
        <MenuArea isMobile={isMobile}>
          <ElementsMenu placement="left-start" isVisible={isActive} />
          <SectionMenu placement="right-start" isVisible={isActive} />
        </MenuArea>
        <DropZone />
      </Container>
    </SectionIdContext.Provider>
  );
};
