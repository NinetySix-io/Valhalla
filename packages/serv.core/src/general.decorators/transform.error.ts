/**
 * `Options` is an object with an optional `condition` property that is a function that takes an
 * `Error` and returns a `boolean`, and an optional `handler` property that is a function that takes an
 * `Error` and returns `void`.
 * @property condition - A function that takes in the caught error and returns a boolean. If the
 * function returns true, the error will be caught.
 * @property handler - A function that will be called when an error is caught.
 */
type Options = {
  condition?: (CaughtError: Error) => boolean;
  handler?: (CaughtError: Error) => void;
};

/**
 * ExtensibleError is a type that represents a constructor function that takes an optional string
 * parameter and returns an Error object.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ExtensibleError = { new (...params: any[]): Error };

/**
 * `_handleError` is a function that takes an error, an extensible error, and an optional options
 * object, and either throws the extensible error or the original error, depending on the options
 * @param {Error} CaughtError - The error that was caught by the try/catch block.
 * @param {E} IntendedError - The error you want to throw.
 * @param {Options} [options] - Options
 */
function _handleError<E extends ExtensibleError>(
  CaughtError: Error,
  IntendedError: E,
  options?: Options,
) {
  options?.handler?.(CaughtError);
  const shouldThrow = options?.condition?.(CaughtError) ?? true;

  if (shouldThrow) {
    const intendedError = new IntendedError(CaughtError.message);
    intendedError.stack = CaughtError.stack;
    throw intendedError;
  } else {
    throw CaughtError;
  }
}

/**
 * It takes a method, wraps it in a try/catch block, and if an error is caught, it calls the
 * `_handleError` function
 * @param {PropertyDescriptor} descriptor - PropertyDescriptor
 * @param {E} IntendedError - The error class that you want to throw.
 * @param {Options} options - Options
 * @returns A new descriptor with the value of the original method wrapped in a try/catch block.
 */
function _generateMethodHandler<E extends ExtensibleError>(
  descriptor: PropertyDescriptor,
  IntendedError: E,
  options?: Options,
) {
  const originalMethod = descriptor.value as Function;

  descriptor.value = function (...args: unknown[]) {
    try {
      const result = originalMethod.apply(this, args);
      if (result && result instanceof Promise) {
        return result.catch((error: Error) => {
          _handleError(error, IntendedError, options);
        });
      }

      return result;
    } catch (CaughtError) {
      _handleError(CaughtError as Error, IntendedError, options);
    }
  };

  return descriptor;
}

/**
 * It takes a class and a function, and returns a new class that has the same methods as the original
 * class, but with the function applied to each method
 * @param {E} IntendedError - The error class you want to throw.
 * @param {Options} [options] - {
 * @returns A function that takes a class as an argument and returns nothing.
 */
export function TransformClassError<E extends ExtensibleError>(
  IntendedError: E,
  options?: Options,
): ClassDecorator {
  return (target) => {
    const filterFn = (key: string | symbol) => key !== 'constructor';
    const applicableKeys = Reflect.ownKeys(target.prototype).filter(filterFn);
    for (const propertyName of applicableKeys) {
      const descriptor = Object.getOwnPropertyDescriptor(
        target.prototype,
        propertyName,
      );

      if (typeof descriptor?.value !== 'function') {
        continue;
      }

      Object.defineProperty(
        target.prototype,
        propertyName,
        _generateMethodHandler(descriptor, IntendedError, options),
      );
    }
  };
}
/**
 * It takes an error class and returns a method decorator that will catch any errors thrown by the
 * method and transform them into the error class
 * @param {E} IntendedError - The error you want to throw.
 * @param {Options} [options] - {
 * @returns A method decorator
 */

export function TransformMethodError<E extends ExtensibleError>(
  IntendedError: E,
  options?: Options,
): MethodDecorator {
  return (_target, _propertyKey, descriptor) => {
    return _generateMethodHandler(descriptor, IntendedError, options);
  };
}
