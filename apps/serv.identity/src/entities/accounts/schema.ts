import {
  BaseSchema,
  SimpleModel,
  mongoose,
  typegoose,
} from '@valhalla/serv.core';

@SimpleModel()
class AccountEmailSchema extends BaseSchema {
  @typegoose.prop()
  value!: string;

  @typegoose.prop()
  isPrimary!: boolean;

  @typegoose.prop()
  isVerified!: boolean;

  @typegoose.prop()
  verifiedDate?: Date;

  @typegoose.prop()
  verification!: mongoose.Types.ObjectId;
}

@SimpleModel()
class AccountPhoneSchema extends BaseSchema {
  @typegoose.prop()
  value!: string;

  @typegoose.prop()
  isPrimary!: boolean;

  @typegoose.prop()
  isVerified!: boolean;

  @typegoose.prop()
  verifiedDate?: Date;

  @typegoose.prop()
  verification!: mongoose.Types.ObjectId;
}

@SimpleModel('accounts')
@typegoose.index({ 'emails._id': 1 })
@typegoose.index({ 'phones._id': 1 })
export class AccountSchema extends BaseSchema {
  @typegoose.prop()
  displayName!: string;

  @typegoose.prop()
  firstName?: string;

  @typegoose.prop()
  lastName?: string;

  @typegoose.prop({ type: [AccountEmailSchema], _id: true })
  emails!: AccountEmailSchema[];

  @typegoose.prop({ type: [AccountPhoneSchema], _id: true })
  phones!: AccountPhoneSchema[];
}
