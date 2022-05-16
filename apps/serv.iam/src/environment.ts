import * as Yup from 'yup';

import { buildEnvironment } from '@valhalla/utilities';
import dotenv from 'dotenv';

const schema = Yup.object({
  // BASIC
  SERVICE_URL: Yup.string(),
  PORT: Yup.number().default(5001),
  NODE_ENV: Yup.string().default('development'),
  DATABASE_URL: Yup.string().required(),
});

export class Environment extends buildEnvironment({
  schema,
  vars: dotenv.config({ override: true }).parsed,
}) {
  static get serviceUrl() {
    let domain = this.variables.SERVICE_URL;
    if (this.isDev) {
      domain = `http://localhost:${this.variables.PORT}`;
    }

    return domain;
  }
}
