import * as React from 'react';

import { ScreenSize, SiteEditorSlice } from '@app/redux/slices/editor';
import { SectionIdContext, useIsDragging } from './context';
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

const Container = styled('div', {
  shouldForwardProp: makeFilter(['isHover']),
})<{ isHover: boolean }>(
  ({ theme, isHover }) => css`
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;

    ${isHover &&
    css`
      outline: solid 2px ${theme.palette.primary.main};
    `}
  `,
);

const Content = styled('div')(
  ({ theme }) => css`
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    padding: ${theme.spacing(3)} ${theme.spacing(1)};
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

type Props = cProps<{ sectionId: string }>;

export const BodySectionItem: React.FC<Props> = ({ sectionId }) => {
  const dispatch = useDispatch();
  const activeSection = useReduxSelector((s) => s.SiteEditor.activeSection);
  const isActive = activeSection === sectionId;
  const isDragging = useIsDragging();
  const isMobile = useReduxSelector(
    (state) => state.SiteEditor.size !== ScreenSize.DESKTOP,
  );
  const handleHover = throttle(
    () =>
      !isDragging &&
      dispatch(SiteEditorSlice.actions.setActiveSection(sectionId)),
    100,
  );

  const handleLeave = () =>
    isActive && dispatch(SiteEditorSlice.actions.setActiveSection(null));

  return (
    <SectionIdContext.Provider value={sectionId}>
      <Container
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
        onClick={handleHover}
        isHover={isActive}
      >
        <AddSectionBtn align="top" />
        <AddSectionBtn align="bottom" />
        <Content>
          <MenuArea isMobile={isMobile}>
            <ElementsMenu placement="left-start" />
            <SectionMenu placement="right-start" />
          </MenuArea>
          <DropZone />
        </Content>
      </Container>
    </SectionIdContext.Provider>
  );
};
