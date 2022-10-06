import { BaseSchema, SimpleModel } from '@valhalla/serv.core';
import { Exclude, Expose } from 'class-transformer';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

import { PageElementPlatformSchema } from './platform.schema';
import { PrimitiveElementType } from '@app/protobuf';
import mongoose from 'mongoose';
import { typegoose } from '@valhalla/serv.core';

registerEnumType(PrimitiveElementType, {
  name: 'PrimitiveElementType',
});

@ObjectType()
@SimpleModel('page-elements', { schema: { strict: false } })
export class PageElementSchema extends BaseSchema {
  @typegoose.prop()
  @Exclude()
  group: mongoose.Types.ObjectId;

  @typegoose.prop()
  @Expose()
  @Field(() => PrimitiveElementType, { description: 'Element type' })
  type: PrimitiveElementType;

  @typegoose.prop({ type: PageElementPlatformSchema })
  @Expose()
  @Field(() => PageElementPlatformSchema, {
    description: 'Desktop configuration',
  })
  desktop: PageElementPlatformSchema;

  @typegoose.prop({ type: PageElementPlatformSchema })
  @Expose()
  @Field(() => PageElementPlatformSchema, {
    description: 'Tablet configuration',
    nullable: true,
  })
  tablet?: PageElementPlatformSchema;

  @typegoose.prop({ type: PageElementPlatformSchema })
  @Expose()
  @Field(() => PageElementPlatformSchema, {
    description: 'Mobile configuration',
    nullable: true,
  })
  mobile?: PageElementPlatformSchema;

  @typegoose.prop()
  @Expose()
  @Field(() => String, { description: 'User ID' })
  updatedBy: mongoose.Types.ObjectId;

  @typegoose.prop()
  @Exclude()
  @Field(() => String, { description: 'User ID' })
  createdBy: mongoose.Types.ObjectId;
}
