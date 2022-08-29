import * as React from 'react';

import { Button, css, styled } from '@mui/material';

import { BodySectionItem } from './item';
import { SiteEditorSlice } from '@app/redux/slices/editor';
import isEmpty from 'lodash.isempty';
import { useDispatch } from 'react-redux';
import { useReduxSelector } from '@app/redux/hooks';

const Container = styled('div')(
  () => css`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    width: 100%;
  `,
);

export const BodySection: React.FC = () => {
  const dispatch = useDispatch();
  const sections = useReduxSelector((state) => state.SiteEditor.sections);

  if (isEmpty(sections)) {
    return (
      <Container>
        <Button onClick={() => dispatch(SiteEditorSlice.actions.addSection())}>
          Add Section
        </Button>
      </Container>
    );
  }

  return (
    <Container>
      {sections.map((section) => (
        <BodySectionItem key={section.id} sectionId={section.id} />
      ))}
    </Container>
  );
};
