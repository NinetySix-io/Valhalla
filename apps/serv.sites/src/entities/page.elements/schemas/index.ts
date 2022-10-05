import { BaseSchema, SimpleModel } from '@valhalla/serv.core';
import { Exclude, Expose } from 'class-transformer';
import { Field, ObjectType } from '@nestjs/graphql';

import { PageElementPlatformSchema } from './platform.schema';
import mongoose from 'mongoose';
import { typegoose } from '@valhalla/serv.core';

@ObjectType()
@SimpleModel('page-elements')
export class PageElementSchema extends BaseSchema {
  @typegoose.prop()
  @Exclude()
  section: mongoose.Types.ObjectId;

  @typegoose.prop({ type: PageElementPlatformSchema })
  @Expose()
  @Field({ description: 'Desktop configuration' })
  desktop: PageElementPlatformSchema;

  @typegoose.prop({ type: PageElementPlatformSchema })
  @Expose()
  @Field({ description: 'Tablet configuration' })
  tablet?: PageElementPlatformSchema;

  @typegoose.prop({ type: PageElementPlatformSchema })
  @Expose()
  @Field({ description: 'Mobile configuration' })
  mobile?: PageElementPlatformSchema;

  @typegoose.prop()
  @Expose()
  @Field(() => String, { description: 'User ID' })
  updatedBy: mongoose.Types.ObjectId;
}
