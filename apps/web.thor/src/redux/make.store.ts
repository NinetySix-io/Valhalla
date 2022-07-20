import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { Environment } from '@app/env';
import { MetaSlice } from './slices/meta';
import { SiteEditorSlice } from './slices/editor';
import { TenantSlice } from './slices/tenant';
import { withHydration } from './utils/with.hydration';

let _store: ReturnType<typeof _makeStore>;

/**
 * If we're in development mode and the redux logger is not disabled, then we'll use the redux logger.
 * Otherwise, we'll return an empty array
 */
function getMiddlewares() {
  if (
    Environment.isDev &&
    !Environment.DISABLE_REDUX_LOGGER &&
    !Environment.isServer
  ) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const createLogger = require('redux-logger').createLogger;
    return [
      createLogger({
        collapsed: false,
      }),
    ];
  } else {
    return [];
  }
}

/**
 * It creates a Redux store and it uses the `withHydration` function to hydrate
 * the store with the initial state from the server
 */
function _makeStore() {
  return configureStore({
    devTools: Environment.isDev,
    middleware: getMiddlewares(),
    reducer: withHydration(
      combineReducers({
        [MetaSlice.name]: MetaSlice.reducer,
        [TenantSlice.name]: TenantSlice.reducer,
        [SiteEditorSlice.name]: SiteEditorSlice.reducer,
      }),
    ),
  });
}

/**
 * If the store hasn't been created yet, create it and return it. Otherwise, return the existing store.
 */
export function makeStore() {
  if (!_store) {
    _store = _makeStore();
  }

  return _store;
}

/**
 * It returns the store
 */
export function getStore(): undefined | Store {
  return _store;
}

export type Store = typeof _store;
export type StoreRootState = ReturnType<Store['getState']>;
