import { ParsedUrlQuery } from 'querystring';
import { PluginCtx } from './types';

/**
 * Helper to create next plugin
 */
export function createNextPlugin<
  C,
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  M extends C & PluginCtx<C, Q> = C & PluginCtx<C, Q>,
>(cb: (ctx: M) => M | Promise<M>) {
  return (ctx: M) => {
    return cb(ctx);
  };
}
