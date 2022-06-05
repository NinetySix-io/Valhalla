import { AccountSchema } from '@app/entities/accounts/schema';
import { InputType } from '@nestjs/graphql';
import { PartialType } from '@nestjs/graphql';
import { PickType } from '@nestjs/graphql';

@InputType()
export class UpdateAccountInput extends PartialType(
  PickType(AccountSchema, ['displayName', 'firstName', 'lastName'], InputType),
) {}
