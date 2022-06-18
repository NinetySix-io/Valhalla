import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { GetOrganizationBySlugQueryResult } from '@app/graphql/valhalla/generated.gql';

type State = Pick<
  GetOrganizationBySlugQueryResult['data']['organizationBySlug'],
  'membership' | 'organization'
>;

const initialState = {} as State;

export const OrganizationSlice = createSlice({
  name: 'organization',
  initialState,
  reducers: {
    setOrganization(state, action: PayloadAction<State['organization']>) {
      state.organization = action.payload;
    },
    setMembership(state, action: PayloadAction<State['membership']>) {
      state.membership = action.payload;
    },
  },
});
