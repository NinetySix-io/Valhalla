import {
  BaseSchema,
  IsObjectId,
  SimpleModel,
  typegoose,
} from '@valhalla/serv.core';
import { Exclude, Expose } from 'class-transformer';
import { Field, ObjectType } from '@nestjs/graphql';
import { IsUrl, MaxLength, MinLength } from 'class-validator';

import { EditStatus } from '@app/protobuf';
import mongoose from 'mongoose';

@ObjectType({ description: 'Use to group multiple elements together' })
@SimpleModel('components', {
  allowMixed: typegoose.Severity.ALLOW,
})
@typegoose.index({ status: 1 })
@typegoose.index({ isHidden: 1 })
export class ComponentSchema extends BaseSchema {
  @typegoose.prop()
  @Expose()
  @Field(() => EditStatus, { description: 'Edit status' })
  status: EditStatus;

  @typegoose.prop()
  @Exclude()
  ownBy: mongoose.Types.ObjectId;

  @typegoose.prop()
  @Expose()
  @IsObjectId()
  @Field(() => String, { description: 'Account ID' })
  createdBy: mongoose.Types.ObjectId;

  @typegoose.prop()
  @Expose()
  @IsObjectId()
  @Field(() => String, { description: 'Account ID' })
  updatedBy: mongoose.Types.ObjectId;

  @typegoose.prop()
  @Expose()
  @MinLength(3)
  @MaxLength(30)
  @Field(() => String, { description: "Component's name" })
  name: string;

  @typegoose.prop()
  @Expose()
  @IsUrl()
  @Field(() => String, { description: 'Thumbnail URI', nullable: true })
  thumbnailUrl?: string;
}
