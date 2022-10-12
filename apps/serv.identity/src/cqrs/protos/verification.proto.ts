import { Alias, AsString, stringify } from '@valhalla/serv.core';

import { Expose } from 'class-transformer';
import { Verification } from '@app/protobuf';

export class VerificationProto implements Verification {
  @Expose()
  @Alias('_id', { transform: stringify })
  id: string;

  @Expose()
  @AsString()
  owner?: string | undefined;

  @Expose()
  expiresAt?: Date | undefined;
}
