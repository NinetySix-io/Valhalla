import * as React from 'react';

import { Button, css, styled } from '@mui/material';
import { ScreenSize, SiteEditorSlice } from '@app/redux/slices/editor';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Section } from './section';
import { cProps } from '@valhalla/react';
import { useDispatch } from 'react-redux';
import { useReduxSelector } from '@app/redux/hooks';

type Props = cProps;

const Container = styled('div')(
  () => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    flex-grow: 1;
  `,
);

const Content = styled('div')<{ size: ScreenSize }>(
  ({ theme, size }) => css`
    transition: all 0.5s;
    display: flex;
    flex-direction: column;
    align-items: center;

    ${size === ScreenSize.DESKTOP &&
    css`
      width: 100%;
    `}
    ${size === ScreenSize.MOBILE &&
    css`
      margin-top: ${theme.spacing(1)};
      width: 400px;
      outline: solid thin ${theme.palette.grey[200]};
      border-radius: ${theme.shape.borderRadius};
    `}
    ${size === ScreenSize.TABLET &&
    css`
      margin-top: ${theme.spacing(1)};
      width: 820px;
      outline: solid thin ${theme.palette.grey[200]};
      border-radius: ${theme.shape.borderRadius};
    `}
  `,
);

export const PageEditor: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const sections = useReduxSelector((state) => state.SiteEditor.sections);
  const size = useReduxSelector((state) => state.SiteEditor.size);

  function getWrapper(children: React.ReactNode) {
    return (
      <Container>
        <DndProvider backend={HTML5Backend}>
          <Content size={size}>{children}</Content>
        </DndProvider>
      </Container>
    );
  }

  if (sections.length === 0) {
    return getWrapper(
      <Button onClick={() => dispatch(SiteEditorSlice.actions.addSection())}>
        Add Section
      </Button>,
    );
  }

  return getWrapper(
    sections.map((section) => (
      <Section key={section.id} sectionId={section.id} />
    )),
  );
};
