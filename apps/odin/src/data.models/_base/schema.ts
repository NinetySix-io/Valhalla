import { DocumentType, prop } from '@typegoose/typegoose';
import { Exclude, Expose, instanceToPlain } from 'class-transformer';
import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Base } from '@typegoose/typegoose/lib/defaultClasses';
import mongoose from 'mongoose';

@ObjectType()
export abstract class BaseSchema {
  @Exclude()
  @prop()
  _id: mongoose.Types.ObjectId;

  @Field(() => ID)
  @Expose()
  get id() {
    return this._id.toHexString();
  }

  @Field()
  @Expose()
  @prop()
  createdAt: Date;

  @Field()
  @Expose()
  @prop()
  updatedAt: Date;

  toPublic(this: DocumentType<BaseSchema>) {
    return instanceToPlain(this.toObject());
  }
}

export interface BaseSchema extends Base<mongoose.Types.ObjectId> {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
