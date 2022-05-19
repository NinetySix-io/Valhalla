import {} from '@valhalla/serv.clients';

import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import {
  CreateTenantRequest,
  CreateTenantResponse,
} from '@app/rpc/protobuf/tenants';
import {
  TenantMemberRole,
  TenantMemberStatus,
} from '@app/entities/tenant.members/schema';

import { RpcHandler } from '@valhalla/serv.core';
import { TenantCreatedEvent } from '../events/tenant.created.event';
import { TenantMemberCreatedEvent } from '../events/tenant.member.created.event';
import { TenantMemberTransformer } from '@app/entities/tenant.members/transformer';
import { TenantMembersModel } from '@app/entities/tenant.members';
import { TenantPlan } from '@app/entities/tenants/schema';
import { TenantTransformer } from '@app/entities/tenants/transformer';
import { TenantsModel } from '@app/entities/tenants';
import mongoose from 'mongoose';
import { slugify } from '@valhalla/utilities';

export class CreateTenantCommand implements ICommand {
  constructor(
    public readonly input: CreateTenantRequest,
    public readonly user: any, //TODO
  ) {}
}

@CommandHandler(CreateTenantCommand)
@RpcHandler()
export class CreateTenantHandler
  implements ICommandHandler<CreateTenantCommand, CreateTenantResponse>
{
  constructor(
    private readonly tenants: TenantsModel,
    private readonly members: TenantMembersModel,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateTenantCommand): Promise<CreateTenantResponse> {
    if (!command.user?._id) {
      throw new Error('User is not defined');
    } else if (command.input.name) {
      throw new Error('Tenant name is not defined');
    }

    const slug = slugify(command.input.name.toLowerCase());
    const isAlreadyExists = await this.tenants.exists({ slug });
    if (isAlreadyExists) {
      throw new Error('Tenant name is taken!');
    }

    const userId = new mongoose.Types.ObjectId(command.user.id);
    const tenant = await this.tenants.create({
      slug,
      name: command.input.name,
      plan: TenantPlan.FREE,
      createdBy: userId,
    });

    const member = await this.members.create({
      user: userId,
      tenant: tenant._id,
      status: TenantMemberStatus.Accepted,
      role: TenantMemberRole.Owner,
    });

    const tenantSerialized = new TenantTransformer(tenant).proto;
    const memberSerialized = new TenantMemberTransformer(member).proto;

    await this.eventBus.publishAll([
      new TenantCreatedEvent(tenantSerialized),
      new TenantMemberCreatedEvent(memberSerialized),
    ]);

    return {
      tenant: tenantSerialized,
    };
  }
}
