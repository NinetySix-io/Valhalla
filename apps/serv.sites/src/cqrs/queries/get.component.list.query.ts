import {
  GetComponentListRequest,
  GetComponentListResponse,
} from '@app/protobuf';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcHandler, toObjectId } from '@valhalla/serv.core';

import { ComponentTransformer } from '@app/entities/components/transformer';
import { ComponentsModel } from '@app/entities/components';

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
    const { ownerId } = command.request;
    const ownBy = toObjectId(ownerId);
    const result = await this.Components.find({ ownBy }).lean();
    const serialized = result.map(
      (item) => new ComponentTransformer(item).proto,
    );

    return {
      result: serialized,
    };
  }
}
