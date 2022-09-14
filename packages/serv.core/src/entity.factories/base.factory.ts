import { AnyParamConstructor } from '@typegoose/typegoose/lib/types';
import { BaseSchema } from './base.schema';
import { OmitRecursively } from '@valhalla/utilities';
import { ReturnModelType } from '@typegoose/typegoose';

export type ModelType<TModel extends BaseSchema> = ReturnModelType<
  AnyParamConstructor<TModel>
>;

export type CreatePayload<TModel extends BaseSchema> = OmitRecursively<
  TModel,
  '_id' | 'createdAt' | 'updatedAt' | 'id' | 'toPublic'
>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BaseFactory<TModel extends BaseSchema>
  extends ModelType<TModel> {}

export abstract class BaseFactory<TModel extends BaseSchema> {
  protected constructor(model: ModelType<TModel>) {
    for (const k of Object.keys(model)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this[k] = model[k];
    }
  }
}
