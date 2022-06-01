export type LogMethodOption = {
  when: boolean | (() => boolean);
  onTrigger?: (fnName: string, args: unknown[]) => void;
};

/**
 * It takes a method and returns a new method that does the same thing as the original method, but also
 * logs the method name, arguments, and return value
 * @returns A function that takes three arguments:
 *   1. target: The prototype of the class
 *   2. key: The name of the method
 *   3. descriptor: The property descriptor of the given property, if it exists on the object, or
 * undefined otherwise.
 */
export function LogMethod(option?: LogMethodOption): MethodDecorator {
  return (_, key, descriptor) => {
    const originalMethod = descriptor.value as unknown as Function;

    // @ts-ignore
    descriptor.value = function (...args: any[]) {
      const result = originalMethod.apply(this, args);
      const shouldLog =
        (typeof option?.when === 'boolean' ? option.when : option?.when?.()) ??
        true;

      if (shouldLog && typeof key === 'string') {
        option?.onTrigger?.(key, args) ??
          console.debug(key + '(' + args.join(', ') + ')');
      }

      return result;
    };

    return descriptor;
  };
}
