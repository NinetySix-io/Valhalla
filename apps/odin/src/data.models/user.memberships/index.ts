import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { BaseFactory, ModelType } from '@odin/data.models/_base/factory';
import { UserMembershipSchema } from './schema';

@Injectable()
export class UserMembershipsModel extends BaseFactory<UserMembershipSchema> {
  constructor(
    @InjectModel(UserMembershipSchema)
    model: ModelType<UserMembershipSchema>,
  ) {
    super(model);
  }
}
