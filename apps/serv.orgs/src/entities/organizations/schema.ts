import {
  BaseSchema,
  CaseInsensitiveIndex,
  SimpleModel,
} from '@valhalla/serv.core';
import { Exclude, Expose } from 'class-transformer';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { index, prop } from '@typegoose/typegoose';

import mongoose from 'mongoose';

export enum OrganizationPlan {
  FREE = 'free',
}

export enum OrganizationStatus {
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  ARCHIVED = 'archived',
}

registerEnumType(OrganizationPlan, {
  name: 'OrganizationPlan',
  description: 'Subscription plan',
});

registerEnumType(OrganizationStatus, {
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
  @Field({ description: 'Organization status' })
  status: OrganizationStatus;

  @prop()
  @Expose()
  @Field({ description: 'Unique slug identifier' })
  slug: string;

  @prop()
  @Expose()
  @Field({ description: 'URL of the logo' })
  logoUrl?: string;

  @prop()
  @Exclude()
  @Field(() => OrganizationPlan, { description: 'Subscription plan' })
  plan: OrganizationPlan;

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
