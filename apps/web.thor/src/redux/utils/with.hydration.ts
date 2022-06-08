import { AnyAction, CombinedState, Reducer, ReducersMapObject } from 'redux';

import { HYDRATE } from 'next-redux-wrapper';
import { merge } from 'merge-anything';

/**
 * Hydrate redux state when action `HYDRATE` is provided
 * @param reducers
 * @returns
 */
export function withHydration<
  S extends ReducersMapObject<S>,
  R extends Reducer<CombinedState<S>>,
>(reducers: R): R {
  return function (state: CombinedState<S>, action: AnyAction) {
    switch (action.type) {
      case HYDRATE:
        return merge({}, state, action.payload);
      default:
        return reducers(state, action);
    }
  } as R;
}
