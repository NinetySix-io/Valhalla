import { Exclude, Expose } from 'class-transformer';
import { Field, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsPhoneNumber } from 'class-validator';

import { BaseSchema } from '../_base/schema';
import { Ref } from '@typegoose/typegoose';
import { caseInsensitiveIndex } from '../_base/decorators/case.insensitive.index';
import { prop } from '@typegoose/typegoose';
import { simpleModel } from '../_base/decorators/simple.model';

@ObjectType()
@simpleModel('users')
@caseInsensitiveIndex({ email: 1 }, { unique: true })
export class UserSchema extends BaseSchema {
  @Expose()
  @Field()
  @prop({ lowercase: true })
  @IsEmail()
  email: string;

  @Expose()
  @Field({ nullable: true })
  @prop()
  emailVerified?: boolean;

  @Expose()
  @prop()
  displayName: string;

  @Expose()
  @Field({ nullable: true })
  @prop()
  @IsPhoneNumber()
  phone?: string;

  @Expose()
  @Field({ nullable: true })
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
