import { GetPageRequest, GetPageResponse } from '@app/protobuf';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcHandler, Serializer } from '@valhalla/serv.core';

import { PageProto } from '../transformers/page.proto';
import { PagesModel } from '@app/entities/pages';

export class GetPageQuery implements IQuery {
  constructor(public readonly request: GetPageRequest) {}
}

@QueryHandler(GetPageQuery)
@RpcHandler()
export class GetPageHandler
  implements IQueryHandler<GetPageQuery, GetPageResponse>
{
  constructor(private readonly pagesEntity: PagesModel) {}
  async execute(command: GetPageQuery): Promise<GetPageResponse> {
    const pageId = command.request.pageId;
    const page = await this.pagesEntity.findById(pageId).lean().orFail();
    const serialized = Serializer.from(PageProto).serialize(page);
    return { data: serialized };
  }
}
