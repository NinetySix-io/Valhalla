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
    return this.variables.SERVER + '/graphql';
  }

  static get IS_DEV() {
    return Boolean(this.variables.IS_DEV);
  }

  static get DISABLE_REDUX_LOGGER() {
    return Boolean(this.variables.DISABLE_REDUX_LOGGER);
  }
}
