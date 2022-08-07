import { DependencyList, useEffect } from 'react';

import { useTimeoutFn } from './use.timeout';

type UseDebounceReturn = [() => boolean | null, () => void];

/**
 * UseDebounceTrigger is a hook that returns a boolean and a function. The boolean is true when the
 * function is ready to be called, and the function cancels the call.
 * @param {Fn} fn - The function to debounce.
 * @param [ms=0] - The number of milliseconds to wait before calling the function.
 * @param {DependencyList} deps - DependencyList = []
 * @returns An array of two elements.
 */
export default function useDebounceTrigger<Fn extends () => void>(
  fn: Fn,
  ms = 0,
  deps: DependencyList = [],
): UseDebounceReturn {
  const [isReady, cancel, reset] = useTimeoutFn(fn, ms);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(reset, deps);

  return [isReady, cancel];
}
