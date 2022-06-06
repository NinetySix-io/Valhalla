import { SStruct, buildEnvironment } from '@valhalla/utilities';

const schema = SStruct.create(
  {
    SERVER: process.env.SERVER,
  },
  SStruct.object({
    SERVER: SStruct.string(),
  }),
);

export class Environment extends buildEnvironment(schema) {
  static get isServer() {
    return typeof window === 'undefined';
  }

  static get GQL_SERVER() {
    return this.variables.SERVER + '/graphql';
  }
}
