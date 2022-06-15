import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  PreviewData,
} from 'next';

import { WithSEO } from '@valhalla/react';
import { BasicObject } from '@valhalla/utilities';
import { ParsedUrlQuery } from 'querystring';

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

export type GqlClient = ReturnType<typeof createApolloClient>;
