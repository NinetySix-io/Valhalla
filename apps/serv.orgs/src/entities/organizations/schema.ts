import { BaseSchema, SimpleModel } from '@valhalla/serv.core';

import mongoose from 'mongoose';
import { prop } from '@typegoose/typegoose';

export enum OrgPlan {
  FREE = 'free',
}

@SimpleModel('organizations')
export class OrgSchema extends BaseSchema {
  @prop()
  name: string;

  @prop()
  slug: string;

  @prop()
  plan: OrgPlan;

  @prop()
  subscription?: mongoose.Types.ObjectId;

  @prop()
  createdBy: mongoose.Types.ObjectId;
}
