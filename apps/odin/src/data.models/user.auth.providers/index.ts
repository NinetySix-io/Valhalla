import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { BaseFactory, ModelType } from '../_base/factory';
import { UserAuthProviderSchema } from './schema';

@Injectable()
export class UserAuthProvidersModel extends BaseFactory<UserAuthProviderSchema> {
  constructor(
    @InjectModel(UserAuthProviderSchema)
    private readonly model: ModelType<UserAuthProviderSchema>,
  ) {
    super(model);
  }
}
