import { GetPageListRequest, GetPageListResponse } from '@app/protobuf';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcHandler, toObjectId } from '@valhalla/serv.core';

import { PageTransformer } from '@app/entities/pages/transformer';
import { PagesModel } from '@app/entities/pages';

export class GetPageListQuery implements IQuery {
  constructor(public readonly request: GetPageListRequest) {}
}

@QueryHandler(GetPageListQuery)
@RpcHandler()
export class GetPageListHandler
  implements IQueryHandler<GetPageListQuery, GetPageListResponse>
{
  constructor(private readonly pagesEntity: PagesModel) {}

  async execute(command: GetPageListQuery): Promise<GetPageListResponse> {
    const site = toObjectId(command.request.siteId);
    const pageList = await this.pagesEntity.find({ site }).lean();
    const serialized = pageList.map((page) => new PageTransformer(page).proto);
    return { data: serialized };
  }
}
