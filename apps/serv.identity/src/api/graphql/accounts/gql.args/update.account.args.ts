import { ArgsType, PartialType, PickType } from '@nestjs/graphql';

import { Account } from '../gql.types/account';

@ArgsType()
export class UpdateAccountArgs extends PartialType(
  PickType(Account, ['displayName', 'firstName', 'lastName'], ArgsType),
) {}
