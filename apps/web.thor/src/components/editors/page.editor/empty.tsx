import * as React from 'react';

import { Button, Typography, css, styled } from '@mui/material';
import {
  GetPageSectionListDocument,
  useCreatePageSectionMutation,
} from '@app/generated/valhalla.gql';

import { useApolloClient } from '@apollo/client';
import { useSitePageId } from '@app/hooks/hydrate/use.site.page.hydrate';

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
  const pageId = useSitePageId();
  const client = useApolloClient();
  const [createSection, { loading }] = useCreatePageSectionMutation({
    variables: {
      pageId,
      input: {
        index: -1,
      },
    },
    onCompleted() {
      client.refetchQueries({
        include: [GetPageSectionListDocument],
      });
    },
  });

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
