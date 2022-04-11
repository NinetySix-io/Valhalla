import { Environment } from '@odin/config/environment';
import helmet from 'helmet';
import { noop } from '@valhalla/utilities/dist';

export function httpsSecurity() {
  if (Environment.isProd) {
    return () => helmet();
  }

  return (_req, _res, next) => next();
}
