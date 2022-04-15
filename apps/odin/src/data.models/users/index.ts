import { Injectable } from '@nestjs/common';
import type { PartialBy } from '@valhalla/utilities';
import { InjectModel } from 'nestjs-typegoose';
import { BaseFactory, ModelType } from '../_base/factory';
import { UserSchema } from './schema';

@Injectable()
export class UsersModel extends BaseFactory<UserSchema> {
  constructor(
    @InjectModel(UserSchema)
    model: ModelType<UserSchema>,
  ) {
    super(model);
  }

  async findOrCreate(
    user: PartialBy<
      Pick<UserSchema, 'email' | 'avatar' | 'displayName'>,
      'displayName' | 'avatar'
    >,
  ) {
    const existing = await this.findOne({ email: user.email });
    return (
      existing ??
      this.create({
        email: user.email,
        displayName: user.displayName || user.email,
        avatar: user.avatar,
      })
    );
  }
}
