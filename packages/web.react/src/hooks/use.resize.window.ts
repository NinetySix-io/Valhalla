import * as React from 'react';

import { debounce } from '@valhalla/utilities';

/**
 * Hook for window resize event
 */
export function useWindowResize(
  params: (
    | {
        debounce: true;
        debounceMs?: number;
      }
    | { debounce?: false }
  ) & {
    triggerOnMount?: boolean;
    onResize: () => void;
  },
  deps: React.DependencyList,
) {
  React.useEffect(() => {
    const trigger = params.debounce
      ? debounce(params.onResize, params.debounceMs ?? 100)
      : params.onResize;

    if (params.triggerOnMount) {
      trigger();
    }

    window.addEventListener('resize', trigger);
    return () => {
      window.removeEventListener('resize', trigger);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
