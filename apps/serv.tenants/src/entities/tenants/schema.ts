import { BaseSchema, SimpleModel } from '@valhalla/serv.core';

import mongoose from 'mongoose';
import { prop } from '@typegoose/typegoose';

export enum TenantPlan {
  FREE = 'free',
}

@SimpleModel('tenants')
export class TenantSchema extends BaseSchema {
  @prop()
  name: string;

  @prop()
  slug: string;

  @prop()
  plan: TenantPlan;

  @prop()
  subscription?: mongoose.Types.ObjectId;

  @prop()
  createdBy: mongoose.Types.ObjectId;
}
