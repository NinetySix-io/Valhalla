import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { BaseFactory, ModelType } from '../_base/factory';
import { UserPasswordSchema } from './schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserPasswordsModel extends BaseFactory<UserPasswordSchema> {
  constructor(
    @InjectModel(UserPasswordSchema)
    model: ModelType<UserPasswordSchema>,
  ) {
    super(model);
  }

  findByUser(user: UserPasswordSchema['user']) {
    return this.findOne({ user });
  }

  async validatePassword(rawPassword: string, hashedPassword: string) {
    return await bcrypt.compare(rawPassword, hashedPassword);
  }

  async createPassword(user: UserPasswordSchema['user'], password: string) {
    const hashed = await bcrypt.hash(password, 10);
    return this.create({ user, hashed });
  }
}
