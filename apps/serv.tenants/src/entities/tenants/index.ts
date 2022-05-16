import { BaseFactory, ModelType } from '@valhalla/serv.core';
import { TenantSchema } from './schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class TenantsModel extends BaseFactory<TenantSchema> {
  constructor(
    @InjectModel(TenantSchema)
    model: ModelType<TenantSchema>,
  ) {
    super(model);
  }
}
