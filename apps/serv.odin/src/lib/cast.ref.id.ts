/* eslint-disable @typescript-eslint/no-explicit-any */
// import { ArrayElement, SingleOrMany } from '@valhalla/utilities';
import { Ref, RefType } from '@typegoose/typegoose/lib/types';

import { Types } from 'mongoose';

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type SingleOrMany<T> = T | Array<T>;

export type ArrayElement<T> = T extends (infer U)[] ? U : T;

/**
 * strictly casting id to ref
 */
export function castRefId<
  Z extends SingleOrMany<Ref<any, S>>,
  S extends RefType =
    | (ArrayElement<Z> extends { _id?: RefType }
        ? NonNullable<ArrayElement<Z>['_id']>
        : Types.ObjectId)
    | undefined,
>(doc: Z): Z extends Array<any> ? S[] : S {
  return doc as any;
}
