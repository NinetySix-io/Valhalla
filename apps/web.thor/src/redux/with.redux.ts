import { Store, makeStore } from './make.store';

import { AppProps } from 'next/app';
import { createWrapper } from 'next-redux-wrapper';

const { getServerSideProps, getStaticProps, useWrappedStore } =
  createWrapper<Store>(makeStore);

export const withSsrRedux = getServerSideProps;
export const withSsgRedux = getStaticProps;
export const useReduxHydration = (props: Omit<AppProps, 'Component'>) =>
  useWrappedStore(props).store;
