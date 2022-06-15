import { buildEnvironment } from '@valhalla/utilities';

export class Environment extends buildEnvironment({
  schema: {
    NODE_ENV: process.env.NODE_ENV || 'development',
  },
}) {}
