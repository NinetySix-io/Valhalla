import { SStruct, buildEnvironment } from '@valhalla/utilities';

const schema = SStruct.create(
  {
    SERVER: process.env.SERVER,
    IS_DEV: process.env.IS_DEV,
  },
  SStruct.object({
    SERVER: SStruct.string(),
    IS_DEV: SStruct.any(),
    DISABLE_REDUX_LOGGER: SStruct.any(),
  }),
);

export class Environment extends buildEnvironment(schema) {
  static get isServer() {
    return typeof window === 'undefined';
  }

  static get GQL_SERVER() {
    if (!this.isServer) {
      return '/api/graphql';
    }

    return this.variables.SERVER + '/graphql';
  }

  static get IS_DEV() {
    return Boolean(this.variables.IS_DEV);
  }

  static get DISABLE_REDUX_LOGGER() {
    return Boolean(this.variables.DISABLE_REDUX_LOGGER);
  }

  static get domain() {
    if (this.isDev) {
      return 'localhost:3005';
    }
  }

  static get rootUrl() {
    if (this.isDev) {
      return `http://${this.domain}`;
    }
  }

  static getTenantUrl(tenantSlug: string) {
    if (this.isDev) {
      return `http://${tenantSlug}.${this.domain}`;
    }
  }
}
