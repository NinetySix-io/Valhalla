import { GetPageSectionRequest, GetPageSectionResponse } from '@app/protobuf';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcHandler, Serializer, toObjectId } from '@valhalla/serv.core';

import { PageSectionProto } from '../transformers/page.section.proto';
import { PagesModel } from '@app/entities/pages';

export class GetPageSectionQuery implements IQuery {
  constructor(public readonly request: GetPageSectionRequest) {}
}

@QueryHandler(GetPageSectionQuery)
@RpcHandler()
export class GetPageSectionHandler
  implements IQueryHandler<GetPageSectionQuery, GetPageSectionResponse>
{
  constructor(private readonly pagesEntity: PagesModel) {}

  async execute(command: GetPageSectionQuery): Promise<GetPageSectionResponse> {
    const sectionId = toObjectId(command.request.sectionId);
    const page = await this.pagesEntity
      .findOne()
      .where('section._id', sectionId)
      .select({ sections: { $elemMatch: { _id: sectionId } } })
      .orFail(() => new Error(`${sectionId} not found!`))
      .lean();

    const [section] = page.sections;
    const serialized = Serializer.from(PageSectionProto).serialize(section);
    return { data: serialized };
  }
}
