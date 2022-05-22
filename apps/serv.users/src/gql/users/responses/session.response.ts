import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SessionResponse {
  @Field({ description: 'Session Id' })
  id!: string;

  @Field({ description: 'User ID' })
  userId!: string;

  @Field({ description: 'Created Time' })
  created!: number;

  @Field({ description: 'Expiry Time' })
  expires!: number;
}
