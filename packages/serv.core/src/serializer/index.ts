import {
  ClassConstructor,
  ClassTransformOptions,
  plainToInstance,
} from 'class-transformer';

export class Serializer<T> {
  private options: ClassTransformOptions = {
    excludeExtraneousValues: true,
  };

  constructor(private readonly schema: ClassConstructor<T>) {}

  static from<T>(schema: ClassConstructor<T>) {
    return new Serializer(schema);
  }

  setOption(options: ClassTransformOptions) {
    this.options = options;
    return this;
  }

  serialize<V>(value: V) {
    return plainToInstance(
      this.schema,
      value,
      this.options,
    ) as typeof value extends Array<unknown> ? T[] : T;
  }
}
