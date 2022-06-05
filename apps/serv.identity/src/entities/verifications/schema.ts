import { BaseSchema, ExpiryIndex, SimpleModel } from '@valhalla/serv.core';
import { index, prop } from '@typegoose/typegoose';

import mongoose from 'mongoose';

@SimpleModel('passwords')
@ExpiryIndex({ expiredAt: 1 })
@index({ owner: 1 })
export class VerificationSchema extends BaseSchema {
  @prop()
  owner!: mongoose.Types.ObjectId;

  @prop()
  hashed!: string;

  @prop()
  expiresAt!: Date;
}
