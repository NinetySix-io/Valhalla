import {
  BaseSchema,
  SimpleModel,
  mongoose,
  typegoose,
} from '@valhalla/serv.core';
import { Exclude, Expose } from 'class-transformer';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

import { SiteStatus } from '@app/protobuf';

registerEnumType(SiteStatus, {
  name: 'SiteStatus',
});

@ObjectType()
@SimpleModel('sites')
@typegoose.index({ ownBy: 1, name: 1 }, { unique: true })
@typegoose.index({ status: 1 })
export class SiteSchema extends BaseSchema {
  @Field({ description: 'Site name' })
  @Expose()
  @typegoose.prop()
  name: string;

  @Field(() => SiteStatus, { description: 'Site status' })
  @Expose()
  @typegoose.prop()
  status: SiteStatus;

  @Field({ description: 'Site url', nullable: true })
  @Expose()
  @typegoose.prop()
  url?: string;

  @Field(() => String, { description: 'Account ID of creator' })
  @Exclude()
  @typegoose.prop()
  createdBy: mongoose.Types.ObjectId;

  @Field(() => String, { description: 'Account ID of last updater' })
  @Exclude()
  @typegoose.prop()
  updatedBy: mongoose.Types.ObjectId;

  @Field(() => String, { description: 'Site owner' })
  @Exclude()
  @typegoose.prop()
  ownBy: mongoose.Types.ObjectId;
}
