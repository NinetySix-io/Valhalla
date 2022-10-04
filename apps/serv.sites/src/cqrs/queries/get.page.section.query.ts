import { GetPageSectionRequest, GetPageSectionResponse } from '@app/protobuf';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcHandler, toObjectId } from '@valhalla/serv.core';

import { SectionTransformer } from '@app/entities/sections/transformer';
import { SectionsModel } from '@app/entities/sections';

export class GetPageSectionQuery implements IQuery {
  constructor(public readonly request: GetPageSectionRequest) {}
}

@QueryHandler(GetPageSectionQuery)
@RpcHandler()
export class GetPageSectionHandler
  implements IQueryHandler<GetPageSectionQuery, GetPageSectionResponse>
{
  constructor(private readonly sectionsEntity: SectionsModel) {}

  async execute(command: GetPageSectionQuery): Promise<GetPageSectionResponse> {
    const { sectionId } = command.request;
    const _id = toObjectId(sectionId);
    const section = await this.sectionsEntity.findById(_id).lean().orFail();
    const serialized = new SectionTransformer(section).proto;
    return { data: serialized };
  }
}
