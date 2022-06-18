import {
  GetOrganizationBySlugQuery,
  refetchGetOrganizationBySlugQuery,
} from '@app/graphql/valhalla/generated.gql';

import { OrganizationSlice } from '@app/redux/slices/organization.';
import { Page } from '@app/types/next';
import { batch } from 'react-redux';
import { useReduxSelector } from '@app/redux/hooks';
import { withAuthSsrContext } from '@app/next/with.app.ctx';

const OrganizationPage: Page = () => {
  const orgName = useReduxSelector(
    (state) => state.organization?.organization?.name,
  );

  return <div>{orgName}</div>;
};

export const getServerSideProps = withAuthSsrContext(async (ctx) => {
  const slug = ctx.params.organization as string;
  const result = await ctx.gqlClient
    .query<GetOrganizationBySlugQuery>(
      refetchGetOrganizationBySlugQuery({
        slug,
      }),
    )
    .then((response) => response.data.organizationBySlug);

  batch(() => {
    ctx.store.dispatch(
      OrganizationSlice.actions.setMembership(result.membership),
    );

    ctx.store.dispatch(
      OrganizationSlice.actions.setOrganization(result.organization),
    );
  });

  return {
    props: {
      SEO: {
        title: result.organization.name,
      },
    },
  };
});

export default OrganizationPage;
