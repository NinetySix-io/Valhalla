import { Environment } from '@serv.odin/environment';
import helmet from 'helmet';

export function httpsSecurity() {
  if (Environment.isProd) {
    return () => helmet();
  }

  return (_req, _res, next) => next();
}
