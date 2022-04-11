import { Field, ObjectType } from '@nestjs/graphql';

export function PaginatedResponse<TItem>(TItemClass: any): any {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponseClass {
    @Field(() => [TItemClass])
    result: TItem[];
  }

  return PaginatedResponseClass;
}
