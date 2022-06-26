import { Store, makeStore } from './make.store';

import { AppProps } from 'next/app';
import { createWrapper } from 'next-redux-wrapper';

export const reduxWrapper = createWrapper<Store>(makeStore);

export const useReduxHydration = (props: Omit<AppProps, 'Component'>) =>
  reduxWrapper.useWrappedStore(props).store;
