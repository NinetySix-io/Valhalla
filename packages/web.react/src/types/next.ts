import type {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
  PreviewData,
} from 'next';

import type { AppPropsType } from 'next/dist/shared/lib/utils';
import type { BasicObject } from '@valhalla/utilities';
import type { NextSeoProps } from 'next-seo';
import type { ParsedUrlQuery } from 'querystring';
import type { Router } from 'next/router';

export type WithSEO<P> = P & {
  SEO?: NextSeoProps;
};

export type GetServerSideProps<
  P extends BasicObject = BasicObject,
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData,
  C extends BasicObject = BasicObject,
> = (
  context: GetServerSidePropsContext<Q, D> & C,
) =>
  | Promise<GetServerSidePropsResult<WithSEO<P>>>
  | GetServerSidePropsResult<WithSEO<P>>;

export type GetStaticProps<
  P extends BasicObject = BasicObject,
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData,
  C extends BasicObject = BasicObject,
> = (
  context: GetStaticPropsContext<Q, D> & C,
) =>
  | Promise<GetStaticPropsResult<WithSEO<P>>>
  | GetStaticPropsResult<WithSEO<P>>;

export type AppProps<T = object> = AppPropsType<Router, WithSEO<unknown> & T>;
