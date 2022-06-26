import * as React from 'react';

import { Page } from '@app/types/next';
import { cProps } from '@valhalla/react';
import { withProtectedApollo } from '@app/next/plugins/with.apollo.ctx';
import { withRedux } from '@app/next/plugins/with.redux';
import { withReduxReqMeta } from '@app/next/plugins/with.req.meta';
import { withSsrPlugins } from '@app/next';

type Props = cProps;

const OrganizationPage: Page<Props> = () => {
  return <div>site</div>;
};

export const getServerSideProps = withSsrPlugins(
  [withRedux, withReduxReqMeta, withProtectedApollo],
  () => {
    return {
      props: {},
    };
  },
);

export default OrganizationPage;
