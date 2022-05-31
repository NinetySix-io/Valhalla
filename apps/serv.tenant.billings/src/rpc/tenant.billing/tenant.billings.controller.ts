import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  CreateTenantPlanRequest,
  CreateTenantPlanResponse,
  CreateTenantSubscriptionRequest,
  CreateTenantSubscriptionResponse,
  DeleteTenantPlanRequest,
  DeleteTenantPlanResponse,
  DeleteTenantSubscriptionRequest,
  DeleteTenantSubscriptionResponse,
  GetTenantInvoiceRequest,
  GetTenantInvoiceResponse,
  GetTenantPlanRequest,
  GetTenantPlanResponse,
  GetTenantSubscriptionRequest,
  GetTenantSubscriptionResponse,
  TENANT_BILLINGS_SERVICE_NAME,
  TenantBillingsServiceController,
  UpdateTenantPlanRequest,
  UpdateTenantPlanResponse,
  UpdateTenantSubscriptionRequest,
  UpdateTenantSubscriptionResponse,
} from '@app/rpc/protobuf';

import { Controller } from '@nestjs/common';
import { CreateTenantPlanCommand } from '@app/rpc/tenant.billing/commands/create.tenant.plan.command';
import { CreateTenantSubscriptionCommand } from '@app/rpc/tenant.billing/commands/create.tenant.subscription.command';
import { DeleteTenantPlanCommand } from '@app/rpc/tenant.billing/commands/delete.tenant.plan.command';
import { DeleteTenantSubscriptionCommand } from '@app/rpc/tenant.billing/commands/delete.tenant.subscription.command';
import { GetTenantInvoiceQuery } from '@app/rpc/tenant.billing/queries/get.tenant.invoice.query';
import { GetTenantPlanQuery } from '@app/rpc/tenant.billing/queries/get.tenant.plan.query';
import { GetTenantSubscriptionQuery } from '@app/rpc/tenant.billing/queries/get.tenant.subscription.query';
import { GrpcClass } from '@valhalla/serv.core';
import { Observable } from 'rxjs';
import { UpdateTenantPlanCommand } from '@app/rpc/tenant.billing/commands/update.tenant.plan.command';
import { UpdateTenantSubscriptionCommand } from '@app/rpc/tenant.billing/commands/update.tenant.subscription.command';

@Controller()
@GrpcClass(TENANT_BILLINGS_SERVICE_NAME)
export class RpcTenantBillingsController
  implements TenantBillingsServiceController
{
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  deleteTenantPlan(
    request: DeleteTenantPlanRequest,
  ):
    | DeleteTenantPlanResponse
    | Promise<DeleteTenantPlanResponse>
    | Observable<DeleteTenantPlanResponse> {
    return this.commandBus.execute(new DeleteTenantPlanCommand(request));
  }

  getTenantPlan(
    request: GetTenantPlanRequest,
  ):
    | GetTenantPlanResponse
    | Promise<GetTenantPlanResponse>
    | Observable<GetTenantPlanResponse> {
    return this.queryBus.execute(new GetTenantPlanQuery(request));
  }

  createTenantSubscription(
    request: CreateTenantSubscriptionRequest,
  ):
    | CreateTenantSubscriptionResponse
    | Promise<CreateTenantSubscriptionResponse>
    | Observable<CreateTenantSubscriptionResponse> {
    return this.commandBus.execute(
      new CreateTenantSubscriptionCommand(request),
    );
  }

  deleteTenantSubscription(
    request: DeleteTenantSubscriptionRequest,
  ):
    | DeleteTenantSubscriptionResponse
    | Promise<DeleteTenantSubscriptionResponse>
    | Observable<DeleteTenantSubscriptionResponse> {
    return this.commandBus.execute(
      new DeleteTenantSubscriptionCommand(request),
    );
  }

  updateTenantSubscription(
    request: UpdateTenantSubscriptionRequest,
  ):
    | UpdateTenantSubscriptionResponse
    | Promise<UpdateTenantSubscriptionResponse>
    | Observable<UpdateTenantSubscriptionResponse> {
    return this.commandBus.execute(
      new UpdateTenantSubscriptionCommand(request),
    );
  }

  getTenantSubscription(
    request: GetTenantSubscriptionRequest,
  ):
    | GetTenantSubscriptionResponse
    | Promise<GetTenantSubscriptionResponse>
    | Observable<GetTenantSubscriptionResponse> {
    return this.queryBus.execute(new GetTenantSubscriptionQuery(request));
  }

  getTenantInvoice(
    request: GetTenantInvoiceRequest,
  ):
    | GetTenantInvoiceResponse
    | Promise<GetTenantInvoiceResponse>
    | Observable<GetTenantInvoiceResponse> {
    return this.queryBus.execute(new GetTenantInvoiceQuery(request));
  }

  createTenantPlan(
    request: CreateTenantPlanRequest,
  ):
    | CreateTenantPlanResponse
    | Promise<CreateTenantPlanResponse>
    | Observable<CreateTenantPlanResponse> {
    return this.commandBus.execute(new CreateTenantPlanCommand(request));
  }

  updateTenantPlan(
    request: UpdateTenantPlanRequest,
  ):
    | UpdateTenantPlanResponse
    | Promise<UpdateTenantPlanResponse>
    | Observable<UpdateTenantPlanResponse> {
    return this.commandBus.execute(
      new UpdateTenantPlanCommand(request.tenantId, request),
    );
  }
}
