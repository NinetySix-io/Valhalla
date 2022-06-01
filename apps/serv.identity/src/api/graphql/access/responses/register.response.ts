import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AccountRegisterResponse {
  @Field({ description: 'Account ID' })
  accountId!: string;
}
