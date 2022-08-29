import { Logger } from '@nestjs/common';
import dotenv from 'dotenv';
import isEmpty from 'lodash.isempty';
import path from 'path';

/**
 * It loads the .env file from the root of the project, if it exists
 */
export function loadDotEnv() {
  const location = require.main?.path;

  if (location) {
    const envPath = path.resolve(require.main?.path ?? '', '.env');
    const config = dotenv.config({ path: envPath });

    if (!isEmpty(config?.parsed)) {
      new Logger(loadDotEnv.name).debug(
        'Loaded .env',
        JSON.stringify(config.parsed, null, 2),
      );
    }
  }
}
