import { Exclude, Expose } from 'class-transformer';
import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Base } from '@typegoose/typegoose/lib/defaultClasses';
import mongoose from 'mongoose';
import { prop } from '@typegoose/typegoose';

@ObjectType()
export abstract class BaseSchema {
  @Exclude()
  @prop({ type: mongoose.Schema.Types.ObjectId })
  _id: mongoose.Types.ObjectId;

  @Field({ description: 'Date entity was created' })
  @Expose()
  @prop({ type: Date })
  createdAt: Date;

  @Field({ description: 'Date entity was updated' })
  @Expose()
  @prop({ type: Date })
  updatedAt: Date;

  @Field(() => ID, { description: 'Identifier of the entity' })
  @Expose()
  get id() {
    return String(this._id);
  }
}

export interface BaseSchema extends Base<mongoose.Types.ObjectId> {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
