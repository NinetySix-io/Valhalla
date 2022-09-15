import { createStore, createStoreHook, withImmer } from 'tiamut';

import type { FindOrganizationBySlugQuery } from '@app/generated/valhalla.gql';

type State = {
  organization?: FindOrganizationBySlugQuery['organizationBySlug'];
};

const initialState: State = {};

export const Tenant = createStore(
  withImmer({
    initialState,
    actions: {
      setOrganization(state, org: State['organization']) {
        state.organization = org;
      },
    },
  }),
);

export const TenantStore = createStoreHook(Tenant);
