import {
  BaseSchema,
  SimpleModel,
  mongoose,
  typegoose,
} from '@valhalla/serv.core';

@SimpleModel('account-settings')
@typegoose.index({ account: 1 })
export class AccountSettingSchema extends BaseSchema {
  @typegoose.prop()
  account!: mongoose.Types.ObjectId;

  @typegoose.prop()
  activeOrg?: mongoose.Types.ObjectId;
}
