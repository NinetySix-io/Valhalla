import { BaseSchema, ExpiryIndex, SimpleModel } from '@valhalla/serv.core';
import { index, prop } from '@typegoose/typegoose';

@SimpleModel('refresh-tokens')
@index({ user: 1 })
@ExpiryIndex({ expiresAt: 1 })
export class RefreshTokenSchema extends BaseSchema {
  @prop()
  account!: string;

  @prop()
  expiresAt!: Date;
}
