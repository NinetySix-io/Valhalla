import * as React from 'react';

import type { Atom, WritableAtom } from 'jotai';
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';

import { DroppedElement } from '../types';
import type { Scope } from 'jotai/core/atom';

export const ZoneContext = React.createContext({
  id: undefined as string,
  rowsCount: 0,
  columnsCount: 0,
});

export function useZoneContext() {
  return React.useContext(ZoneContext);
}

/**
 * UseZoneId returns the value of the ZoneIdContext.
 * @returns The ZoneIdContext
 */
export function useZoneId() {
  return useZoneContext().id;
}

// -----------------------------
// Atom
// -----------------------------

export const cellSizeAtom = atom(null as number);
export const containerAtom = atom(null as HTMLDivElement);
export const focusedElementAtom = atom(null as string);
export const draggingElementAtom = atom(null as DroppedElement);
export const gridVisibleAtom = atom(null as boolean);

export function useScopeAtom<
  Value,
  Update,
  Result extends void | Promise<void>,
>(atom: WritableAtom<Value, Update, Result>, scope?: Scope) {
  const currentZone = useZoneId();
  return useAtom(atom, scope ?? currentZone);
}

export function useScopeAtomValue<Value>(atom: Atom<Value>, scope?: Scope) {
  const currentZone = useZoneId();
  return useAtomValue(atom, scope ?? currentZone);
}

export function useScopeAtomMutate<
  Value,
  Update,
  Result extends void | Promise<void>,
>(atom: WritableAtom<Value, Update, Result>, scope?: Scope) {
  const currentZone = useZoneId();
  return useSetAtom(atom, scope ?? currentZone);
}
