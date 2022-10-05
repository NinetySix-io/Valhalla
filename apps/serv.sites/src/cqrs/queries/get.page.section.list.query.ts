import {
  GetPageSectionListRequest,
  GetPageSectionListResponse,
} from '@app/protobuf';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcHandler, toObjectId } from '@valhalla/serv.core';

import { PageSectionTransformer } from '@app/entities/pages/transformers';
import { PagesModel } from '@app/entities/pages';

export class GetPageSectionListQuery implements IQuery {
  constructor(public readonly request: GetPageSectionListRequest) {}
}

@QueryHandler(GetPageSectionListQuery)
@RpcHandler()
export class GetPageSectionListHandler
  implements IQueryHandler<GetPageSectionListQuery, GetPageSectionListResponse>
{
  constructor(private readonly pagesEntity: PagesModel) {}

  async execute(
    command: GetPageSectionListQuery,
  ): Promise<GetPageSectionListResponse> {
    const pageId = toObjectId(command.request.pageId);
    const page = await this.pagesEntity
      .findById(pageId)
      .select({ sections: 1 })
      .orFail(() => new Error('Page not found!'));

    const serialized = page.sections.map(
      (section) => new PageSectionTransformer(section).proto,
    );

    return { data: serialized };
  }
}
