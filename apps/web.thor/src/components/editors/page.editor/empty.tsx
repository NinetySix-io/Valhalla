import * as React from 'react';

import { Button, Typography, css, styled } from '@mui/material';

import { useAddSection } from './hooks/use.section.mutations';

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
  const [createSection, loading] = useAddSection();

  return (
    <Container>
      <AddSectionBtn
        disableRipple
        onClick={() => createSection()}
        disabled={loading}
      >
        <Typography variant="h6">Add Section</Typography>
      </AddSectionBtn>
    </Container>
  );
};
