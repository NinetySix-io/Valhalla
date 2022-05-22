import { BaseSchema, SimpleModel } from '@valhalla/serv.core';
import { Field, ObjectType } from '@nestjs/graphql';
import { modelOptions, prop } from '@typegoose/typegoose';

import { Expose } from 'class-transformer';

@ObjectType()
@modelOptions({ schemaOptions: { timestamps: true } })
export class UserEmailSchema extends BaseSchema {
  @prop()
  value!: string;

  @prop()
  isPrimary!: boolean;

  @prop()
  isVerified!: boolean;

  @prop()
  verificationCode?: string;
}

@ObjectType()
@modelOptions({ schemaOptions: { timestamps: true } })
export class UserPhoneSchema extends BaseSchema {
  @prop()
  value!: string;

  @prop()
  isPrimary!: boolean;

  @prop()
  isVerified!: boolean;

  @prop()
  verificationCode?: string;
}

@ObjectType()
@SimpleModel('users')
export class UserSchema extends BaseSchema {
  @prop()
  @Expose()
  @Field({ description: 'User Display Name' })
  displayName!: string;

  @prop()
  @Expose()
  @Field({ description: 'First Name' })
  firstName?: string;

  @prop()
  @Expose()
  @Field({ description: 'Last Name' })
  lastName?: string;

  @prop({ _id: true, type: [UserEmailSchema] })
  @Expose()
  @Field(() => [UserEmailSchema])
  emails!: UserEmailSchema[];

  @prop({ _id: true, type: [UserPhoneSchema] })
  @Expose()
  @Field(() => [UserPhoneSchema])
  phones!: UserPhoneSchema[];
}
