import * as React from 'react';

import { KeyCode } from './keys.enum';
import { useWindowEvent } from '../use.window.event';

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
 * @param {K} keys - K - The keys that you want to listen for.
 * @param callback - (event: KeyboardEvent) => void
 */
export function useOneOfKeyPressed<K extends readonly KeyCode[]>(
  keys: K,
  callbacks: {
    onKeyDown?: CallBack;
    onKeyUp?: CallBack;
  },
) {
  useWindowEvent('keydown', (event) => {
    handleEvent(keys, event, callbacks.onKeyDown);
  });

  useWindowEvent('keyup', (event) => {
    handleEvent(keys, event, callbacks.onKeyUp);
  });
}

/**
 * It calls a callback when a set of keys are pressed
 * @param {K} keys - K - an array of key codes that you want to listen for.
 * @param callback - () => void
 */
export function useKeysPressed<K extends readonly KeyCode[]>(
  keys: K,
  callback: CallBack,
) {
  const cache = React.useRef<Set<string>>(new Set());

  useWindowEvent('keydown', (event) => {
    handleEvent(keys, event, () => {
      cache.current.add(event.code);

      if (keys.every((key) => cache.current.has(key))) {
        callback(event);
      }
    });
  });

  useWindowEvent('keyup', (event) => {
    handleEvent(keys, event, () => {
      cache.current.delete(event.code);
    });
  });
}
