import { CreateTenantPlanHandler } from '@app/cqrs/commands/create.tenant.plan.command';
import { CreateTenantSubscriptionHandler } from '@app/cqrs/commands/create.tenant.subscription.command';
import { DeleteTenantPlanHandler } from '@app/cqrs/commands/delete.tenant.plan.command';
import { DeleteTenantSubscriptionHandler } from '@app/cqrs/commands/delete.tenant.subscription.command';
import { GetTenantInvoiceHandler } from '@app/cqrs/queries/get.tenant.invoice.query';
import { GetTenantPlanHandler } from '@app/cqrs/queries/get.tenant.plan.query';
import { GetTenantSubscriptionHandler } from '@app/cqrs/queries/get.tenant.subscription.query';
import { Module } from '@nestjs/common';
import { TenantInvoiceSchema } from '@app/entities/tenant.invoices/schema';
import { TenantInvoicesModel } from '@app/entities/tenant.invoices';
import { TenantPlanSchema } from '@app/entities/tenant.plans/schema';
import { TenantPlansModel } from '@app/entities/tenant.plans';
import { TenantSubscriptionSchema } from '@app/entities/tenant.subscriptions/schema';
import { TenantSubscriptionsModel } from '@app/entities/tenant.subscriptions';
import { TypegooseModule } from 'nestjs-typegoose';
import { UpdateTenantPlanHandler } from '@app/cqrs/commands/update.tenant.plan.command';
import { UpdateTenantSubscriptionHandler } from '@app/cqrs/commands/update.tenant.subscription.command';
import { gRpcController } from './grpc.controller';

@Module({
  controllers: [gRpcController],
  imports: [
    TypegooseModule.forFeature([
      TenantPlanSchema,
      TenantInvoiceSchema,
      TenantSubscriptionSchema,
    ]),
  ],
  providers: [
    TenantPlansModel,
    TenantInvoicesModel,
    TenantSubscriptionsModel,
    CreateTenantPlanHandler,
    CreateTenantSubscriptionHandler,
    DeleteTenantPlanHandler,
    DeleteTenantSubscriptionHandler,
    UpdateTenantPlanHandler,
    UpdateTenantSubscriptionHandler,
    GetTenantInvoiceHandler,
    GetTenantSubscriptionHandler,
    GetTenantPlanHandler,
  ],
})
export class gRpcModule {}
