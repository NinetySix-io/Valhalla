import type { DependencyList } from 'react';
import React from 'react';

import throttle from 'lodash.throttle';

export const useThrottleTrigger = (
  fn: () => void,
  ms = 200,
  deps: DependencyList,
) => {
  const trigger = React.useCallback(() => throttle(() => fn(), ms)(), [ms, fn]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(trigger, deps);
};
