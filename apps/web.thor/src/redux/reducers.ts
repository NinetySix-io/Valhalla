import { MetaSlice } from './slices/meta';
import { SiteEditorSlice } from './slices/editor';
import { TenantSlice } from './slices/tenant';
import { combineReducers } from 'redux';
import { withHydration } from './utils/with.hydration';

export const reducer = withHydration(
  combineReducers({
    [MetaSlice.name]: MetaSlice.reducer,
    [TenantSlice.name]: TenantSlice.reducer,
    [SiteEditorSlice.name]: SiteEditorSlice.reducer,
  }),
);
