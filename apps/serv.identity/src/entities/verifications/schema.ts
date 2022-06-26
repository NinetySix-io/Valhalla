import {
  BaseSchema,
  ExpiryIndex,
  SimpleModel,
  mongoose,
  typegoose,
} from '@valhalla/serv.core';

import { VerificationChannel } from '@app/protobuf';
import { registerEnumType } from '@nestjs/graphql';

registerEnumType(VerificationChannel, {
  name: 'VerificationChannel',
});

@SimpleModel('verifications')
@ExpiryIndex({ expiredAt: 1 })
@typegoose.index({ owner: 1 })
export class VerificationSchema extends BaseSchema {
  @typegoose.prop()
  owner?: mongoose.Types.ObjectId;

  @typegoose.prop()
  hashed!: string;

  @typegoose.prop()
  expiresAt!: Date;
}
