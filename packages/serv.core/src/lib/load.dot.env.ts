import dotenv from 'dotenv';
import path from 'path';

/**
 * It loads the .env file from the root of the project, if it exists
 */
export function loadDotEnv() {
  const location = require.main?.path;

  if (location) {
    const envPath = path.resolve(require.main?.path ?? '', '.env');
    const config = dotenv.config({ path: envPath });

    if (config?.parsed) {
      console.debug('Loaded .env', JSON.stringify(config.parsed, null, 2));
    }
  }
}
