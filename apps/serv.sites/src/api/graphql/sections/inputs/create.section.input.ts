import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateSectionInput {
  @Field({ description: 'Head node', nullable: true })
  head?: string;
}
