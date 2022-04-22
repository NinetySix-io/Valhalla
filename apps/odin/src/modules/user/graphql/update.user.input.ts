import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsOptional, MaxLength } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field()
  @IsEmail()
  @IsOptional()
  email: string;

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(20)
  displayName?: string;

  @Field({ nullable: true })
  @IsOptional()
  avatar?: string;
}
