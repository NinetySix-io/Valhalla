import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type State = {
  isDarkMode?: boolean;
  requireAuth?: boolean;
};

const initialState: State = {};

export const MetaSlice = createSlice({
  name: 'meta',
  initialState,
  reducers: {
    setIsDarkMode(state, action: PayloadAction<State['isDarkMode']>) {
      state.isDarkMode = action.payload;
    },
    setRequireAuth(state, action: PayloadAction<State['requireAuth']>) {
      state.requireAuth = action.payload;
    },
  },
});
