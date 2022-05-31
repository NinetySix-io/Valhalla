/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "serv.tenant.billings";

export enum PlanPriceInterval {
  MONTH = 0,
  YEAR = 1,
  WEEK = 2,
  DAY = 3,
  UNRECOGNIZED = -1,
}

export enum InvoiceStatus {
  DRAFT = 0,
  OPEN = 1,
  PAID = 2,
  UNCOLLECTIBLE = 3,
  VOID = 4,
  UNRECOGNIZED = -1,
}

export enum SubscriptionStatus {
  ACTIVE = 0,
  ALL = 1,
  CANCELED = 2,
  INCOMPLETE = 3,
  INCOMPLETE_EXPIRED = 4,
  PAST_DUE = 5,
  TRIALING = 6,
  UNPAID = 7,
  UNRECOGNIZED = -1,
}

export interface TenantSubscription {
  id: string;
  tenantId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  collectionMethod: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  endedAt: string;
  canceledAt: string;
  latestInvoiceId: string;
  startDate: string;
  trialStart: string;
  trialEnd: string;
  customerEmail: string;
  customerName: string;
}

export interface Address {
  id: string;
  country: string;
  state: string;
  city: string;
  postalCode: string;
  line: string;
  line2: string;
}

export interface Price {
  name: string;
  currency: string;
  id: string;
  trialDays: number;
  amount: number;
}

export interface Feature {
  name: string;
  normalizedName: string;
  description: string;
  min: number;
  max: number;
  active: boolean;
  full: boolean;
  unit: string;
}

export interface Plan {
  id: string;
  normalizedName: string;
  price: Price | undefined;
  features: Feature[];
  active: boolean;
  free: boolean;
  createdAt: string;
  updatedAt: string;
  name: string;
}

export interface Invoice {
  id: string;
  accountCountry: string;
  accountName: string;
  amountDue: number;
  amountPaid: number;
  amountRemaining: number;
  billingReason: string;
  currency: string;
  customerEmail: string;
  customerName: string;
  description: string;
  dueDate: string;
  endingBalance: number;
  hostedInvoiceUrl: string;
  invoicePdf: string;
  number: string;
  paid: boolean;
  receiptNumber: string;
  startingBalance: number;
  statementDescriptor: string;
  status: string;
  subtotal: number;
  tax: number;
  taxPercent: number;
  total: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePriceRequest {
  price: number;
  currency: string;
  id: string;
  nickname: string;
  trialDays: number;
  intervalCount: number;
  interval: string;
}

export interface CreateTenantPlanRequest {
  name: string;
  description: string;
  prices: CreatePriceRequest[];
  features: Feature[];
  active: boolean;
  free: boolean;
}

export interface UpdateTenantPlanRequest {
  tenantId: string;
  name: string;
  description: string;
  prices: CreatePriceRequest[];
  features: Feature[];
  active: boolean;
  free: boolean;
}

export interface CreateTenantPlanResponse {
  plan: Plan | undefined;
}

export interface UpdateTenantPlanResponse {
  plan: Plan | undefined;
}

export interface GetTenantPlanRequest {
  tenantId: string;
}

export interface GetTenantPlanResponse {
  plan: Plan | undefined;
}

export interface GetTenantInvoiceRequest {
  tenantId: string;
  invoiceId: string;
}

export interface GetTenantInvoiceResponse {
  invoice: Invoice | undefined;
}

export interface CreateTenantSubscriptionRequest {
  customerId: string;
  tenantId: string;
  planId: string;
  couponId: string;
}

export interface CreateTenantSubscriptionResponse {
  subscription: TenantSubscription | undefined;
}

export interface UpdateTenantSubscriptionRequest {
  customerId: string;
  tenantId: string;
  planId: string;
  couponId: string;
}

export interface UpdateTenantSubscriptionResponse {
  subscription: TenantSubscription | undefined;
}

export interface DeleteTenantSubscriptionRequest {
  tenantId: string;
}

export interface DeleteTenantPlanRequest {
  planId: string;
}

export interface DeleteTenantPlanResponse {
  success: boolean;
}

export interface DeleteTenantSubscriptionResponse {
  subscription: TenantSubscription | undefined;
}

export interface GetTenantSubscriptionRequest {
  subscriptionId: string;
  tenantId: string;
}

export interface GetTenantSubscriptionResponse {
  subscription: TenantSubscription | undefined;
}

export interface Message {
  say: string;
}

export interface Event {
  id: string;
  timestamp: number;
  message: string;
  topic: string;
}

export const SERV_TENANT_BILLINGS_PACKAGE_NAME = "serv.tenant.billings";

export interface TenantBillingsServiceClient {
  createTenantPlan(
    request: CreateTenantPlanRequest
  ): Observable<CreateTenantPlanResponse>;

  updateTenantPlan(
    request: UpdateTenantPlanRequest
  ): Observable<UpdateTenantPlanResponse>;

  deleteTenantPlan(
    request: DeleteTenantPlanRequest
  ): Observable<DeleteTenantPlanResponse>;

  getTenantPlan(
    request: GetTenantPlanRequest
  ): Observable<GetTenantPlanResponse>;

  createTenantSubscription(
    request: CreateTenantSubscriptionRequest
  ): Observable<CreateTenantSubscriptionResponse>;

  deleteTenantSubscription(
    request: DeleteTenantSubscriptionRequest
  ): Observable<DeleteTenantSubscriptionResponse>;

  updateTenantSubscription(
    request: UpdateTenantSubscriptionRequest
  ): Observable<UpdateTenantSubscriptionResponse>;

  getTenantSubscription(
    request: GetTenantSubscriptionRequest
  ): Observable<GetTenantSubscriptionResponse>;

  getTenantInvoice(
    request: GetTenantInvoiceRequest
  ): Observable<GetTenantInvoiceResponse>;
}

export interface TenantBillingsServiceController {
  createTenantPlan(
    request: CreateTenantPlanRequest
  ):
    | Promise<CreateTenantPlanResponse>
    | Observable<CreateTenantPlanResponse>
    | CreateTenantPlanResponse;

  updateTenantPlan(
    request: UpdateTenantPlanRequest
  ):
    | Promise<UpdateTenantPlanResponse>
    | Observable<UpdateTenantPlanResponse>
    | UpdateTenantPlanResponse;

  deleteTenantPlan(
    request: DeleteTenantPlanRequest
  ):
    | Promise<DeleteTenantPlanResponse>
    | Observable<DeleteTenantPlanResponse>
    | DeleteTenantPlanResponse;

  getTenantPlan(
    request: GetTenantPlanRequest
  ):
    | Promise<GetTenantPlanResponse>
    | Observable<GetTenantPlanResponse>
    | GetTenantPlanResponse;

  createTenantSubscription(
    request: CreateTenantSubscriptionRequest
  ):
    | Promise<CreateTenantSubscriptionResponse>
    | Observable<CreateTenantSubscriptionResponse>
    | CreateTenantSubscriptionResponse;

  deleteTenantSubscription(
    request: DeleteTenantSubscriptionRequest
  ):
    | Promise<DeleteTenantSubscriptionResponse>
    | Observable<DeleteTenantSubscriptionResponse>
    | DeleteTenantSubscriptionResponse;

  updateTenantSubscription(
    request: UpdateTenantSubscriptionRequest
  ):
    | Promise<UpdateTenantSubscriptionResponse>
    | Observable<UpdateTenantSubscriptionResponse>
    | UpdateTenantSubscriptionResponse;

  getTenantSubscription(
    request: GetTenantSubscriptionRequest
  ):
    | Promise<GetTenantSubscriptionResponse>
    | Observable<GetTenantSubscriptionResponse>
    | GetTenantSubscriptionResponse;

  getTenantInvoice(
    request: GetTenantInvoiceRequest
  ):
    | Promise<GetTenantInvoiceResponse>
    | Observable<GetTenantInvoiceResponse>
    | GetTenantInvoiceResponse;
}

export function TenantBillingsServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "createTenantPlan",
      "updateTenantPlan",
      "deleteTenantPlan",
      "getTenantPlan",
      "createTenantSubscription",
      "deleteTenantSubscription",
      "updateTenantSubscription",
      "getTenantSubscription",
      "getTenantInvoice",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcMethod("TenantBillingsService", method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcStreamMethod("TenantBillingsService", method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
  };
}

export const TENANT_BILLINGS_SERVICE_NAME = "TenantBillingsService";
