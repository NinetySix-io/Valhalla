import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginResponse {
  @Field({ description: 'Logged in Account ID' })
  accountId!: string;

  @Field({ description: 'Access token' })
  accessToken!: string;
}
