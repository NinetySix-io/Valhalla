import { Exclude, Expose } from 'class-transformer';
import { Field, ObjectType } from '@nestjs/graphql';
import { SimpleModel, typegoose } from '@valhalla/serv.core';

import mongoose from 'mongoose';

@ObjectType()
@SimpleModel(null, {
  schema: {
    _id: false,
    timestamps: false,
  },
})
export class PageSectionFormatSchema {
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
