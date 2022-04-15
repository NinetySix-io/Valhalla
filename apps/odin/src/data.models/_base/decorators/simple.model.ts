import { modelOptions } from '@typegoose/typegoose';

export function simpleModel(collection: string) {
  return function (target): void {
    return modelOptions({
      schemaOptions: {
        collection,
        timestamps: true,
      },
    })(target);
  };
}
