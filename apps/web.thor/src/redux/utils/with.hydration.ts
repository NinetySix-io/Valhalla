import { Action, AnyAction, CombinedState, Reducer } from 'redux';

import { HYDRATE } from 'next-redux-wrapper';
import { merge } from 'merge-anything';

/**
 * Hydrate redux state when action `HYDRATE` is provided
 */
export function withHydration<S, A extends Action>(
  reducers: Reducer<CombinedState<S>, A>,
): Reducer<CombinedState<S>, A> {
  return function (state: CombinedState<unknown>, action: AnyAction) {
    switch (action.type) {
      case HYDRATE:
        return merge({}, state, action.payload);
      default:
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return reducers(state, action);
    }
  };
}
