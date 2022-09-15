import { buildEnvironment } from '@valhalla/utilities';

export class Environment extends buildEnvironment({
  SERVER: process.env.SERVER,
  IS_DEV: process.env.IS_DEV,
}) {
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
