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
export class SiteSchema extends BaseSchema {
  @Field({ description: 'Site name' })
  @Expose()
  @typegoose.prop()
  name: string;

  @Field({ description: 'Site status' })
  @Expose()
  @typegoose.prop()
  status: SiteStatus;

  @Field({ description: 'Site url' })
  @Expose()
  @typegoose.prop()
  url?: string;

  @Field({ description: 'Author' })
  @Exclude()
  @typegoose.prop()
  createdBy: mongoose.Types.ObjectId;

  @Field({ description: 'Last Updated By' })
  @Exclude()
  @typegoose.prop()
  updatedBy: mongoose.Types.ObjectId;

  @Field({ description: 'Site owner' })
  @Exclude()
  @typegoose.prop()
  ownBy: mongoose.Types.ObjectId;
}
