import * as Yup from 'yup';

import dotenv from 'dotenv';

const schema = Yup.object({
  // BASIC
  SERVICE_URL: Yup.string(),
  PORT: Yup.number().default(5000),
  NODE_ENV: Yup.string().default('development'),
  DATABASE_URL: Yup.string().required(),

  // API
  RATE_LIMIT_MAX: Yup.number().default(1000),
  RATE_LIMIT_WINDOW: Yup.number().default(1000 * 60 * 60),

  // AUTH
  COOKIE_IDENTIFIER: Yup.string().default('odin'),
  ORGANIZATION_HEADER_IDENTIFIER: Yup.string().default('odin-org'),
  REFRESH_EXPIRE_DAYS: Yup.number().default(10),
  JWT_SECRET: Yup.string().default('valhalla'),
  JWT_EXPIRES: Yup.string().default('7d'),

  FACEBOOK_CLIENT_ID: Yup.string(),
  FACEBOOK_CLIENT_SECRET: Yup.string(),
  GITHUB_CLIENT_SECRET: Yup.string(),
  GITHUB_CLIENT_ID: Yup.string(),
  GOOGLE_CLIENT_SECRET: Yup.string(),
  GOOGLE_CLIENT_ID: Yup.string(),
  TWITTER_CLIENT_SECRET: Yup.string(),
  TWITTER_CLIENT_ID: Yup.string(),
  APPLE_CLIENT_ID: Yup.string(),
  APPLE_TEAM_ID: Yup.string(),
  APPLE_KEY_ID: Yup.string(),
});

export class Environment {
  private static schema = schema;
  private static _variables: ReturnType<typeof schema['validateSync']>;

  static initialize() {
    const vars = dotenv.config({ override: true }).parsed;
    this._variables = this.schema.validateSync(vars);
  }

  static get variables() {
    if (!this._variables) {
      this.initialize();
    }

    return this._variables;
  }

  static get isProd() {
    return this.variables.NODE_ENV === 'production';
  }

  static get isDev() {
    return this.variables.NODE_ENV === 'development';
  }

  static get isTest() {
    return this.variables.NODE_ENV === 'test';
  }

  static get serviceUrl() {
    let domain = this.variables.SERVICE_URL;
    if (this.isDev) {
      domain = `http://localhost:${this.variables.PORT}`;
    }

    return domain;
  }
}
