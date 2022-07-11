import { GetPageRequest, GetPageResponse } from '@app/protobuf';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { PageTransformer } from '@app/entities/pages/transformer';
import { PagesModel } from '@app/entities/pages';
import { RpcHandler } from '@valhalla/serv.core';

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
    const page = await this.pagesEntity.findById(pageId).lean();
    const serialized = page
      ? PageTransformer.fromEntity(page).proto
      : undefined;

    return {
      page: serialized,
    };
  }
}
