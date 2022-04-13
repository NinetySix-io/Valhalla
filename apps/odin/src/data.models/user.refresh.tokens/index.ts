import { Injectable } from '@nestjs/common';
import { Environment } from '@odin/config/environment';
import dayjs from 'dayjs';
import mongoose from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import { BaseFactory, ModelType } from '../_base/factory';
import { UserRefreshTokenSchema } from './schema';

@Injectable()
export class UserRefreshTokensModel extends BaseFactory<UserRefreshTokenSchema> {
  constructor(
    @InjectModel(UserRefreshTokenSchema)
    model: ModelType<UserRefreshTokenSchema>,
  ) {
    super(model);
  }

  private get expiry() {
    return dayjs()
      .add(Environment.variables.REFRESH_EXPIRE_DAYS, 'days')
      .toDate();
  }

  async createToken(user: UserRefreshTokenSchema['user']) {
    const nextToken = new mongoose.Types.ObjectId();
    await this.findOneAndUpdate(
      { user },
      { $set: { expiresAt: this.expiry, token: nextToken } },
      { upsert: true },
    );

    return nextToken;
  }

  async deleteTokenByUser(user: UserRefreshTokenSchema['user']) {
    await this.deleteOne({ user });
  }

  async deleteToken(token: UserRefreshTokenSchema['token']) {
    await this.deleteOne({ token });
  }

  findToken(token: UserRefreshTokenSchema['token']) {
    return this.findOne({ token });
  }
}
