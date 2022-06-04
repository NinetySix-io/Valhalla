import { GetOrgRequest, Organization } from '@app/protobuf';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { OrganizationTransformer } from '@app/entities/organizations/transformer';
import { OrganizationsModel } from '@app/entities/organizations';

export class GetOrgQuery implements IQuery {
  constructor(public readonly request: GetOrgRequest) {}
}

@QueryHandler(GetOrgQuery)
export class GetOrgHandler implements IQueryHandler<GetOrgQuery, Organization> {
  constructor(private readonly organizations: OrganizationsModel) {}

  async execute(command: GetOrgQuery): Promise<Organization> {
    const { orgId } = command.request;
    const organization = await this.organizations
      .findById(orgId)
      .orFail(() => new Error('Organization not found!'));

    return new OrganizationTransformer(organization).proto;
  }
}
