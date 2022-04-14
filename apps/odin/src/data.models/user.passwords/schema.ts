import { Ref, index, prop } from '@typegoose/typegoose';

import { BaseSchema } from '@odin/data.models/_base/schema';
import { UserSchema } from '@odin/data.models/users/schema';
import { expiryIndex } from '../_base/decorators/expiry.index';
import { simpleModel } from '../_base/decorators/simple.model';

@simpleModel('user.passwords')
@index({ user: 1 })
@expiryIndex({ expiresAt: 1 })
export class UserPasswordSchema extends BaseSchema {
  @prop({ ref: () => UserSchema })
  user: Ref<UserSchema>;

  @prop()
  hashed: string;

  @prop()
  expiresAt?: Date;
}
