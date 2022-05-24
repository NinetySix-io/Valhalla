import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserLoginResponse {
  @Field({ description: 'Logged in User ID' })
  userId!: string;
}
