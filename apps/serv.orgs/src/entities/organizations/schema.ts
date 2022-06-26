import {
  BaseSchema,
  CaseInsensitiveIndex,
  SimpleModel,
  mongoose,
  typegoose,
} from '@valhalla/serv.core';
import { Exclude, Expose } from 'class-transformer';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { OrgPlan, OrgStatus } from '@app/protobuf';

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
@typegoose.index({ slug: 1 })
@typegoose.index({ plan: 1 })
@typegoose.index({ inactiveAt: 1 })
@ObjectType()
export class OrganizationSchema extends BaseSchema {
  @typegoose.prop()
  @Expose()
  @Field({ description: 'Name of the organization' })
  name: string;

  @typegoose.prop()
  @Exclude()
  @Field(() => OrgStatus, { description: 'Organization status' })
  status: OrgStatus;

  @typegoose.prop()
  @Expose()
  @Field({ description: 'Unique slug identifier' })
  slug: string;

  @typegoose.prop()
  @Expose()
  @Field({ description: 'URL of the logo', nullable: true })
  logoUrl?: string;

  @typegoose.prop({ required: true })
  @Exclude()
  @Field(() => OrgPlan, { description: 'Subscription plan' })
  plan: OrgPlan;

  @typegoose.prop()
  @Exclude()
  @Field(() => String, {
    description: 'ID of the account that created the organization',
  })
  createdBy: mongoose.Types.ObjectId;

  @typegoose.prop()
  @Exclude()
  @Field(() => String, {
    description: 'ID of the account that last updated the organization',
  })
  updatedBy: mongoose.Types.ObjectId;
}
