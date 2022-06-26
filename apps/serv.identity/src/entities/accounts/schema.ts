import {
  BaseSchema,
  SimpleModel,
  mongoose,
  typegoose,
} from '@valhalla/serv.core';
import { Exclude, Expose } from 'class-transformer';
import { Field, ObjectType, OmitType } from '@nestjs/graphql';

@ObjectType()
@typegoose.modelOptions({ schemaOptions: { timestamps: true, _id: true } })
class AccountEmailSchema extends OmitType(BaseSchema, ['_id', 'id']) {
  @typegoose.prop()
  @Field({ description: 'Email address value' })
  value!: string;

  @typegoose.prop()
  @Expose()
  @Field({ description: 'Whether email address is primary' })
  isPrimary!: boolean;

  @typegoose.prop()
  @Expose()
  @Field({ description: 'Whether email address is verified' })
  isVerified!: boolean;

  @typegoose.prop()
  @Expose()
  @Field({ description: 'Verification date' })
  verifiedDate?: Date;

  @typegoose.prop()
  @Exclude()
  @Field(() => String, { description: 'Verification ID' })
  verification!: mongoose.Types.ObjectId;
}

@ObjectType()
@typegoose.modelOptions({ schemaOptions: { timestamps: true, _id: true } })
class AccountPhoneSchema extends OmitType(BaseSchema, ['_id', 'id']) {
  @typegoose.prop()
  @Expose()
  @Field({ description: 'Phone number value' })
  value!: string;

  @typegoose.prop()
  @Expose()
  @Field({ description: 'Whether phone number is primary' })
  isPrimary!: boolean;

  @typegoose.prop()
  @Expose()
  @Field({ description: 'Whether phone number is verified' })
  isVerified!: boolean;

  @typegoose.prop()
  @Expose()
  @Field({ description: 'Verification date' })
  verifiedDate?: Date;

  @typegoose.prop()
  @Exclude()
  @Field(() => String, { description: 'Verification ID' })
  verification!: mongoose.Types.ObjectId;
}

@ObjectType()
@SimpleModel('accounts')
export class AccountSchema extends BaseSchema {
  @typegoose.prop()
  @Expose()
  @Field({ description: 'User Display Name' })
  displayName!: string;

  @typegoose.prop()
  @Expose()
  @Field({ description: 'First Name' })
  firstName?: string;

  @typegoose.prop()
  @Expose()
  @Field({ description: 'Last Name' })
  lastName?: string;

  @typegoose.prop({ type: [AccountEmailSchema], _id: true })
  @Expose()
  @Field(() => [AccountEmailSchema], {
    description: 'Associated email addresses',
  })
  emails!: AccountEmailSchema[];

  @typegoose.prop({ type: [AccountPhoneSchema], _id: true })
  @Expose()
  @Field(() => [AccountPhoneSchema], {
    description: 'Associated phone numbers',
  })
  phones!: AccountPhoneSchema[];
}
