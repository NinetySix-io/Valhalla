import { createStore, createStoreHook, withImmer } from 'tiamut';

type State = {
  isDarkMode?: boolean;
  requireAuth?: boolean;
  accessToken?: string;
};

export const Meta = createStore(
  withImmer({
    initialState: {} as State,
    actions: {
      setIsDarkMode(state, value: State['isDarkMode']) {
        state.isDarkMode = value;
      },
      setRequireAuth(state, value: State['requireAuth']) {
        state.requireAuth = value;
      },
      setAccessToken(state, value: State['accessToken']) {
        state.accessToken = value;
      },
    },
  }),
);

export const MetaStore = createStoreHook(Meta);
