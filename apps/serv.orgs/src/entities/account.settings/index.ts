import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { BaseFactory, ModelType } from '@valhalla/serv.core';
import { AccountSettingSchema } from './schema';

@Injectable()
export class AccountSettingsModel extends BaseFactory<AccountSettingSchema> {
  constructor(
    @InjectModel(AccountSettingSchema)
    model: ModelType<AccountSettingSchema>,
  ) {
    super(model);
  }
}
