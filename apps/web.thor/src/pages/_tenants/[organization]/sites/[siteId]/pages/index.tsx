import * as React from 'react';

import {
  useCreatePageMutation,
  useGetPageListQuery,
} from '@app/generated/valhalla.gql';

import type { View } from '@app/types/next';
import { composeNextPlugins } from '@app/next/plugins/compose.plugins';
import isEmpty from 'lodash.isempty';
import { makePageEditorPath } from '@app/lib/router.utils/path.builder';
import { makeTenantStaticPaths } from '@app/next/tenant/make.static.paths';
import { useRouter } from 'next/router';
import { useSiteHydrate } from '@app/hooks/hydrate/use.site.hydrate';
import { withApollo } from '@app/next/plugins/presets/with.apollo';
import { withOrgContext } from '@app/next/plugins/presets/with.org.context';

const PageListView: View = () => {
  const router = useRouter();
  const site = useSiteHydrate();
  const siteId = site.data?.id;
  const pages = useGetPageListQuery({ variables: { siteId } });
  const [createPage] = useCreatePageMutation({
    variables: {
      siteId,
      input: {
        title: 'My First Page',
      },
    },
  });

  React.useEffect(() => {
    if (pages.data && isEmpty(pages.data.pagesBySite)) {
      createPage();
    }
  }, [createPage, siteId, pages]);

  React.useEffect(() => {
    if (pages.data?.pagesBySite?.[0])
      router.replace({
        pathname: makePageEditorPath({
          pageId: pages.data.pagesBySite[0].id,
          siteId,
        }),
      });
  }, [pages, router, siteId]);

  return <div>loading...</div>;
};

export const getStaticPaths = makeTenantStaticPaths();
export const getStaticProps = composeNextPlugins([withApollo, withOrgContext]);

export default PageListView;
