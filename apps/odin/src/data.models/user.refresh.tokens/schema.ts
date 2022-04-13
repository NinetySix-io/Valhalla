import { Ref, index, modelOptions, prop } from '@typegoose/typegoose';

import { BaseSchema } from '@odin/data.models/_base/schema';
import { UserSchema } from '@odin/data.models/users/schema';
import mongoose from 'mongoose';

@modelOptions({
  schemaOptions: {
    collection: 'user.refresh.tokens',
  },
})
@index({ user: 1 }, { unique: true })
@index({ expiresAt: 1 }, { expireAfterSeconds: 0 })
export class UserRefreshTokenSchema extends BaseSchema {
  @prop({ ref: () => UserSchema })
  user: Ref<UserSchema>;

  @prop()
  token: mongoose.Types.ObjectId;

  @prop()
  expiresAt: Date;
}
