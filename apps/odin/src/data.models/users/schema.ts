import { Exclude, Expose } from 'class-transformer';
import { Field, ObjectType } from '@nestjs/graphql';
import { Ref, prop } from '@typegoose/typegoose';

import { BaseSchema } from '../_base/schema';
import { caseInsensitiveIndex } from '../_base/decorators/case.insensitive.index';
import { simpleModel } from '../_base/decorators/simple.model';

@ObjectType()
@simpleModel('users')
@caseInsensitiveIndex({ email: 1 }, { unique: true })
export class UserSchema extends BaseSchema {
  @Field()
  @Expose()
  @prop({ lowercase: true })
  email: string;

  @Field({ nullable: true })
  @Expose()
  @prop()
  emailVerified?: boolean;

  @Expose()
  @prop()
  displayName: string;

  @Field({ nullable: true })
  @Expose()
  @prop()
  phone?: string;

  @Field({ nullable: true })
  @Expose()
  @prop()
  phoneVerified?: boolean;

  @Field({ nullable: true })
  @Expose()
  @prop()
  avatar?: string;

  @Exclude()
  @prop({ ref: () => UserSchema })
  createdBy?: Ref<UserSchema>;

  @Exclude()
  @prop({ ref: () => UserSchema })
  updatedBy?: Ref<UserSchema>;
}
