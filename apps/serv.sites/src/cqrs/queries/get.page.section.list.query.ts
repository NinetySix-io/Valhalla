import {
  GetPageSectionListRequest,
  GetPageSectionListResponse,
} from '@app/protobuf';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcHandler, Serializer, toObjectId } from '@valhalla/serv.core';

import { PageSectionProto } from '../transformers/page.section.proto';
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
      .lean()
      .orFail(() => new Error('Page not found!'));

    const serialized = Serializer.from(PageSectionProto).serialize(
      page.sections,
    );

    return { data: serialized };
  }
}
