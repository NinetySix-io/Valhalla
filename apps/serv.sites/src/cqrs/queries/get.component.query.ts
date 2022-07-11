import { GetComponentRequest, GetComponentResponse } from '@app/protobuf';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcHandler, toObjectId } from '@valhalla/serv.core';

import { ComponentTransformer } from '@app/entities/components/transformer';
import { ComponentsModel } from '@app/entities/components';

export class GetComponentQuery implements IQuery {
  constructor(public readonly request: GetComponentRequest) {}
}

@QueryHandler(GetComponentQuery)
@RpcHandler()
export class GetComponentHandler
  implements IQueryHandler<GetComponentQuery, GetComponentResponse>
{
  constructor(private readonly Components: ComponentsModel) {}

  async execute(command: GetComponentQuery): Promise<GetComponentResponse> {
    const { componentId, ownerId } = command.request;
    const _id = toObjectId(componentId);
    const ownBy = toObjectId(ownerId);
    const result = await this.Components.findOne({ _id, ownBy }).lean();
    const serialized = new ComponentTransformer(result).proto;
    return { component: serialized };
  }
}
