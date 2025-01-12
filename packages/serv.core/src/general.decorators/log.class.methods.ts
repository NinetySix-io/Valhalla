import { LogMethod, LogMethodOption } from './log.method';

/**
 * It takes a class and returns a new class with all of its methods wrapped in a logging function
 */
export function LogClassMethods(option: LogMethodOption): ClassDecorator {
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

      const propertyDescriptor = LogMethod(option)(
        target,
        propertyName,
        descriptor,
      ) as PropertyDescriptor;

      Object.defineProperty(target.prototype, propertyName, propertyDescriptor);
    }
  };
}
