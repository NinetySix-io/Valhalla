import { Logger } from '@nestjs/common';

export type LogMethodOption = {
  when: boolean | (() => boolean);
  onTrigger?: (fnName: string, args: unknown[]) => void;
  logger?: Logger;
};

/**
 * It takes a function and returns a new function that does the same thing as the original function,
 * but also logs the function name and arguments
 */
export function LogMethod(option?: LogMethodOption) {
  const logger = option?.logger ?? new Logger(LogMethod.name);
  return (
    _: unknown,
    key: string | Symbol,
    descriptor: TypedPropertyDescriptor<Function>,
  ) => {
    const originalMethod = descriptor.value as unknown as Function;
    descriptor.value = function (...args: unknown[]) {
      const result = originalMethod.apply(this, args);
      const shouldLog =
        (typeof option?.when === 'boolean' ? option.when : option?.when?.()) ??
        true;

      if (shouldLog && typeof key === 'string') {
        option?.onTrigger
          ? option.onTrigger(key, args)
          : logger.debug(key + '(' + args.join(', ') + ')');
      }

      return result;
    };

    return descriptor;
  };
}
