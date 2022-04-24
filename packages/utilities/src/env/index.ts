import { AnyObject, ObjectShape, TypeOfShape } from 'yup/lib/object';

import { Maybe } from 'yup/lib/types';
import { ObjectSchema } from 'yup/lib';

export function buildEnvironment<
  TShape extends ObjectShape,
  TContext extends AnyObject = AnyObject,
  TIn extends Maybe<TypeOfShape<TShape>> = TypeOfShape<TShape>,
>(props: {
  schema: ObjectSchema<TShape, TContext, TIn>;
  vars: Record<string, string>;
}) {
  return class Environment {
    #variables: ReturnType<typeof props['schema']['validateSync']>;

    constructor() {
      this.#variables = props.schema.validateSync({
        ...(typeof process === 'undefined' ? {} : process.env),
        ...props.vars,
      });
    }

    static get #instance() {
      return new Environment();
    }

    static get variables() {
      return this.#instance.#variables;
    }

    static get isProd() {
      return this.variables?.NODE_ENV === 'production';
    }

    static get isDev() {
      return (
        !this.variables?.NODE_ENV || this.variables.NODE_ENV === 'development'
      );
    }

    static get isTest() {
      return this.variables?.NODE_ENV === 'test';
    }
  };
}
