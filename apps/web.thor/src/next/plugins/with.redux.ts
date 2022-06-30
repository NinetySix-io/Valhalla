import { Store } from '@app/redux';
import { createSsrPlugin } from './create.plugin';
import { reduxWrapper } from '@app/redux/with.redux';

export const withRedux = createSsrPlugin<{ reduxStore: Store }>(async (ctx) => {
  let store: Store;
  await reduxWrapper.getServerSideProps((wrapperStore) => () => {
    store = wrapperStore;
    return Promise.resolve({
      props: {},
    });
  })(ctx);

  ctx.reduxStore = store;
  ctx.onPageProps(() => ({
    initialState: store.getState(),
  }));

  return ctx;
});
