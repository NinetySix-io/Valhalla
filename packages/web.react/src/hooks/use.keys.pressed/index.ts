import * as React from 'react';

import type { KeyCode } from './keys.enum';
import { useEvent } from '../react.hooks';

export * from './keys.enum';

type CallBack = (event: KeyboardEvent) => void;

function handleEvent<K extends readonly KeyCode[]>(
  keys: K,
  event: KeyboardEvent,
  cb: CallBack,
) {
  if (!cb) {
    return;
  }

  for (const key of keys) {
    if (event.code.startsWith(key)) {
      cb(event);
      return;
    }
  }
}

/**
 * It takes an array of key codes and a callback function, and calls the callback function when any of
 * the keys are pressed
 */
export function useOneOfKeyPressed<K extends readonly KeyCode[]>(
  target: HTMLElement | React.RefObject<HTMLElement>,
  keys: K,
  onKeyAction: (state: 'keydown' | 'keyup') => void,
) {
  useEvent(target, 'keydown', (event) => {
    handleEvent(keys, event, () => onKeyAction('keydown'));
  });

  useEvent(target, 'keyup', (event) => {
    handleEvent(keys, event, () => onKeyAction('keyup'));
  });
}

/**
 * It calls a callback when a set of keys are pressed
 */
export function useKeysPressed<K extends readonly KeyCode[]>(
  target: HTMLElement | React.RefObject<HTMLElement>,
  keys: K,
  callback: CallBack,
) {
  const cache = React.useRef<Set<string>>(new Set());

  useEvent(target, 'keydown', (event) => {
    handleEvent(keys, event, () => {
      cache.current.add(event.code);

      if (keys.every((key) => cache.current.has(key))) {
        callback(event);
      }
    });
  });

  useEvent(target, 'keyup', (event) => {
    handleEvent(keys, event, () => {
      cache.current.delete(event.code);
    });
  });
}
