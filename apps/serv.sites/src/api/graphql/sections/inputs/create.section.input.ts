import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateSectionInput {
  @Field({ description: 'Position', nullable: true })
  index?: number;
}
