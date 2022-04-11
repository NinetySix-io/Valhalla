import { Environment } from '@odin/config/environment';
import expressRateLimit from 'express-rate-limit';

export function rateLimit() {
  return () =>
    expressRateLimit({
      windowMs: Environment.variables.RATE_LIMIT_WINDOW, // an hour
      max: Environment.variables.RATE_LIMIT_MAX, // limit each IP to 100 requests per windowMs
      message:
        'Too many request created from this IP, please try again after later',
    });
}
