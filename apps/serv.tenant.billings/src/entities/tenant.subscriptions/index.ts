import { Injectable } from '@nestjs/common';
import { BaseFactory, ModelType } from '@valhalla/serv.core';

import { TenantSubscriptionSchema } from './schema';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class TenantSubscriptionsModel extends BaseFactory<TenantSubscriptionSchema> {
  constructor(
    @InjectModel(TenantSubscriptionSchema)
    model: ModelType<TenantSubscriptionSchema>,
  ) {
    super(model);
  }
}
