import {
  GetComponentElementListRequest,
  GetComponentElementListResponse,
} from '@app/protobuf';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcHandler, toObjectId } from '@valhalla/serv.core';

import { ComponentsModel } from '@app/entities/components';

export class GetComponentElementListQuery implements IQuery {
  constructor(public readonly request: GetComponentElementListRequest) {}
}

@QueryHandler(GetComponentElementListQuery)
@RpcHandler()
export class GetComponentElementListHandler
  implements
    IQueryHandler<
      GetComponentElementListQuery,
      GetComponentElementListResponse
    >
{
  constructor(private readonly Components: ComponentsModel) {}

  async execute(
    command: GetComponentElementListQuery,
  ): Promise<GetComponentElementListResponse> {
    const { ownerIdList, componentId } = command.request;
    const _id = toObjectId(componentId);
    const result = await this.Components.findOne({
      _id,
      owners: ownerIdList,
    })
      .select({ elements: 1 })
      .lean();

    return {
      elements: result.elements,
    };
  }
}
