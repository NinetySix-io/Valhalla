import {
  Element,
  ElementType,
  GetElementFlatListRequest,
  GetElementFlatListResponse,
} from '@app/protobuf';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { BoxElementsModel } from '@app/entities/elements/boxes';
import { ElementsModel } from '@app/entities/elements';
import { RpcHandler } from '@valhalla/serv.core';
import { TextElementsModel } from '@app/entities/elements/text';

export class GetElementFlatListQuery implements IQuery {
  constructor(public readonly request: GetElementFlatListRequest) {}
}

@QueryHandler(GetElementFlatListQuery)
@RpcHandler()
export class GetElementFlatListHandler
  implements IQueryHandler<GetElementFlatListQuery, GetElementFlatListResponse>
{
  constructor(
    private readonly Elements: ElementsModel,
    private readonly BoxElements: BoxElementsModel,
    private readonly TextElements: TextElementsModel,
  ) {}

  async execute(
    command: GetElementFlatListQuery,
  ): Promise<GetElementFlatListResponse> {
    const { owners } = command.request;
    const result = await this.Elements.find(
      { owners },
      { strict: false },
    ).lean();

    const elements = result.map<Element>((element) => {
      if (element.type === ElementType.Box) {
        const box = this.BoxElements.hydrate(element);
        return {
          element: {
            $case: ElementType.Box,
            Box: {
              id: box.id,
              style: box.style,
              owners: box.owners,
              parent: box.parent,
              htmlType: box.htmlType,
            },
          },
        };
      } else if (element.type === ElementType.Text) {
        const text = this.TextElements.hydrate(element);
        return {
          element: {
            $case: ElementType.Text,
            Text: {
              id: text.id,
              style: text.style,
              owners: text.owners,
              parent: text.parent,
              text: text.text,
            },
          },
        };
      }
    });

    return {
      elements,
    };
  }
}
