import * as React from 'react';

import { Button, styled } from '@mui/material';
import { FaSolid, Icon } from '@valhalla/react';

import { CreateSiteModal } from '@app/components/site.create.modal';
import { Page } from '@app/types/next';
import { SiteList } from '@app/components/site.list';
import { TenantMainLayout } from '@app/layout/tenant.main';
import { composeNextPlugins } from '@app/next/plugins/compose.plugins';
import { makeTenantStaticPaths } from '@app/next/tenant/make.static.paths';
import { useGetSitesQuery } from '@app/generated/valhalla.gql';
import { withApollo } from '@app/next/plugins/presets/with.apollo';
import { withOrgContext } from '@app/next/plugins/presets/with.org.context';
import { withRedux } from '@app/next/plugins/presets/with.redux';

const SiteListPage: Page = () => {
  const [addingSite, setAddingSite] = React.useState(false);
  const sites = useGetSitesQuery();

  return (
    <Container>
      <Button onClick={() => setAddingSite(true)}>
        <Icon icon={FaSolid.faPlus} />
        Add Site
      </Button>
      <SiteList />
      <CreateSiteModal isOpen={addingSite} onFinish={() => sites.refetch()} />
    </Container>
  );
};

const Container = styled('div')``;

export const getStaticPaths = makeTenantStaticPaths();
export const getStaticProps = composeNextPlugins([
  withApollo,
  withRedux,
  withOrgContext,
]);

SiteListPage.Layout = TenantMainLayout;
export default SiteListPage;
