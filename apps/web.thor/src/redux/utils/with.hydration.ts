import {
  Action,
  AnyAction,
  CombinedState,
  Reducer,
  ReducersMapObject,
} from 'redux';

import { HYDRATE } from 'next-redux-wrapper';
import { merge } from 'merge-anything';

/**
 * Hydrate redux state when action `HYDRATE` is provided
 * @param reducers
 * @returns
 */
export function withHydration<S, A extends Action = AnyAction>(
  reducers: ReducersMapObject<S, A>,
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
