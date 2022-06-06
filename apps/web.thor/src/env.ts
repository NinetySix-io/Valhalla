import { SStruct, buildEnvironment } from '@valhalla/utilities';

import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const schema = SStruct.create(
  publicRuntimeConfig ?? {},
  SStruct.object({
    SERVER: SStruct.defaulted(SStruct.string(), 'http://localhost:3010'),
    NODE_ENV: SStruct.defaulted(SStruct.string(), 'development'),
  }),
);

export class Environment extends buildEnvironment({
  schema,
  vars: publicRuntimeConfig,
}) {
  static get isServer() {
    return typeof window === 'undefined';
  }

  static get GQL_SERVER() {
    return this.variables.SERVER + '/graphql';
  }
}
