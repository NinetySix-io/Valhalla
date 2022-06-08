import { Store, StoreRootState } from './make.store';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

type RootDispatch = Store['dispatch'];
type UseReduxSelector = TypedUseSelectorHook<StoreRootState>;

export const useReduxSelector: UseReduxSelector = useSelector;
export const useReduxDispatch = () => useDispatch<RootDispatch>();
