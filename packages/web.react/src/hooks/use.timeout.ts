import { useCallback, useEffect, useRef } from 'react';

type UseTimeoutFnReturn = [() => boolean | null, () => void, () => void];

/**
 * "useTimeoutFn is a React hook that returns a function that can be used to set a timeout that will
 * execute a callback function after a specified delay."
 *
 * The function takes two arguments: a callback function and a delay in milliseconds. The callback
 * function is executed after the delay
 * @param {Fn} fn - The function to be executed after the timeout.
 * @param [ms=0] - The number of milliseconds to wait before calling the function.
 * @returns An array of 3 functions.
 */

export function useTimeoutFn<Fn extends () => void>(
  fn: Fn,
  ms = 0,
): UseTimeoutFnReturn {
  const ready = useRef<boolean | null>(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  const callback = useRef(fn);

  const isReady = useCallback(() => ready.current, []);

  const set = useCallback(() => {
    ready.current = false;
    timeout.current && clearTimeout(timeout.current);

    timeout.current = setTimeout(() => {
      ready.current = true;
      callback.current();
    }, ms);
  }, [ms]);

  const clear = useCallback(() => {
    ready.current = null;
    timeout.current && clearTimeout(timeout.current);
  }, []);

  // update ref when function changes
  useEffect(() => {
    callback.current = fn;
  }, [fn]);

  // set on mount, clear on unmount
  useEffect(() => {
    set();

    return clear;
  }, [clear, ms, set]);

  return [isReady, clear, set];
}
