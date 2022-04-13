import { Ref, modelOptions, prop } from '@typegoose/typegoose';

import { BaseSchema } from '@odin/data.models/_base/schema';
import { UserSchema } from '@odin/data.models/users/schema';

@modelOptions({
  schemaOptions: {
    collection: 'user.passwords',
  },
})
export class UserPasswordSchema extends BaseSchema {
  @prop({ ref: () => UserSchema })
  user: Ref<UserSchema>;

  @prop()
  hashed: string;
}
