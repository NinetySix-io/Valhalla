type Leaves<
  T extends Record<string, unknown>,
  Key = keyof T,
> = Key extends string
  ? T[Key] extends Record<string, unknown>
    ? `${Key}.${Leaves<T[Key]>}`
    : `${Key}`
  : never;

type FollowPath<T, P> = P extends `${infer U}.${infer R}`
  ? U extends keyof T
    ? FollowPath<T[U], R>
    : never
  : P extends keyof T
  ? T[P]
  : never;

/**
 * It takes an object and returns a new object with all the keys flattened
 */
export function flattenObject<T extends Record<string, unknown>>(
  target: T,
  parent?: string,
  filterFalsy?: boolean,
): { [K in Leaves<T>]: FollowPath<T, K> } {
  const flattened: Record<string, unknown> = {};

  for (const key of Object.keys(target)) {
    if (typeof target[key] === 'object' && target[key] !== null) {
      Object.assign(
        flattened,
        flattenObject(
          target[key] as Record<string, unknown>,
          `${parent}.`,
          filterFalsy,
        ),
      );
    } else {
      if (filterFalsy && !target[key]) {
        continue;
      }

      flattened[parent + key] = target[key];
    }
  }

  return flattened as unknown as {
    [K in Leaves<T>]: FollowPath<T, K>;
  };
}
