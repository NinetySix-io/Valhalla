import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { FindOrganizationBySlugQuery } from '@app/generated/valhalla.gql';

type State = {
  organization?: FindOrganizationBySlugQuery['organizationBySlug'];
};

export const initialState: State = {};

export const TenantSlice = createSlice({
  name: 'Tenant',
  initialState,
  reducers: {
    setOrganization(state, action: PayloadAction<State['organization']>) {
      state.organization = action.payload;
    },
  },
});
