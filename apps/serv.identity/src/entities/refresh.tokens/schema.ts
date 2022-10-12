import {
  BaseSchema,
  ExpiryIndex,
  SimpleModel,
  mongoose,
  typegoose,
} from '@valhalla/serv.core';

@SimpleModel('refresh-tokens')
@ExpiryIndex({ expiresAt: 1 })
@typegoose.index({ account: 1 })
export class RefreshTokenSchema extends BaseSchema {
  @typegoose.prop()
  account!: mongoose.Types.ObjectId;

  @typegoose.prop()
  expiresAt!: Date;
}
