import { MENU_ITEM } from '../constants';

/**
 * If the elementId starts with the string MENU_ITEM, then return true, otherwise return false.
 */
export function isMenuItem(elementId?: string) {
  return elementId && elementId.startsWith(MENU_ITEM);
}
