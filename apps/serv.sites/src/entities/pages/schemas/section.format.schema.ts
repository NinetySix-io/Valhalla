import { BaseSchema, typegoose } from '@valhalla/serv.core';
import { Exclude, Expose } from 'class-transformer';
import { Field, ObjectType } from '@nestjs/graphql';

import mongoose from 'mongoose';

@ObjectType()
export class PageSectionFormatSchema extends BaseSchema {
  @typegoose.prop()
  @Expose()
  @Field({ description: 'Row count' })
  rowsCount: number;

  @typegoose.prop()
  @Expose()
  @Field({ description: 'Column gap' })
  columnGap: number;

  @typegoose.prop()
  @Expose()
  @Field({ description: 'Row Gap' })
  rowGap: number;

  @typegoose.prop()
  @Exclude()
  @Field(() => String, { description: 'Account ID of updater' })
  updatedBy: mongoose.Types.ObjectId;
}
