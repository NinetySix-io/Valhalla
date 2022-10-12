import { Email } from '@app/protobuf';

export class AccountEmailProto implements Email {
  value: string;
  isVerified: boolean;
  isPrimary: boolean;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
}
