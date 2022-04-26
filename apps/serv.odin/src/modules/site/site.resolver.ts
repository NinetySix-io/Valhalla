import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { OrganizationSchema } from '@serv.odin/data.models/organizations/schema';

import { SitesModel } from '@serv.odin/data.models/sites';
import { UserSchema } from '@serv.odin/data.models/users/schema';
import { CurrentOrganization } from '@serv.odin/decorators/current.organization.decorator';
import { CurrentUser } from '@serv.odin/decorators/current.user.decorator';
import { GqlGuard } from '@serv.odin/guards/gql.passport.guard.decorator';
import { OrganizationGuard } from '@serv.odin/guards/organization.guard';
import { CreateSiteInput } from './graphql/create.site.input';

@Resolver()
export class SiteResolver {
  constructor(private readonly sites: SitesModel) {}

  @Mutation(() => Boolean, { description: 'Create site' })
  @GqlGuard(OrganizationGuard)
  async createSite(
    @CurrentUser() userId: UserSchema['_id'],
    @CurrentOrganization() organizationId: OrganizationSchema['_id'],
    @Args('input') input: CreateSiteInput,
  ) {
    await this.sites.create({
      owner: organizationId,
      isActive: true,
      tags: input.tags,
      name: input.name,
      createdBy: userId,
      updatedBy: userId,
    });

    return true;
  }
}
