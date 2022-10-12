import { Phone } from '@app/protobuf';

export class AccountPhoneProto implements Phone {
  value: string;
  isVerified: boolean;
  isPrimary: boolean;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
}
