import {
  GetElementHierarchicalListRequest,
  GetElementHierarchicalListResponse,
} from '@app/protobuf';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { ElementsModel } from '@app/entities/elements';
import { RpcHandler } from '@valhalla/serv.core';
import { makeElementTrees } from '@app/lib/make.element.trees';

export class GetElementHierarchicalListQuery implements IQuery {
  constructor(public readonly request: GetElementHierarchicalListRequest) {}
}

@QueryHandler(GetElementHierarchicalListQuery)
@RpcHandler()
export class GetElementHierarchicalListHandler
  implements
    IQueryHandler<
      GetElementHierarchicalListQuery,
      GetElementHierarchicalListResponse
    >
{
  constructor(private readonly Elements: ElementsModel) {}

  async execute(
    command: GetElementHierarchicalListQuery,
  ): Promise<GetElementHierarchicalListResponse> {
    const { owners } = command.request;
    const result = await this.Elements.find({ owners }).lean();
    const hierarchical = makeElementTrees(result);
    return { elements: hierarchical };
  }
}
