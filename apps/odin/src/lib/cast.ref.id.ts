/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ArrayElement, SingleOrMany } from '@valhalla/utilities';
import type { Ref, RefType } from '@typegoose/typegoose/lib/types';

import type { Types } from 'mongoose';

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
