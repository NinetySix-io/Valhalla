import { MetaSlice } from '@app/redux/slices/meta';
import { Store } from '@app/redux';
import { createSsrPlugin } from './create.plugin';

export const withReduxReqMeta = createSsrPlugin<{ reduxStore: Store }>(
  (ctx) => {
    const domain = ctx.req.headers.host;
    ctx.reduxStore.dispatch(MetaSlice.actions.setDomain(domain));
    return ctx;
  },
);
