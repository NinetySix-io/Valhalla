import * as React from 'react';

import {
  useFindOrganizationBySlugLazyQuery,
  useGetOrgMembershipLazyQuery,
} from '@app/graphql/valhalla/generated.gql';

import { Environment } from '@app/env';
import { TenantSlice } from '@app/redux/slices/tenant';
import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import { useOrgQuery } from './use.org.query';
import { useRouter } from 'next/router';

export function useTenantHydrate() {
  const started = React.useRef(false);
  const router = useRouter();
  const orgSlug = useOrgQuery();
  const dispatch = useDispatch();
  const [getMembership, { data: membership }] = useGetOrgMembershipLazyQuery();
  const [findOrg, { data: org }] = useFindOrganizationBySlugLazyQuery({
    variables: {
      slug: orgSlug,
    },
  });

  useMemo(() => {
    if (orgSlug && !started.current) {
      started.current = true;
      findOrg()
        .then(async ({ data: { organizationBySlug } }) => {
          dispatch(TenantSlice.actions.setOrganization(organizationBySlug));
          await getMembership();
        })
        .catch(() => {
          router.push({
            pathname: Environment.rootUrl,
          });
        });
    }
  }, [orgSlug, router, findOrg, getMembership, dispatch]);

  return Boolean(org && membership);
}
