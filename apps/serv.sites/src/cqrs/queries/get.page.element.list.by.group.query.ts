import {
  GetPageElementListByGroupRequest,
  GetPageElementListByGroupResponse,
} from '@app/protobuf';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcHandler, toObjectId } from '@valhalla/serv.core';

import { PageElementTransformer } from '@app/entities/page.elements/transformer';
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
    const serialized = elements.map(
      (element) => new PageElementTransformer(element).proto,
    );

    return {
      data: serialized,
    };
  }
}
