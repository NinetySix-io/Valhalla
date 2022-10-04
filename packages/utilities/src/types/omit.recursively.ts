import type { BasicObject } from './common';

// Cosmetic use only makes the tooltips ex-pad the type can be removed
type Id<T> = {} & { [P in keyof T]: T[P] };

type ObjectId = { _bsontype: 'ObjectID' };

type OmitDistributive<
  T extends BasicObject,
  K extends PropertyKey,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
> = T extends any
  ? T extends object
    ? T extends ObjectId | Date
      ? T
      : Id<OmitRecursively<T, K>>
    : T
  : never;

export type OmitRecursively<
  T extends BasicObject,
  K extends PropertyKey,
> = Omit<{ [P in keyof T]: OmitDistributive<T[P], K> }, K>;
