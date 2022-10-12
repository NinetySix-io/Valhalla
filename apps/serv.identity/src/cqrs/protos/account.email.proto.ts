import { Email } from '@app/protobuf';
import { Expose } from 'class-transformer';

export class AccountEmailProto implements Email {
  @Expose()
  value: string;

  @Expose()
  isVerified: boolean;

  @Expose()
  isPrimary: boolean;

  @Expose()
  createdAt?: Date | undefined;

  @Expose()
  updatedAt?: Date | undefined;
}
