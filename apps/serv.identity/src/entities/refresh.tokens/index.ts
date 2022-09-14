import { Injectable } from '@nestjs/common';
import { InjectModel } from 'kindagoose';
import { BaseFactory, ModelType } from '@valhalla/serv.core';
import { RefreshTokenSchema } from './schema';

@Injectable()
export class RefreshTokensModel extends BaseFactory<RefreshTokenSchema> {
  constructor(
    @InjectModel(RefreshTokenSchema)
    model: ModelType<RefreshTokenSchema>,
  ) {
    super(model);
  }
}
