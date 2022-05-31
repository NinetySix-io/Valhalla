import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
  PreviewData,
} from 'next';

import { AppPropsType } from 'next/dist/shared/lib/utils';
import { BasicObject } from '@valhalla/utilities';
import { NextSeoProps } from 'next-seo';
import { ParsedUrlQuery } from 'querystring';
import { Router } from 'next/router';

export type WithSEO<P> = P & {
  SEO?: NextSeoProps;
};

export type GetServerSideProps<
  P extends BasicObject = BasicObject,
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData,
> = (
  context: GetServerSidePropsContext<Q, D>,
) =>
  | Promise<GetServerSidePropsResult<WithSEO<P>>>
  | GetServerSidePropsResult<WithSEO<P>>;

export type GetStaticProps<
  P extends BasicObject = BasicObject,
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData,
> = (
  context: GetStaticPropsContext<Q, D>,
) =>
  | Promise<GetStaticPropsResult<WithSEO<P>>>
  | GetStaticPropsResult<WithSEO<P>>;

export type AppProps = AppPropsType<Router, WithSEO<unknown>>;
