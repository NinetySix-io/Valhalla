import { Redirect } from 'next';

export type OnPagePropsCb = (props: object) => object;

export type PluginCtx = {
  onPageProps?: (cb: OnPagePropsCb) => void;
  redirect?: Redirect;
  notFound?: true;
};
