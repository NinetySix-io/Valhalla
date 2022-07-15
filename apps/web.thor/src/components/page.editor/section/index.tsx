import * as React from 'react';

import { activeSection, isDragging } from './atoms';
import { css, styled } from '@mui/material';
import { useAtom, useAtomValue } from 'jotai';

import { AddSectionBtn } from './add.section.btn';
import { DropZone } from './drop.zone';
import { ElementsMenu } from './elements.menu';
import { ScreenSize } from '@app/redux/slices/editor';
import { SectionMenu } from './section.menu';
import { cProps } from '@valhalla/react';
import { makeFilter } from '@app/lib/make.filter';
import { throttle } from '@valhalla/utilities';
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

export const Section: React.FC<Props> = ({ sectionId }) => {
  const [active, setActiveBlock] = useAtom(activeSection);
  const isMobile = useReduxSelector(
    (state) => state.SiteEditor.size !== ScreenSize.DESKTOP,
  );
  const isActivelyDragging = useAtomValue(isDragging);
  const isHover = active === sectionId;
  const handleHover = throttle(
    () => !isActivelyDragging && setActiveBlock(sectionId),
    100,
  );

  const handleLeave = () => isHover && setActiveBlock(null);

  return (
    <Container
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
      onClick={handleHover}
      isHover={isHover}
    >
      <AddSectionBtn align="top" sectionId={sectionId} visible={isHover} />
      <AddSectionBtn align="bottom" sectionId={sectionId} visible={isHover} />
      <Content>
        <MenuArea isMobile={isMobile}>
          <ElementsMenu sectionId={sectionId} placement="left-start" />
          <SectionMenu sectionId={sectionId} placement="right-start" />
        </MenuArea>
        <DropZone />
      </Content>
    </Container>
  );
};
