import { BaseSchema, SimpleModel } from '@valhalla/serv.core';
import { Exclude, Expose } from 'class-transformer';
import { Field, ObjectType, OmitType } from '@nestjs/graphql';
import { modelOptions, prop } from '@typegoose/typegoose';

@ObjectType()
@modelOptions({ schemaOptions: { timestamps: true, _id: true } })
class AccountEmailSchema extends OmitType(BaseSchema, ['_id', 'id']) {
  @prop()
  @Field({ description: 'Email address value' })
  value!: string;

  @prop()
  @Expose()
  @Field({ description: 'Whether email address is primary' })
  isPrimary!: boolean;

  @prop()
  @Expose()
  @Field({ description: 'Whether email address is verified' })
  isVerified!: boolean;

  @prop()
  @Expose()
  @Exclude()
  verificationCode?: string;
}

@ObjectType()
@modelOptions({ schemaOptions: { timestamps: true, _id: true } })
class AccountPhoneSchema extends OmitType(BaseSchema, ['_id', 'id']) {
  @prop()
  @Expose()
  @Field({ description: 'Phone number value' })
  value!: string;

  @prop()
  @Expose()
  @Field({ description: 'Whether email address is primary' })
  isPrimary!: boolean;

  @prop()
  @Expose()
  @Field({ description: 'Whether email address is verified' })
  isVerified!: boolean;

  @prop()
  @Exclude()
  verificationCode?: string;
}

@ObjectType()
@SimpleModel('accounts')
export class AccountSchema extends BaseSchema {
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

  @prop({ type: [AccountEmailSchema], _id: true })
  @Expose()
  @Field(() => [AccountEmailSchema], {
    description: 'Associated email addresses',
  })
  emails!: AccountEmailSchema[];

  @prop({ type: [AccountPhoneSchema], _id: true })
  @Expose()
  @Field(() => [AccountPhoneSchema], {
    description: 'Associated phone numbers',
  })
  phones!: AccountPhoneSchema[];
}
