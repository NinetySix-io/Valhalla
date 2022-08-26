import { DroppedElement } from '../types';
import { atom } from 'jotai';

export const focusedElementAtom = atom(undefined as undefined | DroppedElement);
