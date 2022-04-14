import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { BaseFactory, ModelType } from '@odin/data.models/_base/factory';
import { UserTeamSchema } from './schema';

@Injectable()
export class UserTeamsModel extends BaseFactory<UserTeamSchema> {
  constructor(
    @InjectModel(UserTeamSchema)
    model: ModelType<UserTeamSchema>,
  ) {
    super(model);
  }
}
