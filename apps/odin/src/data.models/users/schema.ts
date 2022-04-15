import { modelOptions, prop } from '@typegoose/typegoose';

import { BaseSchema } from '../_base/schema';
import { caseInsensitiveIndex } from '../_base/decorators/case.insensitive.index';
import { simpleModel } from '../_base/decorators/simple.model';

@simpleModel('users')
@caseInsensitiveIndex({ email: 1 }, { unique: true })
export class UserSchema extends BaseSchema {
  @prop({ lowercase: true })
  email: string;

  @prop()
  displayName: string;

  @prop()
  avatar?: string;
}
