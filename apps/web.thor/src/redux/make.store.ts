import { Environment } from '@app/env';
import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducers';

let _store: ReturnType<typeof _makeStore>;

/**
 * It creates a Redux store and it uses the `withHydration` function to hydrate
 * the store with the initial state from the server
 */
function _makeStore() {
  return configureStore({
    devTools: Environment.isDev,
    reducer,
  });
}

/**
 * If the store hasn't been created yet, create it and return it. Otherwise, return the existing store.
 */
export function makeStore() {
  if (!_store) {
    _store = _makeStore();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (!Environment.isServer && module.hot) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      module.hot.accept('./reducers', () => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const nextRootReducer = require('./reducers').reducer;
        _store.replaceReducer(nextRootReducer);
      });
    }
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
