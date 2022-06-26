import { GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { PluginCtx } from './types';

export function createSsrPlugin<C, Q extends ParsedUrlQuery = ParsedUrlQuery>(
  cb: (
    ctx: GetServerSidePropsContext<Q> & C & PluginCtx,
  ) => typeof ctx | Promise<typeof ctx>,
) {
  return (ctx) => {
    return cb(ctx);
  };
}
