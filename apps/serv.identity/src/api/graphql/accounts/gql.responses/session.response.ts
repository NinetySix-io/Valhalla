import { ObjectType, PickType } from '@nestjs/graphql';

import { Account } from '../gql.types/account';

@ObjectType()
export class SessionResponse extends PickType(
  Account,
  ['id', 'displayName'],
  ObjectType,
) {}
