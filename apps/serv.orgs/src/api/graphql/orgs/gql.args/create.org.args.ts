import { ArgsType, Field } from '@nestjs/graphql';

import { CreateOrganizationInput } from '../gql.inputs/create.org.input';

@ArgsType()
export class CreateOrganizationArgs {
  @Field()
  input: CreateOrganizationInput;
}
