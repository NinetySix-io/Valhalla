import * as React from 'react';

import { css, styled } from '@mui/material';

import { BodySection } from './body.section';
import { DndProvider } from 'react-dnd';
import { FooterSection } from './footer.section';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { HeaderSection } from './header.section';
import { ScreenSize } from '@app/redux/slices/editor';
import { cProps } from '@valhalla/web.react';
import { useReduxSelector } from '@app/redux/hooks';

type Props = cProps;

const Container = styled('div')(
  () => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    flex-grow: 1;
    overflow: auto;
  `,
);

const Content = styled('div')<{ size: ScreenSize }>(
  ({ theme, size }) => css`
    transition: all 0.5s;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    ${size === ScreenSize.DESKTOP &&
    css`
      width: 100%;
      height: 100%;
    `}

    ${size < ScreenSize.DESKTOP &&
    css`
      max-width: ${size}px;
      outline: solid thin ${theme.palette.grey[200]};
      border-radius: ${theme.shape.borderRadius};
      margin: ${theme.spacing(1)} 0;
    `}

    ${size === ScreenSize.MOBILE &&
    css`
      min-height: 844px;
    `}
    ${size === ScreenSize.TABLET &&
    css`
      min-height: 1180px;
    `}
  `,
);

export const PageEditor: React.FC<Props> = () => {
  const size = useReduxSelector((state) => state.SiteEditor.size);

  return (
    <Container>
      <DndProvider backend={HTML5Backend}>
        <Content size={size}>
          <HeaderSection />
          <BodySection />
          <FooterSection />
        </Content>
      </DndProvider>
    </Container>
  );
};
