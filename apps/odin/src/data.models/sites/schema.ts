import { Exclude, Expose } from 'class-transformer';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Ref, index, prop } from '@typegoose/typegoose';

import { BaseSchema } from '../_base/schema';
import { OrganizationSchema } from '../organizations/schema';
import { UserSchema } from '../users/schema';
import { caseInsensitiveIndex } from '../_base/decorators/case.insensitive.index';
import { simpleModel } from '../_base/decorators/simple.model';

@ObjectType()
@InputType()
@simpleModel('sites')
@caseInsensitiveIndex({ tags: 'text', name: 'text', url: 'text' })
@index({ owner: 1 })
export class SiteSchema extends BaseSchema {
  @Exclude()
  @prop({ ref: () => OrganizationSchema })
  owner: Ref<OrganizationSchema>;

  @Exclude()
  @prop({ ref: () => UserSchema })
  createdBy: Ref<UserSchema>;

  @Exclude()
  @prop({ ref: () => UserSchema })
  updatedBy: Ref<UserSchema>;

  @Expose()
  @Field({
    description: 'Whether site is active or not',
  })
  @prop()
  isActive: boolean;

  @Expose()
  @Field({ description: "Site's name" })
  @prop()
  name: string;

  @Expose()
  @Field({
    description:
      "Default title template that will be added to the page's title",
  })
  @prop()
  titleFormat?: string;

  @Expose()
  @Field({ description: 'Domain for the site' })
  @prop()
  domain?: string;

  @Expose()
  @Field()
  @prop()
  thumbnail?: string;

  @Expose()
  @Field(() => [String])
  @prop({ type: [String] })
  tags: string[];
}
