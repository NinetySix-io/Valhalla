import { ObjectType, PickType } from '@nestjs/graphql';

import { AccountSchema } from '@app/entities/accounts/schema';

@ObjectType()
export class SessionResponse extends PickType(
  AccountSchema,
  ['id', 'displayName'],
  ObjectType,
) {}
