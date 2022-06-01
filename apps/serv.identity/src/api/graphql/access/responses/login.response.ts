import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AccountLoginResponse {
  @Field({ description: 'Logged in Account ID' })
  accountId!: string;

  @Field({ description: 'Access token' })
  accessToken!: string;
}
