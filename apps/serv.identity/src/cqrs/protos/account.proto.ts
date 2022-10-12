import { Alias, stringify } from '@valhalla/serv.core';
import { Expose, Type } from 'class-transformer';

import { Account } from '@app/protobuf';
import { AccountEmailProto } from './account.email.proto';
import { AccountPhoneProto } from './account.phone.proto';

export class AccountProto implements Account {
  @Expose()
  @Alias('_id', { transform: stringify })
  id: string;

  @Expose()
  displayName: string;

  @Expose()
  firstName?: string | undefined;

  @Expose()
  lastName?: string | undefined;

  @Expose()
  createdAt?: Date | undefined;

  @Expose()
  updatedAt?: Date | undefined;

  @Expose()
  @Type(() => AccountEmailProto)
  emails: AccountEmailProto[];

  @Expose()
  @Type(() => AccountPhoneProto)
  phones: AccountPhoneProto[];
}
