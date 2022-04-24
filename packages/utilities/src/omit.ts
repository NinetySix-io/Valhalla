import { BasicObject } from './types';

export function omit<T extends object, K extends [...(keyof T)[]]>(
  target: T,
  ...keys: K
): {
  [K2 in Exclude<keyof T, K[number]>]: T[K2];
} {
  const result = {} as BasicObject;

  for (const key in target) {
    if (!keys.includes(key)) {
      result[key] = target[key];
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return result as any;
}
