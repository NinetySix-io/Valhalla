import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export enum ScreenSize {
  DESKTOP,
  MOBILE,
  TABLET,
}

type State = {
  size: ScreenSize;
};

const initialState: State = {
  size: ScreenSize.DESKTOP,
};

export const SiteEditorSlice = createSlice({
  name: 'SiteEditor',
  initialState,
  reducers: {
    setSize(state, action: PayloadAction<State['size']>) {
      state.size = action.payload;
    },
  },
});
