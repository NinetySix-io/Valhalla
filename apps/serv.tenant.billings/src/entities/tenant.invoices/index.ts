import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { BaseFactory, ModelType } from '@valhalla/serv.core';
import { TenantInvoiceSchema } from './schema';

@Injectable()
export class TenantInvoicesModel extends BaseFactory<TenantInvoiceSchema> {
  constructor(
    @InjectModel(TenantInvoiceSchema)
    model: ModelType<TenantInvoiceSchema>,
  ) {
    super(model);
  }
}
