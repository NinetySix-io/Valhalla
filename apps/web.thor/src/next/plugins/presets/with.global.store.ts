import { Meta } from '@app/global.store/meta';
import { Tenant } from '@app/global.store/tenant';
import { createCombinedStoresHook } from 'tiamut';
import { createNextPlugin } from '../create.plugin';

function makeStore() {
  return createCombinedStoresHook({
    Meta,
    Tenant,
  });
}

export type GlobalStore = ReturnType<typeof makeStore>;

export const withGlobalStore = createNextPlugin<{ globalStore: GlobalStore }>(
  async (ctx) => {
    const store = makeStore();
    ctx.globalStore = store;
    ctx.onPageProps(() => ({
      globalState: store.getState(),
    }));

    return ctx;
  },
);
