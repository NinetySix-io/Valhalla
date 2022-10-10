import { OmitRecursively, PartialByRecursively } from '@valhalla/utilities';

import { AnyParamConstructor } from '@typegoose/typegoose/lib/types';
import { BaseSchema } from './base.schema';
import { ReturnModelType } from '@typegoose/typegoose';

const allowedMethods = [
  // '$where',
  'aggregate',
  // 'applyDefaults',
  // 'bulkSave',
  'bulkWrite',
  // 'castObject',
  // 'cleanIndexes',
  'count',
  'countDocuments',
  'create',
  // 'createCollection',
  // 'createIndexes',
  // 'db',
  'deleteMany',
  'deleteOne',
  // 'diffIndexes',
  // 'discriminator',
  'distinct',
  // 'ensureIndexes',
  'estimatedDocumentCount',
  // 'events',
  'exists',
  'find',
  'findById',
  'findByIdAndDelete',
  'findByIdAndRemove',
  'findByIdAndUpdate',
  'findOne',
  'findOneAndDelete',
  'findOneAndRemove',
  'findOneAndReplace',
  'findOneAndUpdate',
  'hydrate',
  // 'init',
  'insertMany',
  // 'inspect',
  // 'listIndexes',
  'mapReduce',
  'populate',
  // '$model',
  // '$remove',
  // '$where',
  'remove',
  'replaceOne',
  // 'schema',
  // 'startSession',
  // 'syncIndexes',
  // 'translateAliases',
  // 'update',
  'updateMany',
  'updateOne',
  'validate',
  // 'watch',
  'where',
] as const;

type AllowedMethods = typeof allowedMethods[number];

export type CreatePayload<TModel extends BaseSchema> = PartialByRecursively<
  OmitRecursively<TModel, 'createdAt' | 'updatedAt' | 'id'>,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  '_id'
>;

export type ModelType<TModel extends BaseSchema> = ReturnModelType<
  AnyParamConstructor<TModel>
>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BaseFactory<TModel extends BaseSchema>
  extends Pick<ModelType<TModel>, AllowedMethods> {}

export abstract class BaseFactory<TModel extends BaseSchema> {
  protected constructor(model: ModelType<TModel>) {
    for (const methodName of allowedMethods) {
      const method = model[methodName] as Function;
      this[methodName] = method.bind(model);
    }
  }
}
