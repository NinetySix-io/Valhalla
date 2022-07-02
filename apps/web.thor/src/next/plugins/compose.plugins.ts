import { GetServerSideProps, GetStaticProps } from '@valhalla/react';
import { OnPagePropsCb, PluginCtx } from './types';

import { Environment } from '@app/env';
import { GetServerSidePropsContext } from 'next';
import { IntersectionOfArrayFnReturn } from '@app/types/intersection.of.array.fn.return';
import { merge } from 'merge-anything';

/**
 * SSR Next plugins composer
 */
export function composeNextPlugins<
  R extends GetServerSideProps | GetStaticProps,
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
    ctx.isSsr = Environment.isServer;
    ctx.ssgCtx = ctx;
    ctx.ssrCtx = ctx as GetServerSidePropsContext;

    let lastCtx = ctx;
    for (const plugin of plugins) {
      lastCtx = (await plugin(ctx)) as typeof ctx;

      if (lastCtx.redirect) {
        return { redirect: lastCtx.redirect } as O;
      } else if (lastCtx.notFound) {
        return { notFound: lastCtx.notFound } as O;
      }
    }

    const pageProps = (await cb(lastCtx)) ?? { props: {} };
    for (const cb of pagePropsCbList) {
      const props = pageProps['props'] ?? {};
      pageProps['props'] = merge(cb(props), props);
    }

    return pageProps as O;
  };
}