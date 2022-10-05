import { BaseSchema, SimpleModel } from '@valhalla/serv.core';
import { Exclude, Expose } from 'class-transformer';
import { Field, ObjectType } from '@nestjs/graphql';

import { SectionElementPlatform } from './platform.schema';
import mongoose from 'mongoose';
import { typegoose } from '@valhalla/serv.core';

@ObjectType()
@SimpleModel('page-elements')
export class PageElementSchema extends BaseSchema {
  @typegoose.prop()
  @Exclude()
  section: mongoose.Types.ObjectId;

  @typegoose.prop()
  @Expose()
  @Field({ description: 'Desktop configuration' })
  desktop: SectionElementPlatform;

  @typegoose.prop()
  @Expose()
  @Field({ description: 'Tablet configuration' })
  tablet?: SectionElementPlatform;

  @typegoose.prop()
  @Expose()
  @Field({ description: 'Mobile configuration' })
  mobile?: SectionElementPlatform;

  @typegoose.prop()
  @Expose()
  @Field(() => String, { description: 'User ID' })
  updatedBy: mongoose.Types.ObjectId;
}
