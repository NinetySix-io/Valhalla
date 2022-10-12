import { Expose, Type } from 'class-transformer';

import { Account } from '@app/protobuf';
import { AccountEmailProto } from './account.email.proto';
import { AccountPhoneProto } from './account.phone.proto';

export class AccountProto implements Account {
  @Expose({ name: '_id' })
  id: string;

  displayName: string;
  firstName?: string | undefined;
  lastName?: string | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;

  @Type(() => AccountEmailProto)
  emails: AccountEmailProto[];

  @Type(() => AccountPhoneProto)
  phones: AccountPhoneProto[];
}
