import { Field, ID } from '@nestjs/graphql';

export class Membership {
  @Field(() => ID)
  readonly id: string;

  @Field()
  readonly name: string;

  @Field()
  readonly logo?: string;
}