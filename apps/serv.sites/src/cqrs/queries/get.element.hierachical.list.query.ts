import {
  GetElementHierarchicalListRequest,
  GetElementHierarchicalListResponse,
} from '@app/protobuf';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcHandler, toObjectId } from '@valhalla/serv.core';

import { ElementsModel } from '@app/entities/elements';
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
    const { ownerId } = command.request;
    const ownBy = toObjectId(ownerId);
    const result = await this.Elements.find({ ownBy }).lean();
    const hierarchical = makeElementTrees(result);
    return { elements: hierarchical };
  }
}
