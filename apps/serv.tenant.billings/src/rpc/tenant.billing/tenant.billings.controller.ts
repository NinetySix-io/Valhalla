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
} from '@app/protobuf/tenant.billing';

import { Controller } from '@nestjs/common';
import { CreateTenantPlanCommand } from '@app/rpc/tenant.billing/commands/create.tenant.plan.command';
import { CreateTenantSubscriptionCommand } from '@app/rpc/tenant.billing/commands/create.tenant.subscription.command';
import { DeleteTenantPlanCommand } from '@app/rpc/tenant.billing/commands/delete.tenant.plan.command';
import { DeleteTenantSubscriptionCommand } from '@app/rpc/tenant.billing/commands/delete.tenant.subscription.command';
import { GetTenantInvoiceQuery } from '@app/rpc/tenant.billing/queries/get.tenant.invoice.query';
import { GetTenantPlanQuery } from '@app/rpc/tenant.billing/queries/get.tenant.plan.query';
import { GetTenantSubscriptionQuery } from '@app/rpc/tenant.billing/queries/get.tenant.subscription.query';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { UpdateTenantPlanCommand } from '@app/rpc/tenant.billing/commands/update.tenant.plan.command';
import { UpdateTenantSubscriptionCommand } from '@app/rpc/tenant.billing/commands/update.tenant.subscription.command';

@Controller()
export class RpcTenantBillingsController
  implements TenantBillingsServiceController
{
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @GrpcMethod(TENANT_BILLINGS_SERVICE_NAME)
  deleteTenantPlan(
    request: DeleteTenantPlanRequest,
  ):
    | DeleteTenantPlanResponse
    | Promise<DeleteTenantPlanResponse>
    | Observable<DeleteTenantPlanResponse> {
    return this.commandBus.execute(new DeleteTenantPlanCommand(request));
  }

  @GrpcMethod(TENANT_BILLINGS_SERVICE_NAME)
  getTenantPlan(
    request: GetTenantPlanRequest,
  ):
    | GetTenantPlanResponse
    | Promise<GetTenantPlanResponse>
    | Observable<GetTenantPlanResponse> {
    return this.queryBus.execute(new GetTenantPlanQuery(request));
  }

  @GrpcMethod(TENANT_BILLINGS_SERVICE_NAME)
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

  @GrpcMethod(TENANT_BILLINGS_SERVICE_NAME)
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

  @GrpcMethod(TENANT_BILLINGS_SERVICE_NAME)
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

  @GrpcMethod(TENANT_BILLINGS_SERVICE_NAME)
  getTenantSubscription(
    request: GetTenantSubscriptionRequest,
  ):
    | GetTenantSubscriptionResponse
    | Promise<GetTenantSubscriptionResponse>
    | Observable<GetTenantSubscriptionResponse> {
    return this.queryBus.execute(new GetTenantSubscriptionQuery(request));
  }

  @GrpcMethod(TENANT_BILLINGS_SERVICE_NAME)
  getTenantInvoice(
    request: GetTenantInvoiceRequest,
  ):
    | GetTenantInvoiceResponse
    | Promise<GetTenantInvoiceResponse>
    | Observable<GetTenantInvoiceResponse> {
    return this.queryBus.execute(new GetTenantInvoiceQuery(request));
  }

  @GrpcMethod(TENANT_BILLINGS_SERVICE_NAME)
  createTenantPlan(
    request: CreateTenantPlanRequest,
  ):
    | CreateTenantPlanResponse
    | Promise<CreateTenantPlanResponse>
    | Observable<CreateTenantPlanResponse> {
    return this.commandBus.execute(new CreateTenantPlanCommand(request));
  }

  @GrpcMethod(TENANT_BILLINGS_SERVICE_NAME)
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
