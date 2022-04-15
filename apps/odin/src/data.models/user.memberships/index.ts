import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { BaseFactory, ModelType } from '@odin/data.models/_base/factory';
import { UserMembershipSchema } from './schema';
import mongoose from 'mongoose';

@Injectable()
export class UserMembershipsModel extends BaseFactory<UserMembershipSchema> {
  constructor(
    @InjectModel(UserMembershipSchema)
    model: ModelType<UserMembershipSchema>,
  ) {
    super(model);
  }

  findByUser(user: UserMembershipSchema['user']) {
    return this.find({ user });
  }

  async findDistinctGroupByUser(
    user: UserMembershipSchema['user'],
  ): Promise<mongoose.Types.ObjectId[]> {
    const groupIdList = await this.findByUser(user).distinct('group');
    return groupIdList;
  }
}
