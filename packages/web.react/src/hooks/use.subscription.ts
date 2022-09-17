import * as React from 'react';

type UnsubscribeFn = () => void;
type UnsubscribeEntity = { remove: UnsubscribeFn };
type Unsubscribable = UnsubscribeFn | UnsubscribeEntity;

/**
 * It takes a function that returns an unsubscribe function, and it calls that function when the
 * component mounts, and it calls the returned unsubscribe function when the component unmounts
 */
export function useSubscription(
  fn: () => Unsubscribable,
  deps: React.DependencyList = [],
) {
  React.useEffect(() => {
    const unsubscribe = fn();
    return () => {
      if ('remove' in unsubscribe) {
        unsubscribe.remove();
      } else {
        unsubscribe();
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
