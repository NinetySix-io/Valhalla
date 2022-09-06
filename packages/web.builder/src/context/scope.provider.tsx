import * as React from 'react';

import { makeStore } from './store';

export const ScopeContext = React.createContext({
  store: null as ReturnType<typeof makeStore>,
  zoneId: null as string,
  columnsCount: 0,
  rowsCount: 0,
});

export function useScope() {
  return React.useContext(ScopeContext);
}

export function useStore() {
  return useScope().store;
}

export function useZoneId() {
  return useScope().zoneId;
}

export function useColumnsCount() {
  return useScope().columnsCount;
}

export function useRowsCount() {
  return useScope().rowsCount;
}

export const ScopeProvider = ({
  children,
  zoneId,
  columnsCount,
  rowsCount,
}: React.PropsWithChildren & {
  zoneId: string;
  columnsCount: number;
  rowsCount: number;
}) => {
  const store = React.useRef(makeStore()).current;

  return (
    <ScopeContext.Provider
      value={{
        store,
        zoneId,
        columnsCount,
        rowsCount,
      }}
    >
      {children}
    </ScopeContext.Provider>
  );
};
