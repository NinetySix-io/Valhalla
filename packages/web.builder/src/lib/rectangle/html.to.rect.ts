import { Rectangle } from './types';

/**
 * It takes an HTML element and returns a rectangle
 */
export function htmlToRect(element: HTMLElement): Rectangle {
  return element.getBoundingClientRect();
}
