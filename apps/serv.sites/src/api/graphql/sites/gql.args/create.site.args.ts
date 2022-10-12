import { ArgsType, Field } from '@nestjs/graphql';

import { CreateSiteInput } from '../gql.inputs/create.site.input';

@ArgsType()
export class CreateSiteArgs {
  @Field()
  input: CreateSiteInput;
}
