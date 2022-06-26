import { GetServerSidePropsContext } from 'next';
import { PluginCtx } from './types';

export function createSsrPlugin<C>(
  cb: (
    ctx: GetServerSidePropsContext & C & PluginCtx,
  ) => typeof ctx | Promise<typeof ctx>,
) {
  return (ctx) => {
    return cb(ctx);
  };
}
