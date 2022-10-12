import { Field, ObjectType } from '@nestjs/graphql';

import { AccountPhoneProto } from '@app/cqrs/protos/account.phone.proto';
import { PhoneNumberResolver } from 'graphql-scalars';

@ObjectType()
export class AccountPhone implements AccountPhoneProto {
  @Field(() => PhoneNumberResolver)
  value: string;

  @Field()
  isVerified: boolean;

  @Field()
  isPrimary: boolean;

  @Field()
  createdAt?: Date;

  @Field()
  updatedAt?: Date;
}
