import {
  CommandBus,
  CommandHandler,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import {
  CreatePageResponse,
  GetOrCreateFirstPageRequest,
  GetOrCreateFirstPageResponse,
} from '@app/protobuf';
import { RpcHandler, toObjectId } from '@valhalla/serv.core';

import { CreatePageCommand } from './create.page.command';
import { PageTransformer } from '@app/entities/pages/transformer';
import { PagesModel } from '@app/entities/pages';

export class GetOrCreateFirstPageCommand implements ICommand {
  constructor(public readonly request: GetOrCreateFirstPageRequest) {}
}

@CommandHandler(GetOrCreateFirstPageCommand)
@RpcHandler()
export class GetOrCreateFirstPageHandler
  implements
    ICommandHandler<GetOrCreateFirstPageCommand, GetOrCreateFirstPageResponse>
{
  constructor(
    private readonly commandBus: CommandBus,
    private readonly Pages: PagesModel,
  ) {}

  async execute(
    command: GetOrCreateFirstPageCommand,
  ): Promise<GetOrCreateFirstPageResponse> {
    const { fallbackTitle, ownerId, siteId, requestedUserId } = command.request;
    const site = toObjectId(siteId);
    const ownBy = toObjectId(ownerId);
    const page = await this.Pages.findOne({ ownBy, site });
    if (page) {
      return {
        page: new PageTransformer(page).proto,
      };
    }

    const result = await this.commandBus.execute<
      CreatePageCommand,
      CreatePageResponse
    >(
      new CreatePageCommand({
        requestedUserId,
        ownerId,
        siteId,
        title: fallbackTitle,
      }),
    );

    return {
      page: result.page,
    };
  }
}
