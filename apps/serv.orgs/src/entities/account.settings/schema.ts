import { BaseSchema, SimpleModel } from '@valhalla/serv.core';
import { index, prop } from '@typegoose/typegoose';

import mongoose from 'mongoose';

@SimpleModel('account-settings')
@index({ account: 1 })
export class AccountSettingSchema extends BaseSchema {
  @prop()
  account!: mongoose.Types.ObjectId;

  @prop()
  activeOrg?: mongoose.Types.ObjectId;
}
