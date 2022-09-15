import type {
  GetServerSidePropsContext,
  GetStaticPropsContext,
  PreviewData,
  Redirect,
} from 'next';
import type { ParsedUrlQuery } from 'querystring';

export type OnPagePropsCb = (props: object) => object;

export type PluginCtx<
  C = object,
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData,
> = {
  onPageProps?: (cb: OnPagePropsCb) => void;
  redirect?: Redirect;
  notFound?: true;
  isSsr: boolean;
  ssrCtx: GetServerSidePropsContext<Q, D> & C;
  ssgCtx: GetStaticPropsContext<Q, D> & C;
} & Pick<
  GetStaticPropsContext<Q, D>,
  'params' | 'locale' | 'locales' | 'defaultLocale' | 'preview' | 'previewData'
>;
