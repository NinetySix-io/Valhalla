import { SCREEN_SIZE_CONFIG } from '../constants';
import { ScreenSize } from '@app/redux/slices/editor';

export function getScreenSizeConfig<S extends ScreenSize>(size: S) {
  return SCREEN_SIZE_CONFIG[size];
}
