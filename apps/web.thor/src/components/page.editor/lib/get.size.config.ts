import { SCREEN_SIZE_CONFIG } from '../constants';
import type { ScreenSize } from '../store';

export function getScreenSizeConfig<S extends ScreenSize>(size: S) {
  return SCREEN_SIZE_CONFIG[size];
}
