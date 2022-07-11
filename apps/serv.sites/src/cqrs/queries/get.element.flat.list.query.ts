import {
  GetElementFlatListRequest,
  GetElementFlatListResponse,
} from '@app/protobuf';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { ElementTransformer } from '@app/entities/elements/transformer';
import { ElementsModel } from '@app/entities/elements';
import { RpcHandler } from '@valhalla/serv.core';

export class GetElementFlatListQuery implements IQuery {
  constructor(public readonly request: GetElementFlatListRequest) {}
}

@QueryHandler(GetElementFlatListQuery)
@RpcHandler()
export class GetElementFlatListHandler
  implements IQueryHandler<GetElementFlatListQuery, GetElementFlatListResponse>
{
  constructor(private readonly Elements: ElementsModel) {}

  async execute(
    command: GetElementFlatListQuery,
  ): Promise<GetElementFlatListResponse> {
    const { owners } = command.request;
    const result = await this.Elements.find({ owners }).lean();
    const serialized = result.map(
      (item) => ElementTransformer.fromEntity(item).proto,
    );

    return {
      elements: serialized,
    };
  }
}
