import { Ref, modelOptions, prop } from '@typegoose/typegoose';

import { BaseSchema } from '../_base/schema';
import { UserSchema } from '../users/schema';

@modelOptions({
  schemaOptions: {
    collection: 'passwords',
  },
})
export class PasswordSchema extends BaseSchema {
  @prop({ ref: () => UserSchema })
  user: Ref<UserSchema>;

  @prop()
  hashed: string;
}
