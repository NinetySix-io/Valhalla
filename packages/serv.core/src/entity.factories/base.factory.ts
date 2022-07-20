import { DocumentType, ReturnModelType } from '@typegoose/typegoose';
import { OmitRecursively, isNil, omitBy } from '@valhalla/utilities';
import mongoose, {
  FilterQuery,
  QueryOptions,
  SaveOptions,
  UpdateQuery,
} from 'mongoose';

import { AnyParamConstructor } from '@typegoose/typegoose/lib/types';
import { BaseSchema } from './base.schema';
import { InternalServerErrorException } from '@nestjs/common';
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
   * It takes an object and returns a new object with the same properties, but with the values
   * converted to the correct type
   */
  hydrate(obj: object) {
    return this._model.hydrate(obj);
  }

  /**
   * Find document by id
   */
  findById(id: string | mongoose.Types.ObjectId) {
    return this._model.findById(id);
  }

  /**
   * It returns a promise that resolves to a single document from the database
   */
  findOne(filter: FilterQuery<DocumentType<TModel>>) {
    return this._model.findOne(filter);
  }

  /**
   * It returns a promise that resolves to an array of documents that match the filter
   */
  find(
    filter: FilterQuery<DocumentType<TModel>>,
    options?: QueryOptions<DocumentType<TModel>>,
  ) {
    return this._model.find(filter, null, options);
  }

  /* Creating a single item. */
  async create(item: CreatePayload<TModel>) {
    const [result] = await this._create([item]);
    return result;
  }

  /**
   * It creates many items.
   */
  createMany(items: CreatePayload<TModel>[], options?: SaveOptions) {
    return this._create(items, options);
  }

  /**
   * It creates a new document in the database
   */
  private async _create(item: CreatePayload<TModel>[], options?: SaveOptions) {
    const [creation, error] = await tryNice(() =>
      this._model.create(item, options),
    );

    if (error) {
      throw new InternalServerErrorException(error, error.errmsg);
    } else if (creation === undefined) {
      throw new InternalServerErrorException(
        new Error('Unable to create document'),
      );
    }

    return creation;
  }

  /**
   * It finds a document by its id and deletes it
   */
  deleteById(id: string, options?: QueryOptions) {
    return this._model.findByIdAndDelete(
      new mongoose.Schema.Types.ObjectId(id),
      options,
    );
  }

  /**
   * It deletes one document from the database.
   */
  deleteOne(
    filter: FilterQuery<DocumentType<TModel>>,
    options?: QueryOptions<DocumentType<TModel>>,
  ): ReturnType<BaseFactory<TModel>['_model']['deleteOne']> {
    return this._model.deleteOne(filter, options);
  }

  /**
   * It deletes all documents from the database that match the filter
   */
  deleteMany(
    filter: FilterQuery<DocumentType<TModel>>,
    options?: QueryOptions<DocumentType<TModel>>,
  ) {
    return this._model.deleteMany(filter, options);
  }

  /**
   * It updates a document in the database.
   */
  updateById(
    id: string,
    updateQuery: UpdateQuery<DocumentType<TModel>>,
    options: QueryOptions<DocumentType<TModel>> & { upsert?: boolean } = {},
  ): ReturnType<BaseFactory<TModel>['_model']['updateOne']> {
    return this.updateOne(
      { _id: new mongoose.Schema.Types.ObjectId(id) },
      updateQuery,
      options,
    );
  }

  /**
   * It updates one document in the database.
   */
  updateOne(
    filter: FilterQuery<DocumentType<TModel>> = {},
    updateQuery: UpdateQuery<DocumentType<TModel>>,
    options: QueryOptions<DocumentType<TModel>> & {
      upsert?: boolean;
      withoutNil?: boolean;
    } = {},
  ): ReturnType<BaseFactory<TModel>['_model']['updateOne']> {
    return this._model.updateOne(
      filter,
      options?.withoutNil ? omitBy(updateQuery, isNil) : updateQuery,
      options,
    );
  }

  /**
   * It updates many documents in the database.
   */
  updateMany(
    filter: FilterQuery<DocumentType<TModel>> = {},
    updateQuery: UpdateQuery<DocumentType<TModel>>,
    options: QueryOptions<DocumentType<TModel>> & {
      upsert?: boolean;
      withoutNil?: boolean;
    } = {},
  ): ReturnType<BaseFactory<TModel>['_model']['updateMany']> {
    return this._model.updateMany(
      filter,
      options?.withoutNil ? omitBy(updateQuery, isNil) : updateQuery,
      options,
    );
  }

  /**
   * It finds a document by its id and updates it with the updateQuery
   */
  findByIdAndUpdate(
    id: string,
    updateQuery: UpdateQuery<DocumentType<TModel>>,
    options: QueryOptions<DocumentType<TModel>> & {
      upsert?: boolean;
      new?: boolean;
      withoutNil?: boolean;
    } = {},
  ) {
    return this.findOneAndUpdate(
      { _id: new mongoose.Schema.Types.ObjectId(id) },
      updateQuery,
      options,
    );
  }

  /**
   * It updates a document in the database.
   */
  findOneAndUpdate(
    filter: FilterQuery<DocumentType<TModel>> = {},
    updateQuery: UpdateQuery<DocumentType<TModel>>,
    options: QueryOptions<DocumentType<TModel>> & {
      upsert?: boolean;
      new?: boolean;
      withoutNil?: boolean;
    } = {},
  ) {
    return this._model.findOneAndUpdate(
      filter,
      options?.withoutNil ? omitBy(updateQuery, isNil) : updateQuery,
      options,
    );
  }

  /**
   * It finds a document by its id and deletes it
   */

  findByIdAndDelete(
    id: string | mongoose.Types.ObjectId,
    options?: QueryOptions<DocumentType<TModel>>,
  ) {
    return this._model.findByIdAndDelete(id, options);
  }

  /**
   * It finds one document and deletes it
   */
  findOneAndDelete(
    filter: FilterQuery<DocumentType<TModel>>,
    options?: QueryOptions<DocumentType<TModel>>,
  ) {
    return this._model.findOneAndDelete(filter, options);
  }

  /**
   * It counts the number of documents in the database.
   */
  async count(filter: FilterQuery<DocumentType<TModel>> = {}): Promise<number> {
    const [count] = await tryNice(() => this._model.count(filter));
    return count || 0;
  }

  /**
   * It returns a boolean value that indicates whether or not a document exists in the database
   */
  async exists(
    filter: FilterQuery<DocumentType<TModel>> = {},
  ): Promise<boolean> {
    const count = await this._model.findOne(filter).countDocuments();
    return count > 0;
  }
}
