import { AnyObject, ObjectShape, TypeOfShape } from 'yup/lib/object';

import { Maybe } from 'yup/lib/types';
import { ObjectSchema } from 'yup/lib';

/**
 * It takes an object schema and returns a class that has a static `variables` property that is the
 * result of validating the environment variables against the schema
 * @param props - {
 * @returns A class that has a static method called instance that returns a new instance of the class.
 */
export function buildEnvironment<
  TShape extends ObjectShape,
  TContext extends AnyObject = AnyObject,
  TIn extends Maybe<TypeOfShape<TShape>> = TypeOfShape<TShape>,
>(props: {
  schema: ObjectSchema<TShape, TContext, TIn>;
  vars?: Record<string, string>;
}) {
  return class Environment {
    variables: ReturnType<typeof props['schema']['validateSync']>;

    constructor() {
      this.variables = props.schema.validateSync({
        ...(typeof process === 'undefined' ? {} : process.env),
        ...(props?.vars ?? {}),
      });
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
