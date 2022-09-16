import * as React from 'react';

import { Button, styled } from '@mui/material';

import { CreateSiteModal } from '@app/components/site.create.modal';
import { SiteList } from '@app/components/site.list';
import { useGetSitesQuery } from '@app/generated/valhalla.gql';
import { TenantMainLayout } from '@app/layout/tenant.main';
import { composeNextPlugins } from '@app/next/plugins/compose.plugins';
import { withApollo } from '@app/next/plugins/presets/with.apollo';
import { withOrgContext } from '@app/next/plugins/presets/with.org.context';
import { makeTenantStaticPaths } from '@app/next/tenant/make.static.paths';
import type { View } from '@app/types/next';

const Container = styled('div')``;

const SiteListView: View = () => {
  const [addingSite, setAddingSite] = React.useState(false);
  const sites = useGetSitesQuery();

  return (
    <Container>
      <Button onClick={() => setAddingSite(true)}>Add Site</Button>
      <SiteList />
      <CreateSiteModal isOpen={addingSite} onFinish={() => sites.refetch()} />
    </Container>
  );
};

export const getStaticPaths = makeTenantStaticPaths();
export const getStaticProps = composeNextPlugins([withApollo, withOrgContext]);

SiteListView.Layout = TenantMainLayout;
export default SiteListView;
