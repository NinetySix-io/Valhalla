import { GetServerSideProps } from './types';
import { GetServerSidePropsContext } from 'next';
import { Store } from '@app/redux';
import { withSsrRedux } from '@app/redux/with.redux';

export function withRedux(cb: GetServerSideProps) {
  return withSsrRedux(
    (store) => async (ctx: GetServerSidePropsContext & { store: Store }) => {
      ctx.store = store;
      return await cb(ctx);
    },
  );
}
