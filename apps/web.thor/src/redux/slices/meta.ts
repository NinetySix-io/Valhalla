import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type State = {
  accessToken?: string;
  accessTokenExpires?: Date;
};

const initialState: State = {};

export const MetaSlice = createSlice({
  name: 'meta',
  initialState,
  reducers: {
    setAccessToken(
      state,
      action: PayloadAction<
        Required<Pick<State, 'accessToken' | 'accessTokenExpires'>>
      >,
    ) {
      state.accessToken = action.payload.accessToken;
      state.accessTokenExpires = action.payload.accessTokenExpires;
    },
  },
});
