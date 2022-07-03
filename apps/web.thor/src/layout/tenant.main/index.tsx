import { BaseLayout, LayoutBody } from '../base';
import { css, styled } from '@mui/material';

import { Layout } from '@app/types/next';
import { NextSeo } from 'next-seo';
import React from 'react';
import { Sidebar } from './side.bar';
import { TenantStartupProvider } from '@app/components/tenant.startup.provider';
import { cProps } from '@valhalla/react';
import { useReduxSelector } from '@app/redux/hooks';

const Container = styled(BaseLayout)`
  display: flex;
  height: 100%;
  flex-direction: row;
`;

const Content = styled(LayoutBody)(
  ({ theme }) => css`
    flex-grow: 1;
    padding: ${theme.spacing(1)};
  `,
);

type Props = cProps;

export const TenantMainLayout: Layout<Props> = ({ children, SEO }) => {
  const orgName = useReduxSelector((state) => state.tenant.organization?.name);
  const titleTemplate = orgName ? `%s | ${orgName}` : undefined;

  return (
    <React.Fragment>
      <NextSeo titleTemplate={titleTemplate} {...SEO} noindex nofollow />
      <Container>
        <Sidebar />
        <TenantStartupProvider>
          <Content>{children}</Content>
        </TenantStartupProvider>
      </Container>
    </React.Fragment>
  );
};
