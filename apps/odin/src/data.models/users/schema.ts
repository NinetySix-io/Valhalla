import { index, modelOptions, prop } from '@typegoose/typegoose';

import { BaseSchema } from '../_base/schema';

@modelOptions({
  schemaOptions: {
    collection: 'users',
  },
})
@index({ email: 1 }, { collation: { locale: 'en', strength: 2 } })
@index({ displayName: 1 }, { collation: { locale: 'en', strength: 2 } })
export class UserSchema extends BaseSchema {
  @prop({ lowercase: true })
  email: string;

  @prop()
  displayName: string;

  @prop()
  avatar?: string;
}
