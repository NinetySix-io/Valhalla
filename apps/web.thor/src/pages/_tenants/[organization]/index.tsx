import { withApollo, withRedux, withSsrPlugins } from '@app/next/plugins';

import { Page } from '@app/types/next';
import { cProps } from '@valhalla/react';

type Props = cProps;

const OrganizationPage: Page<Props> = () => {
  return <div>site</div>;
};

export const getServerSideProps = withSsrPlugins(
  [withRedux, withApollo({ protected: true })],
  () => {
    return {
      props: {},
    };
  },
);

export default OrganizationPage;
