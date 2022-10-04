import {
  GetPageSectionListRequest,
  GetPageSectionListResponse,
} from '@app/protobuf';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcHandler, toObjectId } from '@valhalla/serv.core';

import { SectionTransformer } from '@app/entities/sections/transformer';
import { SectionsModel } from '@app/entities/sections';

export class GetPageSectionListQuery implements IQuery {
  constructor(public readonly request: GetPageSectionListRequest) {}
}

@QueryHandler(GetPageSectionListQuery)
@RpcHandler()
export class GetPageSectionListHandler
  implements IQueryHandler<GetPageSectionListQuery, GetPageSectionListResponse>
{
  constructor(private readonly sectionsEntity: SectionsModel) {}

  async execute(
    command: GetPageSectionListQuery,
  ): Promise<GetPageSectionListResponse> {
    const { pageId } = command.request;
    const page = toObjectId(pageId);
    const sections = await this.sectionsEntity.find({ page }).lean();
    const serialized = sections.map(
      (section) => new SectionTransformer(section).proto,
    );

    return { data: serialized };
  }
}
