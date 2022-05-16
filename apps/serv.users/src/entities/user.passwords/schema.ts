import { BaseSchema, ExpiryIndex, SimpleModel } from '@valhalla/serv.core';

import mongoose from 'mongoose';
import { prop } from '@typegoose/typegoose';

@SimpleModel('user-passwords')
@ExpiryIndex({ expiredAt: 1 })
export class UserPasswordSchema extends BaseSchema {
  @prop()
  user: mongoose.Types.ObjectId;

  @prop()
  hashed: string;

  @prop()
  expiredAt?: Date;
}
