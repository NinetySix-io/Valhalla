//

import { DocumentType, ReturnModelType } from '@typegoose/typegoose';
import mongoose, { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';

import { AnyParamConstructor } from '@typegoose/typegoose/lib/types';
import { BaseSchema } from './base.schema';
import { InternalServerErrorException } from '@nestjs/common';
import { MongoError } from 'mongodb';
import { OmitRecursively } from '@valhalla/utilities';
import { tryNice } from 'try-nice';

export type ModelType<TModel extends BaseSchema> = ReturnModelType<
  AnyParamConstructor<TModel>
>;

export type CreatePayload<TModel extends BaseSchema> = OmitRecursively<
  TModel,
  '_id' | 'createdAt' | 'updatedAt' | 'id' | 'toPublic'
>;

export abstract class BaseFactory<TModel extends BaseSchema> {
  protected _model: ModelType<TModel>;

  protected constructor(model: ModelType<TModel>) {
    this._model = model;
  }

  /**
   * TODO: move this to an error class
   */
  protected static throwMongoError(err: MongoError): void {
    throw new InternalServerErrorException(err, err.errmsg);
  }

  findById(id: string | mongoose.Types.ObjectId) {
    return this._model.findById(id);
  }

  findOne(filter: FilterQuery<DocumentType<TModel>>) {
    return this._model.findOne(filter);
  }

  find(filter: FilterQuery<DocumentType<TModel>>) {
    return this._model.find(filter);
  }

  async create(item: CreatePayload<TModel>) {
    const [creation, error] = await tryNice(() => this._model.create(item));
    if (error) {
      BaseFactory.throwMongoError(error);
    }

    return creation;
  }

  deleteById(id: string, options?: QueryOptions) {
    return this._model.findByIdAndDelete(
      new mongoose.Schema.Types.ObjectId(id),
      options,
    );
  }

  deleteOne(
    filter: FilterQuery<DocumentType<TModel>>,
    options?: QueryOptions<DocumentType<TModel>>,
  ): ReturnType<BaseFactory<TModel>['_model']['deleteOne']> {
    return this._model.deleteOne(filter, options);
  }

  updateById(
    id: string,
    updateQuery: UpdateQuery<DocumentType<TModel>>,
    options: QueryOptions<DocumentType<TModel>> & { upsert?: boolean } = {},
  ): ReturnType<BaseFactory<TModel>['_model']['updateOne']> {
    return this._model.updateOne(
      { _id: new mongoose.Schema.Types.ObjectId(id) },
      updateQuery,
      options,
    );
  }

  updateOne(
    filter: FilterQuery<DocumentType<TModel>> = {},
    updateQuery: UpdateQuery<DocumentType<TModel>>,
    options: QueryOptions<DocumentType<TModel>> & { upsert?: boolean } = {},
  ): ReturnType<BaseFactory<TModel>['_model']['updateOne']> {
    return this._model.updateOne(filter, updateQuery, options);
  }

  async findByIdAndUpdate(
    id: string,
    updateQuery: UpdateQuery<DocumentType<TModel>>,
    options: QueryOptions<DocumentType<TModel>> & {
      upsert?: boolean;
      new?: boolean;
    } = {},
  ) {
    return this._model.findByIdAndUpdate(
      { _id: new mongoose.Schema.Types.ObjectId(id) },
      updateQuery,
      options,
    );
  }

  findOneAndUpdate(
    filter: FilterQuery<DocumentType<TModel>> = {},
    updateQuery: UpdateQuery<DocumentType<TModel>>,
    options: QueryOptions<DocumentType<TModel>> & {
      upsert?: boolean;
      new?: boolean;
    } = {},
  ) {
    return this._model.findOneAndUpdate(filter, updateQuery, options);
  }

  findByIdAndDelete(
    id: string | mongoose.Types.ObjectId,
    options?: QueryOptions<DocumentType<TModel>>,
  ) {
    return this._model.findByIdAndDelete(id, options);
  }

  findOneAndDelete(
    filter: FilterQuery<DocumentType<TModel>>,
    options?: QueryOptions<DocumentType<TModel>>,
  ) {
    return this._model.findOneAndDelete(filter, options);
  }

  async count(filter: FilterQuery<DocumentType<TModel>> = {}): Promise<number> {
    const [count] = await tryNice(() => this._model.count(filter));
    return count || 0;
  }

  async exists(
    filter: FilterQuery<DocumentType<TModel>> = {},
  ): Promise<boolean> {
    const count = await this._model.findOne(filter).countDocuments();
    return count > 1;
  }
}
