export type UniqueArray<T> = T extends readonly [infer X, ...infer Rest]
  ? InArray<Rest, X> extends true
    ? ['Encountered value with duplicates:', X]
    : readonly [X, ...UniqueArray<Rest>]
  : T;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type InArray<T, X> = T extends readonly [X, ...infer _Rest]
  ? true
  : T extends readonly [X]
  ? true
  : // eslint-disable-next-line @typescript-eslint/no-unused-vars
  T extends readonly [infer _, ...infer Rest]
  ? InArray<Rest, X>
  : false;
