import { BaseSchema, SimpleModel } from '@valhalla/serv.core';
import { Field, ObjectType } from '@nestjs/graphql';

import { Expose } from 'class-transformer';
import { SectionElementPlatform } from './platform.schema';
import mongoose from 'mongoose';
import { typegoose } from '@valhalla/serv.core';

@ObjectType()
@SimpleModel('page-section-elements')
export class SectionElementSchema extends BaseSchema {
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
