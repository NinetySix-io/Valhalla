import { BaseSchema, SimpleModel } from '@valhalla/serv.core';

import mongoose from 'mongoose';
import { prop } from '@typegoose/typegoose';

@SimpleModel('tenant-invoices')
export class TenantInvoiceSchema extends BaseSchema {
  @prop()
  tenant: mongoose.Types.ObjectId;
}
