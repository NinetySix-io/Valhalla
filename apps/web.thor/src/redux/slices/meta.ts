import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type State = {
  domain: string;
  isDarkMode?: boolean;
  accessToken?: string;
  accessTokenExpires?: Date;
};

const initialState: State = {
  domain: '',
};

export const MetaSlice = createSlice({
  name: 'meta',
  initialState,
  reducers: {
    clearAccessToken(state) {
      state.accessToken = null;
      state.accessTokenExpires = null;
    },
    setAccessToken(
      state,
      action: PayloadAction<
        Required<Pick<State, 'accessToken' | 'accessTokenExpires'>>
      >,
    ) {
      state.accessToken = action.payload.accessToken;
      state.accessTokenExpires = action.payload.accessTokenExpires;
    },
    setIsDarkMode(state, action: PayloadAction<State['isDarkMode']>) {
      state.isDarkMode = action.payload;
    },
    setDomain(state, action: PayloadAction<State['domain']>) {
      state.domain = action.payload;
    },
  },
});
