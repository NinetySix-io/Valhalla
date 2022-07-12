import { DocumentType, ReturnModelType } from '@typegoose/typegoose';
import { OmitRecursively, isNil, omitBy } from '@valhalla/utilities';
import mongoose, { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';

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
   * Find a document by its id.
   * @param {string | mongoose.Types.ObjectId} id - string | mongoose.Types.ObjectId
   * @returns The model is being returned.
   */
  findById(id: string | mongoose.Types.ObjectId) {
    return this._model.findById(id);
  }

  /**
   * It returns a promise that resolves to a single document from the database
   * @param filter - FilterQuery<DocumentType<TModel>>
   * @returns A promise that resolves to a single document.
   */
  findOne(filter: FilterQuery<DocumentType<TModel>>) {
    return this._model.findOne(filter);
  }

  /**
   * It returns a promise that resolves to an array of documents that match the filter
   * @param filter - FilterQuery<DocumentType<TModel>>
   * @returns A promise that resolves to an array of documents.
   */
  find(filter: FilterQuery<DocumentType<TModel>>) {
    return this._model.find(filter);
  }

  /* Creating a single item. */
  async create(item: CreatePayload<TModel>) {
    const [result] = await this._create([item]);
    return result;
  }

  /**
   * It creates many items.
   * @param items - CreatePayload<TModel>
   * @returns An array of the created items.
   */
  async createMany(items: CreatePayload<TModel>[]) {
    return this._create(items);
  }

  /**
   * It creates a new document in the database
   * @param {CreatePayload<TModel>[]} item - CreatePayload<TModel>[]
   * @returns The creation of the document.
   */
  private async _create(item: CreatePayload<TModel>[]) {
    const [creation, error] = await tryNice(() => this._model.create(item));

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
   * @param {string} id - The id of the document you want to delete.
   * @param {QueryOptions} [options] - QueryOptions
   * @returns The deleted document.
   */
  deleteById(id: string, options?: QueryOptions) {
    return this._model.findByIdAndDelete(
      new mongoose.Schema.Types.ObjectId(id),
      options,
    );
  }

  /**
   * It deletes one document from the database.
   * @param filter - FilterQuery<DocumentType<TModel>>
   * @param [options] - QueryOptions<DocumentType<TModel>>
   * @returns The result of the delete query
   */
  deleteOne(
    filter: FilterQuery<DocumentType<TModel>>,
    options?: QueryOptions<DocumentType<TModel>>,
  ): ReturnType<BaseFactory<TModel>['_model']['deleteOne']> {
    return this._model.deleteOne(filter, options);
  }

  /**
   * It deletes all documents from the database that match the filter
   * @param filter - FilterQuery<DocumentType<TModel>>
   * @param [options] - QueryOptions<DocumentType<TModel>>
   * @returns The result of the deleteMany method.
   */
  deleteMany(
    filter: FilterQuery<DocumentType<TModel>>,
    options?: QueryOptions<DocumentType<TModel>>,
  ) {
    return this._model.deleteMany(filter, options);
  }

  /**
   * It updates a document in the database.
   * @param {string} id - The id of the document you want to update.
   * @param updateQuery - UpdateQuery<DocumentType<TModel>>
   * @param options - QueryOptions<DocumentType<TModel>> & { upsert?: boolean } = {}
   * @returns The return result of the update query
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
   * @param filter - FilterQuery<DocumentType<TModel>> = {}
   * @param updateQuery - UpdateQuery<DocumentType<TModel>>
   * @param options - QueryOptions<DocumentType<TModel>> & { upsert?: boolean } = {},
   * @returns The return result of the update query
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
   * @param filter - FilterQuery<DocumentType<TModel>> = {}
   * @param updateQuery - UpdateQuery<DocumentType<TModel>>
   * @param options - QueryOptions<DocumentType<TModel>> & { upsert?: boolean } = {},
   * @returns The return type of the updateMany method of the model.
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
   * @param {string} id - The id of the document you want to update.
   * @param updateQuery - This is the query that will be used to update the document.
   * @param options - QueryOptions<DocumentType<TModel>> & {
   * @returns A promise that resolves to the updated document.
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
   * @param filter - FilterQuery<DocumentType<TModel>> = {}
   * @param updateQuery - This is the query that will be used to update the document.
   * @param options - {
   * @returns A promise that resolves to the document that was updated.
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
   * @param {string | mongoose.Types.ObjectId} id - The id of the document you want to delete.
   * @param [options] - QueryOptions<DocumentType<TModel>>
   * @returns A promise that resolves to the deleted document.
   */

  findByIdAndDelete(
    id: string | mongoose.Types.ObjectId,
    options?: QueryOptions<DocumentType<TModel>>,
  ) {
    return this._model.findByIdAndDelete(id, options);
  }

  /**
   * It finds one document and deletes it
   * @param filter - This is the filter that you want to use to find the document.
   * @param [options] - QueryOptions<DocumentType<TModel>>
   * @returns A promise that resolves to the deleted document.
   */
  findOneAndDelete(
    filter: FilterQuery<DocumentType<TModel>>,
    options?: QueryOptions<DocumentType<TModel>>,
  ) {
    return this._model.findOneAndDelete(filter, options);
  }

  /**
   * It counts the number of documents in the database.
   * @param filter - FilterQuery<DocumentType<TModel>> = {}
   * @returns The count of the documents in the collection.
   */
  async count(filter: FilterQuery<DocumentType<TModel>> = {}): Promise<number> {
    const [count] = await tryNice(() => this._model.count(filter));
    return count || 0;
  }

  /**
   * It returns a boolean value that indicates whether or not a document exists in the database
   * @param filter - FilterQuery<DocumentType<TModel>> = {}
   * @returns A boolean value.
   */
  async exists(
    filter: FilterQuery<DocumentType<TModel>> = {},
  ): Promise<boolean> {
    const count = await this._model.findOne(filter).countDocuments();
    return count > 0;
  }
}
