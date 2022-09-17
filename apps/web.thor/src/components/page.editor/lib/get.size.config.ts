import { SCREEN_SIZE_CONFIG } from '../constants';
import type { ScreenSize } from '../constants';

export function getScreenSizeConfig<S extends ScreenSize>(size: S) {
  return SCREEN_SIZE_CONFIG[size];
}
