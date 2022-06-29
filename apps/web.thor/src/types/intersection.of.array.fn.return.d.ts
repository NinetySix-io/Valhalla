type ComponentType<A> = A extends (infer U)[] ? U : never;
type KeyOfUnion<T> = T extends infer U ? keyof U : never;
type ValueInUnion<T, K extends PropertyKey> = T extends { [k in K]: infer V }
  ? V
  : never;

export type IntersectionOfArrayFnReturn<
  F extends Array<(...any) => unknown>,
  R extends ReturnType<ComponentType<F>> = ReturnType<ComponentType<F>>,
> = {
  [K in KeyOfUnion<R>]: ValueInUnion<R, K>;
};
