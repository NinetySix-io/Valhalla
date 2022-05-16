import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { BaseFactory, ModelType } from '@valhalla/serv.core';
import { TenantPlanSchema } from './schema';

@Injectable()
export class TenantPlansModel extends BaseFactory<TenantPlanSchema> {
  constructor(
    @InjectModel(TenantPlanSchema)
    model: ModelType<TenantPlanSchema>,
  ) {
    super(model);
  }
}
