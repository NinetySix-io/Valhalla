import type { Parameters } from '@storybook/react';
import { merge } from 'merge-anything';

/**
 * It takes an array of objects and merges them into one object
 */
export function composeParameters([
  p,
  ...parameters
]: Parameters[]): Parameters {
  return merge(p, ...parameters);
}
