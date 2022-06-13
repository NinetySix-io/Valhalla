import {
  GetAccountActiveOrgRequest,
  GetAccountActiveOrgResponse,
} from '@app/protobuf';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { AccountSettingsModel } from '@app/entities/account.settings';
import { OrganizationTransformer } from '@app/entities/organizations/transformer';
import { OrganizationsModel } from '@app/entities/organizations';
import { toObjectId } from '@valhalla/serv.core';

export class GetAccountActiveOrgQuery implements IQuery {
  constructor(public readonly request: GetAccountActiveOrgRequest) {}
}

@QueryHandler(GetAccountActiveOrgQuery)
export class GetAccountActiveOrgHandler
  implements
    IQueryHandler<GetAccountActiveOrgQuery, GetAccountActiveOrgResponse>
{
  constructor(
    private readonly accountSettings: AccountSettingsModel,
    private readonly organizations: OrganizationsModel,
  ) {}

  async execute(
    command: GetAccountActiveOrgQuery,
  ): Promise<GetAccountActiveOrgResponse> {
    const accountId = toObjectId(command.request.accountId);
    const setting = await this.accountSettings.findOne({ account: accountId });
    const organization = setting?.activeOrg
      ? await this.organizations.findById(setting.activeOrg)
      : undefined;

    return {
      organization: organization
        ? new OrganizationTransformer(organization).proto
        : undefined,
    };
  }
}
