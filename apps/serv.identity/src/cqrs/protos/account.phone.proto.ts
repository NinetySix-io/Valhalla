import { Expose } from 'class-transformer';
import { Phone } from '@app/protobuf';

export class AccountPhoneProto implements Phone {
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
