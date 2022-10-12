import { Field, ObjectType } from '@nestjs/graphql';

import { AccountEmail } from './account.email';
import { AccountPhone } from './account.phone';
import { AccountProto } from '@app/cqrs/protos/account.proto';
import { ObjectIDResolver } from 'graphql-scalars';

@ObjectType()
export class Account implements AccountProto {
  @Field(() => ObjectIDResolver)
  id: string;

  @Field()
  displayName: string;

  @Field()
  firstName?: string;

  @Field()
  lastName?: string;

  @Field()
  createdAt?: Date;

  @Field()
  updatedAt?: Date;

  @Field(() => [AccountEmail])
  emails: AccountEmail[];

  @Field(() => [AccountPhone])
  phones: AccountPhone[];
}
