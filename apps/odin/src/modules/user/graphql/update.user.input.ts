import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsUrl } from 'class-validator';

import { IsOptional } from '@odin/lib/class.validators/is.optional';

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  @IsEmail()
  @IsOptional()
  email?: string;

  @Field()
  @IsOptional()
  displayName?: string;

  @Field()
  @IsUrl()
  @IsOptional()
  avatar?: string;
}
