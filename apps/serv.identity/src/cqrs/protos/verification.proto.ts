import { Expose } from 'class-transformer';
import { Verification } from '@app/protobuf';

export class VerificationProto implements Verification {
  @Expose({ name: '_id' })
  id: string;
  owner?: string | undefined;
  expiresAt?: Date | undefined;
}
