import { Store } from '@app/redux';
import { createNextPlugin } from '../create.plugin';
import { reduxWrapper } from '@app/redux/with.redux';

/**
 * Next plugins to inject and hydrate redux store
 */
export const withRedux = createNextPlugin<{ reduxStore: Store }>(
  async (ctx) => {
    let store: Store;

    function assignStore(
      wrapper: Parameters<
        Parameters<typeof reduxWrapper['getServerSideProps']>[0]
      >[0],
    ) {
      return () => {
        store = wrapper;
        return Promise.resolve({ props: {} });
      };
    }

    if (ctx.isSsr) {
      await reduxWrapper.getServerSideProps(assignStore)(ctx.ssrCtx);
    } else {
      await reduxWrapper.getStaticProps(assignStore)(ctx.ssgCtx);
    }

    ctx.reduxStore = store;
    ctx.onPageProps(() => ({ initialState: store.getState() }));

    return ctx;
  },
);
