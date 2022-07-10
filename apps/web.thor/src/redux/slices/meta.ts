import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type State = {
  isDarkMode?: boolean;
  requireAuth?: boolean;
  accessToken?: string;
};

const initialState: State = {};

export const MetaSlice = createSlice({
  name: 'Meta',
  initialState,
  reducers: {
    setIsDarkMode(state, action: PayloadAction<State['isDarkMode']>) {
      state.isDarkMode = action.payload;
    },
    setRequireAuth(state, action: PayloadAction<State['requireAuth']>) {
      state.requireAuth = action.payload;
    },
    setAccessToken(state, action: PayloadAction<State['accessToken']>) {
      state.accessToken = action.payload;
    },
  },
});
