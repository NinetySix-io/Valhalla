import * as React from 'react';

import type { Atom, WritableAtom } from 'jotai';
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';

import { DroppedElement } from '../types';
import type { Scope } from 'jotai/core/atom';
import { useAtomCallback } from 'jotai/utils';

export const ZoneContext = React.createContext({
  id: undefined as string,
  rowsCount: 0,
  columnsCount: 0,
});

/**
 * It returns the value of the ZoneContext React context
 * @returns The ZoneContext object.
 */
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
export const draggingElementAtom = atom(null as DroppedElement);
export const gridVisibleAtom = atom(false);
export const isDraggingAtom = atom(false);

/**
 * `useScopeAtom` is a hook that returns a `useAtom` hook that uses the current zone as the scope if no
 * scope is provided
 * @param atom - The atom you want to use.
 * @param {Scope} [scope] - The scope to use. If not provided, the current zone will be used.
 * @returns A function that takes a callback and returns a value.
 */
export function useScopeAtom<
  Value,
  Update,
  Result extends void | Promise<void>,
>(atom: WritableAtom<Value, Update, Result>, scope?: Scope) {
  const currentZone = useZoneId();
  return useAtom(atom, scope ?? currentZone);
}

/**
 * UseScopeAtomValue is a React hook that returns the value of an atom, using the current zone as the
 * scope if no scope is provided.
 * @param atom - The atom to use.
 * @param {Scope} [scope] - The scope to use. If not provided, the current zone will be used.
 * @returns A function that takes a callback and returns a value.
 */
export function useScopeAtomValue<Value>(atom: Atom<Value>, scope?: Scope) {
  const currentZone = useZoneId();
  return useAtomValue(atom, scope ?? currentZone);
}

/**
 * `useScopeAtomMutate` is a hook that returns a function that can be used to mutate an atom
 * @param atom - The atom to mutate.
 * @param {Scope} [scope] - The scope to use. If not provided, the current zone will be used.
 * @returns A function that will mutate the atom.
 */
export function useScopeAtomMutate<
  Value,
  Update,
  Result extends void | Promise<void>,
>(atom: WritableAtom<Value, Update, Result>, scope?: Scope) {
  const currentZone = useZoneId();
  return useSetAtom(atom, scope ?? currentZone);
}

/**
 * UseScopeAtomValueFetch is a React hook that returns the value of an atom, but it uses a scope that
 * is either the current zone or the scope that is passed in.
 * @param atom - The atom you want to fetch the value of.
 * @param {Scope} [scope] - The scope to use for the atom. If not provided, the current zone will be
 * used.
 * @returns A function that takes a getter function and returns the value of the atom.
 */
export function useScopeAtomValueFetch<Value>(
  atom: Atom<Value>,
  scope?: Scope,
) {
  const currentZone = useZoneId();

  return useAtomCallback(
    React.useCallback((get) => get(atom), [atom]),
    scope ?? currentZone,
  );
}
