import { BaseSchema, SimpleModel } from '@valhalla/serv.core';

import { prop } from '@typegoose/typegoose';

@SimpleModel('refresh-token')
export class RefreshTokenSchema extends BaseSchema {
  @prop()
  user: string;
}
