import * as React from 'react';

import {
  Atom,
  WritableAtom,
  atom,
  useAtom,
  useAtomValue,
  useSetAtom,
} from 'jotai';

import { GridAreaElement } from '../hooks/use.grid.area';
import { Scope } from 'jotai/core/atom';

export const ZoneIdContext = React.createContext('');

// -----------------------------
// Atom
// -----------------------------

export const cellSizeAtom = atom(0);
export const containerAtom = atom(null as HTMLDivElement);
export const focusedElementAtom = atom('');
export const draggingElementAtom = atom(null as GridAreaElement);
export const isDraggingOverAtom = atom(false);

export function useScopeAtom<
  Value,
  Update,
  Result extends void | Promise<void>,
>(atom: WritableAtom<Value, Update, Result>, scope?: Scope) {
  const currentZone = React.useContext(ZoneIdContext);
  return useAtom(atom, scope ?? currentZone);
}

export function useScopeAtomValue<Value>(atom: Atom<Value>, scope?: Scope) {
  const currentZone = React.useContext(ZoneIdContext);
  return useAtomValue(atom, scope ?? currentZone);
}

export function useScopeAtomMutate<
  Value,
  Update,
  Result extends void | Promise<void>,
>(atom: WritableAtom<Value, Update, Result>, scope?: Scope) {
  const currentZone = React.useContext(ZoneIdContext);
  return useSetAtom(atom, scope ?? currentZone);
}
