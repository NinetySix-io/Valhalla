import { InputType, PartialType, PickType } from '@nestjs/graphql';

import { Account } from '../gql.types/account';

@InputType()
export class UpdateAccountInput extends PartialType(
  PickType(
    Account,
    ['displayName', 'firstName', 'lastName'] as const,
    InputType,
  ),
) {}
