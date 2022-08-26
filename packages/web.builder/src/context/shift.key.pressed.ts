import { KeyCode, useOneOfKeyPressed } from '@valhalla/web.react';
import { useScopeAtomMutate, useScopeAtomValueFetch } from '.';

import { atom } from 'jotai';

const shiftKeyPressedAtom = atom(false);

/**
 * It listens to the Shift key and updates the `shiftKeyPressedAtom` accordingly
 */
export function useListenToShiftKey() {
  const setShiftKeyState = useScopeAtomMutate(shiftKeyPressedAtom);

  useOneOfKeyPressed([KeyCode.Shift, KeyCode.Command], {
    onKeyDown() {
      setShiftKeyState(true);
    },
    onKeyUp() {
      setShiftKeyState(false);
    },
  });
}

export function useShiftKeyStateFetch() {
  return useScopeAtomValueFetch(shiftKeyPressedAtom);
}
