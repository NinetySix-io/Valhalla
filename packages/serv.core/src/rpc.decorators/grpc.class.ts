import { GrpcMethod } from '@nestjs/microservices';

/**
 * It loops through all the methods on the class and applies the GrpcMethod decorator to each one
 * @param {string} service - The name of the service to register the method under.
 * @returns A function that takes a target, propertyName, and descriptor.
 */
export function GrpcClass(service: string): ClassDecorator {
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

      GrpcMethod(service)(descriptor?.value, propertyName, descriptor);
    }
  };
}
