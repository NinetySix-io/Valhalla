import {
  GetPageElementListByGroupRequest,
  GetPageElementListByGroupResponse,
} from '@app/protobuf';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcHandler, Serializer, toObjectId } from '@valhalla/serv.core';

import { PageElementProto } from '../protos/page.element.proto';
import { PageElementsModel } from '@app/entities/page.elements';

export class GetPageElementListByGroupQuery implements IQuery {
  constructor(public readonly request: GetPageElementListByGroupRequest) {}
}

@QueryHandler(GetPageElementListByGroupQuery)
@RpcHandler()
export class GetPageElementListByGroupHandler
  implements
    IQueryHandler<
      GetPageElementListByGroupQuery,
      GetPageElementListByGroupResponse
    >
{
  constructor(private readonly pageElements: PageElementsModel) {}

  async execute(
    command: GetPageElementListByGroupQuery,
  ): Promise<GetPageElementListByGroupResponse> {
    const group = toObjectId(command.request.groupId);
    const elements = await this.pageElements.find({ group }).lean();
    const serialized = Serializer.from(PageElementProto).serialize(elements);
    return { data: serialized };
  }
}
