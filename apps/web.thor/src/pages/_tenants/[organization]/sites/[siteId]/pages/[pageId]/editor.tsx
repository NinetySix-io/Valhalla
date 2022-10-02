import * as React from 'react';

import { PageEditor } from '@app/components/editors/page.editor';
import { TenantSiteLayout } from '@app/layout/tenant.site';
import { UserAgentStyleDisabler } from '@app/components/user.agent.style';
import type { View } from '@app/types/next';
import { composeNextPlugins } from '@app/next/plugins/compose.plugins';
import { makeTenantStaticPaths } from '@app/next/tenant/make.static.paths';
import { withApollo } from '@app/next/plugins/presets/with.apollo';
import { withOrgContext } from '@app/next/plugins/presets/with.org.context';

const PageEditorView: View = () => {
  return (
    <React.Fragment>
      <UserAgentStyleDisabler />
      <PageEditor />
    </React.Fragment>
  );
};

export const getStaticPaths = makeTenantStaticPaths();
export const getStaticProps = composeNextPlugins(
  [withApollo, withOrgContext],
  () => {
    return {
      props: {
        SEO: {
          title: 'Site Editor',
        },
      },
    };
  },
);

PageEditorView.Layout = TenantSiteLayout;
export default PageEditorView;
