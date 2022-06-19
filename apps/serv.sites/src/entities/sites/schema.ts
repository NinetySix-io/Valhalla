import { BaseSchema, SimpleModel } from '@valhalla/serv.core';
import { Exclude, Expose } from 'class-transformer';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

import { SiteStatus } from '@app/protobuf';
import mongoose from 'mongoose';
import { prop } from '@typegoose/typegoose';

registerEnumType(SiteStatus, {
  name: 'SiteStatus',
});

@ObjectType()
@SimpleModel('sites')
export class SiteSchema extends BaseSchema {
  @Field({ description: 'Site name' })
  @Expose()
  @prop()
  name: string;

  @Field({ description: 'Site status' })
  @Expose()
  @prop()
  status: SiteStatus;

  @Field({ description: 'Site url' })
  @Expose()
  @prop()
  url?: string;

  @Field({ description: 'Author' })
  @Exclude()
  @prop()
  createdBy: mongoose.Types.ObjectId;

  @Field({ description: 'Last Updated By' })
  @Exclude()
  @prop()
  updatedBy: mongoose.Types.ObjectId;

  @Field({ description: 'Site owner' })
  @Exclude()
  @prop()
  ownBy: mongoose.Types.ObjectId;
}
