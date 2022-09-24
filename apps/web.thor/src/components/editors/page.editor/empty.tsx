import * as React from 'react';

import { Button, Typography, css, styled } from '@mui/material';
import { EditorStore, makeSection } from './store';

const Container = styled('div')(
  () => css`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    width: 100%;
  `,
);

const AddSectionBtn = styled(Button)(
  ({ theme }) => css`
    padding: ${theme.spacing(4)};
  `,
);

export const EmptyContent: React.FC = () => {
  function handleAddSection() {
    EditorStore.actions.addSection(makeSection(1));
  }

  return (
    <Container>
      <AddSectionBtn disableRipple onClick={handleAddSection}>
        <Typography variant="h6">Add Section</Typography>
      </AddSectionBtn>
    </Container>
  );
};
