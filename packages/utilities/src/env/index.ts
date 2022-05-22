export * from './is.dev';
export * from './is.prod';
export * from './is.staging';
export * from './is.test';

/**
 * It takes an object schema and returns a class that has a static `variables` property that is the
 * result of validating the environment variables against the schema
 * @param props - {
 * @returns A class that has a static method called instance that returns a new instance of the class.
 */
export function buildEnvironment<T extends { NODE_ENV?: string }>(props: {
  schema?: T;
  vars?: Record<string, string>;
}) {
  return class Environment {
    variables: T;

    constructor() {
      this.variables = Object.assign({}, process.env, props.vars) as any;
    }

    /**
     * It returns a new instance of the Environment class.
     * @returns A new instance of the Environment class.
     */
    static get instance() {
      return new Environment();
    }

    static get variables() {
      return this.instance.variables;
    }

    /**
     * It checks if the environment is production.
     * @returns The value of the NODE_ENV variable.
     */
    static get isProd() {
      return this.variables?.NODE_ENV === 'production';
    }

    /**
     * If the NODE_ENV environment variable is not set, or if it is set to development, then the
     * function returns true
     * @returns A boolean value.
     */
    static get isDev() {
      return (
        !this.variables?.NODE_ENV || this.variables.NODE_ENV === 'development'
      );
    }

    /**
     * > If the `NODE_ENV` variable is set to `test`, then return `true`
     * @returns A boolean value.
     */
    static get isTest() {
      return this.variables?.NODE_ENV === 'test';
    }
  };
}
