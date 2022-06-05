import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RegisterResponse {
  @Field({ description: 'Account ID' })
  accountId!: string;
}
