import { CreateTenantPlanHandler } from '@serv.tenant.billings/rpc/tenant.billing/commands/create.tenant.plan.command';
import { CreateTenantSubscriptionHandler } from '@serv.tenant.billings/rpc/tenant.billing/commands/create.tenant.subscription.command';
import { DeleteTenantPlanHandler } from '@serv.tenant.billings/rpc/tenant.billing/commands/delete.tenant.plan.command';
import { DeleteTenantSubscriptionHandler } from '@serv.tenant.billings/rpc/tenant.billing/commands/delete.tenant.subscription.command';
import { GetTenantInvoiceHandler } from '@serv.tenant.billings/rpc/tenant.billing/queries/get.tenant.invoice.query';
import { GetTenantPlanHandler } from '@serv.tenant.billings/rpc/tenant.billing/queries/get.tenant.plan.query';
import { GetTenantSubscriptionHandler } from '@serv.tenant.billings/rpc/tenant.billing/queries/get.tenant.subscription.query';
import { Module } from '@nestjs/common';
import { RpcTenantBillingsController } from './tenant.billings.controller';
import { TenantInvoiceSchema } from '@serv.tenant.billings/entities/tenant.invoices/schema';
import { TenantInvoicesModel } from '@serv.tenant.billings/entities/tenant.invoices';
import { TenantPlanSchema } from '@serv.tenant.billings/entities/tenant.plans/schema';
import { TenantPlansModel } from '@serv.tenant.billings/entities/tenant.plans';
import { TenantSubscriptionSchema } from '@serv.tenant.billings/entities/tenant.subscriptions/schema';
import { TenantSubscriptionsModel } from '@serv.tenant.billings/entities/tenant.subscriptions';
import { TypegooseModule } from 'nestjs-typegoose';
import { UpdateTenantPlanHandler } from '@serv.tenant.billings/rpc/tenant.billing/commands/update.tenant.plan.command';
import { UpdateTenantSubscriptionHandler } from '@serv.tenant.billings/rpc/tenant.billing/commands/update.tenant.subscription.command';

@Module({
  controllers: [RpcTenantBillingsController],
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
export class RpcTenantBillingsModule {}
