import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { BaseFactory, ModelType } from '../_base/factory';
import { UserSchema } from './schema';

@Injectable()
export class UsersModel extends BaseFactory<UserSchema> {
  constructor(
    @InjectModel(UserSchema)
    private readonly model: ModelType<UserSchema>,
  ) {
    super(model);
  }
}
