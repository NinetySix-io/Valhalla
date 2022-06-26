import { OnPagePropsCb, PluginCtx } from './types';

import { BasicObject } from '@valhalla/utilities';
import { GetServerSideProps } from '../types';
import { IntersectionOfArrayFnReturn } from '@app/types/intersection.of.array.fn.return';
import { ParsedUrlQuery } from 'querystring';
import { PreviewData } from 'next';
import { merge } from 'merge-anything';

export function withSsrPlugins<
  R extends GetServerSideProps<
    BasicObject,
    ParsedUrlQuery,
    PreviewData,
    BasicObject
  >,
  P extends (...args) => unknown,
  C extends Parameters<R>[0] & IntersectionOfArrayFnReturn<Array<P>>,
  O extends ReturnType<R>,
>(
  plugins: Array<P>,
  cb?: (ctx: C) => O | Promise<O>,
): (ctx: C & PluginCtx) => Promise<O> | O {
  return async (ctx) => {
    const pagePropsCbList: OnPagePropsCb[] = [];
    ctx.onPageProps = (cb: OnPagePropsCb) => pagePropsCbList.push(cb);

    let lastCtx = ctx;
    for (const plugin of plugins) {
      lastCtx = (await plugin(ctx)) as typeof ctx;

      if (lastCtx.redirect) {
        return { redirect: lastCtx.redirect } as O;
      } else if (lastCtx.notFound) {
        return { notFound: lastCtx.notFound } as O;
      }
    }

    const pageProps = await cb(lastCtx);
    for (const cb of pagePropsCbList) {
      const props = pageProps['props'] ?? {};
      pageProps['props'] = merge(cb(props), props);
    }

    return pageProps;
  };
}
