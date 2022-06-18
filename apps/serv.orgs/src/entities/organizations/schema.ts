import {
  BaseSchema,
  CaseInsensitiveIndex,
  SimpleModel,
} from '@valhalla/serv.core';
import { Exclude, Expose } from 'class-transformer';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { OrgPlan, OrgStatus } from '@app/protobuf';
import { index, prop } from '@typegoose/typegoose';

import mongoose from 'mongoose';

registerEnumType(OrgPlan, {
  name: 'OrganizationPlan',
  description: 'Subscription plan',
});

registerEnumType(OrgStatus, {
  name: 'OrganizationStatus',
  description: 'Organization status',
});
@SimpleModel('organizations')
@CaseInsensitiveIndex({ name: 1 })
@index({ slug: 1 }, { unique: true })
@index({ plan: 1 })
@index({ inactiveAt: 1 })
@ObjectType()
export class OrganizationSchema extends BaseSchema {
  @prop()
  @Expose()
  @Field({ description: 'Name of the organization' })
  name: string;

  @prop()
  @Exclude()
  @Field(() => OrgStatus, { description: 'Organization status' })
  status: OrgStatus;

  @prop()
  @Expose()
  @Field({ description: 'Unique slug identifier' })
  slug: string;

  @prop()
  @Expose()
  @Field({ description: 'URL of the logo', nullable: true })
  logoUrl?: string;

  @prop()
  @Exclude()
  @Field(() => OrgPlan, { description: 'Subscription plan' })
  plan: OrgPlan;

  @prop()
  @Exclude()
  @Field(() => String, {
    description: 'ID of the account that created the organization',
  })
  createdBy: mongoose.Types.ObjectId;

  @prop()
  @Exclude()
  @Field(() => String, {
    description: 'ID of the account that last updated the organization',
  })
  updatedBy: mongoose.Types.ObjectId;
}
