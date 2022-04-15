import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Membership {
  @Field(() => ID)
  readonly id: string;

  @Field()
  readonly name: string;

  @Field()
  readonly logo?: string;
}
