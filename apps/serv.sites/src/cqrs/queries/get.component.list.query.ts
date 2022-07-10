import {
  GetComponentListRequest,
  GetComponentListResponse,
} from '@app/protobuf';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { ComponentTransformer } from '@app/entities/components/transformer';
import { ComponentsModel } from '@app/entities/components';
import { RpcHandler } from '@valhalla/serv.core';

export class GetComponentListQuery implements IQuery {
  constructor(public readonly request: GetComponentListRequest) {}
}

@QueryHandler(GetComponentListQuery)
@RpcHandler()
export class GetComponentListHandler
  implements IQueryHandler<GetComponentListQuery, GetComponentListResponse>
{
  constructor(private readonly Components: ComponentsModel) {}

  async execute(
    command: GetComponentListQuery,
  ): Promise<GetComponentListResponse> {
    const { ownerIdList } = command.request;
    const result = await this.Components.find({ owners: ownerIdList }).lean();
    const serialized = result.map(
      (item) => new ComponentTransformer(item).proto,
    );

    return {
      result: serialized,
    };
  }
}
