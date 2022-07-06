import { css, styled } from '@mui/material';

import { Layout } from '@app/types/next';
import { LayoutBody } from '../base';
import { NextSeo } from 'next-seo';
import React from 'react';
import { Sidebar } from './side.bar';
import { TenantStartupProvider } from '@app/components/tenant.startup.provider';
import { cProps } from '@valhalla/react';
import { useReduxSelector } from '@app/redux/hooks';

const Container = styled('div')`
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
  max-height: 100vh;
  max-width: 100vw;
  overflow: hidden;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
`;

const Content = styled(LayoutBody)(
  ({ theme }) => css`
    flex-grow: 1;
    padding: ${theme.spacing(1)};
  `,
);

type Props = cProps;

const sidebarWidth = 60;
export const TenantMainLayout: Layout<Props> = ({ children, SEO }) => {
  const orgName = useReduxSelector((state) => state.tenant.organization?.name);
  const titleTemplate = orgName ? `%s | ${orgName}` : undefined;

  return (
    <React.Fragment>
      <NextSeo titleTemplate={titleTemplate} {...SEO} noindex nofollow />
      <Container>
        <Sidebar initialWidth={sidebarWidth} />
        <TenantStartupProvider>
          <Content style={{ marginLeft: sidebarWidth }}>{children}</Content>
        </TenantStartupProvider>
      </Container>
    </React.Fragment>
  );
};
