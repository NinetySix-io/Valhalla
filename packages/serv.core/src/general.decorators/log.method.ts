export type LogMethodOption = {
  when: boolean | (() => boolean);
  onTrigger?: (fnName: string, args: unknown[]) => void;
};

/**
 * It takes a function and returns a new function that does the same thing as the original function,
 * but also logs the function name and arguments
 * @param {LogMethodOption} [option] - LogMethodOption
 * @returns A method decorator.
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
        option?.onTrigger
          ? option.onTrigger(key, args)
          : console.debug(key + '(' + args.join(', ') + ')');
      }

      return result;
    };

    return descriptor;
  };
}
