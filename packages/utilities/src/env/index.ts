export * from './is.dev';
export * from './is.prod';

/**
 * It takes an object schema and returns a class that has a static `variables` property that is the
 * result of validating the environment variables against the schema
 */
export function buildEnvironment<T extends object>(schema: T) {
  return class Environment {
    variables: T & { NODE_ENV?: string };

    constructor() {
      this.variables = Object.assign(
        {},
        process.env,
        schema,
      ) as typeof Environment['variables'];
    }

    /**
     * It returns a new instance of the Environment class.
     */
    static get instance() {
      return new Environment();
    }

    static get variables() {
      return this.instance.variables;
    }

    /**
     * It checks if the environment is production.
     */
    static get isProd() {
      return this.variables?.NODE_ENV === 'production';
    }

    /**
     * If the NODE_ENV environment variable is not set, or if it is set to development, then the
     * function returns true
     */
    static get isDev() {
      return (
        !this.variables?.NODE_ENV || this.variables.NODE_ENV === 'development'
      );
    }

    /**
     * > If the `NODE_ENV` variable is set to `test`, then return `true`
     */
    static get isTest() {
      return this.variables?.NODE_ENV === 'test';
    }
  };
}
