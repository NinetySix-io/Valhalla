import * as React from 'react';

import { Button, css, styled } from '@mui/material';

import { BodySectionItem } from './item';
import isEmpty from 'lodash.isempty';
import { EditorStore } from '../store';

const Container = styled('div')(
  () => css`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    width: 100%;
  `,
);

export const BodySection: React.FC = () => {
  const sections = EditorStore.useSelect((state) => state.sections);

  if (isEmpty(sections)) {
    return (
      <Container>
        <Button onClick={() => EditorStore.actions.addSection()}>
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
