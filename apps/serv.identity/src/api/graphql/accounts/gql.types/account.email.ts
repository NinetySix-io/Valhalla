import { Field, ObjectType } from '@nestjs/graphql';

import { AccountEmailProto } from '@app/cqrs/protos/account.email.proto';
import { EmailAddressResolver } from 'graphql-scalars';

@ObjectType()
export class AccountEmail implements AccountEmailProto {
  @Field(() => EmailAddressResolver)
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
