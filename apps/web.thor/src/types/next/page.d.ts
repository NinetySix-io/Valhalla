import { NextSeoProps } from 'next-seo';
import { BasicObject } from '@valhalla/utilities';
import * as React from 'react';

export type Layout<P extends BasicObject> = React.FC<
  {
    SEO?: NextSeoProps;
    children: React.ReactNode;
  } & P
>;

export type Page<
  T extends BasicObject = BasicObject,
  L extends BasicObject = BasicObject,
> = React.FC<T> & {
  isUnprotected?: boolean;
  Layout?: Layout<L>;
};
