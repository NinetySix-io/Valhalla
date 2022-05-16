import * as Yup from 'yup';

import { buildEnvironment } from '@valhalla/utilities/dist/env';

// import getConfig from 'next/config';

// const { publicRuntimeConfig } = getConfig();
const schema = Yup.object({
  SERVER: Yup.string().default('http://localhost:3002'),
});

export class Environment extends buildEnvironment({
  schema,
  // vars: publicRuntimeConfig(),
}) {
  get isServer() {
    return typeof window === 'undefined';
  }
}
