import * as React from 'react';

import { Typography, css, styled } from '@mui/material';

import { Menu } from './menu';
import { MetaUpdateModal } from './update.modal';
import { cProps } from '@valhalla/web.react';
import { useAnchor } from '@app/hooks/dom/use.anchor';
import { useSitePageHydrate } from '@app/hooks/hydrate/use.site.page.hydrate';

const Container = styled('div')(
  ({ theme }) => css`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 ${theme.spacing(1)};
  `,
);

const Content = styled('button')(
  () => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: none;
    background-color: transparent;
    cursor: pointer;
  `,
);

type Props = cProps;

export const Meta: React.FC<Props> = () => {
  const anchor = useAnchor();
  const page = useSitePageHydrate();
  const [updating, setUpdating] = React.useState(false);

  function getTitle() {
    if (!page.data || page.loading) {
      return (
        <Typography variant="h6" component="h1" lineHeight="normal">
          Loading ...
        </Typography>
      );
    }

    return (
      <React.Fragment>
        <Typography variant="h6" component="h1" lineHeight="normal">
          {page.data.title}
        </Typography>
        <Typography variant="caption" lineHeight="normal">
          {page.data.status}
        </Typography>
      </React.Fragment>
    );
  }

  return (
    <Container>
      <Content onClick={() => setUpdating(true)}>{getTitle()}</Content>
      <Menu open={anchor.isActive} onClose={anchor.remove} />
      <MetaUpdateModal open={updating} onClose={() => setUpdating(false)} />
    </Container>
  );
};
