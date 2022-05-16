import { Injectable } from '@nestjs/common';
import { BaseFactory, ModelType } from '@valhalla/serv.core/src';
import { InjectModel } from 'nestjs-typegoose';
import { UserPasswordSchema } from './schema';
import * as bcrypt from 'bcryptjs';
import { UserSchema } from '../users/schema';
import { Environment } from '@serv.users/environment';

@Injectable()
export class UserPasswordsModel extends BaseFactory<UserPasswordSchema> {
  constructor(
    @InjectModel(UserPasswordSchema) model: ModelType<UserPasswordSchema>,
  ) {
    super(model);
  }

  private get hashRound() {
    return Environment.variables.PASSWORD_HASH_ROUNDS;
  }

  validatePassword(
    rawPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(rawPassword, hashedPassword);
  }

  async createPassword(
    userId: UserSchema['_id'],
    password: string,
  ): Promise<void> {
    const hashed = await bcrypt.hash(password, this.hashRound);
    await this.create({ user: userId, hashed });
  }

  async updatePassword(userId: UserSchema['_id'], password: string) {
    const hashed = await bcrypt.hash(password, this.hashRound);
    const result = await this.updateOne({ user: userId }, { hashed });
    return result.modifiedCount > 0;
  }
}