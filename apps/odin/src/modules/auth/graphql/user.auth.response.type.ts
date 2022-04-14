import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserAuthResponse {
  @Field({ description: 'Refresh token' })
  readonly token: string;
}
