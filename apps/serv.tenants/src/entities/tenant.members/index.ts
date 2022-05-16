import { Injectable } from '@nestjs/common';
import { BaseFactory, ModelType } from '@valhalla/serv.core';
import { InjectModel } from 'nestjs-typegoose';

import { TenantMemberSchema } from './schema';

@Injectable()
export class TenantMembersModel extends BaseFactory<TenantMemberSchema> {
  constructor(
    @InjectModel(TenantMemberSchema)
    model: ModelType<TenantMemberSchema>,
  ) {
    super(model);
  }
}
